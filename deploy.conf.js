module.exports = {
    assetsPath: '/PROJECT FOLDER/',

    front: {
        enabled: true,
        host: '', //host address
        username: 'root',
        privateKey: '../../.ssh/id_rsa',
        dest: '/var/www/html/PROJECT FOLDER' //destination directory on host
    },

    wp: {
        enabled: false,
        host: '',
        username: '',
        password: '',
        dest: ''
    }

};
