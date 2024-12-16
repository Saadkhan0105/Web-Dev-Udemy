import React from 'react'

function Card({username ="Saad K", post = "Unassigned"}) {
    // console.log(props);
    
  return (
    <div>
      <figure className="md:flex bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src="https://media.licdn.com/dms/image/v2/D4D35AQHZaSm2n8rWMA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1691305680057?e=1734951600&v=beta&t=1_AcQoa7frGT4oTOyLnrKmnxv2xrvENdVhf805OWwRg"
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 text-center space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny.”
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">{username}</div>
            <div className="text-slate-700 dark:text-slate-500">
              {post}
            </div>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

export default Card