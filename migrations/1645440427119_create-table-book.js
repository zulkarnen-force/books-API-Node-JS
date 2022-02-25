/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('book', {
        book_id: {
           type: 'VARCHAR(50)',
           notNull: true,
           primaryKey: true,
        }, 
        title:{
            type: 'VARCHAR(100)',
            notNull: true
        },
        isbn: {
            type: 'varchar(10)',
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
        author_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        publisher_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('book')
};
