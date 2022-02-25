/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addConstraint('book', 'Book.author_id_TO_Author.author_id', `FOREIGN KEY (author_id) 
    REFERENCES Author(author_id) ON DELETE CASCADE`)
};

exports.down = pgm => {
    pgm.dropConstraint('book', 'Book.author_id_TO_Author.author_id');
};
