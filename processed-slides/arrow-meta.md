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

text -> AST/PSI

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

TABLE DSL example. CLI & IDE support

---

#### Analysis

TABLE DSL example. CLI & IDE support

---

#### Resolve

TABLE DSL example. CLI & IDE support

---

#### Codegen

TABLE DSL example. CLI & IDE support

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
 - 

---

#### Use cases - Arr

        - Plugins (The future of Arrow)
            - Higher Kinded Types
            - Optics
            - Comprehensions
            - Type classes
            - Purity

---

## Thanks!

### Thanks to everyone that makes Λrrow Meta and Kotlin possible!

![47 Degrees](css/images/47deg-logo.png)  ![Kotlin](css/images/kotlin.png)