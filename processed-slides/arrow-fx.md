Who am I?

- [@raulraja](https://twitter.com/raulraja), Co-Founder and CTO [@47deg](https://twitter.com/47deg)
- Typed FP advocate (for all languages)

---

Agenda

1. An introduction to __ΛRROW__
2. __Top 5__ Kotlin features FP programmers love
4. The __Kotlin Suspension__ system
4. __Fx__. A solution for building typed FP programs in Kotlin

---

An introduction to __ΛRROW__

---

ΛRROW started as learning exercise in the spanish Android Community Slack

![inline](css/images/ojetehandler.png)

---

...at the time it was called KΛTEGORY and we had the coolest logo ever!

![Kategory](css/images/kategory.png)

---

The name was cool but the community was more important

![Mario & Raul](css/images/mario-raul.png)

---

ΛRROW = KΛTEGORY + Funktionale

![Arrow](css/images/arrow-brand-transparent.png)

---

ΛRROW includes popular FP data types...

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

Kotlin lacks higher kinded types and real type classes

Emulating __higher kinded types__ is based on `defunctionalization`
[__Lightweight higher-kinded polymorphism__](https://www.cl.cam.ac.uk/~jdy22/papers/lightweight-higher-kinded-polymorphism.pdf)
by Jeremy Yallop and Leo White

```diff
+ @higherkind
+ class Option<A> : OptionOf<A>
- class ForOption private constructor() { companion object }
- typealias OptionOf<A> = ΛRROW.Kind<ForOption, A>
- inline fun <A> OptionOf<A>.fix(): Option<A> =
-   this as Option<A>
```
<!-- .element: class="arrow" data-executable="false" -->

---

Once we have a `Kind` representation we can provide `extensions`

```kotlin
interface Functor<F> {
  fun <A, B> Kind<F, A>.map(f: (A) -> B): Kind<F, B>
}
```
<!-- .element: class="arrow" data-executable="false" -->

---

This will export all extensions functions declared in `Functor` into `IO`

```kotlin
@extension interface IOFunctor : Functor<ForIO> {
  override fun <A, B> Kind<ForIO, A>.map(f: (A) -> B): IO<B> =
    fix().map(f)
}
```
<!-- .element: class="arrow" data-executable="false" -->

---

... and type classes.

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

| arrow-core |
| --- |
| ![inline](css/images/core-typeclasses.png) |

---

| arrow-effects |
| --- |
| ![inline](css/images/effects-typeclasses.png) |

---

Data types may provide extensions for type classes based on capabilities:

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

Data types may provide extensions for type classes based on capabilities:

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

ΛRROW is modular ![inline](css/images/android.jpg)

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

__Top 5__

Features Kotlin offers to FP

---

## 5

`?` Nullable Types

---

`?` Nullable Types

![inline](css/images/kotlin-types.png)

---

`?` Nullable Types

```kotlin
fun main() {
println({
//sampleStart
val name: String? = null
name.toUpperCase() //unsafe, won't compile
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

`?` Nullable Types

```kotlin

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

ΛRROW complements `?` with `Option`

```kotlin

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

## 4

Data classes

---

Data classes

```kotlin

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

Synthetic backed-in `hashcode` and `equals` impls

```kotlin

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

Synthetic `copy`

```kotlin

fun main() {
println({
//sampleStart
data class Person(val name: String, val age: Int)
Person("John", 40).copy(name = "Jane")
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

ΛRROW enhances data classes with `@product`

```kotlin
import arrow.core.*
import arrow.generic.*
//sampleStart
@product
data class Account(val balance: Int, val available: Int) {
  companion object
}

Account(1000, 900) + Account(1000, 900)
//Account(2000, 1800)
//sampleEnd
```
<!-- .element: class="arrow" data-executable="false" -->

---

ΛRROW enhances data classes with `@product`

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

Option.applicative().run {
  mapToAccount(maybeBalance, maybeAvailable)
}
//Some(Account(1000, 900))
//sampleEnd
```
<!-- .element: class="arrow" data-executable="false" -->

---

ΛRROW enhances data classes with `@optics`

```kotlin
import arrow.optics.dsl.*
import arrow.optics.Optional

@optics data class Street(val number: Int, val name: String)
@optics data class Address(val city: String, val street: Street)
@optics data class Company(val name: String, val address: Address)
@optics data class Employee(val name: String, val company: Company?)

val john = Employee("John Doe", Company("ΛRROW", Address("Funtown", Street(42, "lambda street"))))
val optional: Optional<Employee, String> = Employee.company.address.street.name
optional.modify(john, String::toUpperCase)
// Employee(
//   name=John Doe,
//   company=Company(name=ΛRROW,
//     address=Address(city=Funtown, street=Street(number=42, name=LAMBDA STREET))
//   )
// )
//sampleEnd
```
<!-- .element: class="arrow" data-executable="false" -->

---

## 3

Receiver functions

---

`run`, `with`

```kotlin

fun main() {
println({
//sampleStart
data class Account(val balance: Int, val available: Int)

Account(1000, 800).run { balance - available }
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

`run`, `with`

```kotlin

fun main() {
println({
//sampleStart
data class Account(val balance: Int, val available: Int)

with(Account(1000, 800)) {
  balance - available
}
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

`run`, `with`

```kotlin

//sampleStart
fun <A, B> A.runX(f: A.() -> B): B =
  f(this)

fun <A, B> withX(a: A, f: A.() -> B): B =
  f(a)

val result =
  "ΛRROW".runX { "<${toLowerCase()}>" } to
    with("ΛRROW") { "<${toLowerCase()}>" }
//sampleEnd

fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

## 2

Extension functions

---

Extend any type with extensions

```kotlin

fun main() {
println({
//sampleStart
data class Account(val balance: Int, val available: Int)

fun Iterable<Account>.total(): Int =
  fold(0) { acc, account -> acc + account.balance }

listOf(Account(1000, 800), Account(2000, 1890)).total()
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

## 1

Suspended Functions

---

Pure or impure?

```kotlin
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello World!")

val result = printHelloWorld()
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

Suspended functions require a continuation to run.

```diff
- suspend fun printHelloWorld(): Unit
+ fun printHelloWorld(callback: Continuation<Unit>): Unit
```
<!-- .element: class="arrow" data-executable="false" -->

```kotlin
interface Continuation<in A> {
  val context: CoroutineContext
  fun resumeWith(result: Result<A>)
}
```
<!-- .element: class="arrow" data-executable="false" -->

---

@RestrictSuspension prevents external functions from composing

```kotlin
import kotlin.coroutines.RestrictsSuspension
//sampleStart
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
```
<!-- .element: class="arrow" data-executable="false" -->

---

`suspend fun` + ΛRROW

![inline](css/images/arrow-fx-brand.png)

---

ΛRROW Fx

- A purely functional effects library for Kotlin built on ΛRROW and the Kotlin Coroutines System.
- Emphasis in empowering simple and declarative effectful programming for everyone.

---

Fx DSL

|        |        |
|--------|--------|
| __fx__ | A block that delimits a concurrent cancelable continuation |
| __effect__ | Turn and effect into a pure value |
| __!__ | Bind a pure value into the continuation context |
| __unsafe__ | Unsafe perform effects |

---

__fx__

A continuation that controls effects and their composition

```kotlin
import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello world")

val result: IO<Unit> =
  fx {
    printHelloWorld() //lacks explicit `effect` control. Won't compile
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

__effect__

Lifts suspended effects to the monad context

```kotlin

import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
import arrow.unsafe
import arrow.effects.extensions.io.unsafeRun.runBlocking
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello world")

val result =
  fx {
    effect { printHelloWorld() }
  }
//sampleEnd
fun main() {
  println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

__!__

Bind effects to the monad context with implicit CPS style

```kotlin

import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
//sampleStart
suspend fun printHelloWorld(): Unit =
  println("Hello World")

val result: IO<Unit> =
  fx {
    val result: Unit = !effect { printHelloWorld() }
    result
  }

fun main() {
  println(result)
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" -->

---

__unsafe__

The only place where you can actually run side effects

```kotlin

import arrow.unsafe
import arrow.effects.IO
import arrow.effects.extensions.io.fx.fx
//sampleStart
import arrow.effects.extensions.io.unsafeRun.runBlocking

//sampleStart
val result: IO<Unit> =
  fx {
    !effect { println("Hello World") }
  }

fun main() {
  unsafe { runBlocking { result } }
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" -->

---

Polymorphism with Arrow Fx is easy

```kotlin

import arrow.Kind
import arrow.unsafe
import arrow.effects.IO
import arrow.effects.typeclasses.UnsafeRun
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.unsafeRun
import arrow.effects.extensions.io.fx.fx
//sampleStart
fun <F> Fx<F>.program(): Kind<F, Unit> =
  fx {
    !effect { println("HelloWorld") }
  }

fun <F> UnsafeRun<F>.main(fa: Kind<F, Unit>): Unit =
  unsafe { runBlocking { fa } }

fun main() {
  IO.unsafeRun().main(IO.fx().program())
}
//sampleEnd
```
<!-- .element: class="arrow" data-executable="true" -->

---

Asynchronous fibers are easy to spawn and manage

```kotlin

import arrow.unsafe
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
fun main() {
unsafe {
  runBlocking {
//sampleStart
fx {
  val fiber = !NonBlocking.startFiber(effect {
    Thread.currentThread().name
  })
  val threadName: String = !fiber.join()
  !effect { println(threadName) }
}
//sampleEnd
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

Spawning concurrent ops is a piece of cake

```kotlin

import arrow.unsafe
import arrow.core.Tuple3
import arrow.effects.typeclasses.suspended.concurrent.Fx
import arrow.effects.extensions.io.unsafeRun.runBlocking
import arrow.effects.extensions.io.fx.fx
fun main() {
unsafe {
  runBlocking {
//sampleStart
fx {
  val (threadA, threadB, threadC) = !NonBlocking.parMapN(
    effect { Thread.currentThread().name },
    effect { Thread.currentThread().name },
    effect { Thread.currentThread().name },
    ::Tuple3
  )
  !effect { println(listOf(threadA, threadB, threadC)) }
}
//sampleEnd
  }
}
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

Fx for all monadic `F`s

*Fx over `Option`*
```kotlin

import arrow.effects.IO
import arrow.core.Option
import arrow.core.extensions.option.fx.fx
fun main() {
  println(
//sampleStart
fx {
  val one = !Option(1)
  val two = !Option(one + one)
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

We support different binding styles

*(_) destructuring syntax*
```kotlin

import arrow.core.Option
import arrow.core.extensions.option.fx.fx
fun main() {
  println(
//sampleStart
fx {
  val (one) = Option(1)
  val (two) = Option(one + one)
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

We support different binding styles

*explicit `bind()`*
```kotlin

import arrow.core.Option
import arrow.core.extensions.option.fx.fx
fun main() {
  println(
//sampleStart
fx {
  val one = Option(1).bind()
  val two = Option(one + one).bind()
  two
}
//sampleEnd
)
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

Implicit CPS + bind can break RT

```kotlin

import arrow.data.*
import arrow.unsafe
import arrow.core.toT
import arrow.core.Tuple3
import arrow.data.extensions.list.fx.fx

fun main() {
println({
//sampleStart
unsafe {
  val original = fx {
    val a = !listOf(1, 2).k()
    val b = !listOf(true, false).k()
    a toT b
  }
  val inlined = fx {
    val b = !listOf(true, false).k()
    !listOf(1, 2).k() toT b
  }
  Tuple3(original == inlined, original, inlined)
}
//sampleEnd
}())
}
```
<!-- .element: class="arrow" data-executable="true" -->

---

We want to make Typed FP in Kotlin even easier

![inline](css/images/keep.png)

---

Thanks to [@tomasruizlopez](https://twitter.com/tomasruizlopez) and the community we have a POC for KEEP-87:

### [https://github.com/ΛRROW-kt/kotlin/pull/6](https://github.com/ΛRROW-kt/kotlin/pull/6)

![inline](css/images/keep-pr.png)

---

KEEP-87 Proposes the following changes to Kotlin

Type class declarations are simple plain interfaces and have a expanded usage beyond FP

```kotlin
interface Repository<A> {
  suspend fun A.save(): A
  suspend fun cache(): List<A>
}
```
<!-- .element: class="arrow" data-executable="false" -->

---

Multiple data types can implement the behavior without resorting to inheritance

```kotlin
extension object UserRepository : Repository<User> {
  override suspend fun User.save(): User = TODO()
  override suspend fun cache(): List<User> = TODO()
}
```
<!-- .element: class="arrow" data-executable="false" -->

---

We can write polymorphic code with compile time verified dependencies

```kotlin
suspend fun <A> persistCache(with R: Repository<A>): List<A> =
  cache().map { it.save() }

persistCache<User>() // compiles and runs because there is a [Repository<User>]
persistCache<Invoice>() // fails to compile: No `extension` [Repository<Invoice>] found
persistCache(UserRepository) // java compatible
persistCache(InvoiceRepository) // compiles and runs because extension context is provided explicitly
```
<!-- .element: class="arrow" data-executable="false" -->

---

KEEP-87

The ΛRROW team plans to submit this proposal at the end of Q1 2019 once it's solid and it has properly addressed feedback from the community and the jetbrains compiler team.

---

Credits

ΛRROW is inspired by great libraries that have proven useful to the FP community:

- [Cats](https://typelevel.org/cats/)
- [Scalaz](https://github.com/scalaz/scalaz)
- [Mu](http://higherkindness.io/mu/)
- [Monocle](http://julien-truffaut.github.io/Monocle/)
- [Funktionale](https://github.com/MarioAriasC/funKTionale)

---

## Join us!

|        |                                                 |
|--------|-------------------------------------------------|
| Github | https://github.com/arrow-kt             |
| Slack  | https://kotlinlang.slack.com/messages/C5UPMM0A0 |
| Gitter | https://gitter.im/arrow-kt/Lobby               |

We are beginner friendly and provide 1:1 mentoring for both users & new contributors!
+110 Contributors and growing!

---

## Thanks!

### Thanks to everyone that makes ΛRROW possible!

![47 Degrees](css/images/47deg-logo.png)  ![Kotlin](css/images/kotlin.png)
