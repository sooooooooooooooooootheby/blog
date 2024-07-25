<template>
	<div class="notFound">
		<div class="text">
			<span>404!</span>
			<p>It looks like you're lost</p>
			<router-link to="/">GO HOME -></router-link>
		</div>
        <div class="image">
            <img src="https://blog-1315833212.cos.ap-shanghai.myqcloud.com/meme/Marcus_Question.png" alt="">
        </div>
	</div>
</template>

<style lang="scss" scoped>
.notFound {
    width: 60vw;
    height: 100vh;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .text {
        font-size: 4rem;
        font-family: sourceHan-Medium;
        span {
            color: transparent;
            -webkit-text-stroke: 2px #000000;
        }
        p {
            margin-bottom: 42px;
        }
        a {
            font-size: 1.5rem;
        }
    }
    .image {
        width: 200px;
        height: 200px;
        margin-right: 150px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
