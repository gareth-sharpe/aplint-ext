# ApexDoc

## ApexDoc Must Have See

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- ApexDoc comments should contain `@see`
- ApexDoc `@see` should be in format BOARD-xxx

*Examples*:

👎 Negative Example
```
/**
 * @description A class with no @see
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A class with a @see tag with no length
 * @see
 * ...
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A class with a @see tag with improper format
 * @see JIRA
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
 * @description A class with a @see tag with propor format
 * @see JIRA-123
 * ...
 */
 public class HelloWorld {
   ...
 }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe