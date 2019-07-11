# ApexDoc

## ApexDoc Must Have Author

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- ApexDoc comments should contain `@author`
- ApexDoc `@author` should have first name
- ApexDoc `@author` should have last name
- ApexDoc `@author` first name should start with a capital
- ApexDoc `@author` last name should start with a capital

*Examples*:

👎 Negative Example
```
/**
 * @description A class with no @author
 */
 public class HelloWorld {
   ...
 }
```

👎 Negative Example
```
/**
 * ...
 * @description A class with a @author tag with no last name
 * @author Sally
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
 * @description A class with a @author tag with improper capitaliation
 * @author sally brown
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
 * @description A class with a @author tag with first and last name properly capitalized
 * @author Sally Brown
 * ...
 */
 public class HelloWorld {
   ...
 }
```

### Acknowledgments

*Rule author*: Gareth Sharpe

*Docs author*: Gareth Sharpe