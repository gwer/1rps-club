---
title: 'Preact vs React 2025: 20x Faster Server Performance, 22x Smaller Bundle'
description: 'Preact outperforms React by 20x in server-side rendering and 22x in bundle size. Complete benchmark with real performance numbers.'
date: 2025-07-12
tags: ['react', 'preact', 'benchmark']
---

React is a popular library for building user interfaces. You can love it or hate it, but it has already claimed its place and is here to stay. While it may be great for complex SPAs, it can also be quite useful as a modular templating engine, allowing you to add interactivity to websites when needed.

But how efficient is it? To find out, let's compare it with Preact — the closest analog that can, with some reservations, be considered a drop-in replacement for React.

## Server-Side Rendering Speed: React vs Preact

The first thing I want to examine is rendering speed. To be precise, this is the speed of transforming our JS code into an HTML string to serve to the client. This characteristic helps determine how much money you'll need to spend on servers or how much traffic a single server can handle.

### Performance Benchmarks

{% benchmark { "React": 70719, "Preact": 1457496 }, "Render simple component (ops/sec)" %}
{% benchmark { "React": 2350, "Preact": 48249 }, "Render small list (10 items) (ops/sec)" %}
{% benchmark { "React": 226, "Preact": 5001 }, "Render medium list (100 items) (ops/sec)" %}
{% benchmark { "React": 25.79, "Preact": 358 }, "Render large list (1000 items) (ops/sec)" %}
{% benchmark { "React": 1397, "Preact": 29224 }, "Render nested components (ops/sec)" %}

### Performance Analysis

Preact consistently outperforms React across all test scenarios, with most cases showing 20x+ improvements.

For server costs, this translates directly to bottom-line impact. With 20x better performance, you can either serve 20x more users on the same hardware, or reduce your server costs by 95% while maintaining the same capacity. Of course, this calculation assumes your server's primary workload is HTML generation.

## Bundle Size: The Client-Side Story

Now, suppose we want to not just serve HTML, but also add some interactivity to the page. The advantage of React (and Preact too) is that interactivity can be added directly within components using hooks. But for this to work, you need to build a client bundle, serve it to the browser, and perform hydration. Without this procedure, you'd have just plain HTML (which is often perfectly sufficient).

Therefore, it's worth building both libraries into bundles and measuring their sizes. The measurement shows the amount of JS code that needs to be transferred to the browser, parsed, and executed. This affects both the traffic between client and server, and how quickly all that interactivity becomes available to the user.

### Bundle Size Benchmarks

{% benchmark { "React": 348.38, "Preact": 10.9463 }, "Bundle size (KB)" %}
{% benchmark { "React": 105.23, "Preact": 4.63 }, "Bundle size (gzip) (KB)" %}

### Bundle Size Analysis

After gzip compression, React weighs 105KB while Preact comes in at just 4.6KB — that's a 22x difference.

This matters most for:

- **Mobile users** on slow networks where every kilobyte counts
- **First-time visitors** who haven't cached your JavaScript yet
- **E-commerce sites** where loading speed directly impacts conversion rates
- **Global audiences** including emerging markets with limited bandwidth

## Benchmark Environment

**Hardware:**

- Intel Xeon W-11955M

**Software:**

- Node v22.15.1
- react v19.1.0
- react-dom v19.1.0
- preact v10.26.4
- preact-render-to-string v6.5.13

{% githubLink "content/blog/react-preact-performance-benchmark-2025/_benchmark/", "Benchmark code" %}

## Conclusion

The performance difference is hard to ignore. Preact uses the same API as React (hooks, JSX, components), and `preact/compat` handles most migration scenarios without code changes.

When React still makes sense:

- Next.js and similar React-specific frameworks
- Heavy use of React ecosystem packages that break with compat
- React-only features that Preact doesn't support

For everything else, especially if performance matters, Preact is worth considering.

**Want to see it in action?** Watch [React Is Killing Your App Speed. Fix It in 5 Minutes.](https://www.youtube.com/watch?v=WTZjanKopsY) for step-by-step migration from React to Preact with real web application, client hydration, and load testing.
