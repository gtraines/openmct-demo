/**
 * Created by graham on 6/10/17.
 */

define(
    [
        "../../app/common/config",
        "text!./res/fileuploadobjects.json"
    ],
    function (
        config,
        fileUploadObjects
    ) {
        'use strict';

        fileUploadObjects = JSON.parse(fileUploadObjects);
        console.log(fileUploadObjects);
        const PORTAL_NAMESPACE = config.NAMESPACE;
        const UPLOAD_ROOT_ID = config.ROOTS.UPLOAD;
        const UPLOAD_ROOT_TYPE = config.NAMESPACE + '.fileupload';


        var objectProvider = {
            get: function (identifier) {
                var objects = fileUploadObjects.objects;
                console.log(identifier);

                var returnObject = {};
                if (identifier.key === UPLOAD_ROOT_ID) {

                    returnObject = {
                        identifier: identifier,
                        name: "File Upload",
                        type: UPLOAD_ROOT_TYPE,
                        location: "ROOT",
                        composition: [
                            serializeId({ namespace: PORTAL_NAMESPACE, key: 'trxdata' }),
                            serializeId({ namespace: PORTAL_NAMESPACE, key: 'uploadstatus' })
                        ]
                    };
                } else {
                    console.log("Not equal to the upload root");
                    console.log(identifier);
                    var objectModel =
                        objects.filter(function (obj) {
                            return obj.identifier.key === identifier.key;
                        })[0];

                    console.log(objectModel);

                    returnObject = objectModel;
                }
                console.log("Should be the same as above");
                console.log(returnObject);
                return Promise.resolve(returnObject);
            }
        };

        var compositionProvider = {
            appliesTo: function (domainObject) {
                console.log("Does it apply?");
                console.log(domainObject);

                return domainObject.identifier.namespace === PORTAL_NAMESPACE &&
                    domainObject.type === UPLOAD_ROOT_TYPE;
            },
            load: function (model) {
                var objects = fileUploadObjects.objects;

                return Promise.resolve(objects.map(function (obj) {
                    return {
                        namespace: 'basketdevil',
                        key: obj.identifier.key
                    }
                }));
            }
        };

        function serializeId(id) {
            return id.namespace + ':' + id.key;
        }

        function deserializeId(serializedId) {
            var tokens = serializedId.split(':');
            return {
                namespace: tokens[0],
                key: tokens[1]
            };
        }

        function addIdentifier(object, identifier) {
            object.identifier = identifier;
            return object;
        }

        function FileUploadPlugin() {
            return function install(openmct) {

                openmct.types.addType(UPLOAD_ROOT_TYPE,
                    {
                       name: 'File Upload Section',
                        description: 'Section for uploading files to your account',
                        cssClass: 'icon-save'
                    });

                openmct.types.addType(PORTAL_NAMESPACE + ".input",
                    {
                        name: "Text Inputs",
                        cssClass: "icon-page",
                        description: "Various text inputs"
                    });

                openmct.objects.addRoot({
                    namespace: PORTAL_NAMESPACE,
                    key: UPLOAD_ROOT_ID
                });

                openmct.composition.addProvider(compositionProvider);

                openmct.objects.addProvider(PORTAL_NAMESPACE, objectProvider);
            }
        }

        return FileUploadPlugin;
    }
);
