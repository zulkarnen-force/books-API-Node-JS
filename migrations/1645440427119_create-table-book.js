/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('book', {
        id: {
           type: VARCHAR(50),
           notNull: true, 
        }, 
        title:{
            type: VARCHAR(50),
            notNull: true,
        },
        authors: {
            type: TEXT[5],
            notNull: true,
        },
        isbn: {
            type: INTEGER(25),
            notNull: true,
        },
        pages:{
            type: INTEGER(5),
            notNull: true,
        },
        year: {
            type: INTEGER(4)
        },
        created_at: {
            type: TEXT, notNull: true
        },
        updated_at:{
            type: TEXT, 
            notNull: true
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('book')
};
