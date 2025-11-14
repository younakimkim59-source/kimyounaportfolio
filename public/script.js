// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initMobileMenu();
    initParallaxEffects();
    initBlogBoard();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 248, 243, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 166, 166, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 248, 243, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // philosophy 섹션의 경우 정확히 섹션 시작 부분에 맞춤
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                // philosophy 섹션인 경우 정확히 섹션 시작 부분에 맞춤
                if (targetId === '#philosophy') {
                    // 정확히 섹션의 시작 부분으로 스크롤 (navbar 높이 고려)
                    const navbarHeight = 80;
                    const exactPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: exactPosition,
                        behavior: 'smooth'
                    });
                    
                    // 스크롤 완료 후 정확한 위치로 재조정 (게시판이 보이지 않도록)
                    setTimeout(() => {
                        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                        const sectionTop = targetSection.offsetTop - navbarHeight;
                        const sectionHeight = targetSection.offsetHeight;
                        const viewportHeight = window.innerHeight;
                        
                        // 섹션이 화면을 완전히 채우도록 조정
                        if (currentScroll < sectionTop || currentScroll + viewportHeight > sectionTop + sectionHeight) {
                            window.scrollTo({
                                top: sectionTop,
                                behavior: 'auto'
                            });
                        }
                    }, 600);
                } else {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .blog-card, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}


// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#A8E6CF' : type === 'error' ? '#FF8A8A' : '#AEDFF7'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-elements .element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-menu a.active {
        color: var(--coral);
    }
    
    .nav-menu a.active::after {
        width: 100%;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: var(--white);
            flex-direction: column;
            justify-content: start;
            align-items: center;
            padding-top: 50px;
            transition: left 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 20px 0;
        }
        
        .nav-menu a {
            font-size: 18px;
            font-weight: 600;
        }
    }
`;
document.head.appendChild(style);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Lazy loading for images (when added)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Console welcome message
console.log(`
🎨 flipTURN Portfolio
따뜻함과 감각을 바탕으로 한 개인 포트폴리오
유연한 전환(Flip)에서 단단한 결과(TURN)로
`);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        showNotification('🎉 이스터 에그를 발견하셨네요!', 'success');
        konamiCode = [];
    }
});

// Add rainbow animation CSS
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(easterEggStyle);

// ==================== Blog Board 기능 ====================

// db와 storage는 firebase-config.js에서 관리
let blogDb = null;
let blogStorage = null;
let isAdminMode = false;
const ADMIN_PASSWORD = 'flipturn2025'; // 관리자 비밀번호 (나중에 변경 가능)

// 페이지네이션 설정
let currentPage = 1;
const postsPerPage = 10; // 페이지당 게시물 수
let allPosts = []; // 전체 게시물 목록
let totalPages = 1; // 전체 페이지 수

// 현재 사용자 정보 (localStorage에서 가져오기)
function getCurrentUser() {
    return localStorage.getItem('currentUser') || null;
}

function setCurrentUser(username) {
    if (username && username.trim()) {
        localStorage.setItem('currentUser', username.trim());
    }
}

// 작성자 권한 체크
function isAuthor(postAuthor) {
    const currentUser = getCurrentUser();
    if (!currentUser || !postAuthor) return false;
    return postAuthor.trim() === currentUser.trim();
}

// 현재 사용자 표시 업데이트
function updateCurrentUserDisplay() {
    const currentUser = getCurrentUser();
    const userDisplay = document.getElementById('currentUserDisplay');
    if (userDisplay) {
        if (currentUser) {
            userDisplay.textContent = `현재 사용자: ${currentUser}`;
            userDisplay.style.display = 'block';
        } else {
            userDisplay.style.display = 'none';
        }
    }
}

// Firebase 초기화 및 게시판 기능
async function initBlogBoard() {
    try {
        // 현재 사용자 표시 업데이트
        updateCurrentUserDisplay();
        
        // Firebase 초기화
        const { db: database, storage: storageInstance } = await window.initFirebase();
        blogDb = database;
        blogStorage = storageInstance;
        
        // 게시판 목록 로드
        loadBoardPosts();
    } catch (error) {
        console.error('Firebase 초기화 오류:', error);
        showBoardError('게시판을 불러올 수 없습니다. Firebase 설정을 확인해주세요.');
    }
}

// 관리자 모드 토글
function toggleAdminMode() {
    const password = prompt('관리자 비밀번호를 입력하세요:');
    if (password === ADMIN_PASSWORD) {
        isAdminMode = !isAdminMode;
        const postFormContainer = document.getElementById('postFormContainer');
        const adminToggleBtn = document.getElementById('adminToggleBtn');
        
        if (isAdminMode) {
            postFormContainer.style.display = 'block';
            adminToggleBtn.textContent = '관리자 모드 종료';
            adminToggleBtn.classList.add('active');
        } else {
            postFormContainer.style.display = 'none';
            adminToggleBtn.textContent = '관리자 모드';
            adminToggleBtn.classList.remove('active');
            document.getElementById('postForm').reset();
            document.getElementById('imagePreview').innerHTML = '';
        }
    } else if (password !== null) {
        alert('비밀번호가 일치하지 않습니다.');
    }
}

// 게시판 목록 로드
async function loadBoardPosts() {
    const tableBody = document.getElementById('boardTableBody');
    if (!tableBody) {
        console.error('boardTableBody를 찾을 수 없습니다.');
        return;
    }
    
    if (!blogDb) {
        console.error('Firebase DB가 초기화되지 않았습니다.');
        showBoardError('Firebase가 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
        return;
    }
    
    try {
        console.log('게시글 로드 시작...');
        const { collection, getDocs, query, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const postsRef = collection(blogDb, 'posts');
        
        // orderBy가 실패할 경우를 대비해 try-catch 추가
        let querySnapshot;
        try {
            const q = query(postsRef, orderBy('createdAt', 'desc'));
            querySnapshot = await getDocs(q);
        } catch (orderError) {
            console.warn('orderBy 오류, 인덱스가 필요할 수 있습니다. 모든 문서를 가져옵니다:', orderError);
            // 인덱스 오류 시 모든 문서 가져오기
            querySnapshot = await getDocs(postsRef);
        }
        
        tableBody.innerHTML = '';
        
        if (querySnapshot.empty) {
            console.log('게시글이 없습니다.');
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 60px;">
                        <div class="empty-message">아직 게시글이 없습니다.<br>첫 게시글을 작성해보세요!</div>
                    </td>
                </tr>
            `;
            allPosts = [];
            totalPages = 1;
            updatePagination();
            return;
        }
        
        console.log(`게시글 ${querySnapshot.size}개를 찾았습니다.`);
        
        // createdAt 기준으로 정렬 (클라이언트 측)
        const posts = [];
        querySnapshot.forEach((doc) => {
            const post = doc.data();
            posts.push({
                id: doc.id,
                ...post,
                createdAt: post.createdAt ? post.createdAt.toDate() : new Date(0)
            });
        });
        
        // 날짜순 정렬
        posts.sort((a, b) => b.createdAt - a.createdAt);
        
        // 전체 게시물 저장
        allPosts = posts;
        totalPages = Math.ceil(posts.length / postsPerPage);
        
        // 현재 페이지에 맞는 게시물 표시
        displayPostsForCurrentPage();
        
        // 페이지네이션 업데이트
        updatePagination();
        
        console.log('게시글 로드 완료');
    } catch (error) {
        console.error('게시글 로드 오류:', error);
        console.error('에러 상세:', {
            message: error.message,
            stack: error.stack,
            db: blogDb ? '초기화됨' : '초기화 안됨'
        });
        showBoardError('게시글을 불러오는 중 오류가 발생했습니다: ' + error.message);
    }
}

