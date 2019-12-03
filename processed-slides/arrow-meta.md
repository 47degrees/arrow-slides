

![](css/images/functional-companions.jpg)

Note:

[Raquel]

And it seems a library is the common way to add more functional capabilities to a programming language

like Cats library for Scala, Bow libray for Swift or VAVR library for Java.

However, we wanted to do something else.

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

2. and it holds proposals for Kotlin also known as KEEPs.

3. The new KEEPs are submitted as pull requests

4. and also some KEEPs have their own repository for specification and discussions.

So here we go!

---

### KEEP-87

![KEEP-87](css/images/keep-87.svg)

367 messages

85 commits

57 participants

18 reviewers

Note:

[Raquel]

We created this pull request where we explained how to create compile-time extension interfaces.

We wanted to create type classes features in Arrow and we realized that the entire community was heavily dependent to the compiler plugins like serialization, allOpen and Android extensions, all of them companions for the Kotlin compiler. 

However, there wasn't enough documentation about the Kotlin compiler and we wanted to fill that gap for the community.

And, at the same time, to make functional programming more ergonomic that is today.


---

### How the Kotlin Compiler works (animacion compilador)

Note:

[Raquel]

Are you ready to know more about it? 

Before explaining the new companion of the Kotlin compiler, we are going to know how Kotlin Compiler works.

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

With different APIs, toolings, and plugins available with the language the Kotlin Compiler is always in evolution, and is far more than just a compiler.  

We see Arrow-meta as one means for Kotlin-ers to explore creative innovations for the language.

and we do that by remove surface complexity by giving easy access at every phase.

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

**AST**

Arrow-meta intercepts AST the phase and it's resulting models. 

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

**Quote Templates**

The quote and template system is the ability for any tree transformation possible, and not limited to just code transformation, but also static analysis, code generation, any other purpose you can think of.

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

**Synthetic Resolution**

IDEA requires that compiler plugin authors write a special kind of model called **synthetic descriptors**

**Synthetic Descriptors** is a way for IDEA plugins and compiler plugins to communicate with each other - 
the compiler plugin will send a representation of the **code the user did not write** to help IDEA provide tooling likeautocompletion, warning messages, and so on.  

And so, when writing compiler plugins for IDEA, the creator is normally responsible for managing synthetic resolution.

However, Arrow-meta automatically manages synthetic resolution for you so you don't have to.

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

**Code Generation**

There is access to interception at every phase in the compiler, including code generation.

When we're talking about code generation, we're referencing ASM/IR 

ASM - a library that generates bytecode for the JVM

IR - For UI folks, you can think of IR like a ViewModel for code gen. Intermediate representation is a textual tree that can is used to generate bytecode for all available backends available to Kotlin.

The Kotlin compiler uses one or the other.   

Arrow-meta provides a user-friendly DSL giving you the option to use either! 

---

<video data-autoplay>
   <source src="css/videos/arrow-meta_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


Note:

[Amanda]

And that completes the compilation process and Arrow's ability to work with all these phases.

---

![Arrow Meta for Kotlin compiler](css/images/compiler-plus-arrow-meta.jpg)

Note:

[Raquel]

So Arrow Meta was born. Let's see some features in detail

Arrow Meta provides some plugins by default though other plugins can be added. 

For example, you can create a plugin to make transformations.

How does it feel like to write a compiler plugin?

First, let's examine a small example!

---

<video>
   <source src="css/videos/hello-world.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

(explain the animation) TIME ANIMATION BITS HERE

**[Jetro]** please split the animations up into 4 separate slides!

---

## Arrow-meta is a container for plugins

![Animation for the plugin](css/images/how-can-I-write-my-own-arrow-meta-plugin.png)

Note:

[Amanda]

But Arrow-meta is more than a way to create simple plugins - it's also a container for bundling multiple plugins together!

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

We can wrap our AST elements with these transformable scopes which may go back-and-forth between the models of meta and PSI.

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

