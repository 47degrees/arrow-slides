## Second slide

Code snippet highlighted by Arrow Playground, theme Darcula:

```kotlin:ank
import arrow.*
import arrow.core.*
import arrow.data.*

fun main(args: Array<String>) {
    val result =
    //sampleStart
    Option(1).map { it * 2 }
    //sampleEnd
    println(result)
}
```
<!-- .element: class="arrow" theme="darcula" -->

Code snippet highlighted, editable and runnable through Arrow Playground, theme Arrow:

```kotlin:ank
import arrow.*
import arrow.core.*
import arrow.data.*

fun main(args: Array<String>) {
    val result =
    //sampleStart
    Option(1).map { it * 2 }
    //sampleEnd
    println(result)
}
```
<!-- .element: class="arrow" data-executable="true" -->
