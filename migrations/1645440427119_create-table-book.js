/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('book', {
        id: {
           type: 'VARCHAR(50)',
           notNull: true
        }, 
        title:{
            type: 'VARCHAR(100)',
            notNull: true
        },
        authors: {
            type: 'TEXT[5]',
            notNull: true,
        },
        isbn: {
            type: 'INTEGER',
            notNull: true,
        },
        pages:{
            type: 'INTEGER',
            notNull: true,
        },
        year: {
            type: 'INTEGER',
            notNull: true
        },
        created_at: {
            type: 'TEXT',
            notNull: true
        },
        updated_at:{
            type: 'TEXT', 
            notNull: true
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('book')
};
