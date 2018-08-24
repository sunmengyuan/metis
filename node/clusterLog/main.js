const OS = require('os');
const Cluster = require('cluster');
const Log4JS = require('log4js');
const Koa = require('koa');
const App = new Koa();

switch (process.env.MODE) {
    case 'cluster':
        if (Cluster.isMaster) {
            for (let i = 0; i < OS.cpus().length; i++) Cluster.fork();
            console.log('master', process.pid);
        } else {
            App.listen(3000);
            console.log('worker', process.pid);
        }
        break;
    default:
        App.listen(3000);
        break;
}

Log4JS.configure({
    appenders: {
        console: {
            type: 'console'
        },
        file: {
            type: 'file',
            filename: './logs/info.log'
        }
    },
    categories: {
        default: {
            appenders: ['console', 'file'],
            level: 'info'
        }
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID'
});

const Logger = Log4JS.getLogger();
Logger.level = 'info';
for (let i = 0; i < 50; i++) Logger.info(`message: ${process.pid}`);