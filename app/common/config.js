/**
 * Created by graham on 7/9/17.
 */

define([
        'text!./config-values.json'
    ],
    function (configValues) {
        configValues = JSON.parse(configValues);

        return configValues;
    }
);