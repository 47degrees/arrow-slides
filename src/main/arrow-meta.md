# Thanks for coming!

Note:
Welcome and thanks for attending our talk. We hope you enjoy when listening the history of a project, how things changed and what we did to try ...

---

# Who are we?

SENIOR SOFTWARE ENGINEERS at [@47deg](https://twitter.com/47deg)

Amanda Hinchman [@hinchman_amanda](https://twitter.com/hinchman_amanda)

Raquel M. Carmena [@bberrycarmen](https://twitter.com/bberrycarmen)

Note:
We are engineers at 47 Degrees. Amanda: ... Raquel: ... We are also maintainers of Arrow library, a functional companion to Kotlin.

---

# Introduction

---

```A long time ago in a galaxy far, far away...```

Note:
In order to explain what we are doing right now in the project about the functional companion to Kotlin, we are going to contextualize the situation with its history, very briefly.

---

![Arrow history](css/images/history.jpg)

Note:
Everything started when trying to add more functional capabilities to the language...

---

### The usual companion

![Other examples of libraries](css/images/functional-companions.jpg)

Note:
It seems that a library is the usual companion to a programming language like other examples as Cats library in Scala, Bow library in Swift or VAVR in Java.

---

![Limit](css/images/limit.jpg)

Note:
However, a library has some limits.

---

### What things couldn't be done with the library?

* No checks at compile runtime
* Base language remains the same
* ...

Note:
(read the list)

---

![Next step?](css/images/history-next-step.jpg)

Note:
What could be the next step?

---

![Target](css/images/target.jpg)

Note:
What if we change the target? What if we shoot the arrow to another direction?

---

![Compilation](css/images/compiler.jpg)

Note:
Let's think. We compile Kotlin source code. BTW! The Kotlin compiler doesn't transpile Java code as some people think. It's a compiler!

---

![Add Arrow library](css/images/compiler-plus-arrow.jpg)

Note:
And a new library was added, so the focus is the source code.

---

![Focus on Kotlin compiler](css/images/compiler-plus-another-idea.jpg)

Note:
What if we focus on the Kotlin compiler?

---

![Contact Kotlin team](css/images/contact-kotlin.jpg)

Note:
It was the time to contact Kotlin team.

---

### Kotlin Evolution

#### Principles of Pragmatic Evolution

* Keep the language modern over the years.
* Stay in the constant feedback loop with the users.
* Make updating to new versions comfortable for the users.

Source: https://kotlinlang.org/docs/reference/evolution/kotlin-evolution.html

Note:
How? Let's see the principles of Kotlin evolution. 

---

### Kotlin Evolution

#### Principles of Pragmatic Evolution

* Keep the language modern over the years.
* **Stay in the constant feedback loop with the users.**
* Make updating to new versions comfortable for the users.

Source: https://kotlinlang.org/docs/reference/evolution/kotlin-evolution.html

Note:
For the second one, "Stay in the constant feedback loop with the users", Kotlin provides several sources of contact.

---

### Sources of contact

* KolinLang Slack
* Kotlin Forum: https://discuss.kotlinlang.org
* Issue tracker: https://youtrack.jetbrains.com/issues/KT

Note: 
(mention the sources) and another one.

---

### KEEP 

**K**otlin **E**volution and **E**nhancement **P**rocess

* Hosted in GitHub: https://github.com/Kotlin/KEEP
* It holds proposals for the Kotlin Programming Language.

Note:
(read the list)

---

### KEEP

* The proposals are colloquially known as KEEPs.
* New KEEPs are submitted as pull requests.
* Some KEEPs have their own repository (for specification and discussions).

Note: 
(read the list). So here we go!

---

### KEEP-87

* [https://github.com/Kotlin/KEEP/pull/87](https://github.com/Kotlin/KEEP/pull/87)

![KEEP-87](css/images/keep-87.png)

Note:
We created this pull request...

---

### Feedback

- 354 messages
- 85 commits
- 56 participants

![KEEP-87 reactions](css/images/keep-87-reactions.png)

Note:
And it's very important to receive initial feedback. These are the numbers for KEEP-87. (read the numbers)

---

And we started working with all the received feedback!

---

### Are you ready?

Let's see some things in detail...

---

### The Kotlin Compiler

---


<video data-autoplay>
   <source src="../css/videos/compil_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
Before the compiler can do anything we first have to write some code. 

---

<video data-autoplay>
   <source src="../css/videos/compil_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
Before the compiler can do anything, it first reads the source code and parses it into an AST or Abstract Syntax Tree.
Kotlin's AST models the structure of Kotlin source code,
it's modeled on top of Jetbrain's Programming Structure Interface hierarchy which is the model Jetbrains uses internally in their tooling.
The kotlin compiler 


Kotlin's AST is modeled as a tree with `KtElement` at its root.
The Kotlin AST is compatible with Jetbrain's Programming Structure Interface,
which is the internal model IntelliJ and the Kotlin compiler  
is convenient for IDE development. 

---

<video data-autoplay>
   <source src="../css/videos/compil_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
During analysis the tree gets transformed into a tree of descriptors which have a reference to their original AST element.
These descriptors can be used during codegen to render the code, or to build IDE tooling.

---

<video data-autoplay>
   <source src="../css/videos/compil_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
During resolution your program is type checked, including additional data flow management such as smart casts,
kotlin contracts, generic constraints, etc.
If the compiler reaches this point than your program will successfully finish after code gen.

---

<video data-autoplay>
   <source src="../css/videos/compil_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
And finally the code can be rendered for the desired platforms.

---

<video data-autoplay>
   <source src="../css/videos/compil_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
And our program compiled correctly.

---

### Arrow meta  

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
AST is modelled as the PSI model whichs IDEA uses, due to this the compiler can use the same APIs as IDEA.
In the compiler the PSI library is shadowed to achieve the code re-use.

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
 - Resolution (Tree of descriptors which have pointers back to the original AST/PSI structure)
    - I.e. IntelliJ and Codegen can use this to render code or tooling

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
 - Data flow management (smart cast, contracts etc)
 - Typechecking (isSubtypeOf, isEqualTypes)
   => where constraints are consumed by the typechecker and that information dissapears from KtElement -> Descriptors

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:
- IR: incomplete at this point
- ASM or native platform back-ends

---

![Arrow Meta for Kotlin compiler](css/images/compiler-plus-arrow-meta.jpg)

Note:
And Arrow Meta was born. Let's see some characteristics in detail

---

### Quote templates

```kotlin
val Meta.comprehensions: Plugin
  get() =
    "comprehensions" { 
      ...
    }
```

Note:
A plugin exists out of a named transformation, in this case "comprehensions".
The returned transformation is a lambda with the CompilerContext as receiver.
This enables a powerful compiler DSL, and the lambda returns a list of `ExtensionPhase`.

---

### Quote templates

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
Within a `meta` block we can define multiple extension phases.
`quote` is Arrow Meta's high level DSL which within Arrow Meta's context is also a possible `ExtensionPhase`.

A `quote` offers a high level DSL to transform code, which can be matched by a reified predicate.
Here we're matching on `KtDotQualifiedExpression`, which is a function application site.
And we match in case the function application side contains a fx block.

---

### Quote templates

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
When matched we can simply return a `Transform`ation, in this case `replace`.
`Transform` can replacing an element with another or multiple elements, remove the element or leave untransformed.  

---

### Template <-> KtElement (Psi)

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
We're not going to dive deeper into the comprehensions plugin code, but to show an example of what the actual code rewrite looks like.
Here we're rewriting our original code to `flatMap` based code, and by transforming that back into an expression the code will be type checked here in place.

---

# Plugins

---

#### Higher Kinded Types
 
```diff
- class ForOption private constructor() { companion object }
- typealias OptionOf<A> = arrow.Kind<ForOption, A>
- inline fun <A> OptionOf<A>.fix(): Option<A> =
-   this as Option<A>
- @higherkind class Option<A> : OptionOf<A>
+ @higherkind class Option<A>
```

---

### Higher Kinded Types

```diff
  fun <F> getUser(FF: Functor<F> = with): Kind<F, User> = TODO()
- val y: Option<User> = getUser<ForOption>().fix()
+ val y: Option<User> = getUser()
```

---

### Optics

```diff
-gist.copy(
-  owner = gist.owner.copy(
-    login = gist.owner.login.toUpperCase()
-  )
-)
+Gist.owner.login.modify(gist, String::toUpperCase)
```

---

### Comprehensions

```diff
-service1().flatMap { result1 ->
-  service2(result1).flatMap { result2 ->
-    service3(result2).map { result3 ->
-       Result(result3)
-    }
-  }
-}
+val result1 by service1()
+val result2 by service2(result1)
+val result3 by service3(result2)
+Result(result3)
```

---

#### Type classes

```diff
-fun <A, G, B> OptionOf<A>.traverse(GA: Applicative<G>, f: (A) -> Kind<G, B>): Kind<G, Option<B>> =
-  GA.run {
-    fix().fold({ just(None) }, { f(it).map { Some(it) } })
-  }
+fun <A, G, B> Option<A>.traverse(GA: Applicative<G> = with, f: (A) -> Kind<G, B>): Kind<G, Option<B>> =
+  fold({ just(None) }, { f(it).map { Some(it) } })
```

---

### Type classes

```diff
data class GithubUser(val id: Int)

val ids = listOf(1, 2, 3, 4)
fun getUser(id: Int): IO<GithubUser> = IO { GithubUser(id) }

-val result = ids.traverse(IO.applicative(), ::getUser).fix()
+val result = ids.traverse(::getUser)
```

---

# Bring your features to the editor

---

<video>
   <source src="../css/videos/comprehensions-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video>
   <source src="../css/videos/purity-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

### Disclaimer

Arrow is the functional companion to Kotlin's std lib and follows the same principle.

Meta is the functional companion to Kotlin's compiler and also follows the same principle.

Note:
Any feature from Arrow Meta, Arrow or the plugins which is adopted by the language will be removed from Meta including Meta itself.
(Meta is filling a void we feel the community needs but if some of these features become popular in the Lang we want to make history and leave our legacy in the language not compete with jetbrains.
This should ease people concerns about us altering the meaning of Kotlin.
And it sets the tone in which the intention and relationships should occur once the community finds out what we are up to and how it can change some of the landscape so much)

---

## Thanks!

Kotlin Compiler team and Community that helped us

* Channels at [slack.kotlinlang.org](https://slack.kotlinlang.org):
    * #arrow-meta
    * #compiler
    * #lang-proposals

---

## Thanks!

![47 Degrees](css/images/47deg-logo.png) 

### 47 Degrees for sponsoring and pushing the development of Meta and Arrow 

---

## Thanks!

A special thanks to the people bootstraping Meta

![Meta contributors](css/images/meta-contributors.png)

Note:
Special thanks to Jorge Castillo who was going to be here today

---

#### Everybody is welcome! Join us!

And help us build...

 - Intersection types
 - type refinement
 - poly functions
 - Macros
 - ...

---

### Thanks to everyone that makes Λrrow possible!

<video data-autoplay data-loop>
   <source src="../css/videos/photos-loop.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

### Thanks to everyone that makes Kotlin possible!

![Kotlin Logo](css/images/kotlin.png)

Note:
Last but not least, thanks to everyone that makes Kotlin possible, thank you!
