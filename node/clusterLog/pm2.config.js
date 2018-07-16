module.exports = {
    apps: [
        {
            name: 'cluster-log',
            script: './main.js',
            exec_mode: 'cluster',
            instances: 0,
            instance_var: 'INSTANCE_ID'
        }
    ]
}