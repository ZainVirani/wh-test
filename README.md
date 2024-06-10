# Weekend Health Take-home challenge submission

## Solution Ideation
I considered 3 solutions for this problem.

First I considered the solution I ended up using, which is simply keeping track of letter occurrences in the `inputString` and each word of the `dictionary`, then comparing them. Potentially this is not ideal for huge dictionaries, but at that point I'd consider changing our dictionary so we're not processing every word each time we run a search (outside of the scope of this problem).

To be sure I wanted to take the above route I considered adding each word in the dictionary to a hash keyed by the sorted letters of the word, which would something like this:
```
{
  "aet": ["ate", "eat", "tea"],
  "dgo": ["dog", "god"],
  "do": ["do"],
  ...
}
```
Once this object was built I would have to look for the list of words for each subset of the `inputString`. This was too inefficient, since getting every subset of the `inputString` has a `O(2^n)` where `n` is the length of the input string. This solution is ok for a small `inputString` size and a massive dictionary, but even so I would still consider other options.

Next I considered using regular expressions, and had a path to a solution thanks to [this StackOverflow answer](https://stackoverflow.com/a/22411630), but was unsure of the efficiency and assumed it was bad. This solution probably works for a huge `inputString`, but I suspect that the use case doesn't make sense in real life. It was also too complicated for this problem.

## Solution Approach
The solution is pretty simple. I have a helper function to get the counts of each occurrence of a letter in a word, and I use that function for the `inputString` and each word in `dictionary`. I return the filtered `dictionary` based on the following conditions:

1. Each character in a given word in the dictionary must exist in the `inputString`
2. Each character in a given word in the dictionary cannot occur more times than it occurs in `inputString`

### Solution Notes
- I do not handle the case of duplicate words in the dictionary.

## Testing
Given more time I would test massive input strings and massive dictionaries to evaluate efficiency. Here are some example test cases (including the ones provided to me):


```
findWords("ate", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]) // perfect matches

findWords("ategood", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]) // all matches

findWords("oxbpogd", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]) // overkill search

findWords("zzz", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]) // no matches

findWords("god", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]) // subset matches

findWords("", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]) // malformed search string

findWords("test", [""]) // malformed dictionary

findWords("test", []) // empty dictionary

findWords("test", ["test", "test", "hungry", "lunch", "poke"]) // duplicate words

findWords("!?123", ["3", "500", "password123!", "22?", "13!?"]) // numbers and special characters
```