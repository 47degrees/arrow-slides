## Who are we?

- [@raulraja](https://twitter.com/raulraja), Co-Founder and CTO [@47deg](https://twitter.com/47deg)
- [@vergauwen_simon](https://twitter.com/vergauwen_simon), Senior Software Engineer [@47deg](https://twitter.com/47deg)

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

### Config

| Usage  | ![Cli](css/images/cli-icon.svg) | ![Ide](css/images/ide-icon.svg)  |
|---|---|---|
| updateConfig | ✓ | ✓ |
| storageComponent | ✓ | ✓ |
| enableIr | ✓ | x |

---

### Low level DSL

| Usage  | ![Cli](css/images/cli-icon.svg) | ![Ide](css/images/ide-icon.svg)  |
|---|---|---|
| analysis | ✓ | ✓ |
| suppressDiagnostic | ✓ | ✓ |
| syntheticResolver | ✓ | ✓ |
| syntheticScopes | x | ✓ |
| irClass | ✓ | x |
| irFunction | ✓ | x |

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

### Bring your features to the editor

```kotlin
val IdeMetaPlugin.comprehensionsIdePlugin: Plugin
  get() = "ComprehensionsIdePlugin" {
    meta(
      addLineMarkerProvider(
        icon = ArrowIcons.BIND,
        message = "Teach your users about this feature",
        matchOn = { (it as? KtExpression)?.isBinding() == true }
      )
    )
  }
```

---

<video>
   <source src="../css/videos/comprehensions-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

### The future of Arrow

Some plugins coming out in November in the Meta Alpha release

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

<video>
   <source src="../css/videos/purity-ide.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

#### Join us & help us build...

 - Union types
 - Intersection types
 - type refinement
 - poly functions
 - Macros
 - ...

---

### Use cases

 - Automated refactoring tools [Scalafix](https://github.com/scalacenter/scalafix)
 - Documentation tooling - runnable docs in the IDE
 - Type Search engine [Hoogle](https://hoogle.haskell.org/)
 - KEEP proposal prototyping
 - Compile time DI libraries
 - ...

---

## Thanks!
 Kotlin Compiler team and Community that helped us [slack.kotlinlang.org](https://slack.kotlinlang.org) #arrow-meta #compiler #lang-proposals 

---

## Thanks!

![47 Degrees](css/images/47deg-logo.png) 

### 47 Degrees for sponsoring and pushing the development of Meta and Arrow 

---

## Thanks!

A special thanks to the people bootstraping Meta

![Meta contributors](css/images/meta-contributors.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

<video data-autoplay data-loop>
   <source src="../css/videos/photos-loop.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors](css/images/contributors.png)

