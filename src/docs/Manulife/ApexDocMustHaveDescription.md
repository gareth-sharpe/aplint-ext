# ApexDoc

## ApexDoc Must Have Description

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- ApexDoc comments should contain `@description`
- ApexDoc `@description` should start with a capital
- Apexdoc `@description` should have 10 or more characters

*Examples*:

👎 Negative Example
```
/**
 * A class with no description
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * A class with a description with no length
 * @description 
 * ...
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * @description a class with improper capitalization
 * ...
 */
 public class HelloWorld {
   ...
 }
```

👍 Positive Example
```
/**
 * @description A class with a @description tag with proper capitalization
 * ...
 */
 public class HelloWorld {
   ...
 }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe