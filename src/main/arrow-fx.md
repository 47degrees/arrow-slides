Typed FP for the masses

---

## Who am I? # 

- Co-Founder and CTO at [@47deg](https://twitter.com/47deg)
- Typed FP advocate (regardless of language)

---

## Agenda

1. An introduction to Arrow
2. Top 5 Kotlin features for FP
3. The Kotlin suspension system
4. Arrow Fx. A solution for building typed FP in Kotlin
5. Features for lang designers to consider based on industry FP devs experience.

---

![inline](css/images/ojetehandler.png)
## Arrow started as learning exercise in the spanish Android Community Slack

---

{: data-background-color="#ff0000" }

...at the time it was called KΛTEGORY

![inline](css/images/kategory.png)

---

## KΛTEGORY + Funktionale = Λrrow

### The name was cool but the community was more important

![inline](css/images/arrow-brand-transparent.png)

---

## Data types

Λrrow includes data types to cover general use cases.

|                |                                                      |
|----------------|------------------------------------------------------|
| Error Handling | `Option`,`Try`, `Validated`, `Either`, `Ior`         |
| Collections    | `ListK`, `SequenceK`, `MapK`, `SetK`             |
| RWS            | `Reader`, `Writer`, `State`                          |
| Transformers   | `ReaderT`, `WriterT`, `OptionT`, `StateT`, `EitherT` |
| Evaluation     | `Eval`, `Trampoline`, `Free`, `FunctionN`            |
| Effects        | `IO`, `Free`, `ObservableK`                         |
| Optics         | `Lens`, `Prism`, `Iso`,...                           |
| Recursion      | `Fix`, `Mu`, `Nu`,...                                |
| Others         | `Coproduct`, `Coreader`, `Const`, ...                |

---

### Λrrow includes a comprehensive list of type classes

| Type class | Combinator |
| --- | --- |
| Semigroup | combine | 
| Monoid | empty | 
| Functor | map, lift | 
| Foldable | foldLeft, foldRight | 
| Traverse | traverse, sequence | 
| Applicative | just, ap | 
| ApplicativeError | raiseError, catch | 
| Monad | flatMap, flatten | 
| MonadError | ensure, rethrow | 
| MonadDefer | delay, suspend | 
| Async | async | 
| Effect | runAsync | 

---

### Λrrow includes a comprehensive list of type classes

Data types may support all or a subset of type classes based on capabilities:

| Type class | Combinators | **List** |
| --- | --- | --- |
| Functor | map, lift | ✓ |
| Applicative | just, ap | ✓ | 
| ApplicativeError | raiseError, catch | ✕ |
| Monad | flatMap, flatten | ✓ |
| MonadError | ensure, rethrow | ✕ |
| MonadDefer | delay, suspend | ✕ |
| Async | async | ✕ |
| Effect | runAsync | ✕ |

---

### Λrrow includes a comprehensive list of type classes

Data types may support all or a subset of type classes based on capabilities:

| Type class | Combinators | **List** | **Either** | **Deferred** | **IO** |
| --- | --- | --- | --- | --- | --- |
| Functor | map, lift | ✓ | ✓ | ✓ | ✓ | 
| Applicative | pure, ap | ✓ | ✓ | ✓ | ✓ | 
| ApplicativeError | raiseError, catch | ✕ | ✓ | ✓ | ✓ | 
| Monad | flatMap, flatten | ✓ | ✓ | ✓ | ✓ | 
| MonadError | ensure, rethrow | ✕ | ✓ | ✓ | ✓ | 
| MonadDefer | delay, suspend | ✕ | ✕ | ✓ | ✓ | 
| Async | async | ✕ | ✕ | ✓ | ✓ | 
| Effect | runAsync | ✕ | ✕ | ✓ | ✓ | 

---

## Λrrow is modular

Pick and choose what you'd like to use.

| Module            | Contents                                                              |
|-------------------|-----------------------------------------------------------------------|
| typeclasses       | `Semigroup`, `Monoid`, `Functor`, `Applicative`, `Monad`...                      |
| core/data         | `Option`, `Try`, `Either`, `Validated`...                                     |
| effects           | `Async`, `MonadDefer`, `Effect`, `IO`...                                                                    |
| effects-rx2       | `ObservableK`, `FlowableK`, `MaybeK`, `SingleK`                                                          |
| effects-coroutines       | `DeferredK`                                                       |
| mtl               | `MonadReader`, `MonadState`, `MonadFilter`,...                              |
| free              | `Free`, `FreeApplicative`, `Trampoline`, ...                                |
| recursion-schemes | `Fix`, `Mu`, `Nu`                                                                     |
| optics            | `Prism`, `Iso`, `Lens`, ...                                                 |
| meta              | `@higherkind`, `@deriving`, `@extension`, `@optics` |

---

## Kotlin TOP 5 features that help with FP

---

### 5. `?` Nullable Types

```kotlin
//sampleStart
val name: String? = null
val result = name.toUpperCase() //unsafe, won't compile
//sampleEnd
fun main() {
  println(name)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### 5. `?` Nullable Types

```kotlin:ank:silent
fun main() {
println({
//sampleStart
val name: String? = null
name?.toUpperCase() //safe, short circuits
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### 5. `?` Nullable Types

#### Arrow enhances nullable types with the `Option` data type

```kotlin:ank:silent
import arrow.core.Option
import arrow.core.None
fun main() {
println({
//sampleStart
val name: Option<String> = None
name.map { it.toUpperCase() } //safe, short circuits
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### 4. Data classes

```kotlin:ank:silent
fun main() {
println({
//sampleStart
data class Person(val name: String, val age: Int)
Person("John", 40)
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### 4. Data classes

#### Auto hashcode + equals for the structure

```kotlin:ank:silent
fun main() {
println({
//sampleStart
data class Person(val name: String, val age: Int)
Person("John", 40) == Person("John", 40)
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

### 4. Data classes

#### Synthetic copy

```kotlin:ank
fun main() {
println({
//sampleStart
data class Person(val name: String, val age: Int)
Person("John", 40).copy(name = "Jane")
//sampleEnd
}())
}
```

---

### 4. Data classes

#### Arrow enhances data classes with `@product`

```kotlin
import arrow.core.*
import arrow.generic.*
//sampleStart
@product
data class Account(val balance: Int, val available: Int) {
  companion object
}

Account(1000, 900) + Account(1000, 900)
//sampleEnd
fun main() {
  println(result)
}
```

---

### 4. Data classes

#### Arrow enhances data classes with `@product`

```kotlin
import arrow.core.*
import arrow.generic.*
//sampleStart
@product
data class Account(val balance: Int, val available: Int) {
  companion object
}

val maybeBalance: Option<Int> = Option(1000)
val maybeAvailable: Option<Int> = Option(900)

val result = 
  Option.applicative().run { 
    mapToAccount(maybeBalance, maybeAvailable)
  }
//sampleEnd
fun main() {
  println(result)
}
```

---

### 4. Data classes

#### Arrow enhances data classes with `@optics`

```kotlin
import arrow.optics.dsl.*
import arrow.optics.Optional

@optics data class Street(val number: Int, val name: String)
@optics data class Address(val city: String, val street: Street)
@optics data class Company(val name: String, val address: Address)
@optics data class Employee(val name: String, val company: Company?)

val john = Employee("John Doe", Company("Arrow", Address("Funtown", Street(42, "lambda street"))))
val optional: Optional<Employee, String> = Employee.company.address.street.name
val result = optional.modify(john, String::toUpperCase)

//sampleEnd
fun main() {
  println(result)
}
```

---

### 3. Scoping functions

#### `run`, `with`

```kotlin
//sampleStart
data class Account(val balance: Int, val available: Int)

val result = Account(1000, 800).run { balance - available }
//sampleEnd
fun main() {
  println(result)
}
```

---

### 3. Scoping functions

#### `run`, `with`

```kotlin
//sampleStart
data class Account(val balance: Int, val available: Int)

val result = with(Account(1000, 800)) { balance - available }
//sampleEnd
fun main() {
  println(result)
}
```

---

### 3. Scoping functions

#### `run`, `with`

```kotlin
//sampleStart
fun <A, B> A.run(f: A.() -> B): B = 
  f(this)

val result = "ΛRROW".run { "<${toLowerCase()}>" }
//sampleEnd
fun main() {
  println(result)
}
```

---

### 2. Extension functions

#### Enhance any type with extensions

```kotlin
//sampleStart
data class Account(val balance: Int, val available: Int)

fun Iterable<Account>.total(): Int =
  fold(0) { acc, account ->
    acc + account.balance
  }
  
val result = listOf(Account(1000, 800), Account(2000, 1890)).total()
//sampleEnd
fun main() {
  println(result)
}
```

---

### 1. The Kotlin Suspension System

#### A pure function is just `fun`

```kotlin
//sampleStart
fun helloWorld(): String =
  "Hello World"
  
val result = helloWorld()
//sampleEnd
fun main() {
  println(result)
}
```

---

### 1. The Kotlin Suspension System

#### Is `printHelloWorld` a pure function?

```kotlin
//sampleStart
fun helloWorld(): String =
  "Hello World"
  
suspend fun printHelloWorld(): Unit =
  println(helloWorld())
  
val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```

---

### 1. The Kotlin Suspension System

#### Suspended functions can't compile or run in the pure environment! 🎉

```kotlin
//sampleStart
fun helloWorld(): String =
  "Hello World"
  
suspend fun printHelloWorld(): Unit =
  println(helloWorld())
  
val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```

---

### 1. The Kotlin Suspension System

#### Scopes in which functions compile can be restricted a la carte

```kotlin
import kotlin.coroutines.RestrictsSuspension
//sampleStart
fun helloWorld(): String =
  "Hello World"
  
suspend fun printHelloWorld(): Unit =
  println(helloWorld())
  
suspend fun Restricted.printHelloWorld2(): Unit =
  println(helloWorld())
  
@RestrictsSuspension
class Restricted {
  suspend fun x(): Unit = printHelloWorld2() // works because in `Restricted` receiver
  suspend fun y(): Unit = printHelloWorld() // fails to compile
}

//sampleEnd
fun main() {
  println("")
}
```

---

## Arrow Fx

---

## Primitive ops

- `Fx` A block that delimits a concurrent cancelable continuation. `IO`
- `!` (bind, component1) Effect binding via implicit CPS

---

## Fx

### A continuation that controls and allows effects

```kotlin
//sampleStart
import arrow.effects.suspended.Fx

fun helloWorld(): String =
  "Hello World"
  
suspend fun printHelloWorld(): Unit =
  println(helloWorld())
  
val result: Fx<Unit> = 
  Fx {
    printHelloWorld()
  }
//sampleEnd
fun main() {
  println(result)
}
```

---

## Fx

### `Fx` blocks can be nested and unested via `!`

```kotlin
//sampleStart
import arrow.effects.suspended.Fx

fun helloWorld(): String =
  "Hello World"
  
val result: Fx<Unit> = 
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }
//sampleEnd
fun main() {
  println(result)
}
```

---

## Fx

### Running effects is unsafe. We make it explicit

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"
  
val result: Fx<Unit> = 
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```

---

## Fx

### unsafe is also a `@RestrictsSuspension` scope

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"
  
val result: Fx<Unit> = 
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```

---

## Fx

### When you have the ability to restrict compilation you can create architectural areas.

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"
  
val result: Fx<Unit> = 
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```

---

### Arrow Fx is polymorphic

```kotlin
//sampleStart
import arrow.unsafe
import arrow.effects.suspended.Fx
import arrow.effects.extensions.fx.unsafeRun.runBlocking

fun helloWorld(): String =
  "Hello World"
  
val result: Fx<Unit> = 
  Fx {
    val result = !Fx { println(helloWorld()) }
    result
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```

---

### Arrow Fx works over all monads

*Fx over `Option`*
```kotlin:ank
import arrow.effects.IO
import arrow.core.Option
import arrow.core.extensions.option.fx.fx

//sampleStart
val result = fx {
  val (one) = Option(1)
  val (two) = Option(one + one)
  two
}
//sampleEnd

fun main() {
  println(result)
}
```

---

### Arrow Fx works over all monads

*Fx over `Try`*
```kotlin:ank
import arrow.core.Try
import arrow.core.extensions.`try`.fx.fx

//sampleStart
val result = 
  fx {
    val (one) = Try { 1 }
    val (two) = Try { one + one }
    two
  }
//sampleEnd

fun main() {
  println(result)
}
```

---

### Implicit CPS + bind

Caveat : breaks RT when the order of effects matters in non-commutative data types

```kotlin:ank
import arrow.data.*
import arrow.unsafe
import arrow.core.toT
import arrow.data.extensions.list.fx.fx

//sampleStart
val result1 = unsafe { 
  fx {
    val a = !listOf(1, 2).k()
    val b = !listOf(true, false).k()
    a toT b
  }
}

val result2 = unsafe { 
  fx {
    val b = !listOf(true, false).k()
    !listOf(1, 2).k() toT b
  }
}
//sampleEnd

fun main() {
  println(result1)
  println(result2)
}
```

---

## Support Async/Non-Blocking Popular data types

Λrrow can abstract away the computational container type emulating __higher kinded types__.

`Kind<F, A>` denotes an `A` value inside an `F` type contructor:
Ex: `List<A>`, `Deferred<A>`, `IO<A>`, `Observable<A>`

```kotlin
import arrow.Kind

interface GistApiDataSource<F> {
  fun publicGistsForUser(userName: String): Kind<F, ListK<Gist>>
}
```

---

## Support Async/Non-Blocking Popular data types

Emulating __higher kinded types__ is based on `defunctionalization`
[__Lightweight higher-kinded polymorphism__](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf) 
by Jeremy Yallop and Leo White

```diff
+ @higherkind
+ class Option<A> : OptionOf<A>
- class ForOption private constructor() { companion object }
- typealias OptionOf<A> = arrow.Kind<ForOption, A>
- inline fun <A> OptionOf<A>.fix(): Option<A> =
-   this as Option<A>
```

---

## Support Async/Non-Blocking Popular data types

How can we implement a computation in the context of `F` if we don't know what `F` is?

```kotlin
class DefaultGistApiDataSource<F> : GistApiDataSource<F> {
  override fun publicGistsForUser(userName: String): Kind<F, ListK<Gist>> = TODO()
}
```

---

## Support Async/Non-Blocking Popular data types

Ad-Hoc Polymorphism and type classes!

A type class is a generic interface that describes behaviors that concrete types can support

```kotlin
interface Functor<F> {
  // Λrrow projects type class behaviors as static or extension functions over kinded values
  fun <A, B> Kind<F, A>.map(f: (A) -> B): Kind<F, B>
  fun <A, B> lift(f: (A) -> B): (Kind<F, A>) -> Kind<F, B> =
      { fa: Kind<F, A> -> fa.map(f) }
}
```

---

## Support Async/Non-Blocking Popular data types

Ad-Hoc Polymorphism and type classes!

A data type may be able to implement such abstract interfaces

```kotlin
@extension interface DeferredFunctor : Functor<ForDeferredK> {
  override fun <A, B> Kind<ForDeferredK, A>.map(f: (A) -> B): DeferredK<B> =
    fix().map(f)
}
```

---

## Support Async/Non-Blocking Popular data types

Ad-Hoc Polymorphism and type classes!

A data type may be able to implement such abstract interfaces

```kotlin
@extension interface IOFunctor : Functor<ForIO> {
  override fun <A, B> Kind<ForIO, A>.map(f: (A) -> B): IO<B> =
    fix().map(f)
}
```

---

## We want to make Typed FP in Kotlin even easier

![inline](css/images/keep.png)

---

## Thanks to [@tomasruizlopez](https://twitter.com/tomasruizlopez) we have a POC for KEEP-87: 

### [https://github.com/arrow-kt/kotlin/pull/6](https://github.com/arrow-kt/kotlin/pull/6)

![inline](css/images/keep-pr.png)

---

## KEEP-87 Proposes the following changes to Kotlin

Type class declarations are simple plain interfaces and have a expanded usage beyond FP

```kotlin
interface Repository<A> {
  suspend fun A.save(): A
  suspend fun cache(): List<A>
}
```

---

## KEEP-87 Proposes the following changes to Kotlin

Multiple data types can implement the behavior without resorting to inheritance

```kotlin
extension object UserRepository : Repository<User> {
  override suspend fun User.save(): User = TODO()
  override suspend fun cache(): List<User> = TODO()
}
```

---

## KEEP-87 Proposes the following changes to Kotlin

We can write polymorphic code with compile time verified dependencies

```kotlin
suspend fun <A> persistCache(with R: Repository<A>): List<A> =
  cache().map { it.save() }
  
persistCache<User>() // compiles and runs because there is a [Repository<User>]
persistCache<Invoice>() // fails to compile: No `extension` [Repository<Invoice>] found
persistCache(UserRepository) // java compatible
persistCache(InvoiceRepository) // compiles and runs because extension context is provided explicitly
```

---

## KEEP-87 

The Λrrow team plans to submit this proposal once it's solid and it has properly addressed feedback
from the community and the jetbrains compiler team.

---

## Credits

Λrrow is inspired in great libraries that have proven useful to the FP community:

- [Cats](https://typelevel.org/cats/)
- [Scalaz](https://github.com/scalaz/scalaz)
- [Freestyle](http://frees.io)
- [Monocle](http://julien-truffaut.github.io/Monocle/)
- [Funktionale](https://github.com/MarioAriasC/funKTionale)

---

## Join us!

|        |                                                 |
|--------|-------------------------------------------------|
| Github | https://github.com/arrow-kt/arrow                     |
| Slack  | https://kotlinlang.slack.com/messages/C5UPMM0A0 |
| Gitter | https://gitter.im/arrow-kt/Lobby               |

We are beginner friendly and provide 1:1 mentoring for both users & new contributors!
+90 Contributors and growing!

---

## Join us at [lambda.world](http://cadiz.lambda.world/schedule/#session-103) for more FP in Kotlin!

![inline](css/images/arrow-workshop.png)

---

## Thanks!

### Thanks to everyone that makes Λrrow possible!

![inline 80%](css/images/47deg-logo.png)![inline 80%](css/images/kotlin.png)![inline 80%](css/images/lw-logo.png)