# Code Style

## Parantheses Must Be Formatted

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- Parentheses for 'if', 'else if', 'for', 'while', and 'switch' should have spacing

*Examples*:

👎 Negative Example
```
// no space after 'for'
for(Integer a = 0; i < n; i++) { ... }
```

👎 Negative Example
```
// no space after last parethesis
for (Integer a = 0; i < n; i++){ ... }
```

👎 Negative Example
```
// no space after 'if' or space after last parenthesis
if(true){ ... }
```

👍 Positive Example
```
// space after 'for' and after last parenthesis
for (Integer a = 0; i < n; i++) { ... }
```

👍 Positive Example
```
// space after 'if' and after last parenthesis
if (true) { ... }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe