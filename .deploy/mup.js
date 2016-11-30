module.exports = {
  servers: {
    one: {
      host: '129.252.29.17',
      username: 'root',
      password: waitlistpassword,
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
      opts: {
          port: 22,
      },
    }
  },

  meteor: {
    name: 'app',
    path: '../app',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'app.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};