// 게시판 테이블 행 생성
function createBoardRow(postId, post, postNumber) {
    const tr = document.createElement('tr');
    
    const categoryClass = getCategoryClass(post.category);
    // createdAt이 Date 객체인지 Timestamp 객체인지 확인
    let createdAtDate;
    if (post.createdAt) {
        if (post.createdAt.toDate) {
            createdAtDate = post.createdAt.toDate();
        } else if (post.createdAt instanceof Date) {
            createdAtDate = post.createdAt;
        } else {
            createdAtDate = new Date(post.createdAt);
        }
    } else {
        createdAtDate = new Date();
    }
    const formattedDate = formatDate(createdAtDate);
    
    tr.innerHTML = `
        <td class="col-no">${postNumber}</td>
        <td class="col-category"><span class="category-badge ${categoryClass}">${post.category || '일상'}</span></td>
        <td class="col-title">
            <a href="#" class="post-title" data-post-id="${postId}">${escapeHtml(post.title || '제목 없음')}</a>
        </td>
        <td class="col-author">${escapeHtml(post.author || 'flipTURN')}</td>
        <td class="col-date">${formattedDate}</td>
        <td class="col-views">${post.views || 0}</td>
    `;
    
    // 제목 클릭 이벤트 - 게시글 상세보기
    const titleLink = tr.querySelector('.post-title');
    if (titleLink) {
        titleLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPostDetail(postId);
        });
    }
    
    return tr;
}

// 카테고리 클래스 반환
function getCategoryClass(category) {
    const classes = {
        '일상': 'category-daily',
        '디자인': 'category-design',
        '개발': 'category-dev',
        '갤러리': 'category-gallery'
    };
    return classes[category] || 'category-daily';
}

