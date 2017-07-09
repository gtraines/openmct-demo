/**
 * Created by graham on 6/10/17.
 */

define(
    [],
    function () {
        'use strict';

        const PORTAL_NAMESPACE = "basketdevil.portal";
        const UPLOAD_ROOT_ID = "uploadroot";
        const UPLOAD_ROOT_TYPE = 'basketdevil.fileupload';


        var objectProvider = {
            get: function (identifier) {
                console.log(identifier);
                return getFileUploadObjects().then(
                    function (objects) {
                        var returnObject = {};
                        if (identifier.key === UPLOAD_ROOT_ID) {
                            returnObject = {
                                identifier: identifier,
                                name: "File Upload",
                                type: UPLOAD_ROOT_TYPE,
                                location: "ROOT"
                            };
                        } else {
                            var objectModel = objects.filter(function (obj) {
                                console.log(obj);
                                return obj.key === identifier.key;
                            })[0];
                            console.log(objectModel);
                            returnObject = {
                                identifier: identifier,
                                name: objectModel.name,
                                type: objectModel.type,
                                location: PORTAL_NAMESPACE + ":" + UPLOAD_ROOT_ID
                            }
                        }

                        console.log(returnObject);
                        return returnObject;
                    });
            }
        };

        var compositionProvider = {
            appliesTo: function (domainObject) {
                return domainObject.identifier.namespace === PORTAL_NAMESPACE &&
                        domainObject.type === UPLOAD_ROOT_TYPE;
            },
            load: function (domainObject) {
                console.log("Domain Object:")
                console.log(domainObject);
                return getFileUploadObjects().then(function (objects) {
                    console.log(objects);
                    return Promise.resolve(objects.map(function (obj) {
                        console.log(obj);
                        return {
                            namespace: PORTAL_NAMESPACE,
                            key: obj.key
                        }
                    }))
                });
            }
        };

        function getFileUploadObjects() {
            return http.get(
                        '/custom/fileupload/res/fileuploadobjects.json'
            ).then(function (result) {
                    console.log(result);
                    return result.data.objects;
                })
        }

        function FileUploadPlugin() {
            return function install(openmct) {

                openmct.types.addType(UPLOAD_ROOT_TYPE,
                    {
                       name: 'File Upload Section',
                        description: 'Section for uploading files to your account',
                        cssClass: 'icon-save'
                    });

                openmct.objects.addRoot({
                    namespace: PORTAL_NAMESPACE,
                    key: UPLOAD_ROOT_ID
                });

                openmct.objects.addProvider(PORTAL_NAMESPACE, objectProvider);

                openmct.composition.addProvider(compositionProvider);
            }
        }

        return FileUploadPlugin;
    }
);
