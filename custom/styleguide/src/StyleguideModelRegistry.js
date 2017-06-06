/**
 * Created by graham on 6/4/17.
 */
define(
    [],
    function () {
        "use strict";


        var models = {};

        models['styleguide.intros'] = { name: "Introduction", type: "styleguide.intro", location: "basketdevil:home" };
        models['styleguide.standards'] = { name: "Standards", type: "styleguide.standards", location: "basketdevil:home" };
        models['styleguide.colors'] = { name: "Colors", type: "styleguide.colors", location: "basketdevil:home" };
        models['styleguide.glyphs'] = { name: "Glyphs", type: "styleguide.glyphs", location: "basketdevil:home" };
        models['styleguide.controls'] = { name: "Controls", type: "styleguide.controls", location: "basketdevil:ui-elements" };
        models['styleguide.input'] = { name: "Text Inputs", type: "styleguide.input", location: "basketdevil:ui-elements" };
        models['styleguide.menus'] = { name: "Menus", type: "styleguide.menus", location: "basketdevil:ui-elements" };


        function registerStyleguideModelProviders(openmct) {

                console.log("Registering Model Providers");

                openmct.objects.addProvider("basketdevil", {
                    get: function (identifier) {

                        console.log(identifier);

                        if (identifier.key === "styleguide.intros") {

                            return Promise.resolve({
                                identifier: identifier,
                                name: "Introduction",
                                type: "basketdevil.styleguide.intro",
                                location: "basketdevil:home"
                            });
                        }
                    }
                });
        }


        return registerStyleguideModelProviders;
    });