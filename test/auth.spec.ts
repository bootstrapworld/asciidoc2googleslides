// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable @typescript-eslint/camelcase */

import mockfs from 'mock-fs';
import nock from 'nock';
import fs from 'fs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import UserAuthorizer from '../src/auth';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

const expect = chai.expect;
chai.use(chaiAsPromised);
axios.defaults.adapter = httpAdapter;

function stubTokenRequest(): void {
    nock('https://oauth2.googleapis.com')
        .post('/token')
        .reply(200, {
            access_token: 'new_token',
            expires_in: 3920,
            token_type: 'Bearer',
        });
}

function stubTokenRequestError(): void {
    nock('https://oauth2.googleapis.com')
        .post('/token')
        .reply(400, {
            error_description: 'Bad Request',
            error: 'invalid_grant',
        });
}

describe('UserAuthorizer', function() {
    beforeEach(function() {
        mockfs({
            '/tmp/tokens.json': JSON.stringify({
                expired: {
                    access_token: 'ya29.123',
                    token_type: 'Bearer',
                    expiry_date: 1,
                    refresh_token: '1/abc',
                },
                current: {
                    access_token: 'ya29.123',
                    token_type: 'Bearer',
                    expiry_date: Date.now() + 1000 * 60 * 60,
                    refresh_token: '1/abc',
                },
            }),
        });
    });

    afterEach(mockfs.restore);

    it('should ensure DB dir exists', function() {
        let options = {
            clientId: '123',
            clientSecret: 'abc',
            filePath: '/not_a_real_dir/token.json',
        };
        new UserAuthorizer(options);
        expect(() => fs.accessSync('/not_a_real_dir')).to.not.throw(Error);
    });

    describe('with valid configuration', function() {
        const options = {
            clientId: '123',
            clientSecret: 'abc',
            filePath: '/tmp/tokens.json',
            prompt: function() {
                return Promise.reject(new Error('Prompt not expected'));
            },
        };

        describe('with no saved token', function() {
            it('should report error if no code provided', function() {
                const authorizer = new UserAuthorizer(options);
                authorizer.prompt = () => {
                    return Promise.resolve(null);
                };
                const credentials = authorizer.getUserCredentials(
                    'user@example.com',
                    'https://www.googleapis.com/auth/slides',
                );
                return expect(credentials).to.eventually.be.rejected;
            });

            it('should report error if invalid code provided', function() {
                stubTokenRequestError();
                const authorizer = new UserAuthorizer(options);
                authorizer.prompt = () => {
                    return Promise.resolve('not a valid code');
                };
                const credentials = authorizer.getUserCredentials(
                    'user@example.com',
                    'https://www.googleapis.com/auth/slides',
                );
                return expect(credentials).to.eventually.be.rejected;
            });

            it('should exchange the code if provided', function() {
                stubTokenRequest();
                const authorizer = new UserAuthorizer(options);
                authorizer.prompt = () => {
                    return Promise.resolve('code');
                };
                const credentials = authorizer.getUserCredentials(
                    'user@example.com',
                    'https://www.googleapis.com/auth/slides',
                );
                return expect(credentials).to.eventually.have.nested.property('credentials.access_token', 'new_token');
            });
        });

        describe('with saved token', function() {
            it('should return token if still current', function() {
                const authorizer = new UserAuthorizer(options);
                const credentials = authorizer.getUserCredentials('current', 'https://www.googleapis.com/auth/slides');
                return expect(credentials).to.eventually.have.nested.property('credentials.access_token', 'ya29.123');
            });

            it('should refresh token if expired', function() {
                stubTokenRequest();
                const authorizer = new UserAuthorizer(options);
                const credentials = authorizer.getUserCredentials('expired', 'https://www.googleapis.com/auth/slides');
                return expect(credentials).to.eventually.have.nested.property('credentials.access_token', 'new_token');
            });
        });
    });
});
