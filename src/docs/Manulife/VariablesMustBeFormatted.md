# Code Style

## Variables Must Be Formatted

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- Variables inside `for`, `while`, `if`, and `else if` should have spacing around varaibles

*Examples*:

👎 Negative Example
```
// no space after variable `a` or before variable `b`
if (a==b) { ... }
```

👎 Negative Example
```
// no space before variable `b`
while (a <=b) { ... }
```

👍 Positive Example
```
// space after variable `a` and before varaible `b`
if (a == b) { ... }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe