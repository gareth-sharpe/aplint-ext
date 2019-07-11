# ApexDoc

## Braces Must Be Formatted

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- Braces should be on same line as class or function definition
- Opening brance should have space beween itself and a class or function definition

Note: There is a [difference between parentheses, brace, and bracket](https://en.wikipedia.org/wiki/Bracket)

*Examples*:

👎 Negative Example
```
/**
 * @description A class without brace on same line
 */
 public class HelloWorld 
 {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A class with improper brace spacing
 * ...
 */
 public class HelloWorld{
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A method without brace on same line
 * ...
 */
 public static void foo 
 {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A method with improper brace spacing
 * ...
 */
 public static void foo{
   ...
 }
```

👍 Positive Example
```
/**
 * ...
 * @description A class with properly formatted brace
 * ...
 */
 public class HelloWorld {
  ...
 }
```

👍 Positive Example
```
/**
 * ...
 * @description A method with properly formatted brace
 * ...
 */
 public static void foo {
  ...
 }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe