module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./data/users.db3"
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds"
        },
    },
    testing: {
        client: "sqlite3",
        connection: {
            filename: "./data/users.db3"
        },
        useNullAsDefault: true,
        migrations: {
            directory: "./data/migrations",
        },
        seeds: {
            directory: "./data/seeds"
        },
    },
    // notes from lambda on hooking up with heroku
    // production: {
    //     client: "pg", // npm i pg
    //     connection: process.env.DATABASE_URL, // provided by Heroku
    //     migrations: {
    //       directory: "./data/migrations",
    //     },
    //     seeds: {
    //       directory: "./data/seeds",
    //     },
    //   },
}