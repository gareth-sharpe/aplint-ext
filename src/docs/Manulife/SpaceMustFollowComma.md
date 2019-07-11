# Code Style

## Space Must Follow Comma

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- Every comma should be followed with a space
- A space should not be followed by a comma

Note: Yes, [it should](https://www.englishclub.com/writing/punctuation-comma.htm)

*Examples*:

👎 Negative Example
```
// no space after any comma
Boolean a[] = [true,true,false];
```

👎 Negative Example
```
// space before comma
Boolean a[] = [true ,true ,false];
```

👎 Negative Example
```
// space before and after comma
Boolean a[] = [true , true , false];
```

👍 Positive Example
```
// space after all commas
Boolean a[] = [true, true, false];
```


### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe