![47 Degrees](css/images/47deg-logo.png)

Note:

[Raquel] 

Ok, so let's start! Thanks for comming!

She is Amanda Hinchman-Dominguez from Chicago where she's the organizer of Kotlin User Group

[Amanda]

and she is Raquel Carmena from Spain and we are engineers at 47 Degrees.

---

Kotlin logo + 
![](css/images/arrow.svg)

Note:

[Raquel]

A long time ago in a galaxy far, far away, Arrow was born.

Who of you are familiar with Arrow?

Great!

For those who are not familiar with Arrow, it's the functional companion of the Kotlin standard library.

Though it's not necessary to be familiar with Arrow for this talk.

---

![](css/images/functional-companions.jpg)

Note:

[Raquel]

And it seems a library is the common way to add more functional capabilities to a programming language like Cats library for Scala, Bow for Swift or VAVR for Java.

However, we wanted do something else.

---

![Compilation](css/images/compiler.jpg)

Note:

[Raquel]

Let's think, we compile Kotlin source code. BTW! The Kotlin compiler doesn't transpile Java code as some people think. It's a compiler!

---

![Add Arrow library](css/images/compiler-plus-arrow.jpg)

Note:

[Raquel]

We were focused on source code with Arrow, so what if we shoot the arrow to another direction?

---

![Focus on Kotlin compiler](css/images/compiler-plus-another-idea.jpg)

Note:

[Raquel]

What if we focus on the Kotlin compiler?

---

<video>
   <source src="css/videos/calling-kotlin-phone.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

So it was the time to contact Kotlin community.

---

![](css/images/sources-of-contact-1.jpg)

Note: 

[Raquel]

Kotlin provides several sources of contact.

Maybe the most known is KotlinLang Slack.

Who of you are in KotlinLang Slack?

Really useful, right?

It also exists a forum, an issue tracker and a way to contribute to the language.

---

![](css/images/sources-of-contact-2.jpg)

Note:

[Raquel]

That's KEEP.

It means Kotlin Evolution and Enhancement Process

1. KEEP is hosted in GitHub

2. It holds proposals for Kotlin also known as KEEPs 

3. New KEEPs are submitted as pull requests

4. Some KEEPs have their own repository for specification and discussions

So here we go!

---

### KEEP-87

![KEEP-87](css/images/keep-87.svg)

Note:

[Raquel]

We created this pull request where we explained how to create compile-time extension interfaces.

We wanted to create type classes features in Arrow and we realized that the entire community was heavily dependent to the compiler plugins like serialization, allOpen and Android extensions, all of them companions for the Kotlin compiler. 

However, there wasn't enough documentation about the Kotlin compiler and we wanted to fill that gap for the community.

And, at the same time, to make functional programming more ergonomic that is today.

---

![](css/images/feedback.jpg)

Note:

[Raquel]

And we received a lot of feedback

367 messages

85 commits

57 participants

18 reviewers

And we started working with all the received feedback!

---

# Are you ready?

Note:

[Raquel]

Are you ready to know more about it? Before explaining the new product, we are going to know how Kotlin Compiler works.

---

<video data-autoplay>
   <source src="css/videos/compil_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

Firstly, we write some code. 

---

<video data-autoplay>
   <source src="css/videos/compil_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

The compiler reads that code and models its structure into a tree, known as Abstract Syntax Tree.

That tree is compatible with Jetbrain's PSI, Programming Structure Interface, used in the IDE.

---

<video data-autoplay>
   <source src="css/videos/compil_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

During analysis, the tree gets transformed into a tree of descriptors which have a reference to their original AST element.
These descriptors can be used during code generation to render the code, or to build IDE tooling.

---

<video data-autoplay>
   <source src="css/videos/compil_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

During resolution the code is type checked, including additional data flow management such as smart casts,
kotlin contracts, generic constraints, ...

If the compiler reaches this point then the code will move to code generation.

---

<video data-autoplay>
   <source src="css/videos/compil_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

Where we'll get the bytecode to be run in any of the available platforms.

---

<video data-autoplay>
   <source src="css/videos/compil_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

And everything is done! And now let's see how we can add more features to the Kotlin compiler through metaprogramming with Arrow Meta.

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

Yeah! What are we doing with Arrow Meta? 

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

