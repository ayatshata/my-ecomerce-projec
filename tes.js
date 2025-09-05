


        let currentPage = 1;
        const productsPerPage = 8;
        let allProducts = [];

        
        async function fetchProducts() {
            try {
                // const response = await fetch('https://api.example.com/products'); appi i used virtual api ///////
                
                const mockProducts = [
                
                    { id: 1, name: "هاتف ذكي", price: 899, category: "electronics", image: "images/092d0b53-15fb-4414-b637-c4be0aec8401.jfif", rating: 4.5, badge: "جديد" },
                    { id: 2, name: "سماعات لاسلكية", price: 199, category: "electronics", image: "images/سماعة رأس عالية الجودة مزودة بخاصية إلغاء الضوضاء….jpeg", rating: 4.2, badge: "عرض" },
                    { id: 3, name: " ساعة ذكي", price: 129, category: "electronics", image:"images/500f7aca-7bf8-4c01-9f47-45de9792ca9f.jfif", rating: 3.9 },
                    // { id: 4, name: "قلم ذكي ", price: 79, category: "clothing", image: "images/قلم ستايلس لجهاز ايباد الجيل التاسع والعاشر، قلم….jfif", rating: 4.2, badge: "جديد" },
                    // // { id: 5, name: "ساعة ذكية,", price: 349, category: "electronics", image: "https://via.placeholder.com/300", rating: 4.8 },
                    { id: 6, name: "حذاء رياضي", price: 259, category: "clothing", image: "images/زوج واحد من أحذية الرياضة ذات القاع السميك للبنات….jpeg", rating: 4.3 },
                    { id: 7, name: "سجادة صلاة", price: 45, category: "home", image: "images/e522fc91-da96-45b3-8e6d-c25572167537.jfif", rating: 4.9, badge: "الأكثر مبيعاً" },
                    { id: 8, name: "ماوس لاسلكي", price: 89, category: "electronics", image: "images/Wireless Mouse,Rechargeable Mouse Wireless 2_4G USB(Battery Level Visible) Ergonomic Computer Mouse,3 Levels DPI Silent Wireless Mice for Laptop PC Computer(Pink).jpeg", rating: 4.1 },
                    { id: 9, name: "مقلاة غير لاصقة", price: 120, category: "home", image: "images/Innerwell 11 inch Nonstick Crepe Pan, Granite….jpeg", rating: 4.4 },
                    
                    //  { id: 5, name: "قلم ذكي ", price: 79, category: "clothing", image: "images/قلم ستايلس لجهاز ايباد الجيل التاسع والعاشر، قلم….jfif", rating: 4.2, badge: "جديد" },
                    // // { id: 5, name: "ساعة ذكية,", price: 349, category: "electronics", image: "https://via.placeholder.com/300", rating: 4.8 },
                        
                        {id: 11, name: "شنطة ظهر", price: 149, category: "clothing", image:"images/Aesthetic School Bag.jpeg", rating: 4.6 },
                    { id: 12, name: "نظارة شمسية", price: 199, category: "clothing", image: "images/2025 FORQUEEN Gafas de sol de moda para mujer, gafas polarizadas Anti-UV400 con montura grande de.jpeg", rating: 4.0 },
                    { id: 13, name: "جهاز تحكم عن بعد", price: 59, category: "electronics", image: "images/Nowy pilot AC YAP1F do klimatyzatora Gree pilot….jpeg", rating: 3.8 }
                ];

                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                return mockProducts;
            } catch (error) {
                console.error('خطأ في جلب البيانات:', error);
                throw error;
            }
        }

        function displayProducts(products, page = 1) {
            const productsContainer = document.getElementById('products-container');
            const startIndex = (page - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const paginatedProducts = products.slice(startIndex, endIndex);

            if (paginatedProducts.length === 0) {
                productsContainer.innerHTML = '<div class="error">لم يتم العثور على منتجات</div>';
                return;
            }

            productsContainer.innerHTML = paginatedProducts.map(product => `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                        <div class="product-actions">
                            <!-- Bootstrap Icons version -->
<div class="product-action-btn"><i class="bi bi-heart-fill"></i></div>
<div class="product-action-btn"><i class="bi bi-cart-fill"></i></div>
<div class="product-action-btn"><i class="bi bi-eye-fill"></i></div>

                        </div>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">
                            <div class="price">${product.price} درهم</div>
                            <div class="rating">
                                ${generateStarRating(product.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            
            setupPagination(products.length, page);
        }

          
        function generateStarRating(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
            for (let i = 0; i < emptyStars; i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            return stars;
        }

        //   الترقيم
        function setupPagination(totalProducts, currentPage) {
            const totalPages = Math.ceil(totalProducts / productsPerPage);
            const paginationContainer = document.getElementById('pagination');
            
            if (totalPages <= 1) {
                paginationContainer.innerHTML = '';
                return;
            }
            
            let paginationHTML = '';
            
            if (currentPage > 1) {
                paginationHTML += `<button onclick="changePage(${currentPage - 1})">السابق</button>`;
            }
            
            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `<button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            }
            
            if (currentPage < totalPages) {
                paginationHTML += `<button onclick="changePage(${currentPage + 1})">التالي</button>`;
            }
            
            paginationContainer.innerHTML = paginationHTML;
        }

        //  لتغيير الصفحة
        function changePage(page) {
            currentPage = page;
            displayProducts(allProducts, currentPage);
            window.scrollTo(0, 0);
        }

        //  لتصفية المنتجات
        function filterProducts() {
            const categoryFilter = document.getElementById('category').value;
            const priceFilter = document.getElementById('price').value;
            const sortBy = document.getElementById('sort').value;
            
            let filteredProducts = [...allProducts];
            
            // تطبيق تصفية الفئة
            if (categoryFilter) {
                filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
            }
            
            // تطبيق تصفية السعر
            if (priceFilter) {
                const [min, max] = priceFilter.split('-').map(val => val === '+' ? Infinity : Number(val));
                filteredProducts = filteredProducts.filter(product => {
                    if (max === Infinity) return product.price >= min;
                    return product.price >= min && product.price <= max;
                });
            }
            
            // تطبيق الترتيب
            switch(sortBy) {
                case 'price-low':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'popular':
                    filteredProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default:
                    // الترتيب الافتراضي (الأحدث)
                    filteredProducts.sort((a, b) => b.id - a.id);
            }
            
            currentPage = 1;
            displayProducts(filteredProducts, currentPage);
        }

        // تهيئة الصفحة عند التحميل
        window.onload = async function() {
            try {
                const productsContainer = document.getElementById('products-container');
                productsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جارِ تحميل المنتجات...</div>';
                
                allProducts = await fetchProducts();
                displayProducts(allProducts, currentPage);
                
                // إضافة  الأحداث لخانات التصفية
                document.getElementById('category').addEventListener('change', filterProducts);
                document.getElementById('price').addEventListener('change', filterProducts);
                document.getElementById('sort').addEventListener('change', filterProducts);
                
            } catch (error) {
                document.getElementById('products-container').innerHTML = `
                    <div class="error">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>حدث خطأ في تحميل المنتجات</p>
                        <button onclick="window.location.reload()">إعادة المحاولة</button>
                    </div>
                `;
            }
        };