/**
 * Created by Cao Hong Phuoc on 6/23/2015.
 */
'use strict';

angular.module('users').factory('Authentication', function() {
    this.user = window.user;

    return {
        user: this.user
    }
})