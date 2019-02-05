## First slide

An Arrow playground example.

Code snippet not treated by Arrow Playground:

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
