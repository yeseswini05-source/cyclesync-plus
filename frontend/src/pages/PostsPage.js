import React, { useEffect, useState } from "react";

// ---------- hardcoded stories ----------
const demoStories = [
  {
    id: "me",
    username: "You",
    img: null, // null triggers the (+) circle
    storyText: "",
    isSelf: true,
  },
  {
    id: 1,
    username: "Riya",
    img: "https://randomuser.me/api/portraits/women/10.jpg",
    storyText:
      "First day of my period — sipping chamomile tea and resting guilt-free.",
  },
  {
    id: 2,
    username: "Aditi",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
    storyText:
      "Ovulation glow day. Gave my best presentation ever.",
  },
  {
    id: 3,
    username: "Neha",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    storyText:
      "Luteal phase means extra snacks and cozy sweaters.",
  },
  {
    id: 4,
    username: "Priya",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    storyText:
      "Felt anxious today, but journaling and a walk helped.",
  },
  {
    id: 5,
    username: "Sana",
    img: "https://randomuser.me/api/portraits/women/7.jpg",
    storyText:
      "Trying seed cycling this month — my skin is glowing.",
  },
];

// ---------- starter feed posts (demo) ----------
const starterPosts = [
  {
    _id: "seed-1",
    author: { username: "Riya (Day 2)" },
    createdAt: new Date().toISOString(),
    text:
      "Period cramps really hit today. I used a hot water bag and magnesium-rich food instead of taking a painkiller. It actually helped a lot.",
    moodTag: "Menstrual phase",
    avatarColor: "bg-gradient-to-br from-[#B4976B] to-[#4F5A3C]", // brown -> olive
    initials: "R",
    likes: 42,
    comments: [
      {
        user: "Aditi",
        text: "Magnesium glycinate and warm socks helped me last night too.",
      },
      {
        user: "Neha",
        text: "Thank you for sharing this, I am trying tonight.",
      },
    ],
  },
  {
    _id: "seed-2",
    author: { username: "Aditi • Luteal" },
    createdAt: new Date().toISOString(),
    text:
      "Super low energy this week. I kept thinking I am being lazy, but apparently it is luteal fatigue. I ate warm dal and rice and napped without guilt.",
    moodTag: "Luteal phase",
    avatarColor: "bg-gradient-to-br from-[#D3C19A] to-[#A07448]", // beige -> warm brown
    initials: "A",
    likes: 31,
    comments: [
      {
        user: "Priya",
        text: "Rest is productive in luteal. Proud of you.",
      },
    ],
  },
];

export default function PostsPage() {
  const API_BASE = "http://localhost:5000";

  // feed state
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [loading, setLoading] = useState(false);

  // backend status (message from GET /api/posts/)
  const [routeStatus, setRouteStatus] = useState("");

  // story modal state
  const [selectedStory, setSelectedStory] = useState(null);
  const [addStoryOpen, setAddStoryOpen] = useState(false);
  const [storyTextDraft, setStoryTextDraft] = useState("");
  const [storyFileDraft, setStoryFileDraft] = useState(null);

  // helper to get auth header using your actual keys
  function getAuthHeaders(extra = {}) {
    const token =
      localStorage.getItem("cyclesync_token") ||
      localStorage.getItem("cs_auth_token");

    return {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extra,
    };
  }

  // load backend status + posts from backend
  useEffect(() => {
    async function fetchAll() {
      try {
        // 1) health check
        const statusRes = await fetch(`${API_BASE}/api/posts/`, {
          headers: getAuthHeaders(),
        });
        if (statusRes.ok) {
          const statusData = await statusRes.json();
          setRouteStatus(statusData.message || "Connected");
        } else {
          setRouteStatus("Unable to reach posts API");
        }

        // 2) actual posts list
        const res = await fetch(`${API_BASE}/api/posts/all`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          console.error("Error loading posts:", res.status);
          return;
        }
        const data = await res.json();
        const normalized = Array.isArray(data) ? data : [];
        setPosts(normalized);
      } catch (err) {
        console.error("Error loading posts:", err);
        setRouteStatus("Error talking to posts API");
      }
    }

    fetchAll();
  }, []); // run once

  async function handleCreatePost(e) {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostText.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/posts/create`, {
        method: "POST",
        headers: getAuthHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify({
          title: newPostTitle.trim(),
          body: newPostText.trim(),
        }),
      });

      if (!res.ok) {
        console.error("Error creating post:", res.status);
        setLoading(false);
        return;
      }

      const created = await res.json();

      // `created` should be the new post object from backend
      setPosts((prev) => [created, ...prev]);
      setNewPostTitle("");
      setNewPostText("");
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  }

  // mock like handler (just visual for now)
  function handleLike(postId, isDemo) {
    if (isDemo) return;
    console.log("like", postId);
  }

  // mock comment click
  function handleComment(postId, isDemo) {
    console.log("comment", postId);
    alert("Comment box coming soon.");
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#EEE7C9] via-[#E3D4AF] to-[#F7F0DF] py-10 px-4 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* STORIES BAR */}
        <section className="mb-10">
          <div className="text-sm font-semibold text-[#4F5A3C] mb-3 flex items-center justify-between">
            <span>Community Stories</span>
            <span className="text-[11px] text-night/40 font-normal">
              Tap to view · Hold to love
            </span>
          </div>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x">
            {demoStories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center cursor-pointer snap-start min-w-[4rem]"
                onClick={() => {
                  if (story.isSelf) {
                    setAddStoryOpen(true);
                  } else {
                    setSelectedStory(story);
                  }
                }}
              >
                <div
                  className={
                    "h-16 w-16 rounded-full p-[2px] flex items-center justify-center shadow-soft " +
                    (story.isSelf
                      ? "bg-[#D3C19A]/40 border border-[#B49C73]"
                      : "bg-gradient-to-br from-[#B4976B] to-[#4F5A3C] border-[#B4976B] border-2")
                  }
                >
                  {story.isSelf ? (
                    <div className="h-full w-full rounded-full bg-[#FDF8EC] flex items-center justify-center text-night/60 text-xl font-semibold">
                      +
                    </div>
                  ) : (
                    <img
                      src={story.img}
                      alt={story.username}
                      className="h-full w-full object-cover rounded-full border-2 border-[#FDF8EC]/80"
                    />
                  )}
                </div>
                <span className="text-[11px] mt-1 text-night/70 text-center w-16 truncate">
                  {story.isSelf ? "Your story" : story.username}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* PAGE HEADER */}
        <header className="mb-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-[#4F5A3C] flex items-center gap-2">
                Community Posts
              </h1>
              <p className="text-night/60 text-sm mt-1 leading-relaxed">
                Share what helped you, what you are feeling, or what you are
                proud of. Be honest. Be soft. Be you.
              </p>
            </div>

            {routeStatus && (
              <span className="inline-flex items-center rounded-full bg-[#EEE7C9]/90 border border-[#CBB89A]/80 px-3 py-1 text-[11px] text-[#4F5A3C] whitespace-nowrap">
                {routeStatus}
              </span>
            )}
          </div>
        </header>

        {/* CREATE POST BOX */}
        <section className="bg-[#FDF8EC] rounded-xl border border-[#D0BFA0]/70 shadow-[0_30px_80px_rgba(90,64,34,0.12)] p-4 mb-10">
          <form onSubmit={handleCreatePost} className="space-y-3">
            <input
              type="text"
              className="w-full rounded-lg border border-[#CBB89A] px-3 py-2 text-sm bg-[#FFFDF5] text-night/80 outline-none focus:ring-2 focus:ring-[#B4976B]/50"
              placeholder="Give your post a short title."
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <textarea
              className="w-full rounded-lg border border-[#CBB89A] p-3 text-sm outline-none focus:ring-2 focus:ring-[#B4976B]/50 bg-[#FFFDF5] text-night/80 resize-none"
              rows={3}
              placeholder="Today my cramps were difficult, but ginger tea helped."
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div className="text-[11px] text-night/40">
                Be kind • No judgment • No medical advice
              </div>
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gradient-to-r from-[#7B6A4A] to-[#4F5A3C] text-[#FDF8EC] text-sm font-medium px-4 py-2 shadow-card disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.03] active:scale-[0.98] transition-transform"
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </section>

        {/* FEED */}
        <section className="space-y-5 pb-24">
          {/* live backend posts first */}
          {posts.map((post, idx) => (
            <PostCard
              key={post._id || post.id || `live-${idx}`}
              _id={post._id || post.id || `live-${idx}`}
              username={post.authorName || "Community member"}
              title={post.title}
              createdAt={post.createdAt}
              text={post.body}
              moodTag={null}
              avatarColor="bg-gradient-to-br from-[#B4976B] to-[#4F5A3C]"
              avatarInitials={
                (post.authorName || "C")[0]?.toUpperCase() || "C"
              }
              likes={0}
              commentsPreview={[]}
              onLike={() => handleLike(post._id || post.id, false)}
              onComment={() => handleComment(post._id || post.id, false)}
            />
          ))}

          {/* demo/starter posts */}
          {starterPosts.map((seed) => (
            <PostCard
              key={seed._id}
              _id={seed._id}
              username={seed.author.username}
              title={null}
              createdAt={seed.createdAt}
              text={seed.text}
              moodTag={seed.moodTag}
              avatarColor={seed.avatarColor}
              avatarInitials={seed.initials}
              likes={seed.likes}
              commentsPreview={seed.comments}
              onLike={() => handleLike(seed._id, true)}
              onComment={() => handleComment(seed._id, true)}
            />
          ))}
        </section>
      </div>

      {/* STORY VIEW MODAL */}
      {selectedStory && (
        <div
          onClick={() => setSelectedStory(null)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDF8EC] rounded-2xl p-6 shadow-xl max-w-sm w-[90%] text-center relative border border-[#D0BFA0]"
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-3 right-3 text-night/40 hover:text-[#4F5A3C]"
            >
              ✕
            </button>

            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-full border-4 border-[#B4976B]/40 overflow-hidden shadow-card mb-4">
                <img
                  src={selectedStory.img}
                  alt={selectedStory.username}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="font-semibold text-[#4F5A3C] text-base">
                {selectedStory.username}'s Story
              </div>

              <div className="text-night/70 text-sm leading-relaxed mt-2 whitespace-pre-wrap">
                {selectedStory.storyText}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD STORY MODAL (Your Story) */}
      {addStoryOpen && (
        <div
          onClick={() => setAddStoryOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FDF8EC] rounded-2xl p-6 shadow-xl max-w-sm w-[90%] relative border border-[#D0BFA0]"
          >
            <button
              onClick={() => setAddStoryOpen(false)}
              className="absolute top-3 right-3 text-night/40 hover:text-[#4F5A3C]"
            >
              ✕
            </button>

            <h2 className="text-[#4F5A3C] font-semibold text-lg mb-4 text-center">
              Add to your story
            </h2>

            <div className="mb-4">
              <label className="block text-[12px] text-night/60 font-medium mb-1">
                Upload image or video
              </label>
              <input
                type="file"
                className="w-full text-[12px] text-night/70 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border file:border-[#CBB89A] file:bg-[#EEE7C9] file:text-night/70 file:text-[12px] file:cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setStoryFileDraft(file || null);
                }}
              />
              {storyFileDraft && (
                <div className="text-[11px] text-night/50 mt-1 truncate">
                  {storyFileDraft.name}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-[12px] text-night/60 font-medium mb-1">
                Add a caption or how you feel
              </label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-[#CBB89A] p-2 text-[13px] bg-[#FFFDF5] text-night/80 outline-none focus:ring-2 focus:ring-[#B4976B]/40"
                placeholder="Day 1 today. I am being gentle with myself."
                value={storyTextDraft}
                onChange={(e) => setStoryTextDraft(e.target.value)}
              />
            </div>

            <button
              className="w-full rounded-full bg-gradient-to-r from-[#7B6A4A] to-[#4F5A3C] text-[#FDF8EC] text-sm font-medium px-4 py-2 shadow-card hover:scale-[1.02] active:scale-[0.98] transition-transform"
              onClick={() => {
                // in future: POST to /api/story or similar
                alert("Story uploaded (mock).");
                setAddStoryOpen(false);
                setStoryTextDraft("");
                setStoryFileDraft(null);
              }}
            >
              Share to Story
            </button>

            <p className="text-[11px] text-night/40 text-center mt-3 leading-relaxed">
              Your story will be visible for 24 hours to the community.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

/* ---------------------- POST CARD ---------------------- */
function PostCard({
  _id,
  username,
  title,
  createdAt,
  text,
  moodTag,
  avatarColor = "bg-gradient-to-br from-[#B4976B] to-[#4F5A3C]",
  avatarInitials = username ? username[0]?.toUpperCase() : "?",
  likes = 0,
  commentsPreview = [],
  onLike,
  onComment,
}) {
  return (
    <article className="bg-[#FDF8EC] rounded-xl border border-[#D0BFA0]/80 shadow-[0_30px_80px_rgba(90,64,34,0.14)] p-4">
      {/* header */}
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 rounded-full border border-[#FDF8EC]/80 shadow-card flex items-center justify-center text-[12px] font-semibold text-[#FDF8EC] ${avatarColor}`}
        >
          {avatarInitials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-[#4F5A3C] leading-tight truncate">
            {username}
          </div>
          {title && (
            <div className="text-[12px] text-[#7B6A4A] mt-0.5 truncate">
              {title}
            </div>
          )}
          <div className="text-[11px] text-night/50">
            {new Date(createdAt || Date.now()).toLocaleString()}
          </div>
        </div>

        {moodTag && (
          <div className="rounded-full bg-[#EEE7C9]/80 border border-[#B4976B]/60 text-[#4F5A3C] text-[10px] font-medium px-2 py-1 shadow-soft whitespace-nowrap">
            {moodTag}
          </div>
        )}
      </div>

      {/* body */}
      <div className="text-night/80 text-[15px] leading-relaxed whitespace-pre-wrap mt-3">
        {text}
      </div>

      {/* actions row */}
      <div className="flex items-center gap-6 text-[12px] text-night/60 mt-4">
        <button
          onClick={onLike}
          className="flex items-center gap-1 hover:text-[#4F5A3C] transition-colors"
        >
          <span className="font-medium">{likes}</span>
          <span>Like</span>
        </button>

        <button
          onClick={onComment}
          className="flex items-center gap-1 hover:text-[#4F5A3C] transition-colors"
        >
          <span className="font-medium">{commentsPreview.length}</span>
          <span>Comment</span>
        </button>
      </div>

      {/* comments preview */}
      {commentsPreview.length > 0 && (
        <div className="mt-4 rounded-lg bg-[#EEE7C9]/70 border border-[#D0BFA0]/70 p-3 space-y-2">
          {commentsPreview.slice(0, 2).map((c, i) => (
            <div key={i} className="text-[13px] leading-relaxed">
              <span className="font-semibold text-[#4F5A3C]">{c.user}</span>{" "}
              <span className="text-night/80">{c.text}</span>
            </div>
          ))}

          {commentsPreview.length > 2 && (
            <div className="text-[12px] text-[#4F5A3C] font-medium cursor-pointer hover:underline">
              View all {commentsPreview.length} comments
            </div>
          )}
        </div>
      )}
    </article>
  );
}