// 에러 메시지 표시
function showBoardError(message) {
    const tableBody = document.getElementById('boardTableBody');
    if (tableBody) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 60px;">
                    <div class="error-message">${message}</div>
                </td>
            </tr>
        `;
    }
}

// 게시글 카드 생성
function createPostCard(postId, post) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    article.dataset.postId = postId;
    
    const imageHtml = post.imageUrl 
        ? `<img src="${post.imageUrl}" alt="${post.title}" class="blog-image-img">`
        : `<div class="blog-placeholder">${getCategoryEmoji(post.category)}</div>`;
    
    article.innerHTML = `
        <div class="blog-image">
            ${imageHtml}
        </div>
        <div class="blog-content">
            <h3 class="blog-title">${escapeHtml(post.title)}</h3>
            <p class="blog-excerpt">${escapeHtml(post.content.substring(0, 100))}${post.content.length > 100 ? '...' : ''}</p>
            <div class="blog-meta">
                <span class="blog-date">${formatDate(post.createdAt?.toDate() || new Date())}</span>
                <span class="blog-category">${post.category || '일상'}</span>
            </div>
            ${isAdminMode ? `<button class="delete-post-btn" data-post-id="${postId}">삭제</button>` : ''}
        </div>
    `;
    
    // 관리자 모드일 때 삭제 버튼 이벤트
    if (isAdminMode) {
        const deleteBtn = article.querySelector('.delete-post-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => deletePost(postId, post.imageUrl));
        }
    }
    
    return article;
}

// 게시글 작성
async function handlePostSubmit(e) {
    e.preventDefault();
    
    if (!blogDb || !blogStorage) {
        showNotification('Firebase가 초기화되지 않았습니다.', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const content = formData.get('content');
    const category = formData.get('category');
    const imageFile = formData.get('image');
    
    try {
        showNotification('게시글을 업로드하는 중...', 'info');
        
        let imageUrl = null;
        
        // 이미지 업로드
        if (imageFile && imageFile.size > 0) {
            const { ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
            const imageRef = ref(blogStorage, `posts/${Date.now()}_${imageFile.name}`);
            await uploadBytes(imageRef, imageFile);
            imageUrl = await getDownloadURL(imageRef);
        }
        
        // Firestore에 저장
        const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        await addDoc(collection(blogDb, 'posts'), {
            title,
            content,
            category,
            imageUrl,
            createdAt: serverTimestamp()
        });
        
        showNotification('게시글이 성공적으로 작성되었습니다!', 'success');
        e.target.reset();
        document.getElementById('imagePreview').innerHTML = '';
        document.getElementById('postFormContainer').style.display = 'none';
        
        // 게시글 목록 새로고침
        loadPosts();
    } catch (error) {
        console.error('게시글 작성 오류:', error);
        showNotification('게시글 작성 중 오류가 발생했습니다.', 'error');
    }
}

// 게시글 삭제
async function deletePost(postId, imageUrl) {
    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    
    try {
        const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const { ref, deleteObject } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
        
        // Firestore에서 삭제
        await deleteDoc(doc(blogDb, 'posts', postId));
        
        // Storage에서 이미지 삭제
        if (imageUrl) {
            try {
                const imageRef = ref(blogStorage, imageUrl);
                await deleteObject(imageRef);
            } catch (error) {
                console.warn('이미지 삭제 실패:', error);
            }
        }
        
        showNotification('게시글이 삭제되었습니다.', 'success');
        loadPosts();
    } catch (error) {
        console.error('게시글 삭제 오류:', error);
        showNotification('게시글 삭제 중 오류가 발생했습니다.', 'error');
    }
}

// 이미지 미리보기
function handleImagePreview(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('imagePreview');
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="미리보기" style="max-width: 200px; max-height: 200px; border-radius: 8px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
    }
}

// 유틸리티 함수들
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
}

function getCategoryEmoji(category) {
    const emojis = {
        '일상': '📝',
        '디자인': '🎨',
        '개발': '💻',
        '갤러리': '🖼️'
    };
    return emojis[category] || '📝';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 현재 페이지에 맞는 게시물 표시
function displayPostsForCurrentPage() {
    const tableBody = document.getElementById('boardTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    if (allPosts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 60px;">
                    <div class="empty-message">아직 게시글이 없습니다.<br>첫 게시글을 작성해보세요!</div>
                </td>
            </tr>
        `;
        return;
    }
    
    // 현재 페이지에 표시할 게시물 범위 계산
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = allPosts.slice(startIndex, endIndex);
    
    // 전체 게시물 수에서 시작 번호 계산
    const totalPosts = allPosts.length;
    let postNumber = totalPosts - startIndex;
    
    postsToShow.forEach((post) => {
        const row = createBoardRow(post.id, post, postNumber);
        tableBody.appendChild(row);
        postNumber--;
    });
}

// 페이지네이션 업데이트
function updatePagination() {
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;
    
    const pageNumbers = pagination.querySelector('.page-numbers');
    const prevBtn = pagination.querySelector('.prev-btn');
    const nextBtn = pagination.querySelector('.next-btn');
    
    if (!pageNumbers || !prevBtn || !nextBtn) return;
    
    // 페이지 번호 버튼 생성
    pageNumbers.innerHTML = '';
    
    if (totalPages === 0) {
        totalPages = 1;
    }
    
    // 표시할 페이지 번호 범위 계산 (최대 5개)
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // 시작 페이지 조정
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(5, totalPages);
        } else if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - 4);
        }
    }
    
    // 첫 페이지 버튼
    if (startPage > 1) {
        const firstBtn = document.createElement('button');
        firstBtn.className = 'page-number';
        firstBtn.textContent = '1';
        firstBtn.onclick = () => goToPage(1);
        pageNumbers.appendChild(firstBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-ellipsis';
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
    }
    
    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number';
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        pageNumbers.appendChild(pageBtn);
    }
    
    // 마지막 페이지 버튼
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-ellipsis';
            ellipsis.textContent = '...';
            pageNumbers.appendChild(ellipsis);
        }
        
        const lastBtn = document.createElement('button');
        lastBtn.className = 'page-number';
        lastBtn.textContent = totalPages;
        lastBtn.onclick = () => goToPage(totalPages);
        pageNumbers.appendChild(lastBtn);
    }
    
    // 이전/다음 버튼 활성화/비활성화
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // 이전/다음 버튼 이벤트
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };
}

// 특정 페이지로 이동
function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayPostsForCurrentPage();
    updatePagination();
    
    // 페이지 상단으로 스크롤
    const boardSection = document.getElementById('blog');
    if (boardSection) {
        boardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 게시글 상세보기
async function showPostDetail(postId) {
    if (!blogDb) {
        showNotification('Firebase가 초기화되지 않았습니다.', 'error');
        return;
    }
    
    const modal = document.getElementById('postModal');
    if (!modal) {
        console.error('모달을 찾을 수 없습니다.');
        return;
    }
    
    try {
        // 모달 표시 (로딩 상태)
        modal.style.display = 'flex';
        document.getElementById('modalTitle').textContent = '로딩 중...';
        document.getElementById('modalContent').innerHTML = '<p>게시글을 불러오는 중...</p>';
        
        // Firestore에서 게시글 가져오기
        const { doc, getDoc, increment, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const postRef = doc(blogDb, 'posts', postId);
        const postSnap = await getDoc(postRef);
        
        if (!postSnap.exists()) {
            showNotification('게시글을 찾을 수 없습니다.', 'error');
            modal.style.display = 'none';
            return;
        }
        
        const post = postSnap.data();
        
        // 조회수 증가
        try {
            await updateDoc(postRef, {
                views: increment(1)
            });
        } catch (error) {
            console.warn('조회수 증가 실패:', error);
        }
        
        // 모달에 데이터 표시
        document.getElementById('modalTitle').textContent = post.title || '제목 없음';
        
        const categoryClass = getCategoryClass(post.category);
        document.getElementById('modalCategory').innerHTML = `<span class="category-badge ${categoryClass}">${post.category || '일상'}</span>`;
        document.getElementById('modalAuthor').textContent = `작성자: ${post.author || 'flipTURN'}`;
        
        // 날짜 포맷팅
        let createdAtDate;
        if (post.createdAt) {
            if (post.createdAt.toDate) {
                createdAtDate = post.createdAt.toDate();
            } else if (post.createdAt instanceof Date) {
                createdAtDate = post.createdAt;
            } else {
                createdAtDate = new Date(post.createdAt);
            }
        } else {
            createdAtDate = new Date();
        }
        document.getElementById('modalDate').textContent = `작성일: ${formatDate(createdAtDate)}`;
        document.getElementById('modalViews').textContent = `조회: ${(post.views || 0) + 1}`;
        
        // 내용 표시 (HTML로 렌더링)
        const contentDiv = document.getElementById('modalContent');
        if (post.content) {
            contentDiv.innerHTML = post.content;
        } else {
            contentDiv.innerHTML = '<p>내용이 없습니다.</p>';
        }
        
        // 이미지 표시
        const imagesDiv = document.getElementById('modalImages');
        imagesDiv.innerHTML = '';
        if (post.imageUrls && Array.isArray(post.imageUrls) && post.imageUrls.length > 0) {
            post.imageUrls.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = post.title;
                img.className = 'modal-image';
                imagesDiv.appendChild(img);
            });
        }
        
        // 수정/삭제 버튼 표시 (작성자만 표시)
        const editBtn = document.getElementById('modalEditBtn');
        const deleteBtn = document.getElementById('modalDeleteBtn');
        if (editBtn && deleteBtn) {
            // 작성자 권한 체크
            const postAuthor = post.author || '';
            const canEdit = isAuthor(postAuthor);
            
            if (canEdit) {
                editBtn.style.display = 'flex';
                deleteBtn.style.display = 'flex';
                editBtn.onclick = () => editPost(postId);
                deleteBtn.onclick = () => deletePostFromModal(postId, post.imageUrls);
            } else {
                editBtn.style.display = 'none';
                deleteBtn.style.display = 'none';
            }
        } else {
            console.error('수정/삭제 버튼을 찾을 수 없습니다.', { editBtn, deleteBtn });
        }
        
        // 게시판 목록 새로고침 (조회수 업데이트 반영)
        loadBoardPosts();
        
        // 현재 사용자 표시 업데이트
        updateCurrentUserDisplay();
        
        // 댓글 로드 및 이벤트 리스너 설정
        await loadComments(postId);
        setupCommentForm(postId);
        
    } catch (error) {
        console.error('게시글 로드 오류:', error);
        showNotification('게시글을 불러오는 중 오류가 발생했습니다.', 'error');
        modal.style.display = 'none';
    }
}

// 모달 닫기
function closePostModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.style.display = 'none';
        // 수정/삭제 버튼 숨기기
        const editBtn = document.getElementById('modalEditBtn');
        const deleteBtn = document.getElementById('modalDeleteBtn');
        if (editBtn) editBtn.style.display = 'none';
        if (deleteBtn) deleteBtn.style.display = 'none';
    }
}

// 댓글 목록 불러오기
async function loadComments(postId) {
    if (!blogDb) {
        console.error('Firebase DB가 초기화되지 않았습니다.');
        return;
    }
    
    try {
        const { collection, query, getDocs, orderBy } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const commentsRef = collection(blogDb, 'posts', postId, 'comments');
        const q = query(commentsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const commentsList = document.querySelector('.comments-list');
        const commentsCount = document.querySelector('.comments-count');
        
        if (!commentsList) {
            console.error('댓글 목록 요소를 찾을 수 없습니다.');
            return;
        }
        
        // 댓글 목록 초기화
        commentsList.innerHTML = '';
        
        if (querySnapshot.empty) {
            commentsList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-light);">아직 댓글이 없습니다.</div>';
            if (commentsCount) commentsCount.textContent = '0';
            return;
        }
        
        // 댓글 개수 업데이트
        if (commentsCount) {
            commentsCount.textContent = querySnapshot.size;
        }
        
        // 댓글 렌더링
        querySnapshot.forEach((doc) => {
            const comment = doc.data();
            const commentItem = createCommentElement(doc.id, comment);
            commentsList.appendChild(commentItem);
        });
        
    } catch (error) {
        console.error('댓글 로드 오류:', error);
        // orderBy 실패 시 클라이언트 사이드 정렬 시도
        try {
            const { collection, getDocs } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
            const commentsRef = collection(blogDb, 'posts', postId, 'comments');
            const querySnapshot = await getDocs(commentsRef);
            
            const comments = [];
            querySnapshot.forEach((doc) => {
                comments.push({ id: doc.id, ...doc.data() });
            });
            
            // 클라이언트 사이드에서 날짜순 정렬
            comments.sort((a, b) => {
                const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
                const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
                return dateB - dateA; // 최신순
            });
            
            const commentsList = document.querySelector('.comments-list');
            const commentsCount = document.querySelector('.comments-count');
            
            if (!commentsList) return;
            
            commentsList.innerHTML = '';
            
            if (comments.length === 0) {
                commentsList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-light);">아직 댓글이 없습니다.</div>';
                if (commentsCount) commentsCount.textContent = '0';
                return;
            }
            
            if (commentsCount) {
                commentsCount.textContent = comments.length;
            }
            
            comments.forEach((comment) => {
                const commentItem = createCommentElement(comment.id, comment);
                commentsList.appendChild(commentItem);
            });
            
        } catch (fallbackError) {
            console.error('댓글 로드 실패:', fallbackError);
            const commentsList = document.querySelector('.comments-list');
            if (commentsList) {
                commentsList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-light);">댓글을 불러오는 중 오류가 발생했습니다.</div>';
            }
        }
    }
}

