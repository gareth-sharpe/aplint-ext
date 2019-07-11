# Code Style

## Must Not Have Extra Spacing

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- There should be no extra spacing (two spaces together inline)

*Examples*:

👎 Negative Example
```
// extra space between varaible `a` and the `=` operator
Boolean a  = true;
```

👎 Negative Example
```
// extra space between the `<` operator and varaible `b` 
while (a <  b) { 
  ... 
}
```

👍 Positive Example
```
// equal spacing
Boolean a = true;
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe