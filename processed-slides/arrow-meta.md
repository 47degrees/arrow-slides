## Who are we?

- [@vergauwen_simon](https://twitter.com/vergauwen_simon), Senior Software Engineer [@47deg](https://twitter.com/47deg)
- [@raulraja](https://twitter.com/raulraja), Co-Founder and CTO [@47deg](https://twitter.com/47deg)

---

#### Arrow meta

![Arrow-Meta](css/images/47deg-logo.png)

---

#### The Kotlin Compiler


---

#### Parsing

AST is modelled as the PSI model whichs IDEA uses, due to this the compiler can use the same APIs as IDEA.
In the compiler the PSI library is shadowed to achieve the code re-use.

---

#### Analyse 

 - Resolution (Tree of descriptors which have pointers back to the original AST/PSI structure)
    - I.e. IntelliJ and Codegen can use this to render code or tooling
 - Data flow management (smart cast, contracts etc)
 - Typechecking (isSubtypeOf, isEqualTypes)

---

#### Codegen

- IR: incomplete at this point
- ASM or native platform back-ends

---

#### Arrow meta  

- Config
- Analysis
- Resolve
- Codegen
  - Asm
  - IR

---

#### Config

| Usage  | CLI  | IDE  |
|---|---|---|
| updateConfig | ✓ | ✓ |
| storageComponent | ✓ | ✓ |
| enableIr | ✓ | x |

---

#### Analysis

| Usage  | CLI  | IDE  |
|---|---|---|
| additionalSources | ✓ | ✓ |
| analysys | ✓ | ✓ |
| suppressDiagnostic | ✓ | ✓ |

---

#### Resolve

| Usage  | CLI  | IDE  |
|---|---|---|
| declarationAttributeAlterer | ✓ | ✓ |
| packageFragmentProvider | ✓ | ✓ |
| syntheticResolver | ✓ | ✓ |
| syntheticScopes | x | ✓ |

---

#### Codegen - IR

| Usage  | CLI  | IDE  |
|---|---|---|
| IrGeneration | ✓ | ✓ |
| irClass | ✓ | x |
| irFunction | ✓ | x |
| irBody  | ✓ | x |

---

#### High Level DSL. Quote templates

```
@ExperimentalContracts
val Meta.comprehensions: Plugin
  get() =
    "comprehensions" {
      meta(
        quote(KtDotQualifiedExpression::containsFxBlock) { fxExpression: KtDotQualifiedExpression ->
          println("fxBlock: ${fxExpression.text}")
          Transform.replace(
            replacing = fxExpression,
            newDeclaration = toFlatMap(fxExpression)
          )
        }
      )
    }
```


---

```
@ExperimentalContracts
private fun ElementScope.toFlatMap(bind: KtProperty, remaining: List<KtExpression>): Scope<KtExpression> {
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

#### High Level DSL. IDE

Comment PR Imran to use reified KtElement with a default predicate of `it is A`.
This will reduce prediate to `KtExpression::isBinding`.

```
@ExperimentalContracts
val IdeMetaPlugin.comprehensionsIdePlugin: Plugin
  get() = "ComprehensionsIdePlugin" {
    meta(
      addLineMarkerProvider(
        icon = ArrowIcons.BIND,
        message = "Bind",
        matchOn = { it.safeAs<KtExpression>()?.isBinding() == true }
      )
    )
  }
```

---

#### High Level DSL. IDE

Screenshot @Imran w/ better message

---

#### Use cases - General meta use cases

 - Automated refactoring tools
  - Similar to Scalafix, Scalameta, Scala Steward
 - Documentation tooling - runnable docs in the IDE
 - Typesearch engine (Hoogle)
 - Keep proposal prototyping
   - Comprehensions, HKTs, Union types, intersection types, type refinement, typeclasses, poly functions, macros, ...

---

#### The future of Arrow

#### Higher Kinded Types - Quote
 
```kotlin:diff
+ @higherkind
+ class Option<A> : OptionOf<A>
- class ForOption private constructor() { companion object }
- typealias OptionOf<A> = arrow.Kind<ForOption, A>
- inline fun <A> OptionOf<A>.fix(): Option<A> =
-   this as Option<A>
```

#### Higher Kinded Types - low level DSL

```kotlin:diff
val x: OptionOf<Int> = 1.some()
- val y: Option<Int> = x.fix()
+ val y: Option<Int> = x
```

#### Optics

```kotlin:diff
-gist.copy(
-  owner = gist.owner.copy(
-    login = gist.owner.login.toUpperCase()
-  )
-)
+Gist.owner.login.modify(gist, String::toUpperCase)
```

#### Comprehensions

```kotlin:diff
- service1().flatMap { result1 ->
-   service2(result1).flatMap { result2 ->
-     service3(result2).map { result3 ->
-        Result(result3)
-     }
-   }
- }
+ val result1 by service1()
+ val result2 by service2(result1)
+ val result3 by service3(result2)
+ Result(result3)
```

#### Type classes

```kotlin:diff
-fun <A, G, B> OptionOf<A>.traverse(GA: Applicative<G>, f: (A) -> Kind<G, B>): Kind<G, Option<B>> =
-  GA.run {
-    fix().fold({ just(None) }, { f(it).map { Some(it) } })
-  }
+fun <A, G, B> Option<A>.traverse(GA: Applicative<G> = with, f: (A) -> Kind<G, B>): Kind<G, Option<B>> =
+  fold({ just(None) }, { f(it).map { Some(it) } })
```
#### Type classes

```kotlin:diff
data class GithubUser(val id: Int)

val ids = listOf(1, 2, 3, 4).k()
fun getUser(id: Int): IO<GithubUser> = IO { GithubUser(id) }

-val result = ids.traverse(IO.applicative(), ::getUser).fix()
+val result = ids.traverse(::getUser)
```

#### Purity

SS or Video

---

## Thanks!

### Thanks to everyone that makes Λrrow Meta and Kotlin possible!

![47 Degrees](css/images/47deg-logo.png)  ![Kotlin](css/images/kotlin.png)