Within meta, you have the option subscribe to multiple extension phases in the Kotlin compiler, such as the quote system which is one of Arrow-meta's DSLs. 

In this case, we're using a Transformation to replace the intercepted dotqualifiedexpression with a rewritten declaration.

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

One of the most important feature sof the tempalte DSL

The template DSL offers a bidirectional to go from PSI-to-template trees and back without preserving type information.

This way, we are not forced to work with strings across code generation.

Arrow-meta provides a template DSL which allows you to go back and forth between the quote templates and the tree.

For example, the template DSL gives you direct access to those properties without having to parse out the information yourself.

---

(example of testing: Raul code )

```kotlin
  @Test
  fun `simple case`() {
    val codeSnippet =
      """
      $IO_CLASS_4_TESTS
      |
      | fun test(): IO<Int> =
      |   IO.fx {
      |     val a: Int by IO(1)
      |     val b: Int by IO(2)
      |     a + b
      |   }
      |   
      """
    assertThis(CompilerTest(
      config = { metaDependencies },
      code = { codeSnippet.source },
      assert = {
        allOf(
          compiles,                                  // <-- checks for compilation status
          quoteOutputMatches(                        // <-- validates analysis 
            """
            $IO_CLASS_4_TESTS
            |
            | fun test(): IO<Int> =
            |   IO(1).flatMap { a : Int ->
            |     IO(2).flatMap { b : Int ->
            |       IO.just(a + b)
            |     }
            |   }
            |   
            """.source
          ),
          "test().value".source.evalsTo(3)           // <-- validates the result of the compilation 
        )
      }
    ))
  }
```

Note:

[Amanda]

Thanks to Thilo Schuchort for his Kotlin Compile Testing library which has been very useful for us in order to be able to define the testing DSL.

---

# Other plugins

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

## Ilustration + animation

```
val choice1: Union3<Int, String, AType> = 47
val choice2: Union4<Int, String, AType, AnotherType> = 47
...
```

Note:

[Raquel]

And it's also possible to have more than 2 choices.

---

build.gradle

```
plugins { id "io.arrow-kt.arrow" version "<release-version>" }
```

Note:

[Raquel]

You can use all these features including the Gradle Plugin.

And what about Intellij IDEA? 

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

### KEEP insisting! (ilustration keep + arrow meta)

Note:

[Amanda]

And this is where our story comes full circle! Arrow-meta is more than just writing plugins for anything Kotlin.

We're so grateful for the Kotlin community - from feedback to discussions to contributions - so grateful we're giving back.

Do you also have a KEEP? You can use Arrow-meta to prototype ideas for language features you have for Kotlin. You can use Arrow-meta to improve your own projects or the projects of others!

Arrow-meta is here for the empowerment of Kotlin developers, and we at 47 Degrees are here and eager to help you.

---

### Thanks to the Kotlin community!

Channels at KotlinLang Slack:

* #arrow-meta
* #compiler
* #lang-proposals

Note:

[Amanda]

... thanks to Kotlin community that helped us. The main channels were arrow-meta, compiler and lang-proposals. We are actively working on arrow-meta channel.

We usually have live sessions with people interested in learning more about both Arrow Meta and the Kotlin compiler.

We are literally on standby on the #arrow-meta channel, and we will be working hard to help you create your first plugin with Arrow-meta.

---

### Thanks!

![47 Degrees](css/images/47deg-logo.png) 

Note:

[Raquel]

Thanks to 47 Degrees for sponsoring and pushing the development of Arrow and Arrow Meta.

47 Degrees happens to be hanging a booth here at KotlinConf, so please be sure to stop by to say hello - we'll be happy to answer any questions about Arrow, Meta, or 47.

---

### Thanks to everyone that makes Kotlin possible!

![Logos](css/images/jetbrains-intellijidea-kotlin.png)

Note:

[Amanda]

Thanks to everyone that makes Kotlin possible, Jetbrains for ..., Intellij IDEA for ... and Kotlin.

---

### Thanks to the people bootstraping Arrow Meta and Arrow! (add comunnity video)

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