(TODO)

The code will be parsed into the AST with the power of Arrow Meta so we can apply transformations during that following phase.

AST is modelled as the PSI model whichs IDEA uses, due to this the compiler can use the same APIs as IDEA.

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

(TODO)

Resolution (Tree of descriptors which have pointers back to the original AST/PSI structure)

I.e. IntelliJ and Codegen can use this to render code or tooling

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

(TODO)

Data flow management (smart cast, contracts etc)

Typechecking (isSubtypeOf, isEqualTypes) => where constraints are consumed by the typechecker and that information dissapears from KtElement -> Descriptors

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

(TODO)

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


Note:

[Amanda]

(TODO)

IR: incomplete at this point

ASM or native platform back-ends

---

![Arrow Meta for Kotlin compiler](css/images/compiler-plus-arrow-meta.jpg)

Note:

[Raquel]

So Arrow Meta was born. Let's see some features in detail

Arrow Meta provides some plugins by default though other plugins can be added. For example, you can create a plugin to make transformations.

---

<video>
   <source src="css/videos/hello-world.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

(explain the animation)

---

# Quotes

Note:

[Amanda]

---

## Quote templates

```kotlin
val Meta.comprehensions: Plugin
  get() =
    "comprehensions" { 
      ...
    }
```

Note:

[Amanda]

A plugin exists out of a named transformation, in this case "comprehensions".
The returned transformation is a lambda with the CompilerContext as receiver.
This enables a powerful compiler DSL, and the lambda returns a list of `ExtensionPhase`.

---

## Quote templates

```kotlin
val Meta.comprehensions: Plugin
  get() =
    "comprehensions" {
      meta(
        quote(KtDotQualifiedExpression::containsFxBlock) { original ->
         ...
        }
      )
    }
```

Note:

[Amanda]

Within a `meta` block we can define multiple extension phases.
`quote` is Arrow Meta's high level DSL which within Arrow Meta's context is also a possible `ExtensionPhase`.

A `quote` offers a high level DSL to transform code, which can be matched by a reified predicate.
Here we're matching on `KtDotQualifiedExpression`, which is a function application site.
And we match in case the function application side contains a fx block.

---

## Quote templates

```kotlin
val Meta.comprehensions: Plugin
  get() =
    "comprehensions" {
      meta(
        quote(KtDotQualifiedExpression::containsFxBlock) { original ->
          Transform.replace(
            replacing = original,
            newDeclaration = toFlatMap(original)
          )
        }
      )
    }
```

Note:

[Amanda]

When matched we can simply return a `Transform`ation, in this case `replace`.
`Transform` can replacing an element with another or multiple elements, remove the element or leave untransformed.  

---

## Template <-> KtElement (Psi)

```kotlin
private fun ElementScope.toFlatMap(
  bind: KtProperty, 
  remaining: List<KtExpression>): Scope<KtExpression> {
  ...
  return """|${source}.flatMap { $argName $typeName -> 
            |  ${toFlatMap(remaining)}  
            |}""".expression
}
```

Note:

[Amanda]

We're not going to dive deeper into the comprehensions plugin code, but to show an example of what the actual code rewrite looks like.
Here we're rewriting our original code to `flatMap` based code, and by transforming that back into an expression the code will be type checked here in place.

---

(example of testing)

Note:

[Amanda]

(Explain the example)

Thanks to Thilo Schuchort for his Kotlin Compile Testing library which has been very useful for us in order to be able to define the testing DSL.

---

# Other plugins

---

### Combining types...

Note:

[Raquel]

Let's see another example of plugin.

One of the elements of functional programming is types and we combine types to create new types.

---

```
Either.Right(47)
Either.Left("Something went wrong")
```

Note:

[Raquel]

Maybe one of the most known is `Either` which represents the choice between 2 types of values. 

One of them is the expected value, the right part.

And the another one, left part, stores information in case there is a failure when trying to get the right value.

It's an example of union types or sum types. There are called sum or union because if you calculate the number of different values of this type is the sum of the different values of the right part and the different values of the left part.

However, with Either, we have 2 limits: it just considers 2 types in right and left and it has a special meaning because the right part is used with a purpose and the left part is used with another one.

What if we want to combine types in this way, a choice, but a choice between more than 2 types?

