export const defaultValue =
`
# Markdown to Confluence Wiki Markup
Repository
[KeisukeKudo/md-to-cwm](https://github.com/KeisukeKudo/md-to-cwm)

## Support browser
- Google Chrome
- Firefox

### Example

\`<script>alert('foo')</script>\`
<script>
  // It is not displayed in view
  alert('sanitized')
</script>

normal

*italic*
_italic_

**bold**
__bold__

***bold***
___bold___

~~strike~~

\`\`\`js
const a = 'a';
console.log(a);
\`\`\`

~~~C#
var a = "a";
Console.WriteLine(a);
~~~

| foo | bar | bal |
|---|---|---|
| 1 | 2 | 3 |
| 4 | 5 | 6 |

- test1
- test2
  - test2-1
  - test2-2

1. test1
1. test2
  1. test2-1
  1. test2-2
  
[Google](https://www.google.com/)

![image](https://pbs.twimg.com/media/Ct9--1aVYAIbBvS.jpg)

>Once more she found herself in the long hall, and close to the little glass table. “Now, I’ll manage better this time,” she said to herself, and began by taking the little golden key, and unlocking the door that led into the garden. Then she went to work nibbling at the mushroom (she had kept a piece of it in her pocket) till she was about a foot high: then she walked down the little passage: and then—she found herself at last in the beautiful garden, among the bright flower-beds and the cool fountains.
`