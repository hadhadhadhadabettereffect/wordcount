# word count
word count demo project. can be see [here](https://hadhadhadhadabettereffect.github.io/wordcount/)

## what counts as a word
* individual ideographs.
    * "日本語" = 3 words
* continuous sequences of letters.
    * "カタカナ" = 1 word
    * "a.b c -- d" = 3 words
* numbers.
    * "1729" = 1 word
    * "1.23" = 1 word
    * "1,2,3" = 3 words

## local setup
* `$ npm install` to install dependencies
* `$ gulp` to bundle files and start server at localhost:8000
* source files found in 'src' directory. using
    * typescript for javascipt files
    * pug for html
    * postcss for css
* more details about installed packages and build options [here](https://github.com/hadhadhadhadabettereffect/static-frontend-template)

## regex
using [XRegExp](http://xregexp.com/api/) for unicode support