I mean, union types or sum types in general.

---

```diff
-sealed class Choice {
-
-  data class AnInteger(
-    val value: Int
-  ) : Choice()
-
-  data class AString(
-    val value: String
-  ) : Choice()
-
-  ...
-}
-
-val choice1 = AnInteger(value = 47)
-val choice2 = AString(value = "another value")
+val choice1: Union<Int, String> = 47
+val choice2: Union<Int, String> = "another value"
```

Note:

[Raquel]

How do we represent this kind of choices right now?

With sealed classes we must to write a lot of boilerplate to get it.

---

```
val a: Union<String, Int> = 1
val b: Union<String, Int> = "ok"
```

Note:

[Raquel]

So we provide a plugin in Arrow Meta to be able to define choices in this way.

**a** and **b** can have a value of 2 possible types, String or Integer.

---

build.gradle

```
plugins { id "io.arrow-kt.arrow" version "<version>" }
```

Note:

[Raquel]

You can use all these features including the Gradle Plugin. 

And what about Intellij IDEA? 

---

(old version)

Note:

[Raquel]

(TODO)

---


# Bring your features to the editor!

Note:

[Amanda]

The plugins that we've seen cannot only be used in CLI but also Arrow Meta brings the best user experience into your editor.

---

<video>
   <source src="css/videos/comprehensions-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

We can see how we get icons in the left side and even explanations for the developer so we improve the development experience

---

(TODO: loop on different comprehensions)

---

<video>
   <source src="css/videos/purity-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

And we can alert to the developer about an impure function and add explanations in the IDE to help to understand why is this important and how you can refactor your codebase to be more pure and functional.

Besides, bring you security on functional programming.

---

# Disclaimer

Note:

[Raquel]

And we have an important message

---

**Arrow** is the functional companion to **Kotlin standard library**

**Arrow Meta** is the functional companion to **Kotlin compiler**

Note:

[Raquel]

Arrow is the functional companion to Kotlin standard library and follows the same principle

Arrow Meta is the functional companion to Kotlin compiler and also follows the same principle

And any feature from Arrow, Arrow Meta or the plugins which is adopted by the language will be removed, including Meta itself.

Arrow Meta is a way to complement the Kotlin compiler.

(TODO)

---

# And finally ...

Note:

[Amanda] And finally ...

---

### Thanks Kotlin community!

Channels at KotlinLang Slack:

* #arrow-meta
* #compiler
* #lang-proposals

Note:

[Amanda]

... thanks to Kotlin community that helped us. The main channels were arrow-meta, compiler and lang-proposals. We are actively working on arrow-meta channel.

We usually have live sessions with people interested in learning more about both Arrow Meta and the Kotlin compiler. We are eager...

---

### Thanks!

![47 Degrees](css/images/47deg-logo.png) 

Note:

[Raquel]

Thanks to 47 Degrees for sponsoring and pushing the development of Arrow and Arrow Meta

---

### Thanks to everyone that makes Kotlin possible!

Jetbrains (logo) + IntellijIDEA (logo) + Kotlin (logo) 

![Kotlin Logo](css/images/kotlin.png)

Note:

[Amanda]

Thanks to everyone that makes Kotlin possible, Jetbrains for ..., Intellij IDEA for ... and Kotlin.

---

### Thanks to the people bootstraping Arrow Meta and Arrow!

<video data-autoplay data-loop>
   <source src="css/videos/photos-loop.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

Thanks to all the people who are bootstraping Meta and makes Λrrow possible! More than 150 contributors and they are increasing every week. Not only we are here but also more people who started the project as Raúl Raja and Simon Vergauwen so you can make questions to them as well and special thanks to Jorge Castillo who couldn't be here today.

Everybody is welcome, join us!

... and last but not least...

---

### Thanks to you

Please, remember to vote!

Keep insisting!

\#KotlinConf

Amanda Hinchman [@hinchman_amanda](https://twitter.com/hinchman_amanda)

Raquel M. Carmena [@bberrycarmen](https://twitter.com/bberrycarmen)

(Arrow logo) + (Arrow Meta logo)

https://meta.arrow-kt.io

Note:

[Amanda] 

... thanks to you for comming!

[Raquel]

Please, remember to vote!

[Both]

Thank you!
