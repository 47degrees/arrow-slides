<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# Who are we?

Note:

[Raquel] 

Ok, so let's start! Thanks for comming!

---

Amanda Hinchman [@hinchman_amanda](https://twitter.com/hinchman_amanda)

Raquel M. Carmena [@bberrycarmen](https://twitter.com/bberrycarmen)

![47 Degrees](css/images/47deg-logo.png)

Note:

[Raquel] 

She is Amanda from Chicago where she's the organizer of Kotlin User Group

[Amanda] 

and she is Raquel from Spain and we are engineers at 47 Degrees.

---

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

## ```A long time ago in a galaxy far, far away...```

Note:

[Amanda]

In order to explain what we are doing right now, we are going to contextualize the situation very briefly.

---

![Arrow history](css/images/history-next-step.jpg)

Note:

[Raquel]

Everything started when trying to add more functional capabilities to the language among a group of people in a Spanish Slack. Kategory library was born and then Arrow when joining efforts with another library, Funktionale. 

[Amanda]

Who of you are using Arrow? 

Great! What's the next step? What things couldn't be done with the library?

---

### What things couldn't be done with the library?

* No checks at compile runtime
* Base language remains the same
* ...

Note:

[Amanda]

(read the list) So what if we change the target?

---

![Compilation](css/images/compiler.jpg)

Note:

[Raquel]

Yes, let's think. We compile Kotlin source code. BTW! The Kotlin compiler doesn't transpile Java code as some people think. It's a compiler!

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

![Contact Kotlin team](css/images/contact-kotlin.jpg)

Note:

[Amanda]

So it was the time to contact Kotlin team.

---

### Kotlin: Sources of contact

* KolinLang Slack
* Kotlin Forum: https://discuss.kotlinlang.org
* Issue tracker: https://youtrack.jetbrains.com/issues/KT

Note: 

[Amanda]

Kotlin provides several sources of contact (mention the sources) and another one.

---

### KEEP: Kotlin Evolution and Enhancement Process

* https://github.com/Kotlin/KEEP
* It holds proposals for Kotlin
* New KEEPs are submitted as pull requests
* Some KEEPs have their own repository

Note:

[Raquel]

(read the list) 

1. Hosted in GitHub

2. also known as KEEPs 

4. for specification and discussions

So here we go!

---

### KEEP-87

![KEEP-87](css/images/keep-87.png)

Note:

[Amanda]

We created this pull request where we explained how to create compile-time extension interfaces.

---

### Feedback

- 354 messages
- 85 commits
- 56 participants

![KEEP-87 reactions](css/images/keep-87-reactions.png)

Note:

[Amanda]

And we received a lot of feedback (read the numbers) And we started working with all the received feedback!

---

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# Are you ready?

Note:

[Raquel]

Are you ready? Let's start...

---

## The Kotlin Compiler

---

<video data-autoplay>
   <source src="../css/videos/compil_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

Firstly, we write some code. 

---

<video data-autoplay>
   <source src="../css/videos/compil_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

The compiler reads that code and models its structure into a tree, an Abstract Syntax Tree, with `KtElement` at its root.

That tree is compatible with Jetbrain's PSI, Programming Structure Interface, used in the IDE.

---

<video data-autoplay>
   <source src="../css/videos/compil_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

During analysis, the tree gets transformed into a tree of descriptors which have a reference to their original AST element.
These descriptors can be used during codegen to render the code, or to build IDE tooling.

---

<video data-autoplay>
   <source src="../css/videos/compil_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

During resolution your program is type checked, including additional data flow management such as smart casts,
kotlin contracts, generic constraints, ...

If the compiler reaches this point than your program will successfully finish after code gen.

---

<video data-autoplay>
   <source src="../css/videos/compil_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

And finally the code can be rendered for the desired platforms.

---

<video data-autoplay>
   <source src="../css/videos/compil_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

And our program compiled correctly.

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

What are we doing with Arrow Meta?

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

AST is modelled as the PSI model whichs IDEA uses, due to this the compiler can use the same APIs as IDEA.
In the compiler the PSI library is shadowed to achieve the code re-use.

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

Resolution (Tree of descriptors which have pointers back to the original AST/PSI structure)

I.e. IntelliJ and Codegen can use this to render code or tooling

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

Data flow management (smart cast, contracts etc)

Typechecking (isSubtypeOf, isEqualTypes) => where constraints are consumed by the typechecker and that information dissapears from KtElement -> Descriptors

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video data-autoplay>
   <source src="../css/videos/arrow-meta_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>


Note:

[Amanda]

IR: incomplete at this point

ASM or native platform back-ends

---

![Arrow Meta for Kotlin compiler](css/images/compiler-plus-arrow-meta.jpg)

Note:

[Raquel]

And Arrow Meta was born. Let's see some characteristics in detail

---

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# Quotes

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

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# Plugins

---

## Higher Kinded Types
 
```diff
- class ForOption private constructor() { companion object }
- typealias OptionOf<A> = arrow.Kind<ForOption, A>
- inline fun <A> OptionOf<A>.fix(): Option<A> =
-   this as Option<A>
- @higherkind class Option<A> : OptionOf<A>
+ @higherkind class Option<A>
```

Note:

[Raquel]

---

## Higher Kinded Types

```diff
  fun <F> getUser(FF: Functor<F> = with): Kind<F, User> = TODO()
- val y: Option<User> = getUser<ForOption>().fix()
+ val y: Option<User> = getUser()
```

Note:

[Raquel]

---

## Optics

```diff
-gist.copy(
-  owner = gist.owner.copy(
-    login = gist.owner.login.toUpperCase()
-  )
-)
+Gist.owner.login.modify(gist, String::toUpperCase)
```

Note:

[Raquel]

---

## Comprehensions

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

Note:

[Raquel]

---

## Type classes

```diff
-fun <A, G, B> OptionOf<A>.traverse(GA: Applicative<G>, f: (A) -> Kind<G, B>): Kind<G, Option<B>> =
-  GA.run {
-    fix().fold({ just(None) }, { f(it).map { Some(it) } })
-  }
+fun <A, G, B> Option<A>.traverse(GA: Applicative<G> = with, f: (A) -> Kind<G, B>): Kind<G, Option<B>> =
+  fold({ just(None) }, { f(it).map { Some(it) } })
```

Note:

[Raquel]

---

## Type classes

```diff
data class GithubUser(val id: Int)

val ids = listOf(1, 2, 3, 4)
fun getUser(id: Int): IO<GithubUser> = IO { GithubUser(id) }

-val result = ids.traverse(IO.applicative(), ::getUser).fix()
+val result = ids.traverse(::getUser)
```

Note:

[Raquel]

---

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# Bring your features to the editor!

---

<video>
   <source src="../css/videos/comprehensions-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

---

<video>
   <source src="../css/videos/purity-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Amanda]

---

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# Disclaimer

---

**Arrow** is the functional companion to **Kotlin standard library**

**Arrow Meta** is the functional companion to **Kotlin compiler**

Note:

[Raquel]

Arrow is the functional companion to Kotlin standard library and follows the same principle

Arrow Meta is the functional companion to Kotlin compiler and also follows the same principle

And any feature from Arrow, Arrow Meta or the plugins which is adopted by the language will be removed, including Meta itself.

---

<!-- .slide: data-background="css/images/background-dark.svg" -->
<!-- .slide: class="background-dark" -->

# And finally ...

Note:

[Amanda] And finally ...

---

## Thanks!

Kotlin Compiler team and Community

Channels at [slack.kotlinlang.org](https://slack.kotlinlang.org)

* #arrow-meta
* #compiler
* #lang-proposals

Note:

[Amanda]

... thanks to Kotlin Compiler team and Community that helped us. The main channels were arrow-meta, compiler and lang-proposals. We are actively working on arrow-meta channel.

---

## Thanks!

![47 Degrees](css/images/47deg-logo.png) 

Note:

[Raquel]

Thanks to 47 Degrees for sponsoring and pushing the development of Arrow and Arrow Meta

---

## Thanks!

A special thanks to the people bootstraping Meta

![Meta contributors](css/images/meta-contributors.png)

Note:

[Amanda]

Thanks to all the people who are bootstraping Meta. Not only we are here but also more people who started the project as Raúl Raja and Simon Vergauwen so you can make questions to them as well and special thanks to Jorge Castillo who couldn't be here today.

---

## Everybody is welcome! Join us!

And help us build...

 - Intersection types
 - type refinement
 - poly functions
 - Macros
 - ...

Note:

[Amanda]

Everybody is welcome, join us and help us build: (read the list) 

---

## Thanks to everyone that makes Λrrow possible!

<video data-autoplay data-loop>
   <source src="../css/videos/photos-loop.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

Note:

[Raquel]

Thanks to everyone that makes Λrrow possible! More than 150 contributors and they are increasing every week.

---

## Thanks to everyone that makes Kotlin possible!

![Kotlin Logo](css/images/kotlin.png)

Note:

[Amanda]

Thanks to everyone that makes Kotlin possible and last but not least...

---

## Thanks to you

Please, remember to vote!

Amanda Hinchman [@hinchman_amanda](https://twitter.com/hinchman_amanda)

Raquel M. Carmena [@bberrycarmen](https://twitter.com/bberrycarmen)

\#KotlinConf

Note:

[Raquel] 

... thanks to you for comming!

[Amanda]

Please, remember to vote!

[Both]

Thank you!
