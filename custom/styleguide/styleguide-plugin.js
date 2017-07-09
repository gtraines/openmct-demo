/**
 * Created by graham on 6/4/17.
 */
define(
    [
        "./src/StyleguideTypeRegistry",
        "./src/StyleguideModelRegistry"
    ],
    function (
        styleguideTypeRegistry,
        styleguideModelProvidersRegistry
    ) {
        "use strict";

        var styleguideProvider = {
            get: function (identifier) {
                if (identifier.key === 'home') {

                    return Promise.resolve({
                        identifier: identifier,
                        name: "Style Guide Home",
                        type: 'folder',
                        location: 'ROOT'
                    });
                }
            }
        };

        var styleguideCompositionProvider = {
            appliesTo: function (domainObject) {
                return domainObject.type === "custom.styleguide";
            },
            load: function (domainObject) {
                return Promise.resolve([
                    {
                        namespace: "basketdevil",
                        key: "styleguide.intro"
                    }
                ])
            }
        };

        function StyleguidePlugin() {
            return function install(openmct) {
                console.log("Installing styleguide plugin");

                openmct.types.addType("fileupload", {
                    name: 'File Upload',
                    description: 'File Upload',
                    cssClass: 'glyphicon glyphicon-floppy-open'
                });
                styleguideTypeRegistry(openmct);

                openmct.objects.addProvider("basketdevil", styleguideProvider);


                openmct.objects.addRoot({
                    namespace: "basketdevil",
                    key: "home"
                });

                //styleguideModelProvidersRegistry(openmct);
            }
        }

        return StyleguidePlugin;
    });

