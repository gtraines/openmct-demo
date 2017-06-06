/**
 * Created by graham on 6/4/17.
 */

define(
    [],
    function () {
        "use strict";

        console.log("Styleguide registry found");

        function styleguideRegistry(openmct) {

            console.log(types);

            types.forEach(function(typeEntry) {
                openmct.types.addType(typeEntry["key"], {
                    name: typeEntry["name"],
                    description: typeEntry["description"],
                    cssClass: typeEntry["cssClass"]
                });
            })
        }

        var types = [
            { "key": "custom.styleguide.intro", "name": "Introduction", "cssClass": "icon-page", "description": "Introduction and overview to the style guide" },
            { "key": "custom.styleguide.standards", "name": "Standards", "cssClass": "icon-page", "description": "" },
            { "key": "custom.styleguide.colors", "name": "Colors", "cssClass": "icon-page", "description": "" },
            { "key": "custom.styleguide.glyphs", "name": "Glyphs", "cssClass": "icon-page", "description": "Glyphs overview" },
            { "key": "custom.styleguide.controls", "name": "Controls", "cssClass": "icon-page", "description": "Buttons, selects, HTML controls" },
            { "key": "custom.styleguide.input", "name": "Text Inputs", "cssClass": "icon-page", "description": "Various text inputs" },
            { "key": "custom.styleguide.menus", "name": "Menus", "cssClass": "icon-page", "description": "Context menus, dropdowns" }
        ];

        return styleguideRegistry;
    });