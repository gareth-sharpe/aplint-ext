# ApexDoc

## Class Must Have Group

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- ApexDoc comments should contain `@group`
- ApexDoc `@group` name should have a length

*Examples*:

👎 Negative Example
```
/**
 * @description A class with no @group
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A class with a @group tag with no group name
 * @group
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
 * @description A class with a @group tag with a group name
 * @group MyGroup
 * ...
 */
 public class HelloWorld {
   ...
 }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe