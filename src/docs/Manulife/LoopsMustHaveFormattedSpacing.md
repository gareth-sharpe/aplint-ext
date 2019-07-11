# Code Style

## Loops Must Have Formatted Spacing

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- `for` and `while` loops should have consistent spacing
- There should be spaces before and after operators
- There should be a space after a semicolon

*Examples*:

👎 Negative Example
```
// operators do not have space before and after
for (let i=0; i<n+1; i++) {
  ...
}
```

👎 Negative Example
```
// operators do not have space after colon
for (let i = 0;i < n + 1;i++) {
  ...
}
```

👍 Positive Example
```
// operators and semicolons have propor spacing
for (let i = 0; i < n + 1; i++) {
  ...
}
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe