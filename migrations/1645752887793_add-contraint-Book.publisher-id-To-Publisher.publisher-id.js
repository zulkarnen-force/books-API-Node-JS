/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addConstraint('book', 'Book.publisher_id_TO_Publisher.publisher_id', `FOREIGN KEY (publisher_id) 
    REFERENCES Publisher(publisher_id) ON DELETE CASCADE`)
};

exports.down = pgm => {
    pgm.dropConstraint('book', 'Book.publisher_id_TO_Publisher.publisher_id');
};
