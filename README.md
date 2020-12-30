[![dependencies Status](https://david-dm.org/bootstrapworld/asciidoc2googleslides/status.svg)](https://david-dm.org/bootstrapworld/asciidoc2googleslides)
[![devDependencies Status](https://david-dm.org/bootstrapworld/asciidoc2googleslides/dev-status.svg)](https://david-dm.org/bootstrapworld/asciidoc2googleslides?type=dev)


# asciidoc2googleslides
Generate Google Slides from AsciiDoc

This is based on [md2googleslides](https://github.com/googleworkspace/md2googleslides), but with several notable differences:

- The markdown-it library has been (*cough* will be *cough*) replaced with asciidoctor.js, allowing the slides to be written using AsciiDoc
- We plan to extend the library with additional functionality, beyond what is available in md2googleslides

To get this working, you'll need to:

 - Enable the Google Slides API for your [Google Account](https://console.cloud.google.com/apis/dashboard)
 - Generate credentials (for a desktop app), and download the resulting credentials file
 - Rename it to `clientId.json`, and stick it in ~/.md2googleslides/
 
Once that's done, you should be able to run the example via `./bin/md2gslides.js --use-fileio examples/example.md`
(The --use-fileio flag is needed for uploading images, which the example file requires)