// 댓글 요소 생성
function createCommentElement(commentId, comment) {
    const commentItem = document.createElement('div');
    commentItem.className = 'comment-item';
    
    // 날짜 포맷팅
    let createdAtDate;
    if (comment.createdAt) {
        if (comment.createdAt.toDate) {
            createdAtDate = comment.createdAt.toDate();
        } else if (comment.createdAt instanceof Date) {
            createdAtDate = comment.createdAt;
        } else {
            createdAtDate = new Date(comment.createdAt);
        }
    } else {
        createdAtDate = new Date();
    }
    
    const formattedDate = formatCommentDate(createdAtDate);
    
    commentItem.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${escapeHtml(comment.author || '익명')}</span>
            <span class="comment-date">${formattedDate}</span>
        </div>
        <div class="comment-content">${escapeHtml(comment.content || '')}</div>
    `;
    
    return commentItem;
}

// 댓글 날짜 포맷팅
function formatCommentDate(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) {
        return '방금 전';
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days < 7) {
        return `${days}일 전`;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${year}.${month}.${day} ${hour}:${minute}`;
    }
}

// HTML 이스케이프
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 댓글 작성 폼 설정
function setupCommentForm(postId) {
    const commentAuthorInput = document.getElementById('commentAuthor');
    const commentContentInput = document.getElementById('commentContent');
    const commentCharCount = document.getElementById('commentCharCount');
    const commentSubmitBtn = document.querySelector('.comment-submit-btn');
    
    if (!commentAuthorInput || !commentContentInput || !commentCharCount || !commentSubmitBtn) {
        console.error('댓글 작성 폼 요소를 찾을 수 없습니다.');
        return;
    }
    
    // 글자 수 카운터 업데이트
    commentContentInput.addEventListener('input', function() {
        const length = this.value.length;
        commentCharCount.textContent = length;
        
        if (length > 500) {
            commentCharCount.style.color = 'var(--deep-coral)';
        } else {
            commentCharCount.style.color = 'var(--text-light)';
        }
    });
    
    // 댓글 작성 버튼 클릭 이벤트
    commentSubmitBtn.onclick = async () => {
        await submitComment(postId);
    };
    
    // Enter 키로 제출 (Ctrl+Enter 또는 Shift+Enter)
    commentContentInput.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
            e.preventDefault();
            commentSubmitBtn.click();
        }
    });
}

// 댓글 작성
async function submitComment(postId) {
    if (!blogDb) {
        showNotification('Firebase가 초기화되지 않았습니다.', 'error');
        return;
    }
    
    const commentAuthorInput = document.getElementById('commentAuthor');
    const commentContentInput = document.getElementById('commentContent');
    const commentSubmitBtn = document.querySelector('.comment-submit-btn');
    
    if (!commentAuthorInput || !commentContentInput || !commentSubmitBtn) {
        showNotification('댓글 작성 폼을 찾을 수 없습니다.', 'error');
        return;
    }
    
    const author = commentAuthorInput.value.trim();
    const content = commentContentInput.value.trim();
    
    // 유효성 검사
    if (!author) {
        showNotification('이름을 입력해주세요.', 'error');
        commentAuthorInput.focus();
        return;
    }
    
    if (author.length > 20) {
        showNotification('이름은 20자 이하로 입력해주세요.', 'error');
        commentAuthorInput.focus();
        return;
    }
    
    if (!content) {
        showNotification('댓글 내용을 입력해주세요.', 'error');
        commentContentInput.focus();
        return;
    }
    
    if (content.length > 500) {
        showNotification('댓글은 500자 이하로 입력해주세요.', 'error');
        commentContentInput.focus();
        return;
    }
    
    try {
        // 버튼 비활성화
        commentSubmitBtn.disabled = true;
        commentSubmitBtn.textContent = '작성 중...';
        
        const { collection, addDoc, serverTimestamp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const commentsRef = collection(blogDb, 'posts', postId, 'comments');
        
        await addDoc(commentsRef, {
            author: author,
            content: content,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        
        // 입력 필드 초기화
        commentAuthorInput.value = '';
        commentContentInput.value = '';
        document.getElementById('commentCharCount').textContent = '0';
        
        showNotification('댓글이 작성되었습니다.', 'success');
        
        // 댓글 목록 새로고침
        await loadComments(postId);
        
    } catch (error) {
        console.error('댓글 작성 오류:', error);
        showNotification('댓글 작성 중 오류가 발생했습니다: ' + error.message, 'error');
    } finally {
        // 버튼 활성화
        commentSubmitBtn.disabled = false;
        commentSubmitBtn.textContent = '댓글 작성';
    }
}

// 게시글 수정
async function editPost(postId) {
    // 권한 확인
    if (!blogDb) {
        showNotification('Firebase가 초기화되지 않았습니다.', 'error');
        return;
    }
    
    try {
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const postRef = doc(blogDb, 'posts', postId);
        const postSnap = await getDoc(postRef);
        
        if (!postSnap.exists()) {
            showNotification('게시글을 찾을 수 없습니다.', 'error');
            return;
        }
        
        const post = postSnap.data();
        if (!isAuthor(post.author)) {
            showNotification('작성자만 수정할 수 있습니다.', 'error');
            return;
        }
        
        closePostModal();
        // write.html로 이동하면서 게시글 ID 전달
        window.location.href = `write.html?edit=${postId}`;
    } catch (error) {
        console.error('권한 확인 오류:', error);
        showNotification('권한을 확인하는 중 오류가 발생했습니다.', 'error');
    }
}

// 모달에서 게시글 삭제
async function deletePostFromModal(postId, imageUrls) {
    // 권한 재확인
    if (!blogDb) {
        showNotification('Firebase가 초기화되지 않았습니다.', 'error');
        return;
    }
    
    try {
        const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const postRef = doc(blogDb, 'posts', postId);
        const postSnap = await getDoc(postRef);
        
        if (!postSnap.exists()) {
            showNotification('게시글을 찾을 수 없습니다.', 'error');
            return;
        }
        
        const post = postSnap.data();
        if (!isAuthor(post.author)) {
            showNotification('작성자만 삭제할 수 있습니다.', 'error');
            return;
        }
    } catch (error) {
        console.error('권한 확인 오류:', error);
        showNotification('권한을 확인하는 중 오류가 발생했습니다.', 'error');
        return;
    }
    
    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) {
        return;
    }
    
    if (!blogDb || !blogStorage) {
        showNotification('Firebase가 초기화되지 않았습니다.', 'error');
        return;
    }
    
    try {
        showNotification('게시글을 삭제하는 중...', 'info');
        
        const { doc, deleteDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
        const { ref, deleteObject } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
        
        // Firestore에서 삭제
        await deleteDoc(doc(blogDb, 'posts', postId));
        
        // Storage에서 이미지 삭제
        if (imageUrls && Array.isArray(imageUrls) && imageUrls.length > 0) {
            for (const imageUrl of imageUrls) {
                try {
                    // imageUrl이 전체 경로인 경우 경로 추출
                    const urlParts = imageUrl.split('/o/');
                    if (urlParts.length > 1) {
                        const pathPart = urlParts[1].split('?')[0];
                        const decodedPath = decodeURIComponent(pathPart);
                        const imageRef = ref(blogStorage, decodedPath);
                        await deleteObject(imageRef);
                    }
                } catch (error) {
                    console.warn('이미지 삭제 실패:', error);
                }
            }
        }
        
        showNotification('게시글이 삭제되었습니다.', 'success');
        closePostModal();
        
        // 게시판 목록 새로고침 (현재 페이지 유지)
        currentPage = 1; // 삭제 후 첫 페이지로 이동
        loadBoardPosts();
        
    } catch (error) {
        console.error('게시글 삭제 오류:', error);
        showNotification('게시글 삭제 중 오류가 발생했습니다: ' + error.message, 'error');
    }
}

// 모달 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('postModal');
    const closeBtn = document.getElementById('modalClose');
    const closeBtn2 = document.getElementById('modalCloseBtn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePostModal);
    }
    
    if (closeBtn2) {
        closeBtn2.addEventListener('click', closePostModal);
    }
    
    // 모달 배경 클릭 시 닫기
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePostModal();
            }
        });
    }
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closePostModal();
        }
    });
});

