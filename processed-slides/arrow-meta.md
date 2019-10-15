## Who are we?

- [@vergauwen_simon](https://twitter.com/vergauwen_simon), Senior Software Engineer [@47deg](https://twitter.com/47deg)
- [@raulraja](https://twitter.com/raulraja), Co-Founder and CTO [@47deg](https://twitter.com/47deg)

---

### The Kotlin Compiler

---

<video controls>
   <source src="../css/videos/compil_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---


<video controls>
   <source src="../css/videos/compil_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---


<video controls>
   <source src="../css/videos/compil_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---


<video controls>
   <source src="../css/videos/compil_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/compil_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/compil_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

### Arrow meta  

---

<video controls>
   <source src="../css/videos/arrow-meta_1.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/arrow-meta_2.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/arrow-meta_3.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/arrow-meta_4.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/arrow-meta_5.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

<video controls>
   <source src="../css/videos/arrow-meta_6.mp4" type="video/mp4"> Your browser does not support the video tag.
</video>

---

### Config

| Usage  | CLI  | IDE  |
|---|---|---|
| updateConfig | ✓ | ✓ |
| storageComponent | ✓ | ✓ |
| enableIr | ✓ | x |

---

### Analysis

| Usage  | CLI  | IDE  |
|---|---|---|
| additionalSources | ✓ | ✓ |
| analysis | ✓ | ✓ |
| suppressDiagnostic | ✓ | ✓ |

---

### Resolve

| Usage  | CLI  | IDE  |
|---|---|---|
| declarationAttributeAlterer | ✓ | ✓ |
| packageFragmentProvider | ✓ | ✓ |
| syntheticResolver | ✓ | ✓ |
| syntheticScopes | x | ✓ |

---

### Codegen - IR

| Usage  | CLI  | IDE  |
|---|---|---|
| IrGeneration | ✓ | x |
| irClass | ✓ | x |
| irFunction | ✓ | x |
| irBody  | ✓ | x |

---

### Codegen - IR

```kotlin
FUN name:flatMap visibility:public modality:FINAL <B> ($this:<root>.IO<A of <root>.IO>, f:kotlin.Function1<A of <root>.IO, <root>.IO<B of <root>.IO.flatMap>>) returnType:<root>.IO<B of <root>.IO.flatMap> 
  TYPE_PARAMETER name:B index:0 variance: superTypes:[kotlin.Any?]
  $this: VALUE_PARAMETER name:<this> type:<root>.IO<A of <root>.IO> 
  VALUE_PARAMETER name:f index:0 type:kotlin.Function1<A of <root>.IO, <root>.IO<B of <root>.IO.flatMap>> 
  BLOCK_BODY
    RETURN type=kotlin.Nothing from='public final fun flatMap <B> (f: kotlin.Function1<A of <root>.IO, <root>.IO<B of <root>.IO.flatMap>>): <root>.IO<B of <root>.IO.flatMap> declared in <root>.IO'
      CALL 'public abstract fun invoke (p1: P1 of kotlin.Function1): R of kotlin.Function1 declared in kotlin.Function1' type=<root>.IO<B of <root>.IO.flatMap> origin=INVOKE
        $this: GET_VAR 'f: kotlin.Function1<A of <root>.IO, <root>.IO<B of <root>.IO.flatMap>> declared in <root>.IO.flatMap' type=kotlin.Function1<A of <root>.IO, <root>.IO<B of <root>.IO.flatMap>> origin=VARIABLE_AS_FUNCTION
        p1: CALL 'public final fun <get-value> (): A of <root>.IO declared in <root>.IO' type=A of <root>.IO origin=GET_PROPERTY
          $this: GET_VAR '<this>: <root>.IO<A of <root>.IO> declared in <root>.IO.flatMap' type=<root>.IO<A of <root>.IO> origin=null
```

---

### Many libraries are already based on compiler plugins

<!-- .slide: class="long-list" -->

- Jetpack Compose
- SQL Delight
- Kotlinx Serialization
- Kotlin Android Extensions
- Parcelize
- AllOpen
- Kotlin Spring integration
- Kotlin JPA Support
- Sam with Receivers
- No-arg

---

Issues with traditional compiler plugins:

- Error prone: same logic needs to be repeated N times with different models
- No code reuse between CI and IDE
- Lower level API than Meta's low level apis
- No documentation (for compiler or plugins)
- No generalized testing strategy

---

Arrow Meta solves all that!

---

### High Level DSL. Quote templates

```kotlin
val Meta.comprehensions: Plugin
  get() =
    "comprehensions" { // Plugin name
      meta( // List of compiler phases to intercept
        quote(KtDotQualifiedExpression::containsFxBlock) { fxExpression: KtDotQualifiedExpression ->
          Transform.replace(
            replacing = fxExpression,
            newDeclaration = toFlatMap(fxExpression)
          )
        }
      )
    }
```

---

### Template <-> KtElement (Psi)

```kotlin
private fun ElementScope.toFlatMap(
  bind: KtProperty, 
  remaining: List<KtExpression>): Scope<KtExpression> {
  val target = bind.delegateExpression
  val targetSource = when {
    target.containsNestedFxBlock() -> delegationToFlatMap(target)
    else -> target.text
  }
  val argName = bind.name
  val typeName = bind.typeReference?.let { ": ${it.text}" } ?: ""
  return """|${targetSource}.flatMap { $argName $typeName -> 
            |  ${toFlatMap(remaining)}  
            |}""".expression
}
```

---

### IDEA plugins that teach Functional Programming as you code

```kotlin
val IdeMetaPlugin.comprehensionsIdePlugin: Plugin
  get() = "ComprehensionsIdePlugin" {
    meta(
      addLineMarkerProvider(
        icon = ArrowIcons.BIND,
        message = "Use this to teach your users about this feature",
        matchOn = { (it as? KtExpression)?.isBinding() == true }
      )
    )
  }
```

---


### Meta provides completion and assistance for IDEA automatically

Screenshot @Imran w/ better message

---

### Help us build the future of Kotlin's tooling

 - Automated refactoring tools (scalafix)
 - Documentation tooling - runnable docs in the IDE
 - Type Search engine (Hoogle)
 - KEEP proposal prototyping
   - Comprehensions, HKTs, Union types, intersection types, type refinement, typeclasses, poly functions, macros, ...
 - Compile time DI libraries
 - Codebase linting
 

---

Some plugins coming out in November in the Meta Alpha release

---

### The future of Arrow

---

#### Higher Kinded Types - Quote
 
```diff
+ @higherkind
+ class Option<A> : OptionOf<A>
- class ForOption private constructor() { companion object }
- typealias OptionOf<A> = arrow.Kind<ForOption, A>
- inline fun <A> OptionOf<A>.fix(): Option<A> =
-   this as Option<A>
```

---

### Higher Kinded Types - low level DSL

```diff
val x: OptionOf<Int> = 1.some()
- val y: Option<Int> = x.fix()
+ val y: Option<Int> = x
```
<!-- .element: class="arrow" data-executable="false" -->

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
+ service1().flatMap { result1 ->
+   service2(result1).flatMap { result2 ->
+     service3(result2).map { result3 ->
+        Result(result3)
+     }
+   }
+ }
- val result1 by service1()
- val result2 by service2(result1)
- val result3 by service3(result2)
- Result(result3)
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

val ids = listOf(1, 2, 3, 4).k()
fun getUser(id: Int): IO<GithubUser> = IO { GithubUser(id) }

-val result = ids.traverse(IO.applicative(), ::getUser).fix()
+val result = ids.traverse(::getUser)
```

---

### Purity

SS or Video

---

<!-- .slide: class="long-list" -->

## Thanks!
 A special thanks to the people bootstraping Meta

- Simon
- Amanda
- Rachel
- Imran
- Isra
- Jetro
- Raul
- Joachim

---

## Thanks!
 Kotlin Compiler Folks and Community that helped us [slack.kotlinlang.org](https://slack.kotlinlang.org) #arrow-meta #compiler #lang-proposals 

---

## Thanks!

![47 Degrees](css/images/47deg-logo.png) 

### 47 Degrees for sponsoring and pushing the development of Meta and Arrow 

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 0](css/images/contributors_cropped_0.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 1](css/images/contributors_cropped_1.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 2](css/images/contributors_cropped_2.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 3](css/images/contributors_cropped_3.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 4](css/images/contributors_cropped_4.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 5](css/images/contributors_cropped_5.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 6](css/images/contributors_cropped_6.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors 7](css/images/contributors_cropped_7.png)

---

### Thanks to everyone that makes Λrrow and Kotlin possible!

![Contributors](css/images/contributors.png)

