# ApexDoc

## ApexDoc Must Have Date

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- ApexDoc comments should contain `@date`
- ApexDoc `@date` should be in format MM/DD/YYYY

*Examples*:

👎 Negative Example
```
/**
 * @description A class with no @date
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A class with a @date tag with no date
 * @date
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
 * @description A class with a @date tag with improper format
 * @date 05-23-2025
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
 * @description A class with a @date tag with improper format
 * @date 23/05/2025
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
 * @description A class with a @date tag with propor format
 * @date 05/23/2025
 * ...
 */
 public class HelloWorld {
   ...
 }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe