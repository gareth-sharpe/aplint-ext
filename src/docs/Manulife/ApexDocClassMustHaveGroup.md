<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <!--
      Use a content security policy to only allow loading images from https or from our extension directory,
      and only allow scripts that have a specific nonce.
      -->
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>
  </head>
  <body>

# ApexDoc

## Class Must Have Group

*Since*: APLint 1.0.9

*Priority*: Medium (3)

This rule validates that:

- ApexDoc comments should contain `@group`
- ApexDoc `@group` name should have a length

*Examples*:

:thumbsdown: Negative Example
```
/**
 * @description A class with no @group
 */
 public class HelloWorld {
   ...
 }
```

:thumbsdown: Negative Example
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

:thumbsup: Positive Example
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
  
  </body>
</html>`;