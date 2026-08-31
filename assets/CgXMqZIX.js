/*
 * @license
 * docx-viewer
 * Released under Apache License 2.0
 */
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x, {
    get: (a, b) => (typeof require < "u" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require < "u") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from == "object" || typeof from == "function")
      for (let key of __getOwnPropNames(from))
        !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
    mod
  ));

  // node_modules/pako/lib/utils/common.js
  var require_common = __commonJS({
    "node_modules/pako/lib/utils/common.js"(exports) {
      "use strict";
      var TYPED_OK = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
      function _has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      exports.assign = function(obj) {
        for (var sources = Array.prototype.slice.call(arguments, 1); sources.length; ) {
          var source = sources.shift();
          if (source) {
            if (typeof source != "object")
              throw new TypeError(source + "must be non-object");
            for (var p in source)
              _has(source, p) && (obj[p] = source[p]);
          }
        }
        return obj;
      };
      exports.shrinkBuf = function(buf, size) {
        return buf.length === size ? buf : buf.subarray ? buf.subarray(0, size) : (buf.length = size, buf);
      };
      var fnTyped = {
        arraySet: function(dest, src, src_offs, len, dest_offs) {
          if (src.subarray && dest.subarray) {
            dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
            return;
          }
          for (var i = 0; i < len; i++)
            dest[dest_offs + i] = src[src_offs + i];
        },
        // Join array of chunks to single array.
        flattenChunks: function(chunks) {
          var i, l, len, pos, chunk, result;
          for (len = 0, i = 0, l = chunks.length; i < l; i++)
            len += chunks[i].length;
          for (result = new Uint8Array(len), pos = 0, i = 0, l = chunks.length; i < l; i++)
            chunk = chunks[i], result.set(chunk, pos), pos += chunk.length;
          return result;
        }
      }, fnUntyped = {
        arraySet: function(dest, src, src_offs, len, dest_offs) {
          for (var i = 0; i < len; i++)
            dest[dest_offs + i] = src[src_offs + i];
        },
        // Join array of chunks to single array.
        flattenChunks: function(chunks) {
          return [].concat.apply([], chunks);
        }
      };
      exports.setTyped = function(on) {
        on ? (exports.Buf8 = Uint8Array, exports.Buf16 = Uint16Array, exports.Buf32 = Int32Array, exports.assign(exports, fnTyped)) : (exports.Buf8 = Array, exports.Buf16 = Array, exports.Buf32 = Array, exports.assign(exports, fnUntyped));
      };
      exports.setTyped(TYPED_OK);
    }
  });

  // node_modules/pako/lib/zlib/trees.js
  var require_trees = __commonJS({
    "node_modules/pako/lib/zlib/trees.js"(exports) {
      "use strict";
      var utils = require_common(), Z_FIXED = 4, Z_BINARY = 0, Z_TEXT = 1, Z_UNKNOWN = 2;
      function zero(buf) {
        for (var len = buf.length; --len >= 0; )
          buf[len] = 0;
      }
      var STORED_BLOCK = 0, STATIC_TREES = 1, DYN_TREES = 2, MIN_MATCH = 3, MAX_MATCH = 258, LENGTH_CODES = 29, LITERALS = 256, L_CODES = LITERALS + 1 + LENGTH_CODES, D_CODES = 30, BL_CODES = 19, HEAP_SIZE = 2 * L_CODES + 1, MAX_BITS = 15, Buf_size = 16, MAX_BL_BITS = 7, END_BLOCK = 256, REP_3_6 = 16, REPZ_3_10 = 17, REPZ_11_138 = 18, extra_lbits = (
        /* extra bits for each length code */
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
      ), extra_dbits = (
        /* extra bits for each distance code */
        [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
      ), extra_blbits = (
        /* extra bits for each bit length code */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
      ), bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], DIST_CODE_LEN = 512, static_ltree = new Array((L_CODES + 2) * 2);
      zero(static_ltree);
      var static_dtree = new Array(D_CODES * 2);
      zero(static_dtree);
      var _dist_code = new Array(DIST_CODE_LEN);
      zero(_dist_code);
      var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
      zero(_length_code);
      var base_length = new Array(LENGTH_CODES);
      zero(base_length);
      var base_dist = new Array(D_CODES);
      zero(base_dist);
      function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
        this.static_tree = static_tree, this.extra_bits = extra_bits, this.extra_base = extra_base, this.elems = elems, this.max_length = max_length, this.has_stree = static_tree && static_tree.length;
      }
      var static_l_desc, static_d_desc, static_bl_desc;
      function TreeDesc(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree, this.max_code = 0, this.stat_desc = stat_desc;
      }
      function d_code(dist) {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
      }
      function put_short(s, w) {
        s.pending_buf[s.pending++] = w & 255, s.pending_buf[s.pending++] = w >>> 8 & 255;
      }
      function send_bits(s, value, length) {
        s.bi_valid > Buf_size - length ? (s.bi_buf |= value << s.bi_valid & 65535, put_short(s, s.bi_buf), s.bi_buf = value >> Buf_size - s.bi_valid, s.bi_valid += length - Buf_size) : (s.bi_buf |= value << s.bi_valid & 65535, s.bi_valid += length);
      }
      function send_code(s, c, tree) {
        send_bits(
          s,
          tree[c * 2],
          tree[c * 2 + 1]
          /*.Len*/
        );
      }
      function bi_reverse(code, len) {
        var res = 0;
        do
          res |= code & 1, code >>>= 1, res <<= 1;
        while (--len > 0);
        return res >>> 1;
      }
      function bi_flush(s) {
        s.bi_valid === 16 ? (put_short(s, s.bi_buf), s.bi_buf = 0, s.bi_valid = 0) : s.bi_valid >= 8 && (s.pending_buf[s.pending++] = s.bi_buf & 255, s.bi_buf >>= 8, s.bi_valid -= 8);
      }
      function gen_bitlen(s, desc) {
        var tree = desc.dyn_tree, max_code = desc.max_code, stree = desc.stat_desc.static_tree, has_stree = desc.stat_desc.has_stree, extra = desc.stat_desc.extra_bits, base = desc.stat_desc.extra_base, max_length = desc.stat_desc.max_length, h, n, m, bits, xbits, f, overflow = 0;
        for (bits = 0; bits <= MAX_BITS; bits++)
          s.bl_count[bits] = 0;
        for (tree[s.heap[s.heap_max] * 2 + 1] = 0, h = s.heap_max + 1; h < HEAP_SIZE; h++)
          n = s.heap[h], bits = tree[tree[n * 2 + 1] * 2 + 1] + 1, bits > max_length && (bits = max_length, overflow++), tree[n * 2 + 1] = bits, !(n > max_code) && (s.bl_count[bits]++, xbits = 0, n >= base && (xbits = extra[n - base]), f = tree[n * 2], s.opt_len += f * (bits + xbits), has_stree && (s.static_len += f * (stree[n * 2 + 1] + xbits)));
        if (overflow !== 0) {
          do {
            for (bits = max_length - 1; s.bl_count[bits] === 0; )
              bits--;
            s.bl_count[bits]--, s.bl_count[bits + 1] += 2, s.bl_count[max_length]--, overflow -= 2;
          } while (overflow > 0);
          for (bits = max_length; bits !== 0; bits--)
            for (n = s.bl_count[bits]; n !== 0; )
              m = s.heap[--h], !(m > max_code) && (tree[m * 2 + 1] !== bits && (s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2], tree[m * 2 + 1] = bits), n--);
        }
      }
      function gen_codes(tree, max_code, bl_count) {
        var next_code = new Array(MAX_BITS + 1), code = 0, bits, n;
        for (bits = 1; bits <= MAX_BITS; bits++)
          next_code[bits] = code = code + bl_count[bits - 1] << 1;
        for (n = 0; n <= max_code; n++) {
          var len = tree[n * 2 + 1];
          len !== 0 && (tree[n * 2] = bi_reverse(next_code[len]++, len));
        }
      }
      function tr_static_init() {
        var n, bits, length, code, dist, bl_count = new Array(MAX_BITS + 1);
        for (length = 0, code = 0; code < LENGTH_CODES - 1; code++)
          for (base_length[code] = length, n = 0; n < 1 << extra_lbits[code]; n++)
            _length_code[length++] = code;
        for (_length_code[length - 1] = code, dist = 0, code = 0; code < 16; code++)
          for (base_dist[code] = dist, n = 0; n < 1 << extra_dbits[code]; n++)
            _dist_code[dist++] = code;
        for (dist >>= 7; code < D_CODES; code++)
          for (base_dist[code] = dist << 7, n = 0; n < 1 << extra_dbits[code] - 7; n++)
            _dist_code[256 + dist++] = code;
        for (bits = 0; bits <= MAX_BITS; bits++)
          bl_count[bits] = 0;
        for (n = 0; n <= 143; )
          static_ltree[n * 2 + 1] = 8, n++, bl_count[8]++;
        for (; n <= 255; )
          static_ltree[n * 2 + 1] = 9, n++, bl_count[9]++;
        for (; n <= 279; )
          static_ltree[n * 2 + 1] = 7, n++, bl_count[7]++;
        for (; n <= 287; )
          static_ltree[n * 2 + 1] = 8, n++, bl_count[8]++;
        for (gen_codes(static_ltree, L_CODES + 1, bl_count), n = 0; n < D_CODES; n++)
          static_dtree[n * 2 + 1] = 5, static_dtree[n * 2] = bi_reverse(n, 5);
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS), static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS), static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
      }
      function init_block(s) {
        var n;
        for (n = 0; n < L_CODES; n++)
          s.dyn_ltree[n * 2] = 0;
        for (n = 0; n < D_CODES; n++)
          s.dyn_dtree[n * 2] = 0;
        for (n = 0; n < BL_CODES; n++)
          s.bl_tree[n * 2] = 0;
        s.dyn_ltree[END_BLOCK * 2] = 1, s.opt_len = s.static_len = 0, s.last_lit = s.matches = 0;
      }
      function bi_windup(s) {
        s.bi_valid > 8 ? put_short(s, s.bi_buf) : s.bi_valid > 0 && (s.pending_buf[s.pending++] = s.bi_buf), s.bi_buf = 0, s.bi_valid = 0;
      }
      function copy_block(s, buf, len, header) {
        bi_windup(s), header && (put_short(s, len), put_short(s, ~len)), utils.arraySet(s.pending_buf, s.window, buf, len, s.pending), s.pending += len;
      }
      function smaller(tree, n, m, depth) {
        var _n2 = n * 2, _m2 = m * 2;
        return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
      }
      function pqdownheap(s, tree, k) {
        for (var v = s.heap[k], j = k << 1; j <= s.heap_len && (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth) && j++, !smaller(tree, v, s.heap[j], s.depth)); )
          s.heap[k] = s.heap[j], k = j, j <<= 1;
        s.heap[k] = v;
      }
      function compress_block(s, ltree, dtree) {
        var dist, lc, lx = 0, code, extra;
        if (s.last_lit !== 0)
          do
            dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1], lc = s.pending_buf[s.l_buf + lx], lx++, dist === 0 ? send_code(s, lc, ltree) : (code = _length_code[lc], send_code(s, code + LITERALS + 1, ltree), extra = extra_lbits[code], extra !== 0 && (lc -= base_length[code], send_bits(s, lc, extra)), dist--, code = d_code(dist), send_code(s, code, dtree), extra = extra_dbits[code], extra !== 0 && (dist -= base_dist[code], send_bits(s, dist, extra)));
          while (lx < s.last_lit);
        send_code(s, END_BLOCK, ltree);
      }
      function build_tree(s, desc) {
        var tree = desc.dyn_tree, stree = desc.stat_desc.static_tree, has_stree = desc.stat_desc.has_stree, elems = desc.stat_desc.elems, n, m, max_code = -1, node;
        for (s.heap_len = 0, s.heap_max = HEAP_SIZE, n = 0; n < elems; n++)
          tree[n * 2] !== 0 ? (s.heap[++s.heap_len] = max_code = n, s.depth[n] = 0) : tree[n * 2 + 1] = 0;
        for (; s.heap_len < 2; )
          node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0, tree[node * 2] = 1, s.depth[node] = 0, s.opt_len--, has_stree && (s.static_len -= stree[node * 2 + 1]);
        for (desc.max_code = max_code, n = s.heap_len >> 1; n >= 1; n--)
          pqdownheap(s, tree, n);
        node = elems;
        do
          n = s.heap[
            1
            /*SMALLEST*/
          ], s.heap[
            1
            /*SMALLEST*/
          ] = s.heap[s.heap_len--], pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          ), m = s.heap[
            1
            /*SMALLEST*/
          ], s.heap[--s.heap_max] = n, s.heap[--s.heap_max] = m, tree[node * 2] = tree[n * 2] + tree[m * 2], s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1, tree[n * 2 + 1] = tree[m * 2 + 1] = node, s.heap[
            1
            /*SMALLEST*/
          ] = node++, pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
        while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[
          1
          /*SMALLEST*/
        ], gen_bitlen(s, desc), gen_codes(tree, max_code, s.bl_count);
      }
      function scan_tree(s, tree, max_code) {
        var n, prevlen = -1, curlen, nextlen = tree[1], count = 0, max_count = 7, min_count = 4;
        for (nextlen === 0 && (max_count = 138, min_count = 3), tree[(max_code + 1) * 2 + 1] = 65535, n = 0; n <= max_code; n++)
          curlen = nextlen, nextlen = tree[(n + 1) * 2 + 1], !(++count < max_count && curlen === nextlen) && (count < min_count ? s.bl_tree[curlen * 2] += count : curlen !== 0 ? (curlen !== prevlen && s.bl_tree[curlen * 2]++, s.bl_tree[REP_3_6 * 2]++) : count <= 10 ? s.bl_tree[REPZ_3_10 * 2]++ : s.bl_tree[REPZ_11_138 * 2]++, count = 0, prevlen = curlen, nextlen === 0 ? (max_count = 138, min_count = 3) : curlen === nextlen ? (max_count = 6, min_count = 3) : (max_count = 7, min_count = 4));
      }
      function send_tree(s, tree, max_code) {
        var n, prevlen = -1, curlen, nextlen = tree[1], count = 0, max_count = 7, min_count = 4;
        for (nextlen === 0 && (max_count = 138, min_count = 3), n = 0; n <= max_code; n++)
          if (curlen = nextlen, nextlen = tree[(n + 1) * 2 + 1], !(++count < max_count && curlen === nextlen)) {
            if (count < min_count)
              do
                send_code(s, curlen, s.bl_tree);
              while (--count !== 0);
            else curlen !== 0 ? (curlen !== prevlen && (send_code(s, curlen, s.bl_tree), count--), send_code(s, REP_3_6, s.bl_tree), send_bits(s, count - 3, 2)) : count <= 10 ? (send_code(s, REPZ_3_10, s.bl_tree), send_bits(s, count - 3, 3)) : (send_code(s, REPZ_11_138, s.bl_tree), send_bits(s, count - 11, 7));
            count = 0, prevlen = curlen, nextlen === 0 ? (max_count = 138, min_count = 3) : curlen === nextlen ? (max_count = 6, min_count = 3) : (max_count = 7, min_count = 4);
          }
      }
      function build_bl_tree(s) {
        var max_blindex;
        for (scan_tree(s, s.dyn_ltree, s.l_desc.max_code), scan_tree(s, s.dyn_dtree, s.d_desc.max_code), build_tree(s, s.bl_desc), max_blindex = BL_CODES - 1; max_blindex >= 3 && s.bl_tree[bl_order[max_blindex] * 2 + 1] === 0; max_blindex--)
          ;
        return s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4, max_blindex;
      }
      function send_all_trees(s, lcodes, dcodes, blcodes) {
        var rank;
        for (send_bits(s, lcodes - 257, 5), send_bits(s, dcodes - 1, 5), send_bits(s, blcodes - 4, 4), rank = 0; rank < blcodes; rank++)
          send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
        send_tree(s, s.dyn_ltree, lcodes - 1), send_tree(s, s.dyn_dtree, dcodes - 1);
      }
      function detect_data_type(s) {
        var black_mask = 4093624447, n;
        for (n = 0; n <= 31; n++, black_mask >>>= 1)
          if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0)
            return Z_BINARY;
        if (s.dyn_ltree[18] !== 0 || s.dyn_ltree[20] !== 0 || s.dyn_ltree[26] !== 0)
          return Z_TEXT;
        for (n = 32; n < LITERALS; n++)
          if (s.dyn_ltree[n * 2] !== 0)
            return Z_TEXT;
        return Z_BINARY;
      }
      var static_init_done = !1;
      function _tr_init(s) {
        static_init_done || (tr_static_init(), static_init_done = !0), s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc), s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc), s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc), s.bi_buf = 0, s.bi_valid = 0, init_block(s);
      }
      function _tr_stored_block(s, buf, stored_len, last) {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3), copy_block(s, buf, stored_len, !0);
      }
      function _tr_align(s) {
        send_bits(s, STATIC_TREES << 1, 3), send_code(s, END_BLOCK, static_ltree), bi_flush(s);
      }
      function _tr_flush_block(s, buf, stored_len, last) {
        var opt_lenb, static_lenb, max_blindex = 0;
        s.level > 0 ? (s.strm.data_type === Z_UNKNOWN && (s.strm.data_type = detect_data_type(s)), build_tree(s, s.l_desc), build_tree(s, s.d_desc), max_blindex = build_bl_tree(s), opt_lenb = s.opt_len + 3 + 7 >>> 3, static_lenb = s.static_len + 3 + 7 >>> 3, static_lenb <= opt_lenb && (opt_lenb = static_lenb)) : opt_lenb = static_lenb = stored_len + 5, stored_len + 4 <= opt_lenb && buf !== -1 ? _tr_stored_block(s, buf, stored_len, last) : s.strategy === Z_FIXED || static_lenb === opt_lenb ? (send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3), compress_block(s, static_ltree, static_dtree)) : (send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3), send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1), compress_block(s, s.dyn_ltree, s.dyn_dtree)), init_block(s), last && bi_windup(s);
      }
      function _tr_tally(s, dist, lc) {
        return s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255, s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255, s.pending_buf[s.l_buf + s.last_lit] = lc & 255, s.last_lit++, dist === 0 ? s.dyn_ltree[lc * 2]++ : (s.matches++, dist--, s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++, s.dyn_dtree[d_code(dist) * 2]++), s.last_lit === s.lit_bufsize - 1;
      }
      exports._tr_init = _tr_init;
      exports._tr_stored_block = _tr_stored_block;
      exports._tr_flush_block = _tr_flush_block;
      exports._tr_tally = _tr_tally;
      exports._tr_align = _tr_align;
    }
  });

  // node_modules/pako/lib/zlib/adler32.js
  var require_adler32 = __commonJS({
    "node_modules/pako/lib/zlib/adler32.js"(exports, module) {
      "use strict";
      function adler32(adler, buf, len, pos) {
        for (var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0; len !== 0; ) {
          n = len > 2e3 ? 2e3 : len, len -= n;
          do
            s1 = s1 + buf[pos++] | 0, s2 = s2 + s1 | 0;
          while (--n);
          s1 %= 65521, s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
      }
      module.exports = adler32;
    }
  });

  // node_modules/pako/lib/zlib/crc32.js
  var require_crc32 = __commonJS({
    "node_modules/pako/lib/zlib/crc32.js"(exports, module) {
      "use strict";
      function makeTable() {
        for (var c, table = [], n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++)
            c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          table[n] = c;
        }
        return table;
      }
      var crcTable2 = makeTable();
      function crc322(crc, buf, len, pos) {
        var t = crcTable2, end = pos + len;
        crc ^= -1;
        for (var i = pos; i < end; i++)
          crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
        return crc ^ -1;
      }
      module.exports = crc322;
    }
  });

  // node_modules/pako/lib/zlib/messages.js
  var require_messages = __commonJS({
    "node_modules/pako/lib/zlib/messages.js"(exports, module) {
      "use strict";
      module.exports = {
        2: "need dictionary",
        /* Z_NEED_DICT       2  */
        1: "stream end",
        /* Z_STREAM_END      1  */
        0: "",
        /* Z_OK              0  */
        "-1": "file error",
        /* Z_ERRNO         (-1) */
        "-2": "stream error",
        /* Z_STREAM_ERROR  (-2) */
        "-3": "data error",
        /* Z_DATA_ERROR    (-3) */
        "-4": "insufficient memory",
        /* Z_MEM_ERROR     (-4) */
        "-5": "buffer error",
        /* Z_BUF_ERROR     (-5) */
        "-6": "incompatible version"
        /* Z_VERSION_ERROR (-6) */
      };
    }
  });

  // node_modules/pako/lib/zlib/deflate.js
  var require_deflate = __commonJS({
    "node_modules/pako/lib/zlib/deflate.js"(exports) {
      "use strict";
      var utils = require_common(), trees = require_trees(), adler32 = require_adler32(), crc322 = require_crc32(), msg = require_messages(), Z_NO_FLUSH = 0, Z_PARTIAL_FLUSH = 1, Z_FULL_FLUSH = 3, Z_FINISH = 4, Z_BLOCK = 5, Z_OK = 0, Z_STREAM_END = 1, Z_STREAM_ERROR = -2, Z_DATA_ERROR = -3, Z_BUF_ERROR = -5, Z_DEFAULT_COMPRESSION = -1, Z_FILTERED = 1, Z_HUFFMAN_ONLY = 2, Z_RLE = 3, Z_FIXED = 4, Z_DEFAULT_STRATEGY = 0, Z_UNKNOWN = 2, Z_DEFLATED = 8, MAX_MEM_LEVEL = 9, MAX_WBITS = 15, DEF_MEM_LEVEL = 8, LENGTH_CODES = 29, LITERALS = 256, L_CODES = LITERALS + 1 + LENGTH_CODES, D_CODES = 30, BL_CODES = 19, HEAP_SIZE = 2 * L_CODES + 1, MAX_BITS = 15, MIN_MATCH = 3, MAX_MATCH = 258, MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1, PRESET_DICT = 32, INIT_STATE = 42, EXTRA_STATE = 69, NAME_STATE = 73, COMMENT_STATE = 91, HCRC_STATE = 103, BUSY_STATE = 113, FINISH_STATE = 666, BS_NEED_MORE = 1, BS_BLOCK_DONE = 2, BS_FINISH_STARTED = 3, BS_FINISH_DONE = 4, OS_CODE = 3;
      function err(strm, errorCode) {
        return strm.msg = msg[errorCode], errorCode;
      }
      function rank(f) {
        return (f << 1) - (f > 4 ? 9 : 0);
      }
      function zero(buf) {
        for (var len = buf.length; --len >= 0; )
          buf[len] = 0;
      }
      function flush_pending(strm) {
        var s = strm.state, len = s.pending;
        len > strm.avail_out && (len = strm.avail_out), len !== 0 && (utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out), strm.next_out += len, s.pending_out += len, strm.total_out += len, strm.avail_out -= len, s.pending -= len, s.pending === 0 && (s.pending_out = 0));
      }
      function flush_block_only(s, last) {
        trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last), s.block_start = s.strstart, flush_pending(s.strm);
      }
      function put_byte(s, b) {
        s.pending_buf[s.pending++] = b;
      }
      function putShortMSB(s, b) {
        s.pending_buf[s.pending++] = b >>> 8 & 255, s.pending_buf[s.pending++] = b & 255;
      }
      function read_buf(strm, buf, start, size) {
        var len = strm.avail_in;
        return len > size && (len = size), len === 0 ? 0 : (strm.avail_in -= len, utils.arraySet(buf, strm.input, strm.next_in, len, start), strm.state.wrap === 1 ? strm.adler = adler32(strm.adler, buf, len, start) : strm.state.wrap === 2 && (strm.adler = crc322(strm.adler, buf, len, start)), strm.next_in += len, strm.total_in += len, len);
      }
      function longest_match(s, cur_match) {
        var chain_length = s.max_chain_length, scan = s.strstart, match, len, best_len = s.prev_length, nice_match = s.nice_match, limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0, _win = s.window, wmask = s.w_mask, prev = s.prev, strend = s.strstart + MAX_MATCH, scan_end1 = _win[scan + best_len - 1], scan_end = _win[scan + best_len];
        s.prev_length >= s.good_match && (chain_length >>= 2), nice_match > s.lookahead && (nice_match = s.lookahead);
        do
          if (match = cur_match, !(_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1])) {
            scan += 2, match++;
            do
              ;
            while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
            if (len = MAX_MATCH - (strend - scan), scan = strend - MAX_MATCH, len > best_len) {
              if (s.match_start = cur_match, best_len = len, len >= nice_match)
                break;
              scan_end1 = _win[scan + best_len - 1], scan_end = _win[scan + best_len];
            }
          }
        while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        return best_len <= s.lookahead ? best_len : s.lookahead;
      }
      function fill_window(s) {
        var _w_size = s.w_size, p, n, m, more, str;
        do {
          if (more = s.window_size - s.lookahead - s.strstart, s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
            utils.arraySet(s.window, s.window, _w_size, _w_size, 0), s.match_start -= _w_size, s.strstart -= _w_size, s.block_start -= _w_size, n = s.hash_size, p = n;
            do
              m = s.head[--p], s.head[p] = m >= _w_size ? m - _w_size : 0;
            while (--n);
            n = _w_size, p = n;
            do
              m = s.prev[--p], s.prev[p] = m >= _w_size ? m - _w_size : 0;
            while (--n);
            more += _w_size;
          }
          if (s.strm.avail_in === 0)
            break;
          if (n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more), s.lookahead += n, s.lookahead + s.insert >= MIN_MATCH)
            for (str = s.strstart - s.insert, s.ins_h = s.window[str], s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask; s.insert && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask, s.prev[str & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = str, str++, s.insert--, !(s.lookahead + s.insert < MIN_MATCH)); )
              ;
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
      }
      function deflate_stored(s, flush) {
        var max_block_size = 65535;
        for (max_block_size > s.pending_buf_size - 5 && (max_block_size = s.pending_buf_size - 5); ; ) {
          if (s.lookahead <= 1) {
            if (fill_window(s), s.lookahead === 0 && flush === Z_NO_FLUSH)
              return BS_NEED_MORE;
            if (s.lookahead === 0)
              break;
          }
          s.strstart += s.lookahead, s.lookahead = 0;
          var max_start = s.block_start + max_block_size;
          if ((s.strstart === 0 || s.strstart >= max_start) && (s.lookahead = s.strstart - max_start, s.strstart = max_start, flush_block_only(s, !1), s.strm.avail_out === 0) || s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD && (flush_block_only(s, !1), s.strm.avail_out === 0))
            return BS_NEED_MORE;
        }
        return s.insert = 0, flush === Z_FINISH ? (flush_block_only(s, !0), s.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE) : (s.strstart > s.block_start && (flush_block_only(s, !1), s.strm.avail_out === 0), BS_NEED_MORE);
      }
      function deflate_fast(s, flush) {
        for (var hash_head, bflush; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            if (fill_window(s), s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH)
              return BS_NEED_MORE;
            if (s.lookahead === 0)
              break;
          }
          if (hash_head = 0, s.lookahead >= MIN_MATCH && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask, hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD && (s.match_length = longest_match(s, hash_head)), s.match_length >= MIN_MATCH)
            if (bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH), s.lookahead -= s.match_length, s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
              s.match_length--;
              do
                s.strstart++, s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask, hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart;
              while (--s.match_length !== 0);
              s.strstart++;
            } else
              s.strstart += s.match_length, s.match_length = 0, s.ins_h = s.window[s.strstart], s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
          else
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]), s.lookahead--, s.strstart++;
          if (bflush && (flush_block_only(s, !1), s.strm.avail_out === 0))
            return BS_NEED_MORE;
        }
        return s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1, flush === Z_FINISH ? (flush_block_only(s, !0), s.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE) : s.last_lit && (flush_block_only(s, !1), s.strm.avail_out === 0) ? BS_NEED_MORE : BS_BLOCK_DONE;
      }
      function deflate_slow(s, flush) {
        for (var hash_head, bflush, max_insert; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            if (fill_window(s), s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH)
              return BS_NEED_MORE;
            if (s.lookahead === 0)
              break;
          }
          if (hash_head = 0, s.lookahead >= MIN_MATCH && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask, hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart), s.prev_length = s.match_length, s.prev_match = s.match_start, s.match_length = MIN_MATCH - 1, hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD && (s.match_length = longest_match(s, hash_head), s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096) && (s.match_length = MIN_MATCH - 1)), s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH, bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH), s.lookahead -= s.prev_length - 1, s.prev_length -= 2;
            do
              ++s.strstart <= max_insert && (s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask, hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = s.strstart);
            while (--s.prev_length !== 0);
            if (s.match_available = 0, s.match_length = MIN_MATCH - 1, s.strstart++, bflush && (flush_block_only(s, !1), s.strm.avail_out === 0))
              return BS_NEED_MORE;
          } else if (s.match_available) {
            if (bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]), bflush && flush_block_only(s, !1), s.strstart++, s.lookahead--, s.strm.avail_out === 0)
              return BS_NEED_MORE;
          } else
            s.match_available = 1, s.strstart++, s.lookahead--;
        }
        return s.match_available && (bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]), s.match_available = 0), s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1, flush === Z_FINISH ? (flush_block_only(s, !0), s.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE) : s.last_lit && (flush_block_only(s, !1), s.strm.avail_out === 0) ? BS_NEED_MORE : BS_BLOCK_DONE;
      }
      function deflate_rle(s, flush) {
        for (var bflush, prev, scan, strend, _win = s.window; ; ) {
          if (s.lookahead <= MAX_MATCH) {
            if (fill_window(s), s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH)
              return BS_NEED_MORE;
            if (s.lookahead === 0)
              break;
          }
          if (s.match_length = 0, s.lookahead >= MIN_MATCH && s.strstart > 0 && (scan = s.strstart - 1, prev = _win[scan], prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan])) {
            strend = s.strstart + MAX_MATCH;
            do
              ;
            while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
            s.match_length = MAX_MATCH - (strend - scan), s.match_length > s.lookahead && (s.match_length = s.lookahead);
          }
          if (s.match_length >= MIN_MATCH ? (bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH), s.lookahead -= s.match_length, s.strstart += s.match_length, s.match_length = 0) : (bflush = trees._tr_tally(s, 0, s.window[s.strstart]), s.lookahead--, s.strstart++), bflush && (flush_block_only(s, !1), s.strm.avail_out === 0))
            return BS_NEED_MORE;
        }
        return s.insert = 0, flush === Z_FINISH ? (flush_block_only(s, !0), s.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE) : s.last_lit && (flush_block_only(s, !1), s.strm.avail_out === 0) ? BS_NEED_MORE : BS_BLOCK_DONE;
      }
      function deflate_huff(s, flush) {
        for (var bflush; ; ) {
          if (s.lookahead === 0 && (fill_window(s), s.lookahead === 0)) {
            if (flush === Z_NO_FLUSH)
              return BS_NEED_MORE;
            break;
          }
          if (s.match_length = 0, bflush = trees._tr_tally(s, 0, s.window[s.strstart]), s.lookahead--, s.strstart++, bflush && (flush_block_only(s, !1), s.strm.avail_out === 0))
            return BS_NEED_MORE;
        }
        return s.insert = 0, flush === Z_FINISH ? (flush_block_only(s, !0), s.strm.avail_out === 0 ? BS_FINISH_STARTED : BS_FINISH_DONE) : s.last_lit && (flush_block_only(s, !1), s.strm.avail_out === 0) ? BS_NEED_MORE : BS_BLOCK_DONE;
      }
      function Config(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length, this.max_lazy = max_lazy, this.nice_length = nice_length, this.max_chain = max_chain, this.func = func;
      }
      var configuration_table;
      configuration_table = [
        /*      good lazy nice chain */
        new Config(0, 0, 0, 0, deflate_stored),
        /* 0 store only */
        new Config(4, 4, 8, 4, deflate_fast),
        /* 1 max speed, no lazy matches */
        new Config(4, 5, 16, 8, deflate_fast),
        /* 2 */
        new Config(4, 6, 32, 32, deflate_fast),
        /* 3 */
        new Config(4, 4, 16, 16, deflate_slow),
        /* 4 lazy matches */
        new Config(8, 16, 32, 32, deflate_slow),
        /* 5 */
        new Config(8, 16, 128, 128, deflate_slow),
        /* 6 */
        new Config(8, 32, 128, 256, deflate_slow),
        /* 7 */
        new Config(32, 128, 258, 1024, deflate_slow),
        /* 8 */
        new Config(32, 258, 258, 4096, deflate_slow)
        /* 9 max compression */
      ];
      function lm_init(s) {
        s.window_size = 2 * s.w_size, zero(s.head), s.max_lazy_match = configuration_table[s.level].max_lazy, s.good_match = configuration_table[s.level].good_length, s.nice_match = configuration_table[s.level].nice_length, s.max_chain_length = configuration_table[s.level].max_chain, s.strstart = 0, s.block_start = 0, s.lookahead = 0, s.insert = 0, s.match_length = s.prev_length = MIN_MATCH - 1, s.match_available = 0, s.ins_h = 0;
      }
      function DeflateState() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Z_DEFLATED, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2), this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2), this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2), zero(this.dyn_ltree), zero(this.dyn_dtree), zero(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new utils.Buf16(MAX_BITS + 1), this.heap = new utils.Buf16(2 * L_CODES + 1), zero(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new utils.Buf16(2 * L_CODES + 1), zero(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function deflateResetKeep(strm) {
        var s;
        return !strm || !strm.state ? err(strm, Z_STREAM_ERROR) : (strm.total_in = strm.total_out = 0, strm.data_type = Z_UNKNOWN, s = strm.state, s.pending = 0, s.pending_out = 0, s.wrap < 0 && (s.wrap = -s.wrap), s.status = s.wrap ? INIT_STATE : BUSY_STATE, strm.adler = s.wrap === 2 ? 0 : 1, s.last_flush = Z_NO_FLUSH, trees._tr_init(s), Z_OK);
      }
      function deflateReset(strm) {
        var ret = deflateResetKeep(strm);
        return ret === Z_OK && lm_init(strm.state), ret;
      }
      function deflateSetHeader(strm, head) {
        return !strm || !strm.state || strm.state.wrap !== 2 ? Z_STREAM_ERROR : (strm.state.gzhead = head, Z_OK);
      }
      function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
        if (!strm)
          return Z_STREAM_ERROR;
        var wrap = 1;
        if (level === Z_DEFAULT_COMPRESSION && (level = 6), windowBits < 0 ? (wrap = 0, windowBits = -windowBits) : windowBits > 15 && (wrap = 2, windowBits -= 16), memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED)
          return err(strm, Z_STREAM_ERROR);
        windowBits === 8 && (windowBits = 9);
        var s = new DeflateState();
        return strm.state = s, s.strm = strm, s.wrap = wrap, s.gzhead = null, s.w_bits = windowBits, s.w_size = 1 << s.w_bits, s.w_mask = s.w_size - 1, s.hash_bits = memLevel + 7, s.hash_size = 1 << s.hash_bits, s.hash_mask = s.hash_size - 1, s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH), s.window = new utils.Buf8(s.w_size * 2), s.head = new utils.Buf16(s.hash_size), s.prev = new utils.Buf16(s.w_size), s.lit_bufsize = 1 << memLevel + 6, s.pending_buf_size = s.lit_bufsize * 4, s.pending_buf = new utils.Buf8(s.pending_buf_size), s.d_buf = 1 * s.lit_bufsize, s.l_buf = 3 * s.lit_bufsize, s.level = level, s.strategy = strategy, s.method = method, deflateReset(strm);
      }
      function deflateInit(strm, level) {
        return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
      }
      function deflate(strm, flush) {
        var old_flush, s, beg, val;
        if (!strm || !strm.state || flush > Z_BLOCK || flush < 0)
          return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
        if (s = strm.state, !strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH)
          return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
        if (s.strm = strm, old_flush = s.last_flush, s.last_flush = flush, s.status === INIT_STATE)
          if (s.wrap === 2)
            strm.adler = 0, put_byte(s, 31), put_byte(s, 139), put_byte(s, 8), s.gzhead ? (put_byte(
              s,
              (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)
            ), put_byte(s, s.gzhead.time & 255), put_byte(s, s.gzhead.time >> 8 & 255), put_byte(s, s.gzhead.time >> 16 & 255), put_byte(s, s.gzhead.time >> 24 & 255), put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0), put_byte(s, s.gzhead.os & 255), s.gzhead.extra && s.gzhead.extra.length && (put_byte(s, s.gzhead.extra.length & 255), put_byte(s, s.gzhead.extra.length >> 8 & 255)), s.gzhead.hcrc && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending, 0)), s.gzindex = 0, s.status = EXTRA_STATE) : (put_byte(s, 0), put_byte(s, 0), put_byte(s, 0), put_byte(s, 0), put_byte(s, 0), put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0), put_byte(s, OS_CODE), s.status = BUSY_STATE);
          else {
            var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8, level_flags = -1;
            s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? level_flags = 0 : s.level < 6 ? level_flags = 1 : s.level === 6 ? level_flags = 2 : level_flags = 3, header |= level_flags << 6, s.strstart !== 0 && (header |= PRESET_DICT), header += 31 - header % 31, s.status = BUSY_STATE, putShortMSB(s, header), s.strstart !== 0 && (putShortMSB(s, strm.adler >>> 16), putShortMSB(s, strm.adler & 65535)), strm.adler = 1;
          }
        if (s.status === EXTRA_STATE)
          if (s.gzhead.extra) {
            for (beg = s.pending; s.gzindex < (s.gzhead.extra.length & 65535) && !(s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > beg && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg)), flush_pending(strm), beg = s.pending, s.pending === s.pending_buf_size)); )
              put_byte(s, s.gzhead.extra[s.gzindex] & 255), s.gzindex++;
            s.gzhead.hcrc && s.pending > beg && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg)), s.gzindex === s.gzhead.extra.length && (s.gzindex = 0, s.status = NAME_STATE);
          } else
            s.status = NAME_STATE;
        if (s.status === NAME_STATE)
          if (s.gzhead.name) {
            beg = s.pending;
            do {
              if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > beg && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg)), flush_pending(strm), beg = s.pending, s.pending === s.pending_buf_size)) {
                val = 1;
                break;
              }
              s.gzindex < s.gzhead.name.length ? val = s.gzhead.name.charCodeAt(s.gzindex++) & 255 : val = 0, put_byte(s, val);
            } while (val !== 0);
            s.gzhead.hcrc && s.pending > beg && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg)), val === 0 && (s.gzindex = 0, s.status = COMMENT_STATE);
          } else
            s.status = COMMENT_STATE;
        if (s.status === COMMENT_STATE)
          if (s.gzhead.comment) {
            beg = s.pending;
            do {
              if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > beg && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg)), flush_pending(strm), beg = s.pending, s.pending === s.pending_buf_size)) {
                val = 1;
                break;
              }
              s.gzindex < s.gzhead.comment.length ? val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255 : val = 0, put_byte(s, val);
            } while (val !== 0);
            s.gzhead.hcrc && s.pending > beg && (strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg)), val === 0 && (s.status = HCRC_STATE);
          } else
            s.status = HCRC_STATE;
        if (s.status === HCRC_STATE && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && flush_pending(strm), s.pending + 2 <= s.pending_buf_size && (put_byte(s, strm.adler & 255), put_byte(s, strm.adler >> 8 & 255), strm.adler = 0, s.status = BUSY_STATE)) : s.status = BUSY_STATE), s.pending !== 0) {
          if (flush_pending(strm), strm.avail_out === 0)
            return s.last_flush = -1, Z_OK;
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH)
          return err(strm, Z_BUF_ERROR);
        if (s.status === FINISH_STATE && strm.avail_in !== 0)
          return err(strm, Z_BUF_ERROR);
        if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
          var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
          if ((bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) && (s.status = FINISH_STATE), bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED)
            return strm.avail_out === 0 && (s.last_flush = -1), Z_OK;
          if (bstate === BS_BLOCK_DONE && (flush === Z_PARTIAL_FLUSH ? trees._tr_align(s) : flush !== Z_BLOCK && (trees._tr_stored_block(s, 0, 0, !1), flush === Z_FULL_FLUSH && (zero(s.head), s.lookahead === 0 && (s.strstart = 0, s.block_start = 0, s.insert = 0))), flush_pending(strm), strm.avail_out === 0))
            return s.last_flush = -1, Z_OK;
        }
        return flush !== Z_FINISH ? Z_OK : s.wrap <= 0 ? Z_STREAM_END : (s.wrap === 2 ? (put_byte(s, strm.adler & 255), put_byte(s, strm.adler >> 8 & 255), put_byte(s, strm.adler >> 16 & 255), put_byte(s, strm.adler >> 24 & 255), put_byte(s, strm.total_in & 255), put_byte(s, strm.total_in >> 8 & 255), put_byte(s, strm.total_in >> 16 & 255), put_byte(s, strm.total_in >> 24 & 255)) : (putShortMSB(s, strm.adler >>> 16), putShortMSB(s, strm.adler & 65535)), flush_pending(strm), s.wrap > 0 && (s.wrap = -s.wrap), s.pending !== 0 ? Z_OK : Z_STREAM_END);
      }
      function deflateEnd(strm) {
        var status;
        return !strm || !strm.state ? Z_STREAM_ERROR : (status = strm.state.status, status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE ? err(strm, Z_STREAM_ERROR) : (strm.state = null, status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK));
      }
      function deflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length, s, str, n, wrap, avail, next, input, tmpDict;
        if (!strm || !strm.state || (s = strm.state, wrap = s.wrap, wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead))
          return Z_STREAM_ERROR;
        for (wrap === 1 && (strm.adler = adler32(strm.adler, dictionary, dictLength, 0)), s.wrap = 0, dictLength >= s.w_size && (wrap === 0 && (zero(s.head), s.strstart = 0, s.block_start = 0, s.insert = 0), tmpDict = new utils.Buf8(s.w_size), utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0), dictionary = tmpDict, dictLength = s.w_size), avail = strm.avail_in, next = strm.next_in, input = strm.input, strm.avail_in = dictLength, strm.next_in = 0, strm.input = dictionary, fill_window(s); s.lookahead >= MIN_MATCH; ) {
          str = s.strstart, n = s.lookahead - (MIN_MATCH - 1);
          do
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask, s.prev[str & s.w_mask] = s.head[s.ins_h], s.head[s.ins_h] = str, str++;
          while (--n);
          s.strstart = str, s.lookahead = MIN_MATCH - 1, fill_window(s);
        }
        return s.strstart += s.lookahead, s.block_start = s.strstart, s.insert = s.lookahead, s.lookahead = 0, s.match_length = s.prev_length = MIN_MATCH - 1, s.match_available = 0, strm.next_in = next, strm.input = input, strm.avail_in = avail, s.wrap = wrap, Z_OK;
      }
      exports.deflateInit = deflateInit;
      exports.deflateInit2 = deflateInit2;
      exports.deflateReset = deflateReset;
      exports.deflateResetKeep = deflateResetKeep;
      exports.deflateSetHeader = deflateSetHeader;
      exports.deflate = deflate;
      exports.deflateEnd = deflateEnd;
      exports.deflateSetDictionary = deflateSetDictionary;
      exports.deflateInfo = "pako deflate (from Nodeca project)";
    }
  });

  // node_modules/pako/lib/utils/strings.js
  var require_strings = __commonJS({
    "node_modules/pako/lib/utils/strings.js"(exports) {
      "use strict";
      var utils = require_common(), STR_APPLY_OK = !0, STR_APPLY_UIA_OK = !0;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch {
        STR_APPLY_OK = !1;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch {
        STR_APPLY_UIA_OK = !1;
      }
      var _utf8len = new utils.Buf8(256);
      for (q = 0; q < 256; q++)
        _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
      var q;
      _utf8len[254] = _utf8len[254] = 1;
      exports.string2buf = function(str) {
        var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++)
          c = str.charCodeAt(m_pos), (c & 64512) === 55296 && m_pos + 1 < str_len && (c2 = str.charCodeAt(m_pos + 1), (c2 & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (c2 - 56320), m_pos++)), buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        for (buf = new utils.Buf8(buf_len), i = 0, m_pos = 0; i < buf_len; m_pos++)
          c = str.charCodeAt(m_pos), (c & 64512) === 55296 && m_pos + 1 < str_len && (c2 = str.charCodeAt(m_pos + 1), (c2 & 64512) === 56320 && (c = 65536 + (c - 55296 << 10) + (c2 - 56320), m_pos++)), c < 128 ? buf[i++] = c : c < 2048 ? (buf[i++] = 192 | c >>> 6, buf[i++] = 128 | c & 63) : c < 65536 ? (buf[i++] = 224 | c >>> 12, buf[i++] = 128 | c >>> 6 & 63, buf[i++] = 128 | c & 63) : (buf[i++] = 240 | c >>> 18, buf[i++] = 128 | c >>> 12 & 63, buf[i++] = 128 | c >>> 6 & 63, buf[i++] = 128 | c & 63);
        return buf;
      };
      function buf2binstring(buf, len) {
        if (len < 65534 && (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK))
          return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
        for (var result = "", i = 0; i < len; i++)
          result += String.fromCharCode(buf[i]);
        return result;
      }
      exports.buf2binstring = function(buf) {
        return buf2binstring(buf, buf.length);
      };
      exports.binstring2buf = function(str) {
        for (var buf = new utils.Buf8(str.length), i = 0, len = buf.length; i < len; i++)
          buf[i] = str.charCodeAt(i);
        return buf;
      };
      exports.buf2string = function(buf, max) {
        var i, out, c, c_len, len = max || buf.length, utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          if (c = buf[i++], c < 128) {
            utf16buf[out++] = c;
            continue;
          }
          if (c_len = _utf8len[c], c_len > 4) {
            utf16buf[out++] = 65533, i += c_len - 1;
            continue;
          }
          for (c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7; c_len > 1 && i < len; )
            c = c << 6 | buf[i++] & 63, c_len--;
          if (c_len > 1) {
            utf16buf[out++] = 65533;
            continue;
          }
          c < 65536 ? utf16buf[out++] = c : (c -= 65536, utf16buf[out++] = 55296 | c >> 10 & 1023, utf16buf[out++] = 56320 | c & 1023);
        }
        return buf2binstring(utf16buf, out);
      };
      exports.utf8border = function(buf, max) {
        var pos;
        for (max = max || buf.length, max > buf.length && (max = buf.length), pos = max - 1; pos >= 0 && (buf[pos] & 192) === 128; )
          pos--;
        return pos < 0 || pos === 0 ? max : pos + _utf8len[buf[pos]] > max ? pos : max;
      };
    }
  });

  // node_modules/pako/lib/zlib/zstream.js
  var require_zstream = __commonJS({
    "node_modules/pako/lib/zlib/zstream.js"(exports, module) {
      "use strict";
      function ZStream() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      }
      module.exports = ZStream;
    }
  });

  // node_modules/pako/lib/deflate.js
  var require_deflate2 = __commonJS({
    "node_modules/pako/lib/deflate.js"(exports) {
      "use strict";
      var zlib_deflate = require_deflate(), utils = require_common(), strings = require_strings(), msg = require_messages(), ZStream = require_zstream(), toString = Object.prototype.toString, Z_NO_FLUSH = 0, Z_FINISH = 4, Z_OK = 0, Z_STREAM_END = 1, Z_SYNC_FLUSH = 2, Z_DEFAULT_COMPRESSION = -1, Z_DEFAULT_STRATEGY = 0, Z_DEFLATED = 8;
      function Deflate(options) {
        if (!(this instanceof Deflate)) return new Deflate(options);
        this.options = utils.assign({
          level: Z_DEFAULT_COMPRESSION,
          method: Z_DEFLATED,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Z_DEFAULT_STRATEGY,
          to: ""
        }, options || {});
        var opt = this.options;
        opt.raw && opt.windowBits > 0 ? opt.windowBits = -opt.windowBits : opt.gzip && opt.windowBits > 0 && opt.windowBits < 16 && (opt.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ZStream(), this.strm.avail_out = 0;
        var status = zlib_deflate.deflateInit2(
          this.strm,
          opt.level,
          opt.method,
          opt.windowBits,
          opt.memLevel,
          opt.strategy
        );
        if (status !== Z_OK)
          throw new Error(msg[status]);
        if (opt.header && zlib_deflate.deflateSetHeader(this.strm, opt.header), opt.dictionary) {
          var dict;
          if (typeof opt.dictionary == "string" ? dict = strings.string2buf(opt.dictionary) : toString.call(opt.dictionary) === "[object ArrayBuffer]" ? dict = new Uint8Array(opt.dictionary) : dict = opt.dictionary, status = zlib_deflate.deflateSetDictionary(this.strm, dict), status !== Z_OK)
            throw new Error(msg[status]);
          this._dict_set = !0;
        }
      }
      Deflate.prototype.push = function(data, mode) {
        var strm = this.strm, chunkSize = this.options.chunkSize, status, _mode;
        if (this.ended)
          return !1;
        _mode = mode === ~~mode ? mode : mode === !0 ? Z_FINISH : Z_NO_FLUSH, typeof data == "string" ? strm.input = strings.string2buf(data) : toString.call(data) === "[object ArrayBuffer]" ? strm.input = new Uint8Array(data) : strm.input = data, strm.next_in = 0, strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0 && (strm.output = new utils.Buf8(chunkSize), strm.next_out = 0, strm.avail_out = chunkSize), status = zlib_deflate.deflate(strm, _mode), status !== Z_STREAM_END && status !== Z_OK)
            return this.onEnd(status), this.ended = !0, !1;
          (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) && (this.options.to === "string" ? this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out))) : this.onData(utils.shrinkBuf(strm.output, strm.next_out)));
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
        return _mode === Z_FINISH ? (status = zlib_deflate.deflateEnd(this.strm), this.onEnd(status), this.ended = !0, status === Z_OK) : (_mode === Z_SYNC_FLUSH && (this.onEnd(Z_OK), strm.avail_out = 0), !0);
      };
      Deflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Deflate.prototype.onEnd = function(status) {
        status === Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = utils.flattenChunks(this.chunks)), this.chunks = [], this.err = status, this.msg = this.strm.msg;
      };
      function deflate(input, options) {
        var deflator = new Deflate(options);
        if (deflator.push(input, !0), deflator.err)
          throw deflator.msg || msg[deflator.err];
        return deflator.result;
      }
      function deflateRaw(input, options) {
        return options = options || {}, options.raw = !0, deflate(input, options);
      }
      function gzip(input, options) {
        return options = options || {}, options.gzip = !0, deflate(input, options);
      }
      exports.Deflate = Deflate;
      exports.deflate = deflate;
      exports.deflateRaw = deflateRaw;
      exports.gzip = gzip;
    }
  });

  // node_modules/pako/lib/zlib/inffast.js
  var require_inffast = __commonJS({
    "node_modules/pako/lib/zlib/inffast.js"(exports, module) {
      "use strict";
      var BAD = 30, TYPE = 12;
      module.exports = function(strm, start) {
        var state, _in, last, _out, beg, end, dmax, wsize, whave, wnext, s_window, hold, bits, lcode, dcode, lmask, dmask, here, op, len, dist, from, from_source, input, output;
        state = strm.state, _in = strm.next_in, input = strm.input, last = _in + (strm.avail_in - 5), _out = strm.next_out, output = strm.output, beg = _out - (start - strm.avail_out), end = _out + (strm.avail_out - 257), dmax = state.dmax, wsize = state.wsize, whave = state.whave, wnext = state.wnext, s_window = state.window, hold = state.hold, bits = state.bits, lcode = state.lencode, dcode = state.distcode, lmask = (1 << state.lenbits) - 1, dmask = (1 << state.distbits) - 1;
        top:
          do {
            bits < 15 && (hold += input[_in++] << bits, bits += 8, hold += input[_in++] << bits, bits += 8), here = lcode[hold & lmask];
            dolen:
              for (; ; ) {
                if (op = here >>> 24, hold >>>= op, bits -= op, op = here >>> 16 & 255, op === 0)
                  output[_out++] = here & 65535;
                else if (op & 16) {
                  len = here & 65535, op &= 15, op && (bits < op && (hold += input[_in++] << bits, bits += 8), len += hold & (1 << op) - 1, hold >>>= op, bits -= op), bits < 15 && (hold += input[_in++] << bits, bits += 8, hold += input[_in++] << bits, bits += 8), here = dcode[hold & dmask];
                  dodist:
                    for (; ; ) {
                      if (op = here >>> 24, hold >>>= op, bits -= op, op = here >>> 16 & 255, op & 16) {
                        if (dist = here & 65535, op &= 15, bits < op && (hold += input[_in++] << bits, bits += 8, bits < op && (hold += input[_in++] << bits, bits += 8)), dist += hold & (1 << op) - 1, dist > dmax) {
                          strm.msg = "invalid distance too far back", state.mode = BAD;
                          break top;
                        }
                        if (hold >>>= op, bits -= op, op = _out - beg, dist > op) {
                          if (op = dist - op, op > whave && state.sane) {
                            strm.msg = "invalid distance too far back", state.mode = BAD;
                            break top;
                          }
                          if (from = 0, from_source = s_window, wnext === 0) {
                            if (from += wsize - op, op < len) {
                              len -= op;
                              do
                                output[_out++] = s_window[from++];
                              while (--op);
                              from = _out - dist, from_source = output;
                            }
                          } else if (wnext < op) {
                            if (from += wsize + wnext - op, op -= wnext, op < len) {
                              len -= op;
                              do
                                output[_out++] = s_window[from++];
                              while (--op);
                              if (from = 0, wnext < len) {
                                op = wnext, len -= op;
                                do
                                  output[_out++] = s_window[from++];
                                while (--op);
                                from = _out - dist, from_source = output;
                              }
                            }
                          } else if (from += wnext - op, op < len) {
                            len -= op;
                            do
                              output[_out++] = s_window[from++];
                            while (--op);
                            from = _out - dist, from_source = output;
                          }
                          for (; len > 2; )
                            output[_out++] = from_source[from++], output[_out++] = from_source[from++], output[_out++] = from_source[from++], len -= 3;
                          len && (output[_out++] = from_source[from++], len > 1 && (output[_out++] = from_source[from++]));
                        } else {
                          from = _out - dist;
                          do
                            output[_out++] = output[from++], output[_out++] = output[from++], output[_out++] = output[from++], len -= 3;
                          while (len > 2);
                          len && (output[_out++] = output[from++], len > 1 && (output[_out++] = output[from++]));
                        }
                      } else if ((op & 64) === 0) {
                        here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                        continue dodist;
                      } else {
                        strm.msg = "invalid distance code", state.mode = BAD;
                        break top;
                      }
                      break;
                    }
                } else if ((op & 64) === 0) {
                  here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dolen;
                } else if (op & 32) {
                  state.mode = TYPE;
                  break top;
                } else {
                  strm.msg = "invalid literal/length code", state.mode = BAD;
                  break top;
                }
                break;
              }
          } while (_in < last && _out < end);
        len = bits >> 3, _in -= len, bits -= len << 3, hold &= (1 << bits) - 1, strm.next_in = _in, strm.next_out = _out, strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last), strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end), state.hold = hold, state.bits = bits;
      };
    }
  });

  // node_modules/pako/lib/zlib/inftrees.js
  var require_inftrees = __commonJS({
    "node_modules/pako/lib/zlib/inftrees.js"(exports, module) {
      "use strict";
      var utils = require_common(), MAXBITS = 15, ENOUGH_LENS = 852, ENOUGH_DISTS = 592, CODES = 0, LENS = 1, DISTS = 2, lbase = [
        /* Length codes 257..285 base */
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        13,
        15,
        17,
        19,
        23,
        27,
        31,
        35,
        43,
        51,
        59,
        67,
        83,
        99,
        115,
        131,
        163,
        195,
        227,
        258,
        0,
        0
      ], lext = [
        /* Length codes 257..285 extra */
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        17,
        17,
        17,
        17,
        18,
        18,
        18,
        18,
        19,
        19,
        19,
        19,
        20,
        20,
        20,
        20,
        21,
        21,
        21,
        21,
        16,
        72,
        78
      ], dbase = [
        /* Distance codes 0..29 base */
        1,
        2,
        3,
        4,
        5,
        7,
        9,
        13,
        17,
        25,
        33,
        49,
        65,
        97,
        129,
        193,
        257,
        385,
        513,
        769,
        1025,
        1537,
        2049,
        3073,
        4097,
        6145,
        8193,
        12289,
        16385,
        24577,
        0,
        0
      ], dext = [
        /* Distance codes 0..29 extra */
        16,
        16,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        64,
        64
      ];
      module.exports = function(type, lens, lens_index, codes, table, table_index, work, opts) {
        var bits = opts.bits, len = 0, sym = 0, min = 0, max = 0, root = 0, curr = 0, drop = 0, left = 0, used = 0, huff = 0, incr, fill, low, mask, next, base = null, base_index = 0, end, count = new utils.Buf16(MAXBITS + 1), offs = new utils.Buf16(MAXBITS + 1), extra = null, extra_index = 0, here_bits, here_op, here_val;
        for (len = 0; len <= MAXBITS; len++)
          count[len] = 0;
        for (sym = 0; sym < codes; sym++)
          count[lens[lens_index + sym]]++;
        for (root = bits, max = MAXBITS; max >= 1 && count[max] === 0; max--)
          ;
        if (root > max && (root = max), max === 0)
          return table[table_index++] = 1 << 24 | 64 << 16 | 0, table[table_index++] = 1 << 24 | 64 << 16 | 0, opts.bits = 1, 0;
        for (min = 1; min < max && count[min] === 0; min++)
          ;
        for (root < min && (root = min), left = 1, len = 1; len <= MAXBITS; len++)
          if (left <<= 1, left -= count[len], left < 0)
            return -1;
        if (left > 0 && (type === CODES || max !== 1))
          return -1;
        for (offs[1] = 0, len = 1; len < MAXBITS; len++)
          offs[len + 1] = offs[len] + count[len];
        for (sym = 0; sym < codes; sym++)
          lens[lens_index + sym] !== 0 && (work[offs[lens[lens_index + sym]]++] = sym);
        if (type === CODES ? (base = extra = work, end = 19) : type === LENS ? (base = lbase, base_index -= 257, extra = lext, extra_index -= 257, end = 256) : (base = dbase, extra = dext, end = -1), huff = 0, sym = 0, len = min, next = table_index, curr = root, drop = 0, low = -1, used = 1 << root, mask = used - 1, type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS)
          return 1;
        for (; ; ) {
          here_bits = len - drop, work[sym] < end ? (here_op = 0, here_val = work[sym]) : work[sym] > end ? (here_op = extra[extra_index + work[sym]], here_val = base[base_index + work[sym]]) : (here_op = 96, here_val = 0), incr = 1 << len - drop, fill = 1 << curr, min = fill;
          do
            fill -= incr, table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
          while (fill !== 0);
          for (incr = 1 << len - 1; huff & incr; )
            incr >>= 1;
          if (incr !== 0 ? (huff &= incr - 1, huff += incr) : huff = 0, sym++, --count[len] === 0) {
            if (len === max)
              break;
            len = lens[lens_index + work[sym]];
          }
          if (len > root && (huff & mask) !== low) {
            for (drop === 0 && (drop = root), next += min, curr = len - drop, left = 1 << curr; curr + drop < max && (left -= count[curr + drop], !(left <= 0)); )
              curr++, left <<= 1;
            if (used += 1 << curr, type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS)
              return 1;
            low = huff & mask, table[low] = root << 24 | curr << 16 | next - table_index | 0;
          }
        }
        return huff !== 0 && (table[next + huff] = len - drop << 24 | 64 << 16 | 0), opts.bits = root, 0;
      };
    }
  });

  // node_modules/pako/lib/zlib/inflate.js
  var require_inflate = __commonJS({
    "node_modules/pako/lib/zlib/inflate.js"(exports) {
      "use strict";
      var utils = require_common(), adler32 = require_adler32(), crc322 = require_crc32(), inflate_fast = require_inffast(), inflate_table = require_inftrees(), CODES = 0, LENS = 1, DISTS = 2, Z_FINISH = 4, Z_BLOCK = 5, Z_TREES = 6, Z_OK = 0, Z_STREAM_END = 1, Z_NEED_DICT = 2, Z_STREAM_ERROR = -2, Z_DATA_ERROR = -3, Z_MEM_ERROR = -4, Z_BUF_ERROR = -5, Z_DEFLATED = 8, HEAD = 1, FLAGS = 2, TIME = 3, OS = 4, EXLEN = 5, EXTRA = 6, NAME = 7, COMMENT = 8, HCRC = 9, DICTID = 10, DICT = 11, TYPE = 12, TYPEDO = 13, STORED = 14, COPY_ = 15, COPY = 16, TABLE = 17, LENLENS = 18, CODELENS = 19, LEN_ = 20, LEN = 21, LENEXT = 22, DIST = 23, DISTEXT = 24, MATCH = 25, LIT = 26, CHECK = 27, LENGTH = 28, DONE = 29, BAD = 30, MEM = 31, SYNC = 32, ENOUGH_LENS = 852, ENOUGH_DISTS = 592, MAX_WBITS = 15, DEF_WBITS = MAX_WBITS;
      function zswap32(q) {
        return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
      }
      function InflateState() {
        this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new utils.Buf16(320), this.work = new utils.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function inflateResetKeep(strm) {
        var state;
        return !strm || !strm.state ? Z_STREAM_ERROR : (state = strm.state, strm.total_in = strm.total_out = state.total = 0, strm.msg = "", state.wrap && (strm.adler = state.wrap & 1), state.mode = HEAD, state.last = 0, state.havedict = 0, state.dmax = 32768, state.head = null, state.hold = 0, state.bits = 0, state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS), state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS), state.sane = 1, state.back = -1, Z_OK);
      }
      function inflateReset(strm) {
        var state;
        return !strm || !strm.state ? Z_STREAM_ERROR : (state = strm.state, state.wsize = 0, state.whave = 0, state.wnext = 0, inflateResetKeep(strm));
      }
      function inflateReset2(strm, windowBits) {
        var wrap, state;
        return !strm || !strm.state || (state = strm.state, windowBits < 0 ? (wrap = 0, windowBits = -windowBits) : (wrap = (windowBits >> 4) + 1, windowBits < 48 && (windowBits &= 15)), windowBits && (windowBits < 8 || windowBits > 15)) ? Z_STREAM_ERROR : (state.window !== null && state.wbits !== windowBits && (state.window = null), state.wrap = wrap, state.wbits = windowBits, inflateReset(strm));
      }
      function inflateInit2(strm, windowBits) {
        var ret, state;
        return strm ? (state = new InflateState(), strm.state = state, state.window = null, ret = inflateReset2(strm, windowBits), ret !== Z_OK && (strm.state = null), ret) : Z_STREAM_ERROR;
      }
      function inflateInit(strm) {
        return inflateInit2(strm, DEF_WBITS);
      }
      var virgin = !0, lenfix, distfix;
      function fixedtables(state) {
        if (virgin) {
          var sym;
          for (lenfix = new utils.Buf32(512), distfix = new utils.Buf32(32), sym = 0; sym < 144; )
            state.lens[sym++] = 8;
          for (; sym < 256; )
            state.lens[sym++] = 9;
          for (; sym < 280; )
            state.lens[sym++] = 7;
          for (; sym < 288; )
            state.lens[sym++] = 8;
          for (inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 }), sym = 0; sym < 32; )
            state.lens[sym++] = 5;
          inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 }), virgin = !1;
        }
        state.lencode = lenfix, state.lenbits = 9, state.distcode = distfix, state.distbits = 5;
      }
      function updatewindow(strm, src, end, copy) {
        var dist, state = strm.state;
        return state.window === null && (state.wsize = 1 << state.wbits, state.wnext = 0, state.whave = 0, state.window = new utils.Buf8(state.wsize)), copy >= state.wsize ? (utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0), state.wnext = 0, state.whave = state.wsize) : (dist = state.wsize - state.wnext, dist > copy && (dist = copy), utils.arraySet(state.window, src, end - copy, dist, state.wnext), copy -= dist, copy ? (utils.arraySet(state.window, src, end - copy, copy, 0), state.wnext = copy, state.whave = state.wsize) : (state.wnext += dist, state.wnext === state.wsize && (state.wnext = 0), state.whave < state.wsize && (state.whave += dist))), 0;
      }
      function inflate(strm, flush) {
        var state, input, output, next, put, have, left, hold, bits, _in, _out, copy, from, from_source, here = 0, here_bits, here_op, here_val, last_bits, last_op, last_val, len, ret, hbuf = new utils.Buf8(4), opts, n, order = (
          /* permutation of code lengths */
          [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
        );
        if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0)
          return Z_STREAM_ERROR;
        state = strm.state, state.mode === TYPE && (state.mode = TYPEDO), put = strm.next_out, output = strm.output, left = strm.avail_out, next = strm.next_in, input = strm.input, have = strm.avail_in, hold = state.hold, bits = state.bits, _in = have, _out = left, ret = Z_OK;
        inf_leave:
          for (; ; )
            switch (state.mode) {
              case HEAD:
                if (state.wrap === 0) {
                  state.mode = TYPEDO;
                  break;
                }
                for (; bits < 16; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                if (state.wrap & 2 && hold === 35615) {
                  state.check = 0, hbuf[0] = hold & 255, hbuf[1] = hold >>> 8 & 255, state.check = crc322(state.check, hbuf, 2, 0), hold = 0, bits = 0, state.mode = FLAGS;
                  break;
                }
                if (state.flags = 0, state.head && (state.head.done = !1), !(state.wrap & 1) || /* check if zlib header allowed */
                (((hold & 255) << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check", state.mode = BAD;
                  break;
                }
                if ((hold & 15) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method", state.mode = BAD;
                  break;
                }
                if (hold >>>= 4, bits -= 4, len = (hold & 15) + 8, state.wbits === 0)
                  state.wbits = len;
                else if (len > state.wbits) {
                  strm.msg = "invalid window size", state.mode = BAD;
                  break;
                }
                state.dmax = 1 << len, strm.adler = state.check = 1, state.mode = hold & 512 ? DICTID : TYPE, hold = 0, bits = 0;
                break;
              case FLAGS:
                for (; bits < 16; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                if (state.flags = hold, (state.flags & 255) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method", state.mode = BAD;
                  break;
                }
                if (state.flags & 57344) {
                  strm.msg = "unknown header flags set", state.mode = BAD;
                  break;
                }
                state.head && (state.head.text = hold >> 8 & 1), state.flags & 512 && (hbuf[0] = hold & 255, hbuf[1] = hold >>> 8 & 255, state.check = crc322(state.check, hbuf, 2, 0)), hold = 0, bits = 0, state.mode = TIME;
              /* falls through */
              case TIME:
                for (; bits < 32; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                state.head && (state.head.time = hold), state.flags & 512 && (hbuf[0] = hold & 255, hbuf[1] = hold >>> 8 & 255, hbuf[2] = hold >>> 16 & 255, hbuf[3] = hold >>> 24 & 255, state.check = crc322(state.check, hbuf, 4, 0)), hold = 0, bits = 0, state.mode = OS;
              /* falls through */
              case OS:
                for (; bits < 16; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                state.head && (state.head.xflags = hold & 255, state.head.os = hold >> 8), state.flags & 512 && (hbuf[0] = hold & 255, hbuf[1] = hold >>> 8 & 255, state.check = crc322(state.check, hbuf, 2, 0)), hold = 0, bits = 0, state.mode = EXLEN;
              /* falls through */
              case EXLEN:
                if (state.flags & 1024) {
                  for (; bits < 16; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  state.length = hold, state.head && (state.head.extra_len = hold), state.flags & 512 && (hbuf[0] = hold & 255, hbuf[1] = hold >>> 8 & 255, state.check = crc322(state.check, hbuf, 2, 0)), hold = 0, bits = 0;
                } else state.head && (state.head.extra = null);
                state.mode = EXTRA;
              /* falls through */
              case EXTRA:
                if (state.flags & 1024 && (copy = state.length, copy > have && (copy = have), copy && (state.head && (len = state.head.extra_len - state.length, state.head.extra || (state.head.extra = new Array(state.head.extra_len)), utils.arraySet(
                  state.head.extra,
                  input,
                  next,
                  // extra field is limited to 65536 bytes
                  // - no need for additional size check
                  copy,
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                )), state.flags & 512 && (state.check = crc322(state.check, input, copy, next)), have -= copy, next += copy, state.length -= copy), state.length))
                  break inf_leave;
                state.length = 0, state.mode = NAME;
              /* falls through */
              case NAME:
                if (state.flags & 2048) {
                  if (have === 0)
                    break inf_leave;
                  copy = 0;
                  do
                    len = input[next + copy++], state.head && len && state.length < 65536 && (state.head.name += String.fromCharCode(len));
                  while (len && copy < have);
                  if (state.flags & 512 && (state.check = crc322(state.check, input, copy, next)), have -= copy, next += copy, len)
                    break inf_leave;
                } else state.head && (state.head.name = null);
                state.length = 0, state.mode = COMMENT;
              /* falls through */
              case COMMENT:
                if (state.flags & 4096) {
                  if (have === 0)
                    break inf_leave;
                  copy = 0;
                  do
                    len = input[next + copy++], state.head && len && state.length < 65536 && (state.head.comment += String.fromCharCode(len));
                  while (len && copy < have);
                  if (state.flags & 512 && (state.check = crc322(state.check, input, copy, next)), have -= copy, next += copy, len)
                    break inf_leave;
                } else state.head && (state.head.comment = null);
                state.mode = HCRC;
              /* falls through */
              case HCRC:
                if (state.flags & 512) {
                  for (; bits < 16; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  if (hold !== (state.check & 65535)) {
                    strm.msg = "header crc mismatch", state.mode = BAD;
                    break;
                  }
                  hold = 0, bits = 0;
                }
                state.head && (state.head.hcrc = state.flags >> 9 & 1, state.head.done = !0), strm.adler = state.check = 0, state.mode = TYPE;
                break;
              case DICTID:
                for (; bits < 32; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                strm.adler = state.check = zswap32(hold), hold = 0, bits = 0, state.mode = DICT;
              /* falls through */
              case DICT:
                if (state.havedict === 0)
                  return strm.next_out = put, strm.avail_out = left, strm.next_in = next, strm.avail_in = have, state.hold = hold, state.bits = bits, Z_NEED_DICT;
                strm.adler = state.check = 1, state.mode = TYPE;
              /* falls through */
              case TYPE:
                if (flush === Z_BLOCK || flush === Z_TREES)
                  break inf_leave;
              /* falls through */
              case TYPEDO:
                if (state.last) {
                  hold >>>= bits & 7, bits -= bits & 7, state.mode = CHECK;
                  break;
                }
                for (; bits < 3; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                switch (state.last = hold & 1, hold >>>= 1, bits -= 1, hold & 3) {
                  case 0:
                    state.mode = STORED;
                    break;
                  case 1:
                    if (fixedtables(state), state.mode = LEN_, flush === Z_TREES) {
                      hold >>>= 2, bits -= 2;
                      break inf_leave;
                    }
                    break;
                  case 2:
                    state.mode = TABLE;
                    break;
                  case 3:
                    strm.msg = "invalid block type", state.mode = BAD;
                }
                hold >>>= 2, bits -= 2;
                break;
              case STORED:
                for (hold >>>= bits & 7, bits -= bits & 7; bits < 32; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                  strm.msg = "invalid stored block lengths", state.mode = BAD;
                  break;
                }
                if (state.length = hold & 65535, hold = 0, bits = 0, state.mode = COPY_, flush === Z_TREES)
                  break inf_leave;
              /* falls through */
              case COPY_:
                state.mode = COPY;
              /* falls through */
              case COPY:
                if (copy = state.length, copy) {
                  if (copy > have && (copy = have), copy > left && (copy = left), copy === 0)
                    break inf_leave;
                  utils.arraySet(output, input, next, copy, put), have -= copy, next += copy, left -= copy, put += copy, state.length -= copy;
                  break;
                }
                state.mode = TYPE;
                break;
              case TABLE:
                for (; bits < 14; ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                if (state.nlen = (hold & 31) + 257, hold >>>= 5, bits -= 5, state.ndist = (hold & 31) + 1, hold >>>= 5, bits -= 5, state.ncode = (hold & 15) + 4, hold >>>= 4, bits -= 4, state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols", state.mode = BAD;
                  break;
                }
                state.have = 0, state.mode = LENLENS;
              /* falls through */
              case LENLENS:
                for (; state.have < state.ncode; ) {
                  for (; bits < 3; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  state.lens[order[state.have++]] = hold & 7, hold >>>= 3, bits -= 3;
                }
                for (; state.have < 19; )
                  state.lens[order[state.have++]] = 0;
                if (state.lencode = state.lendyn, state.lenbits = 7, opts = { bits: state.lenbits }, ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts), state.lenbits = opts.bits, ret) {
                  strm.msg = "invalid code lengths set", state.mode = BAD;
                  break;
                }
                state.have = 0, state.mode = CODELENS;
              /* falls through */
              case CODELENS:
                for (; state.have < state.nlen + state.ndist; ) {
                  for (; here = state.lencode[hold & (1 << state.lenbits) - 1], here_bits = here >>> 24, here_op = here >>> 16 & 255, here_val = here & 65535, !(here_bits <= bits); ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  if (here_val < 16)
                    hold >>>= here_bits, bits -= here_bits, state.lens[state.have++] = here_val;
                  else {
                    if (here_val === 16) {
                      for (n = here_bits + 2; bits < n; ) {
                        if (have === 0)
                          break inf_leave;
                        have--, hold += input[next++] << bits, bits += 8;
                      }
                      if (hold >>>= here_bits, bits -= here_bits, state.have === 0) {
                        strm.msg = "invalid bit length repeat", state.mode = BAD;
                        break;
                      }
                      len = state.lens[state.have - 1], copy = 3 + (hold & 3), hold >>>= 2, bits -= 2;
                    } else if (here_val === 17) {
                      for (n = here_bits + 3; bits < n; ) {
                        if (have === 0)
                          break inf_leave;
                        have--, hold += input[next++] << bits, bits += 8;
                      }
                      hold >>>= here_bits, bits -= here_bits, len = 0, copy = 3 + (hold & 7), hold >>>= 3, bits -= 3;
                    } else {
                      for (n = here_bits + 7; bits < n; ) {
                        if (have === 0)
                          break inf_leave;
                        have--, hold += input[next++] << bits, bits += 8;
                      }
                      hold >>>= here_bits, bits -= here_bits, len = 0, copy = 11 + (hold & 127), hold >>>= 7, bits -= 7;
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat", state.mode = BAD;
                      break;
                    }
                    for (; copy--; )
                      state.lens[state.have++] = len;
                  }
                }
                if (state.mode === BAD)
                  break;
                if (state.lens[256] === 0) {
                  strm.msg = "invalid code -- missing end-of-block", state.mode = BAD;
                  break;
                }
                if (state.lenbits = 9, opts = { bits: state.lenbits }, ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts), state.lenbits = opts.bits, ret) {
                  strm.msg = "invalid literal/lengths set", state.mode = BAD;
                  break;
                }
                if (state.distbits = 6, state.distcode = state.distdyn, opts = { bits: state.distbits }, ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts), state.distbits = opts.bits, ret) {
                  strm.msg = "invalid distances set", state.mode = BAD;
                  break;
                }
                if (state.mode = LEN_, flush === Z_TREES)
                  break inf_leave;
              /* falls through */
              case LEN_:
                state.mode = LEN;
              /* falls through */
              case LEN:
                if (have >= 6 && left >= 258) {
                  strm.next_out = put, strm.avail_out = left, strm.next_in = next, strm.avail_in = have, state.hold = hold, state.bits = bits, inflate_fast(strm, _out), put = strm.next_out, output = strm.output, left = strm.avail_out, next = strm.next_in, input = strm.input, have = strm.avail_in, hold = state.hold, bits = state.bits, state.mode === TYPE && (state.back = -1);
                  break;
                }
                for (state.back = 0; here = state.lencode[hold & (1 << state.lenbits) - 1], here_bits = here >>> 24, here_op = here >>> 16 & 255, here_val = here & 65535, !(here_bits <= bits); ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                if (here_op && (here_op & 240) === 0) {
                  for (last_bits = here_bits, last_op = here_op, last_val = here_val; here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)], here_bits = here >>> 24, here_op = here >>> 16 & 255, here_val = here & 65535, !(last_bits + here_bits <= bits); ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  hold >>>= last_bits, bits -= last_bits, state.back += last_bits;
                }
                if (hold >>>= here_bits, bits -= here_bits, state.back += here_bits, state.length = here_val, here_op === 0) {
                  state.mode = LIT;
                  break;
                }
                if (here_op & 32) {
                  state.back = -1, state.mode = TYPE;
                  break;
                }
                if (here_op & 64) {
                  strm.msg = "invalid literal/length code", state.mode = BAD;
                  break;
                }
                state.extra = here_op & 15, state.mode = LENEXT;
              /* falls through */
              case LENEXT:
                if (state.extra) {
                  for (n = state.extra; bits < n; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  state.length += hold & (1 << state.extra) - 1, hold >>>= state.extra, bits -= state.extra, state.back += state.extra;
                }
                state.was = state.length, state.mode = DIST;
              /* falls through */
              case DIST:
                for (; here = state.distcode[hold & (1 << state.distbits) - 1], here_bits = here >>> 24, here_op = here >>> 16 & 255, here_val = here & 65535, !(here_bits <= bits); ) {
                  if (have === 0)
                    break inf_leave;
                  have--, hold += input[next++] << bits, bits += 8;
                }
                if ((here_op & 240) === 0) {
                  for (last_bits = here_bits, last_op = here_op, last_val = here_val; here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)], here_bits = here >>> 24, here_op = here >>> 16 & 255, here_val = here & 65535, !(last_bits + here_bits <= bits); ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  hold >>>= last_bits, bits -= last_bits, state.back += last_bits;
                }
                if (hold >>>= here_bits, bits -= here_bits, state.back += here_bits, here_op & 64) {
                  strm.msg = "invalid distance code", state.mode = BAD;
                  break;
                }
                state.offset = here_val, state.extra = here_op & 15, state.mode = DISTEXT;
              /* falls through */
              case DISTEXT:
                if (state.extra) {
                  for (n = state.extra; bits < n; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  state.offset += hold & (1 << state.extra) - 1, hold >>>= state.extra, bits -= state.extra, state.back += state.extra;
                }
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back", state.mode = BAD;
                  break;
                }
                state.mode = MATCH;
              /* falls through */
              case MATCH:
                if (left === 0)
                  break inf_leave;
                if (copy = _out - left, state.offset > copy) {
                  if (copy = state.offset - copy, copy > state.whave && state.sane) {
                    strm.msg = "invalid distance too far back", state.mode = BAD;
                    break;
                  }
                  copy > state.wnext ? (copy -= state.wnext, from = state.wsize - copy) : from = state.wnext - copy, copy > state.length && (copy = state.length), from_source = state.window;
                } else
                  from_source = output, from = put - state.offset, copy = state.length;
                copy > left && (copy = left), left -= copy, state.length -= copy;
                do
                  output[put++] = from_source[from++];
                while (--copy);
                state.length === 0 && (state.mode = LEN);
                break;
              case LIT:
                if (left === 0)
                  break inf_leave;
                output[put++] = state.length, left--, state.mode = LEN;
                break;
              case CHECK:
                if (state.wrap) {
                  for (; bits < 32; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold |= input[next++] << bits, bits += 8;
                  }
                  if (_out -= left, strm.total_out += _out, state.total += _out, _out && (strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                  state.flags ? crc322(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out)), _out = left, (state.flags ? hold : zswap32(hold)) !== state.check) {
                    strm.msg = "incorrect data check", state.mode = BAD;
                    break;
                  }
                  hold = 0, bits = 0;
                }
                state.mode = LENGTH;
              /* falls through */
              case LENGTH:
                if (state.wrap && state.flags) {
                  for (; bits < 32; ) {
                    if (have === 0)
                      break inf_leave;
                    have--, hold += input[next++] << bits, bits += 8;
                  }
                  if (hold !== (state.total & 4294967295)) {
                    strm.msg = "incorrect length check", state.mode = BAD;
                    break;
                  }
                  hold = 0, bits = 0;
                }
                state.mode = DONE;
              /* falls through */
              case DONE:
                ret = Z_STREAM_END;
                break inf_leave;
              case BAD:
                ret = Z_DATA_ERROR;
                break inf_leave;
              case MEM:
                return Z_MEM_ERROR;
              case SYNC:
              /* falls through */
              default:
                return Z_STREAM_ERROR;
            }
        return strm.next_out = put, strm.avail_out = left, strm.next_in = next, strm.avail_in = have, state.hold = hold, state.bits = bits, (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) && updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out) ? (state.mode = MEM, Z_MEM_ERROR) : (_in -= strm.avail_in, _out -= strm.avail_out, strm.total_in += _in, strm.total_out += _out, state.total += _out, state.wrap && _out && (strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
        state.flags ? crc322(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out)), strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0), (_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK && (ret = Z_BUF_ERROR), ret);
      }
      function inflateEnd(strm) {
        if (!strm || !strm.state)
          return Z_STREAM_ERROR;
        var state = strm.state;
        return state.window && (state.window = null), strm.state = null, Z_OK;
      }
      function inflateGetHeader(strm, head) {
        var state;
        return !strm || !strm.state || (state = strm.state, (state.wrap & 2) === 0) ? Z_STREAM_ERROR : (state.head = head, head.done = !1, Z_OK);
      }
      function inflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length, state, dictid, ret;
        return !strm || !strm.state || (state = strm.state, state.wrap !== 0 && state.mode !== DICT) ? Z_STREAM_ERROR : state.mode === DICT && (dictid = 1, dictid = adler32(dictid, dictionary, dictLength, 0), dictid !== state.check) ? Z_DATA_ERROR : (ret = updatewindow(strm, dictionary, dictLength, dictLength), ret ? (state.mode = MEM, Z_MEM_ERROR) : (state.havedict = 1, Z_OK));
      }
      exports.inflateReset = inflateReset;
      exports.inflateReset2 = inflateReset2;
      exports.inflateResetKeep = inflateResetKeep;
      exports.inflateInit = inflateInit;
      exports.inflateInit2 = inflateInit2;
      exports.inflate = inflate;
      exports.inflateEnd = inflateEnd;
      exports.inflateGetHeader = inflateGetHeader;
      exports.inflateSetDictionary = inflateSetDictionary;
      exports.inflateInfo = "pako inflate (from Nodeca project)";
    }
  });

  // node_modules/pako/lib/zlib/constants.js
  var require_constants = __commonJS({
    "node_modules/pako/lib/zlib/constants.js"(exports, module) {
      "use strict";
      module.exports = {
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        /* Return codes for the compression/decompression functions. Negative values
        * are errors, positive values are used for special but normal events.
        */
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        //Z_MEM_ERROR:     -4,
        Z_BUF_ERROR: -5,
        //Z_VERSION_ERROR: -6,
        /* compression levels */
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY: 0,
        Z_TEXT: 1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN: 2,
        /* The deflate compression method */
        Z_DEFLATED: 8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
      };
    }
  });

  // node_modules/pako/lib/zlib/gzheader.js
  var require_gzheader = __commonJS({
    "node_modules/pako/lib/zlib/gzheader.js"(exports, module) {
      "use strict";
      function GZheader() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
      }
      module.exports = GZheader;
    }
  });

  // node_modules/pako/lib/inflate.js
  var require_inflate2 = __commonJS({
    "node_modules/pako/lib/inflate.js"(exports) {
      "use strict";
      var zlib_inflate = require_inflate(), utils = require_common(), strings = require_strings(), c = require_constants(), msg = require_messages(), ZStream = require_zstream(), GZheader = require_gzheader(), toString = Object.prototype.toString;
      function Inflate(options) {
        if (!(this instanceof Inflate)) return new Inflate(options);
        this.options = utils.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ""
        }, options || {});
        var opt = this.options;
        opt.raw && opt.windowBits >= 0 && opt.windowBits < 16 && (opt.windowBits = -opt.windowBits, opt.windowBits === 0 && (opt.windowBits = -15)), opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits) && (opt.windowBits += 32), opt.windowBits > 15 && opt.windowBits < 48 && (opt.windowBits & 15) === 0 && (opt.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new ZStream(), this.strm.avail_out = 0;
        var status = zlib_inflate.inflateInit2(
          this.strm,
          opt.windowBits
        );
        if (status !== c.Z_OK)
          throw new Error(msg[status]);
        if (this.header = new GZheader(), zlib_inflate.inflateGetHeader(this.strm, this.header), opt.dictionary && (typeof opt.dictionary == "string" ? opt.dictionary = strings.string2buf(opt.dictionary) : toString.call(opt.dictionary) === "[object ArrayBuffer]" && (opt.dictionary = new Uint8Array(opt.dictionary)), opt.raw && (status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary), status !== c.Z_OK)))
          throw new Error(msg[status]);
      }
      Inflate.prototype.push = function(data, mode) {
        var strm = this.strm, chunkSize = this.options.chunkSize, dictionary = this.options.dictionary, status, _mode, next_out_utf8, tail, utf8str, allowBufError = !1;
        if (this.ended)
          return !1;
        _mode = mode === ~~mode ? mode : mode === !0 ? c.Z_FINISH : c.Z_NO_FLUSH, typeof data == "string" ? strm.input = strings.binstring2buf(data) : toString.call(data) === "[object ArrayBuffer]" ? strm.input = new Uint8Array(data) : strm.input = data, strm.next_in = 0, strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0 && (strm.output = new utils.Buf8(chunkSize), strm.next_out = 0, strm.avail_out = chunkSize), status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH), status === c.Z_NEED_DICT && dictionary && (status = zlib_inflate.inflateSetDictionary(this.strm, dictionary)), status === c.Z_BUF_ERROR && allowBufError === !0 && (status = c.Z_OK, allowBufError = !1), status !== c.Z_STREAM_END && status !== c.Z_OK)
            return this.onEnd(status), this.ended = !0, !1;
          strm.next_out && (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) && (this.options.to === "string" ? (next_out_utf8 = strings.utf8border(strm.output, strm.next_out), tail = strm.next_out - next_out_utf8, utf8str = strings.buf2string(strm.output, next_out_utf8), strm.next_out = tail, strm.avail_out = chunkSize - tail, tail && utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0), this.onData(utf8str)) : this.onData(utils.shrinkBuf(strm.output, strm.next_out))), strm.avail_in === 0 && strm.avail_out === 0 && (allowBufError = !0);
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
        return status === c.Z_STREAM_END && (_mode = c.Z_FINISH), _mode === c.Z_FINISH ? (status = zlib_inflate.inflateEnd(this.strm), this.onEnd(status), this.ended = !0, status === c.Z_OK) : (_mode === c.Z_SYNC_FLUSH && (this.onEnd(c.Z_OK), strm.avail_out = 0), !0);
      };
      Inflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Inflate.prototype.onEnd = function(status) {
        status === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = utils.flattenChunks(this.chunks)), this.chunks = [], this.err = status, this.msg = this.strm.msg;
      };
      function inflate(input, options) {
        var inflator = new Inflate(options);
        if (inflator.push(input, !0), inflator.err)
          throw inflator.msg || msg[inflator.err];
        return inflator.result;
      }
      function inflateRaw2(input, options) {
        return options = options || {}, options.raw = !0, inflate(input, options);
      }
      exports.Inflate = Inflate;
      exports.inflate = inflate;
      exports.inflateRaw = inflateRaw2;
      exports.ungzip = inflate;
    }
  });

  // node_modules/pako/index.js
  var require_pako = __commonJS({
    "node_modules/pako/index.js"(exports, module) {
      "use strict";
      var assign = require_common().assign, deflate = require_deflate2(), inflate = require_inflate2(), constants = require_constants(), pako = {};
      assign(pako, deflate, inflate, constants);
      module.exports = pako;
    }
  });

  // node_modules/upng-js/UPNG.js
  var require_UPNG = __commonJS({
    "node_modules/upng-js/UPNG.js"(exports, module) {
      (function() {
        var UPNG3 = {}, pako;
        typeof module == "object" ? module.exports = UPNG3 : window.UPNG = UPNG3, typeof __require == "function" ? pako = require_pako() : pako = window.pako;
        function log() {
          typeof process > "u", console.log.apply(console, arguments);
        }
        (function(UPNG4, pako2) {
          UPNG4.toRGBA8 = function(out) {
            var w = out.width, h = out.height;
            if (out.tabs.acTL == null) return [UPNG4.toRGBA8.decodeImage(out.data, w, h, out).buffer];
            var frms = [];
            out.frames[0].data == null && (out.frames[0].data = out.data);
            for (var img, empty = new Uint8Array(w * h * 4), i = 0; i < out.frames.length; i++) {
              var frm = out.frames[i], fx = frm.rect.x, fy = frm.rect.y, fw = frm.rect.width, fh = frm.rect.height, fdata = UPNG4.toRGBA8.decodeImage(frm.data, fw, fh, out);
              if (i == 0 ? img = fdata : frm.blend == 0 ? UPNG4._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0) : frm.blend == 1 && UPNG4._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1), frms.push(img.buffer), img = img.slice(0), frm.dispose != 0) {
                if (frm.dispose == 1) UPNG4._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
                else if (frm.dispose == 2) {
                  for (var pi = i - 1; out.frames[pi].dispose == 2; ) pi--;
                  img = new Uint8Array(frms[pi]).slice(0);
                }
              }
            }
            return frms;
          }, UPNG4.toRGBA8.decodeImage = function(data, w, h, out) {
            var area = w * h, bpp = UPNG4.decode._getBPP(out), bpl = Math.ceil(w * bpp / 8), bf = new Uint8Array(area * 4), bf32 = new Uint32Array(bf.buffer), ctype = out.ctype, depth = out.depth, rs = UPNG4._bin.readUshort;
            if (ctype == 6) {
              var qarea = area << 2;
              if (depth == 8) for (var i = 0; i < qarea; i++)
                bf[i] = data[i];
              if (depth == 16) for (var i = 0; i < qarea; i++)
                bf[i] = data[i << 1];
            } else if (ctype == 2) {
              var ts = out.tabs.tRNS, tr = -1, tg = -1, tb = -1;
              if (ts && (tr = ts[0], tg = ts[1], tb = ts[2]), depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2, ti = i * 3;
                bf[qi] = data[ti], bf[qi + 1] = data[ti + 1], bf[qi + 2] = data[ti + 2], bf[qi + 3] = 255, tr != -1 && data[ti] == tr && data[ti + 1] == tg && data[ti + 2] == tb && (bf[qi + 3] = 0);
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var qi = i << 2, ti = i * 6;
                bf[qi] = data[ti], bf[qi + 1] = data[ti + 2], bf[qi + 2] = data[ti + 4], bf[qi + 3] = 255, tr != -1 && rs(data, ti) == tr && rs(data, ti + 2) == tg && rs(data, ti + 4) == tb && (bf[qi + 3] = 0);
              }
            } else if (ctype == 3) {
              var p = out.tabs.PLTE, ap = out.tabs.tRNS, tl = ap ? ap.length : 0;
              if (depth == 1) for (var y = 0; y < h; y++)
                for (var s0 = y * bpl, t0 = y * w, i = 0; i < w; i++) {
                  var qi = t0 + i << 2, j = data[s0 + (i >> 3)] >> 7 - ((i & 7) << 0) & 1, cj = 3 * j;
                  bf[qi] = p[cj], bf[qi + 1] = p[cj + 1], bf[qi + 2] = p[cj + 2], bf[qi + 3] = j < tl ? ap[j] : 255;
                }
              if (depth == 2) for (var y = 0; y < h; y++)
                for (var s0 = y * bpl, t0 = y * w, i = 0; i < w; i++) {
                  var qi = t0 + i << 2, j = data[s0 + (i >> 2)] >> 6 - ((i & 3) << 1) & 3, cj = 3 * j;
                  bf[qi] = p[cj], bf[qi + 1] = p[cj + 1], bf[qi + 2] = p[cj + 2], bf[qi + 3] = j < tl ? ap[j] : 255;
                }
              if (depth == 4) for (var y = 0; y < h; y++)
                for (var s0 = y * bpl, t0 = y * w, i = 0; i < w; i++) {
                  var qi = t0 + i << 2, j = data[s0 + (i >> 1)] >> 4 - ((i & 1) << 2) & 15, cj = 3 * j;
                  bf[qi] = p[cj], bf[qi + 1] = p[cj + 1], bf[qi + 2] = p[cj + 2], bf[qi + 3] = j < tl ? ap[j] : 255;
                }
              if (depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2, j = data[i], cj = 3 * j;
                bf[qi] = p[cj], bf[qi + 1] = p[cj + 1], bf[qi + 2] = p[cj + 2], bf[qi + 3] = j < tl ? ap[j] : 255;
              }
            } else if (ctype == 4) {
              if (depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2, di = i << 1, gr = data[di];
                bf[qi] = gr, bf[qi + 1] = gr, bf[qi + 2] = gr, bf[qi + 3] = data[di + 1];
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var qi = i << 2, di = i << 2, gr = data[di];
                bf[qi] = gr, bf[qi + 1] = gr, bf[qi + 2] = gr, bf[qi + 3] = data[di + 2];
              }
            } else if (ctype == 0) {
              var tr = out.tabs.tRNS ? out.tabs.tRNS : -1;
              if (depth == 1) for (var i = 0; i < area; i++) {
                var gr = 255 * (data[i >> 3] >> 7 - (i & 7) & 1), al = gr == tr * 255 ? 0 : 255;
                bf32[i] = al << 24 | gr << 16 | gr << 8 | gr;
              }
              if (depth == 2) for (var i = 0; i < area; i++) {
                var gr = 85 * (data[i >> 2] >> 6 - ((i & 3) << 1) & 3), al = gr == tr * 85 ? 0 : 255;
                bf32[i] = al << 24 | gr << 16 | gr << 8 | gr;
              }
              if (depth == 4) for (var i = 0; i < area; i++) {
                var gr = 17 * (data[i >> 1] >> 4 - ((i & 1) << 2) & 15), al = gr == tr * 17 ? 0 : 255;
                bf32[i] = al << 24 | gr << 16 | gr << 8 | gr;
              }
              if (depth == 8) for (var i = 0; i < area; i++) {
                var gr = data[i], al = gr == tr ? 0 : 255;
                bf32[i] = al << 24 | gr << 16 | gr << 8 | gr;
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var gr = data[i << 1], al = rs(data, i << 1) == tr ? 0 : 255;
                bf32[i] = al << 24 | gr << 16 | gr << 8 | gr;
              }
            }
            return bf;
          }, UPNG4.decode = function(buff) {
            for (var data = new Uint8Array(buff), offset = 8, bin = UPNG4._bin, rUs = bin.readUshort, rUi = bin.readUint, out = { tabs: {}, frames: [] }, dd = new Uint8Array(data.length), doff = 0, fd, foff = 0, mgck = [137, 80, 78, 71, 13, 10, 26, 10], i = 0; i < 8; i++) if (data[i] != mgck[i]) throw "The input is not a PNG file!";
            for (; offset < data.length; ) {
              var len = bin.readUint(data, offset);
              offset += 4;
              var type = bin.readASCII(data, offset, 4);
              if (offset += 4, type == "IHDR")
                UPNG4.decode._IHDR(data, offset, out);
              else if (type == "IDAT") {
                for (var i = 0; i < len; i++) dd[doff + i] = data[offset + i];
                doff += len;
              } else if (type == "acTL")
                out.tabs[type] = { num_frames: rUi(data, offset), num_plays: rUi(data, offset + 4) }, fd = new Uint8Array(data.length);
              else if (type == "fcTL") {
                if (foff != 0) {
                  var fr = out.frames[out.frames.length - 1];
                  fr.data = UPNG4.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height), foff = 0;
                }
                var rct = { x: rUi(data, offset + 12), y: rUi(data, offset + 16), width: rUi(data, offset + 4), height: rUi(data, offset + 8) }, del = rUs(data, offset + 22);
                del = rUs(data, offset + 20) / (del == 0 ? 100 : del);
                var frm = { rect: rct, delay: Math.round(del * 1e3), dispose: data[offset + 24], blend: data[offset + 25] };
                out.frames.push(frm);
              } else if (type == "fdAT") {
                for (var i = 0; i < len - 4; i++) fd[foff + i] = data[offset + i + 4];
                foff += len - 4;
              } else if (type == "pHYs")
                out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset + 4), data[offset + 8]];
              else if (type == "cHRM") {
                out.tabs[type] = [];
                for (var i = 0; i < 8; i++) out.tabs[type].push(bin.readUint(data, offset + i * 4));
              } else if (type == "tEXt") {
                out.tabs[type] == null && (out.tabs[type] = {});
                var nz = bin.nextZero(data, offset), keyw = bin.readASCII(data, offset, nz - offset), text = bin.readASCII(data, nz + 1, offset + len - nz - 1);
                out.tabs[type][keyw] = text;
              } else if (type == "iTXt") {
                out.tabs[type] == null && (out.tabs[type] = {});
                var nz = 0, off = offset;
                nz = bin.nextZero(data, off);
                var keyw = bin.readASCII(data, off, nz - off);
                off = nz + 1;
                var cflag = data[off], cmeth = data[off + 1];
                off += 2, nz = bin.nextZero(data, off);
                var ltag = bin.readASCII(data, off, nz - off);
                off = nz + 1, nz = bin.nextZero(data, off);
                var tkeyw = bin.readUTF8(data, off, nz - off);
                off = nz + 1;
                var text = bin.readUTF8(data, off, len - (off - offset));
                out.tabs[type][keyw] = text;
              } else if (type == "PLTE")
                out.tabs[type] = bin.readBytes(data, offset, len);
              else if (type == "hIST") {
                var pl = out.tabs.PLTE.length / 3;
                out.tabs[type] = [];
                for (var i = 0; i < pl; i++) out.tabs[type].push(rUs(data, offset + i * 2));
              } else if (type == "tRNS")
                out.ctype == 3 ? out.tabs[type] = bin.readBytes(data, offset, len) : out.ctype == 0 ? out.tabs[type] = rUs(data, offset) : out.ctype == 2 && (out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)]);
              else if (type == "gAMA") out.tabs[type] = bin.readUint(data, offset) / 1e5;
              else if (type == "sRGB") out.tabs[type] = data[offset];
              else if (type == "bKGD")
                out.ctype == 0 || out.ctype == 4 ? out.tabs[type] = [rUs(data, offset)] : out.ctype == 2 || out.ctype == 6 ? out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)] : out.ctype == 3 && (out.tabs[type] = data[offset]);
              else if (type == "IEND") {
                if (foff != 0) {
                  var fr = out.frames[out.frames.length - 1];
                  fr.data = UPNG4.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height), foff = 0;
                }
                out.data = UPNG4.decode._decompress(out, dd, out.width, out.height);
                break;
              }
              offset += len;
              var crc = bin.readUint(data, offset);
              offset += 4;
            }
            return delete out.compress, delete out.interlace, delete out.filter, out;
          }, UPNG4.decode._decompress = function(out, dd, w, h) {
            return out.compress == 0 && (dd = UPNG4.decode._inflate(dd)), out.interlace == 0 ? dd = UPNG4.decode._filterZero(dd, out, 0, w, h) : out.interlace == 1 && (dd = UPNG4.decode._readInterlace(dd, out)), dd;
          }, UPNG4.decode._inflate = function(data) {
            return pako2.inflate(data);
          }, UPNG4.decode._readInterlace = function(data, out) {
            for (var w = out.width, h = out.height, bpp = UPNG4.decode._getBPP(out), cbpp = bpp >> 3, bpl = Math.ceil(w * bpp / 8), img = new Uint8Array(h * bpl), di = 0, starting_row = [0, 0, 4, 0, 2, 0, 1], starting_col = [0, 4, 0, 2, 0, 1, 0], row_increment = [8, 8, 8, 4, 4, 2, 2], col_increment = [8, 8, 4, 4, 2, 2, 1], pass = 0; pass < 7; ) {
              for (var ri = row_increment[pass], ci = col_increment[pass], sw = 0, sh = 0, cr = starting_row[pass]; cr < h; )
                cr += ri, sh++;
              for (var cc = starting_col[pass]; cc < w; )
                cc += ci, sw++;
              var bpll = Math.ceil(sw * bpp / 8);
              UPNG4.decode._filterZero(data, out, di, sw, sh);
              for (var y = 0, row = starting_row[pass]; row < h; ) {
                for (var col = starting_col[pass], cdi = di + y * bpll << 3; col < w; ) {
                  if (bpp == 1) {
                    var val = data[cdi >> 3];
                    val = val >> 7 - (cdi & 7) & 1, img[row * bpl + (col >> 3)] |= val << 7 - ((col & 3) << 0);
                  }
                  if (bpp == 2) {
                    var val = data[cdi >> 3];
                    val = val >> 6 - (cdi & 7) & 3, img[row * bpl + (col >> 2)] |= val << 6 - ((col & 3) << 1);
                  }
                  if (bpp == 4) {
                    var val = data[cdi >> 3];
                    val = val >> 4 - (cdi & 7) & 15, img[row * bpl + (col >> 1)] |= val << 4 - ((col & 1) << 2);
                  }
                  if (bpp >= 8)
                    for (var ii = row * bpl + col * cbpp, j = 0; j < cbpp; j++) img[ii + j] = data[(cdi >> 3) + j];
                  cdi += bpp, col += ci;
                }
                y++, row += ri;
              }
              sw * sh != 0 && (di += sh * (1 + bpll)), pass = pass + 1;
            }
            return img;
          }, UPNG4.decode._getBPP = function(out) {
            var noc = [1, null, 3, 1, 2, null, 4][out.ctype];
            return noc * out.depth;
          }, UPNG4.decode._filterZero = function(data, out, off, w, h) {
            var bpp = UPNG4.decode._getBPP(out), bpl = Math.ceil(w * bpp / 8), paeth = UPNG4.decode._paeth;
            bpp = Math.ceil(bpp / 8);
            for (var y = 0; y < h; y++) {
              var i = off + y * bpl, di = i + y + 1, type = data[di - 1];
              if (type == 0) for (var x = 0; x < bpl; x++) data[i + x] = data[di + x];
              else if (type == 1) {
                for (var x = 0; x < bpp; x++) data[i + x] = data[di + x];
                for (var x = bpp; x < bpl; x++) data[i + x] = data[di + x] + data[i + x - bpp] & 255;
              } else if (y == 0) {
                for (var x = 0; x < bpp; x++) data[i + x] = data[di + x];
                if (type == 2) for (var x = bpp; x < bpl; x++) data[i + x] = data[di + x] & 255;
                if (type == 3) for (var x = bpp; x < bpl; x++) data[i + x] = data[di + x] + (data[i + x - bpp] >> 1) & 255;
                if (type == 4) for (var x = bpp; x < bpl; x++) data[i + x] = data[di + x] + paeth(data[i + x - bpp], 0, 0) & 255;
              } else {
                if (type == 2)
                  for (var x = 0; x < bpl; x++) data[i + x] = data[di + x] + data[i + x - bpl] & 255;
                if (type == 3) {
                  for (var x = 0; x < bpp; x++) data[i + x] = data[di + x] + (data[i + x - bpl] >> 1) & 255;
                  for (var x = bpp; x < bpl; x++) data[i + x] = data[di + x] + (data[i + x - bpl] + data[i + x - bpp] >> 1) & 255;
                }
                if (type == 4) {
                  for (var x = 0; x < bpp; x++) data[i + x] = data[di + x] + paeth(0, data[i + x - bpl], 0) & 255;
                  for (var x = bpp; x < bpl; x++) data[i + x] = data[di + x] + paeth(data[i + x - bpp], data[i + x - bpl], data[i + x - bpp - bpl]) & 255;
                }
              }
            }
            return data;
          }, UPNG4.decode._paeth = function(a, b, c) {
            var p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
            return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          }, UPNG4.decode._IHDR = function(data, offset, out) {
            var bin = UPNG4._bin;
            out.width = bin.readUint(data, offset), offset += 4, out.height = bin.readUint(data, offset), offset += 4, out.depth = data[offset], offset++, out.ctype = data[offset], offset++, out.compress = data[offset], offset++, out.filter = data[offset], offset++, out.interlace = data[offset], offset++;
          }, UPNG4._bin = {
            nextZero: function(data, p) {
              for (; data[p] != 0; ) p++;
              return p;
            },
            readUshort: function(buff, p) {
              return buff[p] << 8 | buff[p + 1];
            },
            writeUshort: function(buff, p, n) {
              buff[p] = n >> 8 & 255, buff[p + 1] = n & 255;
            },
            readUint: function(buff, p) {
              return buff[p] * (256 * 256 * 256) + (buff[p + 1] << 16 | buff[p + 2] << 8 | buff[p + 3]);
            },
            writeUint: function(buff, p, n) {
              buff[p] = n >> 24 & 255, buff[p + 1] = n >> 16 & 255, buff[p + 2] = n >> 8 & 255, buff[p + 3] = n & 255;
            },
            readASCII: function(buff, p, l) {
              for (var s = "", i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);
              return s;
            },
            writeASCII: function(data, p, s) {
              for (var i = 0; i < s.length; i++) data[p + i] = s.charCodeAt(i);
            },
            readBytes: function(buff, p, l) {
              for (var arr = [], i = 0; i < l; i++) arr.push(buff[p + i]);
              return arr;
            },
            pad: function(n) {
              return n.length < 2 ? "0" + n : n;
            },
            readUTF8: function(buff, p, l) {
              for (var s = "", ns2, i = 0; i < l; i++) s += "%" + UPNG4._bin.pad(buff[p + i].toString(16));
              try {
                ns2 = decodeURIComponent(s);
              } catch {
                return UPNG4._bin.readASCII(buff, p, l);
              }
              return ns2;
            }
          }, UPNG4._copyTile = function(sb, sw, sh, tb, tw, th, xoff, yoff, mode) {
            for (var w = Math.min(sw, tw), h = Math.min(sh, th), si = 0, ti = 0, y = 0; y < h; y++)
              for (var x = 0; x < w; x++)
                if (xoff >= 0 && yoff >= 0 ? (si = y * sw + x << 2, ti = (yoff + y) * tw + xoff + x << 2) : (si = (-yoff + y) * sw - xoff + x << 2, ti = y * tw + x << 2), mode == 0)
                  tb[ti] = sb[si], tb[ti + 1] = sb[si + 1], tb[ti + 2] = sb[si + 2], tb[ti + 3] = sb[si + 3];
                else if (mode == 1) {
                  var fa = sb[si + 3] * 0.00392156862745098, fr = sb[si] * fa, fg = sb[si + 1] * fa, fb = sb[si + 2] * fa, ba = tb[ti + 3] * (1 / 255), br = tb[ti] * ba, bg = tb[ti + 1] * ba, bb = tb[ti + 2] * ba, ifa = 1 - fa, oa = fa + ba * ifa, ioa = oa == 0 ? 0 : 1 / oa;
                  tb[ti + 3] = 255 * oa, tb[ti + 0] = (fr + br * ifa) * ioa, tb[ti + 1] = (fg + bg * ifa) * ioa, tb[ti + 2] = (fb + bb * ifa) * ioa;
                } else if (mode == 2) {
                  var fa = sb[si + 3], fr = sb[si], fg = sb[si + 1], fb = sb[si + 2], ba = tb[ti + 3], br = tb[ti], bg = tb[ti + 1], bb = tb[ti + 2];
                  fa == ba && fr == br && fg == bg && fb == bb ? (tb[ti] = 0, tb[ti + 1] = 0, tb[ti + 2] = 0, tb[ti + 3] = 0) : (tb[ti] = fr, tb[ti + 1] = fg, tb[ti + 2] = fb, tb[ti + 3] = fa);
                } else if (mode == 3) {
                  var fa = sb[si + 3], fr = sb[si], fg = sb[si + 1], fb = sb[si + 2], ba = tb[ti + 3], br = tb[ti], bg = tb[ti + 1], bb = tb[ti + 2];
                  if (fa == ba && fr == br && fg == bg && fb == bb) continue;
                  if (fa < 220 && ba > 20) return !1;
                }
            return !0;
          }, UPNG4.encode = function(bufs, w, h, ps, dels, forbidPlte) {
            ps == null && (ps = 0), forbidPlte == null && (forbidPlte = !1);
            for (var data = new Uint8Array(bufs[0].byteLength * bufs.length + 100), wr = [137, 80, 78, 71, 13, 10, 26, 10], i = 0; i < 8; i++) data[i] = wr[i];
            var offset = 8, bin = UPNG4._bin, crc = UPNG4.crc.crc, wUi = bin.writeUint, wUs = bin.writeUshort, wAs = bin.writeASCII, nimg = UPNG4.encode.compressPNG(bufs, w, h, ps, forbidPlte);
            wUi(data, offset, 13), offset += 4, wAs(data, offset, "IHDR"), offset += 4, wUi(data, offset, w), offset += 4, wUi(data, offset, h), offset += 4, data[offset] = nimg.depth, offset++, data[offset] = nimg.ctype, offset++, data[offset] = 0, offset++, data[offset] = 0, offset++, data[offset] = 0, offset++, wUi(data, offset, crc(data, offset - 17, 17)), offset += 4, wUi(data, offset, 1), offset += 4, wAs(data, offset, "sRGB"), offset += 4, data[offset] = 1, offset++, wUi(data, offset, crc(data, offset - 5, 5)), offset += 4;
            var anim = bufs.length > 1;
            if (anim && (wUi(data, offset, 8), offset += 4, wAs(data, offset, "acTL"), offset += 4, wUi(data, offset, bufs.length), offset += 4, wUi(data, offset, 0), offset += 4, wUi(data, offset, crc(data, offset - 12, 12)), offset += 4), nimg.ctype == 3) {
              var dl = nimg.plte.length;
              wUi(data, offset, dl * 3), offset += 4, wAs(data, offset, "PLTE"), offset += 4;
              for (var i = 0; i < dl; i++) {
                var ti = i * 3, c = nimg.plte[i], r = c & 255, g = c >> 8 & 255, b = c >> 16 & 255;
                data[offset + ti + 0] = r, data[offset + ti + 1] = g, data[offset + ti + 2] = b;
              }
              if (offset += dl * 3, wUi(data, offset, crc(data, offset - dl * 3 - 4, dl * 3 + 4)), offset += 4, nimg.gotAlpha) {
                wUi(data, offset, dl), offset += 4, wAs(data, offset, "tRNS"), offset += 4;
                for (var i = 0; i < dl; i++) data[offset + i] = nimg.plte[i] >> 24 & 255;
                offset += dl, wUi(data, offset, crc(data, offset - dl - 4, dl + 4)), offset += 4;
              }
            }
            for (var fi = 0, j = 0; j < nimg.frames.length; j++) {
              var fr = nimg.frames[j];
              anim && (wUi(data, offset, 26), offset += 4, wAs(data, offset, "fcTL"), offset += 4, wUi(data, offset, fi++), offset += 4, wUi(data, offset, fr.rect.width), offset += 4, wUi(data, offset, fr.rect.height), offset += 4, wUi(data, offset, fr.rect.x), offset += 4, wUi(data, offset, fr.rect.y), offset += 4, wUs(data, offset, dels[j]), offset += 2, wUs(data, offset, 1e3), offset += 2, data[offset] = fr.dispose, offset++, data[offset] = fr.blend, offset++, wUi(data, offset, crc(data, offset - 30, 30)), offset += 4);
              var imgd = fr.cimg, dl = imgd.length;
              wUi(data, offset, dl + (j == 0 ? 0 : 4)), offset += 4;
              var ioff = offset;
              wAs(data, offset, j == 0 ? "IDAT" : "fdAT"), offset += 4, j != 0 && (wUi(data, offset, fi++), offset += 4);
              for (var i = 0; i < dl; i++) data[offset + i] = imgd[i];
              offset += dl, wUi(data, offset, crc(data, ioff, offset - ioff)), offset += 4;
            }
            return wUi(data, offset, 0), offset += 4, wAs(data, offset, "IEND"), offset += 4, wUi(data, offset, crc(data, offset - 4, 4)), offset += 4, data.buffer.slice(0, offset);
          }, UPNG4.encode.compressPNG = function(bufs, w, h, ps, forbidPlte) {
            for (var out = UPNG4.encode.compress(bufs, w, h, ps, !1, forbidPlte), i = 0; i < bufs.length; i++) {
              var frm = out.frames[i], nw = frm.rect.width, nh = frm.rect.height, bpl = frm.bpl, bpp = frm.bpp, fdata = new Uint8Array(nh * bpl + nh);
              frm.cimg = UPNG4.encode._filterZero(frm.img, nh, bpp, bpl, fdata);
            }
            return out;
          }, UPNG4.encode.compress = function(bufs, w, h, ps, forGIF, forbidPlte) {
            forbidPlte == null && (forbidPlte = !1);
            for (var ctype = 6, depth = 8, bpp = 4, alphaAnd = 255, j = 0; j < bufs.length; j++)
              for (var img = new Uint8Array(bufs[j]), ilen = img.length, i = 0; i < ilen; i += 4) alphaAnd &= img[i + 3];
            var gotAlpha = alphaAnd != 255, cmap = {}, plte = [];
            if (bufs.length != 0 && (cmap[0] = 0, plte.push(0), ps != 0 && ps--), ps != 0) {
              var qres = UPNG4.quantize(bufs, ps, forGIF);
              bufs = qres.bufs;
              for (var i = 0; i < qres.plte.length; i++) {
                var c = qres.plte[i].est.rgba;
                cmap[c] == null && (cmap[c] = plte.length, plte.push(c));
              }
            } else
              for (var j = 0; j < bufs.length; j++)
                for (var img32 = new Uint32Array(bufs[j]), ilen = img32.length, i = 0; i < ilen; i++) {
                  var c = img32[i];
                  if ((i < w || c != img32[i - 1] && c != img32[i - w]) && cmap[c] == null && (cmap[c] = plte.length, plte.push(c), plte.length >= 300))
                    break;
                }
            var brute = gotAlpha ? forGIF : !1, cc = plte.length;
            cc <= 256 && forbidPlte == !1 && (cc <= 2 ? depth = 1 : cc <= 4 ? depth = 2 : cc <= 16 ? depth = 4 : depth = 8, forGIF && (depth = 8), gotAlpha = !0);
            for (var frms = [], j = 0; j < bufs.length; j++) {
              var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer), nx = 0, ny = 0, nw = w, nh = h, blend = 0;
              if (j != 0 && !brute) {
                for (var tlim = forGIF || j == 1 || frms[frms.length - 2].dispose == 2 ? 1 : 2, tstp = 0, tarea = 1e9, it = 0; it < tlim; it++) {
                  for (var pimg = new Uint8Array(bufs[j - 1 - it]), p32 = new Uint32Array(bufs[j - 1 - it]), mix = w, miy = h, max = -1, may = -1, y = 0; y < h; y++) for (var x = 0; x < w; x++) {
                    var i = y * w + x;
                    cimg32[i] != p32[i] && (x < mix && (mix = x), x > max && (max = x), y < miy && (miy = y), y > may && (may = y));
                  }
                  var sarea = max == -1 ? 1 : (max - mix + 1) * (may - miy + 1);
                  sarea < tarea && (tarea = sarea, tstp = it, max == -1 ? (nx = ny = 0, nw = nh = 1) : (nx = mix, ny = miy, nw = max - mix + 1, nh = may - miy + 1));
                }
                var pimg = new Uint8Array(bufs[j - 1 - tstp]);
                tstp == 1 && (frms[frms.length - 1].dispose = 2);
                var nimg = new Uint8Array(nw * nh * 4), nimg32 = new Uint32Array(nimg.buffer);
                UPNG4._copyTile(pimg, w, h, nimg, nw, nh, -nx, -ny, 0), UPNG4._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 3) ? (UPNG4._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 2), blend = 1) : (UPNG4._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 0), blend = 0), cimg = nimg, cimg32 = new Uint32Array(cimg.buffer);
              }
              var bpl = 4 * nw;
              if (cc <= 256 && forbidPlte == !1) {
                bpl = Math.ceil(depth * nw / 8);
                for (var nimg = new Uint8Array(bpl * nh), y = 0; y < nh; y++) {
                  var i = y * bpl, ii = y * nw;
                  if (depth == 8) for (var x = 0; x < nw; x++) nimg[i + x] = cmap[cimg32[ii + x]];
                  else if (depth == 4) for (var x = 0; x < nw; x++) nimg[i + (x >> 1)] |= cmap[cimg32[ii + x]] << 4 - (x & 1) * 4;
                  else if (depth == 2) for (var x = 0; x < nw; x++) nimg[i + (x >> 2)] |= cmap[cimg32[ii + x]] << 6 - (x & 3) * 2;
                  else if (depth == 1) for (var x = 0; x < nw; x++) nimg[i + (x >> 3)] |= cmap[cimg32[ii + x]] << 7 - (x & 7) * 1;
                }
                cimg = nimg, ctype = 3, bpp = 1;
              } else if (gotAlpha == !1 && bufs.length == 1) {
                for (var nimg = new Uint8Array(nw * nh * 3), area = nw * nh, i = 0; i < area; i++) {
                  var ti = i * 3, qi = i * 4;
                  nimg[ti] = cimg[qi], nimg[ti + 1] = cimg[qi + 1], nimg[ti + 2] = cimg[qi + 2];
                }
                cimg = nimg, ctype = 2, bpp = 3, bpl = 3 * nw;
              }
              frms.push({ rect: { x: nx, y: ny, width: nw, height: nh }, img: cimg, bpl, bpp, blend, dispose: brute ? 1 : 0 });
            }
            return { ctype, depth, plte, gotAlpha, frames: frms };
          }, UPNG4.encode._filterZero = function(img, h, bpp, bpl, data) {
            for (var fls = [], t = 0; t < 5; t++)
              if (!(h * bpl > 5e5 && (t == 2 || t == 3 || t == 4))) {
                for (var y = 0; y < h; y++) UPNG4.encode._filterLine(data, img, y, bpl, bpp, t);
                if (fls.push(pako2.deflate(data)), bpp == 1) break;
              }
            for (var ti, tsize = 1e9, i = 0; i < fls.length; i++) fls[i].length < tsize && (ti = i, tsize = fls[i].length);
            return fls[ti];
          }, UPNG4.encode._filterLine = function(data, img, y, bpl, bpp, type) {
            var i = y * bpl, di = i + y, paeth = UPNG4.decode._paeth;
            if (data[di] = type, di++, type == 0) for (var x = 0; x < bpl; x++) data[di + x] = img[i + x];
            else if (type == 1) {
              for (var x = 0; x < bpp; x++) data[di + x] = img[i + x];
              for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - img[i + x - bpp] + 256 & 255;
            } else if (y == 0) {
              for (var x = 0; x < bpp; x++) data[di + x] = img[i + x];
              if (type == 2) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x];
              if (type == 3) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - (img[i + x - bpp] >> 1) + 256 & 255;
              if (type == 4) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - paeth(img[i + x - bpp], 0, 0) + 256 & 255;
            } else {
              if (type == 2)
                for (var x = 0; x < bpl; x++) data[di + x] = img[i + x] + 256 - img[i + x - bpl] & 255;
              if (type == 3) {
                for (var x = 0; x < bpp; x++) data[di + x] = img[i + x] + 256 - (img[i + x - bpl] >> 1) & 255;
                for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] + 256 - (img[i + x - bpl] + img[i + x - bpp] >> 1) & 255;
              }
              if (type == 4) {
                for (var x = 0; x < bpp; x++) data[di + x] = img[i + x] + 256 - paeth(0, img[i + x - bpl], 0) & 255;
                for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] + 256 - paeth(img[i + x - bpp], img[i + x - bpl], img[i + x - bpp - bpl]) & 255;
              }
            }
          }, UPNG4.crc = {
            table: (function() {
              for (var tab = new Uint32Array(256), n = 0; n < 256; n++) {
                for (var c = n, k = 0; k < 8; k++)
                  c & 1 ? c = 3988292384 ^ c >>> 1 : c = c >>> 1;
                tab[n] = c;
              }
              return tab;
            })(),
            update: function(c, buf, off, len) {
              for (var i = 0; i < len; i++) c = UPNG4.crc.table[(c ^ buf[off + i]) & 255] ^ c >>> 8;
              return c;
            },
            crc: function(b, o, l) {
              return UPNG4.crc.update(4294967295, b, o, l) ^ 4294967295;
            }
          }, UPNG4.quantize = function(bufs, ps, roundAlpha) {
            for (var imgs = [], totl = 0, i = 0; i < bufs.length; i++)
              imgs.push(UPNG4.encode.alphaMul(new Uint8Array(bufs[i]), roundAlpha)), totl += bufs[i].byteLength;
            for (var nimg = new Uint8Array(totl), nimg32 = new Uint32Array(nimg.buffer), noff = 0, i = 0; i < imgs.length; i++) {
              for (var img = imgs[i], il = img.length, j = 0; j < il; j++) nimg[noff + j] = img[j];
              noff += il;
            }
            var root = { i0: 0, i1: nimg.length, bst: null, est: null, tdst: 0, left: null, right: null };
            root.bst = UPNG4.quantize.stats(nimg, root.i0, root.i1), root.est = UPNG4.quantize.estats(root.bst);
            for (var leafs = [root]; leafs.length < ps; ) {
              for (var maxL = 0, mi = 0, i = 0; i < leafs.length; i++) leafs[i].est.L > maxL && (maxL = leafs[i].est.L, mi = i);
              if (maxL < 1e-3) break;
              var node = leafs[mi], s0 = UPNG4.quantize.splitPixels(nimg, nimg32, node.i0, node.i1, node.est.e, node.est.eMq255), ln = { i0: node.i0, i1: s0, bst: null, est: null, tdst: 0, left: null, right: null };
              ln.bst = UPNG4.quantize.stats(nimg, ln.i0, ln.i1), ln.est = UPNG4.quantize.estats(ln.bst);
              var rn = { i0: s0, i1: node.i1, bst: null, est: null, tdst: 0, left: null, right: null };
              rn.bst = { R: [], m: [], N: node.bst.N - ln.bst.N };
              for (var i = 0; i < 16; i++) rn.bst.R[i] = node.bst.R[i] - ln.bst.R[i];
              for (var i = 0; i < 4; i++) rn.bst.m[i] = node.bst.m[i] - ln.bst.m[i];
              rn.est = UPNG4.quantize.estats(rn.bst), node.left = ln, node.right = rn, leafs[mi] = ln, leafs.push(rn);
            }
            leafs.sort(function(a2, b2) {
              return b2.bst.N - a2.bst.N;
            });
            for (var ii = 0; ii < imgs.length; ii++) {
              for (var planeDst = UPNG4.quantize.planeDst, sb = new Uint8Array(imgs[ii].buffer), tb = new Uint32Array(imgs[ii].buffer), len = sb.length, stack = [], si = 0, i = 0; i < len; i += 4) {
                for (var r = sb[i] * 0.00392156862745098, g = sb[i + 1] * (1 / 255), b = sb[i + 2] * (1 / 255), a = sb[i + 3] * (1 / 255), nd = root; nd.left; ) nd = planeDst(nd.est, r, g, b, a) <= 0 ? nd.left : nd.right;
                tb[i >> 2] = nd.est.rgba;
              }
              imgs[ii] = tb.buffer;
            }
            return { bufs: imgs, plte: leafs };
          }, UPNG4.quantize.getNearest = function(nd, r, g, b, a) {
            if (nd.left == null)
              return nd.tdst = UPNG4.quantize.dist(nd.est.q, r, g, b, a), nd;
            var planeDst = UPNG4.quantize.planeDst(nd.est, r, g, b, a), node0 = nd.left, node1 = nd.right;
            planeDst > 0 && (node0 = nd.right, node1 = nd.left);
            var ln = UPNG4.quantize.getNearest(node0, r, g, b, a);
            if (ln.tdst <= planeDst * planeDst) return ln;
            var rn = UPNG4.quantize.getNearest(node1, r, g, b, a);
            return rn.tdst < ln.tdst ? rn : ln;
          }, UPNG4.quantize.planeDst = function(est, r, g, b, a) {
            var e = est.e;
            return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
          }, UPNG4.quantize.dist = function(q, r, g, b, a) {
            var d0 = r - q[0], d1 = g - q[1], d2 = b - q[2], d3 = a - q[3];
            return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
          }, UPNG4.quantize.splitPixels = function(nimg, nimg32, i0, i1, e, eMq) {
            var vecDot = UPNG4.quantize.vecDot;
            i1 -= 4;
            for (var shfs = 0; i0 < i1; ) {
              for (; vecDot(nimg, i0, e) <= eMq; ) i0 += 4;
              for (; vecDot(nimg, i1, e) > eMq; ) i1 -= 4;
              if (i0 >= i1) break;
              var t = nimg32[i0 >> 2];
              nimg32[i0 >> 2] = nimg32[i1 >> 2], nimg32[i1 >> 2] = t, i0 += 4, i1 -= 4;
            }
            for (; vecDot(nimg, i0, e) > eMq; ) i0 -= 4;
            return i0 + 4;
          }, UPNG4.quantize.vecDot = function(nimg, i, e) {
            return nimg[i] * e[0] + nimg[i + 1] * e[1] + nimg[i + 2] * e[2] + nimg[i + 3] * e[3];
          }, UPNG4.quantize.stats = function(nimg, i0, i1) {
            for (var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], m = [0, 0, 0, 0], N = i1 - i0 >> 2, i = i0; i < i1; i += 4) {
              var r = nimg[i] * 0.00392156862745098, g = nimg[i + 1] * (1 / 255), b = nimg[i + 2] * (1 / 255), a = nimg[i + 3] * (1 / 255);
              m[0] += r, m[1] += g, m[2] += b, m[3] += a, R[0] += r * r, R[1] += r * g, R[2] += r * b, R[3] += r * a, R[5] += g * g, R[6] += g * b, R[7] += g * a, R[10] += b * b, R[11] += b * a, R[15] += a * a;
            }
            return R[4] = R[1], R[8] = R[2], R[12] = R[3], R[9] = R[6], R[13] = R[7], R[14] = R[11], { R, m, N };
          }, UPNG4.quantize.estats = function(stats) {
            var R = stats.R, m = stats.m, N = stats.N, m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = N == 0 ? 0 : 1 / N, Rj = [
              R[0] - m0 * m0 * iN,
              R[1] - m0 * m1 * iN,
              R[2] - m0 * m2 * iN,
              R[3] - m0 * m3 * iN,
              R[4] - m1 * m0 * iN,
              R[5] - m1 * m1 * iN,
              R[6] - m1 * m2 * iN,
              R[7] - m1 * m3 * iN,
              R[8] - m2 * m0 * iN,
              R[9] - m2 * m1 * iN,
              R[10] - m2 * m2 * iN,
              R[11] - m2 * m3 * iN,
              R[12] - m3 * m0 * iN,
              R[13] - m3 * m1 * iN,
              R[14] - m3 * m2 * iN,
              R[15] - m3 * m3 * iN
            ], A = Rj, M = UPNG4.M4, b = [0.5, 0.5, 0.5, 0.5], mi = 0, tmi = 0;
            if (N != 0)
              for (var i = 0; i < 10 && (b = M.multVec(A, b), tmi = Math.sqrt(M.dot(b, b)), b = M.sml(1 / tmi, b), !(Math.abs(tmi - mi) < 1e-9)); i++)
                mi = tmi;
            var q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN], eMq255 = M.dot(M.sml(255, q), b), ia = q[3] < 1e-3 ? 0 : 1 / q[3];
            return {
              Cov: Rj,
              q,
              e: b,
              L: mi,
              eMq255,
              eMq: M.dot(b, q),
              rgba: (Math.round(255 * q[3]) << 24 | Math.round(255 * q[2] * ia) << 16 | Math.round(255 * q[1] * ia) << 8 | Math.round(255 * q[0] * ia) << 0) >>> 0
            };
          }, UPNG4.M4 = {
            multVec: function(m, v) {
              return [
                m[0] * v[0] + m[1] * v[1] + m[2] * v[2] + m[3] * v[3],
                m[4] * v[0] + m[5] * v[1] + m[6] * v[2] + m[7] * v[3],
                m[8] * v[0] + m[9] * v[1] + m[10] * v[2] + m[11] * v[3],
                m[12] * v[0] + m[13] * v[1] + m[14] * v[2] + m[15] * v[3]
              ];
            },
            dot: function(x, y) {
              return x[0] * y[0] + x[1] * y[1] + x[2] * y[2] + x[3] * y[3];
            },
            sml: function(a, y) {
              return [a * y[0], a * y[1], a * y[2], a * y[3]];
            }
          }, UPNG4.encode.alphaMul = function(img, roundA) {
            for (var nimg = new Uint8Array(img.length), area = img.length >> 2, i = 0; i < area; i++) {
              var qi = i << 2, ia = img[qi + 3];
              roundA && (ia = ia < 128 ? 0 : 255);
              var a = ia * (1 / 255);
              nimg[qi + 0] = img[qi + 0] * a, nimg[qi + 1] = img[qi + 1] * a, nimg[qi + 2] = img[qi + 2] * a, nimg[qi + 3] = ia;
            }
            return nimg;
          };
        })(UPNG3, pako);
      })();
    }
  });

  // node_modules/utif/UTIF.js
  var require_UTIF = __commonJS({
    "node_modules/utif/UTIF.js"(exports, module) {
      (function() {
        var UTIF2 = {};
        typeof module == "object" ? module.exports = UTIF2 : self.UTIF = UTIF2;
        var pako;
        typeof __require == "function" ? pako = require_pako() : pako = self.pako;
        function log() {
          typeof process > "u", console.log.apply(console, arguments);
        }
        (function(UTIF3, pako2) {
          (function() {
            var V = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(g) {
              return typeof g;
            } : function(g) {
              return g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype ? "symbol" : typeof g;
            }, D = (function() {
              function g(g2) {
                this.message = "JPEG error: " + g2;
              }
              return g.prototype = Error(), g.prototype.name = "JpegError", g.constructor = g;
            })(), P = (function() {
              function g(g2, D2) {
                this.message = g2, this.g = D2;
              }
              return g.prototype = Error(), g.prototype.name = "DNLMarkerError", g.constructor = g;
            })();
            (function() {
              function g() {
                this.M = null, this.B = -1;
              }
              function W(a, d) {
                for (var f = 0, e = [], b, B, k = 16; 0 < k && !a[k - 1]; ) k--;
                e.push({ children: [], index: 0 });
                var l = e[0], r;
                for (b = 0; b < k; b++) {
                  for (B = 0; B < a[b]; B++) {
                    for (l = e.pop(), l.children[l.index] = d[f]; 0 < l.index; ) l = e.pop();
                    for (l.index++, e.push(l); e.length <= b; ) e.push(r = { children: [], index: 0 }), l.children[l.index] = r.children, l = r;
                    f++;
                  }
                  b + 1 < k && (e.push(r = { children: [], index: 0 }), l.children[l.index] = r.children, l = r);
                }
                return e[0].children;
              }
              function X(a, d, f, e, b, B, k, l, r) {
                function n() {
                  if (0 < x) return x--, z >> x & 1;
                  if (z = a[d++], z === 255) {
                    var c2 = a[d++];
                    if (c2) {
                      if (c2 === 220 && g2) {
                        d += 2;
                        var b2 = a[d++] << 8 | a[d++];
                        if (0 < b2 && b2 !== f.g) throw new P("Found DNL marker (0xFFDC) while parsing scan data", b2);
                      }
                      throw new D("unexpected marker " + (z << 8 | c2).toString(16));
                    }
                  }
                  return x = 7, z >>> 7;
                }
                function q(a2) {
                  for (; ; ) {
                    if (a2 = a2[n()], typeof a2 == "number") return a2;
                    if ((typeof a2 > "u" ? "undefined" : V(a2)) !== "object") throw new D("invalid huffman sequence");
                  }
                }
                function h(a2) {
                  for (var c2 = 0; 0 < a2; ) c2 = c2 << 1 | n(), a2--;
                  return c2;
                }
                function c(a2) {
                  if (a2 === 1) return n() === 1 ? 1 : -1;
                  var c2 = h(a2);
                  return c2 >= 1 << a2 - 1 ? c2 : c2 + (-1 << a2) + 1;
                }
                function C(a2, b2) {
                  var d2 = q(a2.D);
                  for (d2 = d2 === 0 ? 0 : c(d2), a2.a[b2] = a2.m += d2, d2 = 1; 64 > d2; ) {
                    var h2 = q(a2.o), k2 = h2 & 15;
                    if (h2 >>= 4, k2 === 0) {
                      if (15 > h2) break;
                      d2 += 16;
                    } else d2 += h2, a2.a[b2 + J[d2]] = c(k2), d2++;
                  }
                }
                function w(a2, d2) {
                  var b2 = q(a2.D);
                  b2 = b2 === 0 ? 0 : c(b2) << r, a2.a[d2] = a2.m += b2;
                }
                function p(a2, c2) {
                  a2.a[c2] |= n() << r;
                }
                function m(a2, b2) {
                  if (0 < A) A--;
                  else for (var d2 = B; d2 <= k; ) {
                    var e2 = q(a2.o), f2 = e2 & 15;
                    if (e2 >>= 4, f2 === 0) {
                      if (15 > e2) {
                        A = h(e2) + (1 << e2) - 1;
                        break;
                      }
                      d2 += 16;
                    } else d2 += e2, a2.a[b2 + J[d2]] = c(f2) * (1 << r), d2++;
                  }
                }
                function t(a2, d2) {
                  for (var b2 = B, e2 = 0, f2; b2 <= k; ) {
                    f2 = d2 + J[b2];
                    var l2 = 0 > a2.a[f2] ? -1 : 1;
                    switch (E) {
                      case 0:
                        if (e2 = q(a2.o), f2 = e2 & 15, e2 >>= 4, f2 === 0) 15 > e2 ? (A = h(e2) + (1 << e2), E = 4) : (e2 = 16, E = 1);
                        else {
                          if (f2 !== 1) throw new D("invalid ACn encoding");
                          Q = c(f2), E = e2 ? 2 : 3;
                        }
                        continue;
                      case 1:
                      case 2:
                        a2.a[f2] ? a2.a[f2] += l2 * (n() << r) : (e2--, e2 === 0 && (E = E === 2 ? 3 : 0));
                        break;
                      case 3:
                        a2.a[f2] ? a2.a[f2] += l2 * (n() << r) : (a2.a[f2] = Q << r, E = 0);
                        break;
                      case 4:
                        a2.a[f2] && (a2.a[f2] += l2 * (n() << r));
                    }
                    b2++;
                  }
                  E === 4 && (A--, A === 0 && (E = 0));
                }
                for (var g2 = 9 < arguments.length && arguments[9] !== void 0 ? arguments[9] : !1, u = f.P, v = d, z = 0, x = 0, A = 0, E = 0, Q, K = e.length, F, L, M, I, R = f.S ? B === 0 ? l === 0 ? w : p : l === 0 ? m : t : C, G = 0, O = K === 1 ? e[0].c * e[0].l : u * f.O, S, T; G < O; ) {
                  var U = b ? Math.min(O - G, b) : O;
                  for (F = 0; F < K; F++) e[F].m = 0;
                  if (A = 0, K === 1) {
                    var y = e[0];
                    for (I = 0; I < U; I++) R(y, 64 * ((y.c + 1) * (G / y.c | 0) + G % y.c)), G++;
                  } else for (I = 0; I < U; I++) {
                    for (F = 0; F < K; F++) for (y = e[F], S = y.h, T = y.j, L = 0; L < T; L++) for (M = 0; M < S; M++) R(y, 64 * ((y.c + 1) * ((G / u | 0) * y.j + L) + (G % u * y.h + M)));
                    G++;
                  }
                  if (x = 0, (y = N(a, d)) && y.f && ((0, _util.warn)("decodeScan - unexpected MCU data, current marker is: " + y.f), d = y.offset), y = y && y.F, !y || 65280 >= y) throw new D("marker was not found");
                  if (65488 <= y && 65495 >= y) d += 2;
                  else break;
                }
                return (y = N(a, d)) && y.f && ((0, _util.warn)("decodeScan - unexpected Scan data, current marker is: " + y.f), d = y.offset), d - v;
              }
              function Y(a, d) {
                for (var f = d.c, e = d.l, b = new Int16Array(64), B = 0; B < e; B++) for (var k = 0; k < f; k++) {
                  var l = 64 * ((d.c + 1) * B + k), r = b, n = d.G, q = d.a;
                  if (!n) throw new D("missing required Quantization Table.");
                  for (var h = 0; 64 > h; h += 8) {
                    var c = q[l + h], C = q[l + h + 1], w = q[l + h + 2], p = q[l + h + 3], m = q[l + h + 4], t = q[l + h + 5], g2 = q[l + h + 6], u = q[l + h + 7];
                    if (c *= n[h], (C | w | p | m | t | g2 | u) === 0) c = 5793 * c + 512 >> 10, r[h] = c, r[h + 1] = c, r[h + 2] = c, r[h + 3] = c, r[h + 4] = c, r[h + 5] = c, r[h + 6] = c, r[h + 7] = c;
                    else {
                      C *= n[h + 1], w *= n[h + 2], p *= n[h + 3], m *= n[h + 4], t *= n[h + 5], g2 *= n[h + 6], u *= n[h + 7];
                      var v = 5793 * c + 128 >> 8, z = 5793 * m + 128 >> 8, x = w, A = g2;
                      m = 2896 * (C - u) + 128 >> 8, u = 2896 * (C + u) + 128 >> 8, p <<= 4, t <<= 4, v = v + z + 1 >> 1, z = v - z, c = 3784 * x + 1567 * A + 128 >> 8, x = 1567 * x - 3784 * A + 128 >> 8, A = c, m = m + t + 1 >> 1, t = m - t, u = u + p + 1 >> 1, p = u - p, v = v + A + 1 >> 1, A = v - A, z = z + x + 1 >> 1, x = z - x, c = 2276 * m + 3406 * u + 2048 >> 12, m = 3406 * m - 2276 * u + 2048 >> 12, u = c, c = 799 * p + 4017 * t + 2048 >> 12, p = 4017 * p - 799 * t + 2048 >> 12, t = c, r[h] = v + u, r[h + 7] = v - u, r[h + 1] = z + t, r[h + 6] = z - t, r[h + 2] = x + p, r[h + 5] = x - p, r[h + 3] = A + m, r[h + 4] = A - m;
                    }
                  }
                  for (n = 0; 8 > n; ++n) c = r[n], C = r[n + 8], w = r[n + 16], p = r[n + 24], m = r[n + 32], t = r[n + 40], g2 = r[n + 48], u = r[n + 56], (C | w | p | m | t | g2 | u) === 0 ? (c = 5793 * c + 8192 >> 14, c = -2040 > c ? 0 : 2024 <= c ? 255 : c + 2056 >> 4, q[l + n] = c, q[l + n + 8] = c, q[l + n + 16] = c, q[l + n + 24] = c, q[l + n + 32] = c, q[l + n + 40] = c, q[l + n + 48] = c, q[l + n + 56] = c) : (v = 5793 * c + 2048 >> 12, z = 5793 * m + 2048 >> 12, x = w, A = g2, m = 2896 * (C - u) + 2048 >> 12, u = 2896 * (C + u) + 2048 >> 12, v = (v + z + 1 >> 1) + 4112, z = v - z, c = 3784 * x + 1567 * A + 2048 >> 12, x = 1567 * x - 3784 * A + 2048 >> 12, A = c, m = m + t + 1 >> 1, t = m - t, u = u + p + 1 >> 1, p = u - p, v = v + A + 1 >> 1, A = v - A, z = z + x + 1 >> 1, x = z - x, c = 2276 * m + 3406 * u + 2048 >> 12, m = 3406 * m - 2276 * u + 2048 >> 12, u = c, c = 799 * p + 4017 * t + 2048 >> 12, p = 4017 * p - 799 * t + 2048 >> 12, t = c, c = v + u, u = v - u, C = z + t, g2 = z - t, w = x + p, t = x - p, p = A + m, m = A - m, c = 16 > c ? 0 : 4080 <= c ? 255 : c >> 4, C = 16 > C ? 0 : 4080 <= C ? 255 : C >> 4, w = 16 > w ? 0 : 4080 <= w ? 255 : w >> 4, p = 16 > p ? 0 : 4080 <= p ? 255 : p >> 4, m = 16 > m ? 0 : 4080 <= m ? 255 : m >> 4, t = 16 > t ? 0 : 4080 <= t ? 255 : t >> 4, g2 = 16 > g2 ? 0 : 4080 <= g2 ? 255 : g2 >> 4, u = 16 > u ? 0 : 4080 <= u ? 255 : u >> 4, q[l + n] = c, q[l + n + 8] = C, q[l + n + 16] = w, q[l + n + 24] = p, q[l + n + 32] = m, q[l + n + 40] = t, q[l + n + 48] = g2, q[l + n + 56] = u);
                }
                return d.a;
              }
              function N(a, d) {
                var f = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : d, e = a.length - 1;
                if (f = f < d ? f : d, d >= e) return null;
                var b = a[d] << 8 | a[d + 1];
                if (65472 <= b && 65534 >= b) return { f: null, F: b, offset: d };
                for (var B = a[f] << 8 | a[f + 1]; !(65472 <= B && 65534 >= B); ) {
                  if (++f >= e) return null;
                  B = a[f] << 8 | a[f + 1];
                }
                return { f: b.toString(16), F: B, offset: f };
              }
              var J = new Uint8Array([
                0,
                1,
                8,
                16,
                9,
                2,
                3,
                10,
                17,
                24,
                32,
                25,
                18,
                11,
                4,
                5,
                12,
                19,
                26,
                33,
                40,
                48,
                41,
                34,
                27,
                20,
                13,
                6,
                7,
                14,
                21,
                28,
                35,
                42,
                49,
                56,
                57,
                50,
                43,
                36,
                29,
                22,
                15,
                23,
                30,
                37,
                44,
                51,
                58,
                59,
                52,
                45,
                38,
                31,
                39,
                46,
                53,
                60,
                61,
                54,
                47,
                55,
                62,
                63
              ]);
              g.prototype = { parse: function(a) {
                function d() {
                  var d2 = a[k] << 8 | a[k + 1];
                  return k += 2, d2;
                }
                function f() {
                  var b2 = d();
                  b2 = k + b2 - 2;
                  var c2 = N(a, b2, k);
                  return c2 && c2.f && ((0, _util.warn)("readDataBlock - incorrect length, current marker is: " + c2.f), b2 = c2.offset), b2 = a.subarray(k, b2), k += b2.length, b2;
                }
                function e(a2) {
                  for (var b2 = Math.ceil(a2.v / 8 / a2.s), c2 = Math.ceil(a2.g / 8 / a2.u), d2 = 0; d2 < a2.b.length; d2++) {
                    v = a2.b[d2];
                    var e2 = Math.ceil(Math.ceil(a2.v / 8) * v.h / a2.s), f2 = Math.ceil(Math.ceil(a2.g / 8) * v.j / a2.u);
                    v.a = new Int16Array(64 * c2 * v.j * (b2 * v.h + 1)), v.c = e2, v.l = f2;
                  }
                  a2.P = b2, a2.O = c2;
                }
                var b = (1 < arguments.length && arguments[1] !== void 0 ? arguments[1] : {}).N, B = b === void 0 ? null : b, k = 0, l = null, r = 0;
                b = [];
                var n = [], q = [], h = d();
                if (h !== 65496) throw new D("SOI not found");
                for (h = d(); h !== 65497; ) {
                  switch (h) {
                    case 65504:
                    case 65505:
                    case 65506:
                    case 65507:
                    case 65508:
                    case 65509:
                    case 65510:
                    case 65511:
                    case 65512:
                    case 65513:
                    case 65514:
                    case 65515:
                    case 65516:
                    case 65517:
                    case 65518:
                    case 65519:
                    case 65534:
                      var c = f();
                      h === 65518 && c[0] === 65 && c[1] === 100 && c[2] === 111 && c[3] === 98 && c[4] === 101 && (l = { version: c[5] << 8 | c[6], Y: c[7] << 8 | c[8], Z: c[9] << 8 | c[10], W: c[11] });
                      break;
                    case 65499:
                      h = d() + k - 2;
                      for (var g2; k < h; ) {
                        var w = a[k++], p = new Uint16Array(64);
                        if (w >> 4 === 0) for (c = 0; 64 > c; c++) g2 = J[c], p[g2] = a[k++];
                        else if (w >> 4 === 1) for (c = 0; 64 > c; c++) g2 = J[c], p[g2] = d();
                        else throw new D("DQT - invalid table spec");
                        b[w & 15] = p;
                      }
                      break;
                    case 65472:
                    case 65473:
                    case 65474:
                      if (m) throw new D("Only single frame JPEGs supported");
                      d();
                      var m = {};
                      for (m.X = h === 65473, m.S = h === 65474, m.precision = a[k++], h = d(), m.g = B || h, m.v = d(), m.b = [], m.C = {}, c = a[k++], h = p = w = 0; h < c; h++) {
                        g2 = a[k];
                        var t = a[k + 1] >> 4, H = a[k + 1] & 15;
                        w < t && (w = t), p < H && (p = H), t = m.b.push({ h: t, j: H, T: a[k + 2], G: null }), m.C[g2] = t - 1, k += 3;
                      }
                      m.s = w, m.u = p, e(m);
                      break;
                    case 65476:
                      for (g2 = d(), h = 2; h < g2; ) {
                        for (w = a[k++], p = new Uint8Array(16), c = t = 0; 16 > c; c++, k++) t += p[c] = a[k];
                        for (H = new Uint8Array(t), c = 0; c < t; c++, k++) H[c] = a[k];
                        h += 17 + t, (w >> 4 === 0 ? q : n)[w & 15] = W(p, H);
                      }
                      break;
                    case 65501:
                      d();
                      var u = d();
                      break;
                    case 65498:
                      for (c = ++r === 1 && !B, d(), w = a[k++], g2 = [], h = 0; h < w; h++) {
                        p = m.C[a[k++]];
                        var v = m.b[p];
                        p = a[k++], v.D = q[p >> 4], v.o = n[p & 15], g2.push(v);
                      }
                      h = a[k++], w = a[k++], p = a[k++];
                      try {
                        var z = X(a, k, m, g2, u, h, w, p >> 4, p & 15, c);
                        k += z;
                      } catch (x) {
                        if (x instanceof P) return (0, _util.warn)('Attempting to re-parse JPEG image using "scanLines" parameter found in DNL marker (0xFFDC) segment.'), this.parse(a, { N: x.g });
                        throw x;
                      }
                      break;
                    case 65500:
                      k += 4;
                      break;
                    case 65535:
                      a[k] !== 255 && k--;
                      break;
                    default:
                      if (a[k - 3] === 255 && 192 <= a[k - 2] && 254 >= a[k - 2]) k -= 3;
                      else if ((c = N(a, k - 2)) && c.f) (0, _util.warn)("JpegImage.parse - unexpected data, current marker is: " + c.f), k = c.offset;
                      else throw new D("unknown marker " + h.toString(16));
                  }
                  h = d();
                }
                for (this.width = m.v, this.height = m.g, this.A = l, this.b = [], h = 0; h < m.b.length; h++)
                  v = m.b[h], (u = b[v.T]) && (v.G = u), this.b.push({ R: Y(m, v), U: v.h / m.s, V: v.j / m.u, c: v.c, l: v.l });
                this.i = this.b.length;
              }, L: function(a, d) {
                var f = this.width / a, e = this.height / d, b, g2, k = this.b.length, l = a * d * k, r = new Uint8ClampedArray(l), n = new Uint32Array(a);
                for (g2 = 0; g2 < k; g2++) {
                  var q = this.b[g2], h = q.U * f, c = q.V * e, C = g2, w = q.R, p = q.c + 1 << 3;
                  for (b = 0; b < a; b++) q = 0 | b * h, n[b] = (q & 4294967288) << 3 | q & 7;
                  for (h = 0; h < d; h++) for (q = 0 | h * c, q = p * (q & 4294967288) | (q & 7) << 3, b = 0; b < a; b++) r[C] = w[q + n[b]], C += k;
                }
                if (e = this.M) for (g2 = 0; g2 < l; ) for (f = q = 0; q < k; q++, g2++, f += 2) r[g2] = (r[g2] * e[f] >> 8) + e[f + 1];
                return r;
              }, w: function() {
                return this.A ? !!this.A.W : this.i === 3 ? this.B !== 0 : this.B === 1;
              }, I: function(a) {
                for (var d, f, e, b = 0, g2 = a.length; b < g2; b += 3) d = a[b], f = a[b + 1], e = a[b + 2], a[b] = d - 179.456 + 1.402 * e, a[b + 1] = d + 135.459 - 0.344 * f - 0.714 * e, a[b + 2] = d - 226.816 + 1.772 * f;
                return a;
              }, K: function(a) {
                for (var d, f, e, b, g2 = 0, k = 0, l = a.length; k < l; k += 4) d = a[k], f = a[k + 1], e = a[k + 2], b = a[k + 3], a[g2++] = -122.67195406894 + f * (-660635669420364e-19 * f + 437130475926232e-18 * e - 54080610064599e-18 * d + 48449797120281e-17 * b - 0.154362151871126) + e * (-957964378445773e-18 * e + 817076911346625e-18 * d - 0.00477271405408747 * b + 1.53380253221734) + d * (961250184130688e-18 * d - 0.00266257332283933 * b + 0.48357088451265) + b * (-336197177618394e-18 * b + 0.484791561490776), a[g2++] = 107.268039397724 + f * (219927104525741e-19 * f - 640992018297945e-18 * e + 659397001245577e-18 * d + 426105652938837e-18 * b - 0.176491792462875) + e * (-778269941513683e-18 * e + 0.00130872261408275 * d + 770482631801132e-18 * b - 0.151051492775562) + d * (0.00126935368114843 * d - 0.00265090189010898 * b + 0.25802910206845) + b * (-318913117588328e-18 * b - 0.213742400323665), a[g2++] = -20.810012546947 + f * (-570115196973677e-18 * f - 263409051004589e-19 * e + 0.0020741088115012 * d - 0.00288260236853442 * b + 0.814272968359295) + e * (-153496057440975e-19 * e - 132689043961446e-18 * d + 560833691242812e-18 * b - 0.195152027534049) + d * (0.00174418132927582 * d - 0.00255243321439347 * b + 0.116935020465145) + b * (-343531996510555e-18 * b + 0.24165260232407);
                return a.subarray(
                  0,
                  g2
                );
              }, J: function(a) {
                for (var d, f, e, b = 0, g2 = a.length; b < g2; b += 4) d = a[b], f = a[b + 1], e = a[b + 2], a[b] = 434.456 - d - 1.402 * e, a[b + 1] = 119.541 - d + 0.344 * f + 0.714 * e, a[b + 2] = 481.816 - d - 1.772 * f;
                return a;
              }, H: function(a) {
                for (var d, f, e, b, g2 = 0, k = 1 / 255, l = 0, r = a.length; l < r; l += 4) d = a[l] * k, f = a[l + 1] * k, e = a[l + 2] * k, b = a[l + 3] * k, a[g2++] = 255 + d * (-4.387332384609988 * d + 54.48615194189176 * f + 18.82290502165302 * e + 212.25662451639585 * b - 285.2331026137004) + f * (1.7149763477362134 * f - 5.6096736904047315 * e - 17.873870861415444 * b - 5.497006427196366) + e * (-2.5217340131683033 * e - 21.248923337353073 * b + 17.5119270841813) - b * (21.86122147463605 * b + 189.48180835922747), a[g2++] = 255 + d * (8.841041422036149 * d + 60.118027045597366 * f + 6.871425592049007 * e + 31.159100130055922 * b - 79.2970844816548) + f * (-15.310361306967817 * f + 17.575251261109482 * e + 131.35250912493976 * b - 190.9453302588951) + e * (4.444339102852739 * e + 9.8632861493405 * b - 24.86741582555878) - b * (20.737325471181034 * b + 187.80453709719578), a[g2++] = 255 + d * (0.8842522430003296 * d + 8.078677503112928 * f + 30.89978309703729 * e - 0.23883238689178934 * b - 14.183576799673286) + f * (10.49593273432072 * f + 63.02378494754052 * e + 50.606957656360734 * b - 112.23884253719248) + e * (0.03296041114873217 * e + 115.60384449646641 * b - 193.58209356861505) - b * (22.33816807309886 * b + 180.12613974708367);
                return a.subarray(0, g2);
              }, getData: function(a, d, f) {
                if (4 < this.i) throw new D("Unsupported color mode");
                if (a = this.L(a, d), this.i === 1 && f) {
                  f = a.length, d = new Uint8ClampedArray(3 * f);
                  for (var e = 0, b = 0; b < f; b++) {
                    var g2 = a[b];
                    d[e++] = g2, d[e++] = g2, d[e++] = g2;
                  }
                  return d;
                }
                if (this.i === 3 && this.w()) return this.I(a);
                if (this.i === 4) {
                  if (this.w()) return f ? this.K(a) : this.J(a);
                  if (f) return this.H(a);
                }
                return a;
              } }, UTIF3.JpegDecoder = g;
            })();
          })(), UTIF3.encodeImage = function(rgba, w, h, metadata) {
            var idf = {
              t256: [w],
              t257: [h],
              t258: [8, 8, 8, 8],
              t259: [1],
              t262: [2],
              t273: [1e3],
              // strips offset
              t277: [4],
              t278: [h],
              /* rows per strip */
              t279: [w * h * 4],
              // strip byte counts
              t282: [1],
              t283: [1],
              t284: [1],
              t286: [0],
              t287: [0],
              t296: [1],
              t305: ["Photopea (UTIF.js)"],
              t338: [1]
            };
            if (metadata) for (var i in metadata) idf[i] = metadata[i];
            for (var prfx = new Uint8Array(UTIF3.encode([idf])), img = new Uint8Array(rgba), data = new Uint8Array(1e3 + w * h * 4), i = 0; i < prfx.length; i++) data[i] = prfx[i];
            for (var i = 0; i < img.length; i++) data[1e3 + i] = img[i];
            return data.buffer;
          }, UTIF3.encode = function(ifds) {
            var data = new Uint8Array(2e4), offset = 4, bin = UTIF3._binBE;
            data[0] = 77, data[1] = 77, data[3] = 42;
            var ifdo = 8;
            bin.writeUint(data, offset, ifdo), offset += 4;
            for (var i = 0; i < ifds.length; i++) {
              var noffs = UTIF3._writeIFD(bin, data, ifdo, ifds[i]);
              ifdo = noffs[1], i < ifds.length - 1 && bin.writeUint(data, noffs[0], ifdo);
            }
            return data.slice(0, ifdo).buffer;
          }, UTIF3.decode = function(buff) {
            UTIF3.decode._decodeG3.allow2D = null;
            var data = new Uint8Array(buff), offset = 0, id = UTIF3._binBE.readASCII(data, offset, 2);
            offset += 2;
            var bin = id == "II" ? UTIF3._binLE : UTIF3._binBE, num = bin.readUshort(data, offset);
            offset += 2;
            var ifdo = bin.readUint(data, offset);
            offset += 4;
            for (var ifds = []; ; ) {
              var noff = UTIF3._readIFD(bin, data, ifdo, ifds, 0, !1);
              if (ifdo = bin.readUint(data, noff), ifdo == 0) break;
            }
            return ifds;
          }, UTIF3.decodeImage = function(buff, img, ifds) {
            var data = new Uint8Array(buff), id = UTIF3._binBE.readASCII(data, 0, 2);
            if (img.t256 != null) {
              img.isLE = id == "II", img.width = img.t256[0], img.height = img.t257[0];
              var cmpr = img.t259 ? img.t259[0] : 1, fo = img.t266 ? img.t266[0] : 1;
              img.t284 && img.t284[0] == 2 && log("PlanarConfiguration 2 should not be used!");
              var bipp;
              img.t258 ? bipp = Math.min(32, img.t258[0]) * img.t258.length : bipp = img.t277 ? img.t277[0] : 1, cmpr == 1 && img.t279 != null && img.t278 && img.t262[0] == 32803 && (bipp = Math.round(img.t279[0] * 8 / (img.width * img.t278[0])));
              var bipl = Math.ceil(img.width * bipp / 8) * 8, soff = img.t273;
              soff == null && (soff = img.t324);
              var bcnt = img.t279;
              cmpr == 1 && soff.length == 1 && (bcnt = [img.height * (bipl >>> 3)]), bcnt == null && (bcnt = img.t325);
              var bytes = new Uint8Array(img.height * (bipl >>> 3)), bilen = 0;
              if (img.t322 != null) {
                for (var tw = img.t322[0], th = img.t323[0], tx = Math.floor((img.width + tw - 1) / tw), ty = Math.floor((img.height + th - 1) / th), tbuff = new Uint8Array(Math.ceil(tw * th * bipp / 8) | 0), y = 0; y < ty; y++)
                  for (var x = 0; x < tx; x++) {
                    for (var i = y * tx + x, j = 0; j < tbuff.length; j++) tbuff[j] = 0;
                    UTIF3.decode._decompress(img, ifds, data, soff[i], bcnt[i], cmpr, tbuff, 0, fo), cmpr == 6 ? bytes = tbuff : UTIF3._copyTile(tbuff, Math.ceil(tw * bipp / 8) | 0, th, bytes, Math.ceil(img.width * bipp / 8) | 0, img.height, Math.ceil(x * tw * bipp / 8) | 0, y * th);
                  }
                bilen = bytes.length * 8;
              } else {
                var rps = img.t278 ? img.t278[0] : img.height;
                rps = Math.min(rps, img.height);
                for (var i = 0; i < soff.length; i++)
                  UTIF3.decode._decompress(img, ifds, data, soff[i], bcnt[i], cmpr, bytes, Math.ceil(bilen / 8) | 0, fo), bilen += bipl * rps;
                bilen = Math.min(bilen, bytes.length * 8);
              }
              img.data = new Uint8Array(bytes.buffer, 0, Math.ceil(bilen / 8) | 0);
            }
          }, UTIF3.decode._decompress = function(img, ifds, data, off, len, cmpr, tgt, toff, fo) {
            if (cmpr == 1 || len == tgt.length && cmpr != 32767) for (var j = 0; j < len; j++) tgt[toff + j] = data[off + j];
            else if (cmpr == 3) UTIF3.decode._decodeG3(data, off, len, tgt, toff, img.width, fo);
            else if (cmpr == 4) UTIF3.decode._decodeG4(data, off, len, tgt, toff, img.width, fo);
            else if (cmpr == 5) UTIF3.decode._decodeLZW(data, off, tgt, toff);
            else if (cmpr == 6) UTIF3.decode._decodeOldJPEG(img, data, off, len, tgt, toff);
            else if (cmpr == 7) UTIF3.decode._decodeNewJPEG(img, data, off, len, tgt, toff);
            else if (cmpr == 8)
              for (var src = new Uint8Array(data.buffer, off, len), bin = pako2.inflate(src), i = 0; i < bin.length; i++) tgt[toff + i] = bin[i];
            else cmpr == 32767 ? UTIF3.decode._decodeARW(img, data, off, len, tgt, toff) : cmpr == 32773 ? UTIF3.decode._decodePackBits(data, off, len, tgt, toff) : cmpr == 32809 ? UTIF3.decode._decodeThunder(data, off, len, tgt, toff) : cmpr == 34713 ? UTIF3.decode._decodeNikon(img, ifds, data, off, len, tgt, toff) : log("Unknown compression", cmpr);
            var bps = img.t258 ? Math.min(32, img.t258[0]) : 1, noc = img.t277 ? img.t277[0] : 1, bpp = bps * noc >>> 3, h = img.t278 ? img.t278[0] : img.height, bpl = Math.ceil(bps * noc * img.width / 8);
            if (bps == 16 && !img.isLE && img.t33422 == null)
              for (var y = 0; y < h; y++)
                for (var roff = toff + y * bpl, x = 1; x < bpl; x += 2) {
                  var t = tgt[roff + x];
                  tgt[roff + x] = tgt[roff + x - 1], tgt[roff + x - 1] = t;
                }
            if (img.t317 && img.t317[0] == 2)
              for (var y = 0; y < h; y++) {
                var ntoff = toff + y * bpl;
                if (bps == 16) for (var j = bpp; j < bpl; j += 2) {
                  var nv = (tgt[ntoff + j + 1] << 8 | tgt[ntoff + j]) + (tgt[ntoff + j - bpp + 1] << 8 | tgt[ntoff + j - bpp]);
                  tgt[ntoff + j] = nv & 255, tgt[ntoff + j + 1] = nv >>> 8 & 255;
                }
                else if (noc == 3) for (var j = 3; j < bpl; j += 3)
                  tgt[ntoff + j] = tgt[ntoff + j] + tgt[ntoff + j - 3] & 255, tgt[ntoff + j + 1] = tgt[ntoff + j + 1] + tgt[ntoff + j - 2] & 255, tgt[ntoff + j + 2] = tgt[ntoff + j + 2] + tgt[ntoff + j - 1] & 255;
                else for (var j = bpp; j < bpl; j++) tgt[ntoff + j] = tgt[ntoff + j] + tgt[ntoff + j - bpp] & 255;
              }
          }, UTIF3.decode._ljpeg_diff = function(data, prm, huff) {
            var getbithuff = UTIF3.decode._getbithuff, len, diff;
            return len = getbithuff(data, prm, huff[0], huff), diff = getbithuff(data, prm, len, 0), (diff & 1 << len - 1) == 0 && (diff -= (1 << len) - 1), diff;
          }, UTIF3.decode._decodeARW = function(img, inp, off, src_length, tgt, toff) {
            var raw_width = img.t256[0], height = img.t257[0], tiff_bps = img.t258[0], bin = img.isLE ? UTIF3._binLE : UTIF3._binBE, arw2 = raw_width * height == src_length || raw_width * height * 1.5 == src_length;
            if (!arw2) {
              height += 8;
              var prm = [off, 0, 0, 0], huff = new Uint16Array(32770), tab = [
                3857,
                3856,
                3599,
                3342,
                3085,
                2828,
                2571,
                2314,
                2057,
                1800,
                1543,
                1286,
                1029,
                772,
                771,
                768,
                514,
                513
              ], i, c, n, col, row, sum = 0, ljpeg_diff = UTIF3.decode._ljpeg_diff;
              for (huff[0] = 15, n = i = 0; i < 18; i++)
                for (var lim = 32768 >>> (tab[i] >>> 8), c = 0; c < lim; c++) huff[++n] = tab[i];
              for (col = raw_width; col--; )
                for (row = 0; row < height + 1; row += 2)
                  if (row == height && (row = 1), sum += ljpeg_diff(inp, prm, huff), row < height) {
                    var clr = sum & 4095;
                    UTIF3.decode._putsF(tgt, (row * raw_width + col) * tiff_bps, clr << 16 - tiff_bps);
                  }
              return;
            }
            if (raw_width * height * 1.5 == src_length) {
              for (var i = 0; i < src_length; i += 3) {
                var b0 = inp[off + i + 0], b1 = inp[off + i + 1], b2 = inp[off + i + 2];
                tgt[toff + i] = b1 << 4 | b0 >>> 4, tgt[toff + i + 1] = b0 << 4 | b2 >>> 4, tgt[toff + i + 2] = b2 << 4 | b1 >>> 4;
              }
              return;
            }
            var pix = new Uint16Array(16), row, col, val, max, min, imax, imin, sh, bit, i, dp, data = new Uint8Array(raw_width + 1);
            for (row = 0; row < height; row++) {
              for (var j = 0; j < raw_width; j++) data[j] = inp[off++];
              for (dp = 0, col = 0; col < raw_width - 30; dp += 16) {
                for (max = 2047 & (val = bin.readUint(data, dp)), min = 2047 & val >>> 11, imax = 15 & val >>> 22, imin = 15 & val >>> 26, sh = 0; sh < 4 && 128 << sh <= max - min; sh++) ;
                for (bit = 30, i = 0; i < 16; i++)
                  i == imax ? pix[i] = max : i == imin ? pix[i] = min : (pix[i] = ((bin.readUshort(data, dp + (bit >> 3)) >>> (bit & 7) & 127) << sh) + min, pix[i] > 2047 && (pix[i] = 2047), bit += 7);
                for (i = 0; i < 16; i++, col += 2) {
                  var clr = pix[i] << 1;
                  UTIF3.decode._putsF(tgt, (row * raw_width + col) * tiff_bps, clr << 16 - tiff_bps);
                }
                col -= col & 1 ? 1 : 31;
              }
            }
          }, UTIF3.decode._decodeNikon = function(img, imgs, data, off, src_length, tgt, toff) {
            var nikon_tree = [
              [
                0,
                0,
                1,
                5,
                1,
                1,
                1,
                1,
                1,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                /* 12-bit lossy */
                5,
                4,
                3,
                6,
                2,
                7,
                1,
                0,
                8,
                9,
                11,
                10,
                12
              ],
              [
                0,
                0,
                1,
                5,
                1,
                1,
                1,
                1,
                1,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                /* 12-bit lossy after split */
                57,
                90,
                56,
                39,
                22,
                5,
                4,
                3,
                2,
                1,
                0,
                11,
                12,
                12
              ],
              [
                0,
                0,
                1,
                4,
                2,
                3,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                /* 12-bit lossless */
                5,
                4,
                6,
                3,
                7,
                2,
                8,
                1,
                9,
                0,
                10,
                11,
                12
              ],
              [
                0,
                0,
                1,
                4,
                3,
                1,
                1,
                1,
                1,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                /* 14-bit lossy */
                5,
                6,
                4,
                7,
                8,
                3,
                9,
                2,
                1,
                0,
                10,
                11,
                12,
                13,
                14
              ],
              [
                0,
                0,
                1,
                5,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                /* 14-bit lossy after split */
                8,
                92,
                75,
                58,
                41,
                7,
                6,
                5,
                4,
                3,
                2,
                1,
                0,
                13,
                14
              ],
              [
                0,
                0,
                1,
                4,
                2,
                2,
                3,
                1,
                2,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                /* 14-bit lossless */
                7,
                6,
                8,
                5,
                9,
                4,
                10,
                3,
                11,
                12,
                2,
                0,
                1,
                13,
                14
              ]
            ], raw_width = img.t256[0], height = img.t257[0], tiff_bps = img.t258[0], tree = 0, split = 0, make_decoder = UTIF3.decode._make_decoder, getbithuff = UTIF3.decode._getbithuff, mn = imgs[0].exifIFD.makerNote, md = mn.t150 ? mn.t150 : mn.t140, mdo = 0, ver0 = md[mdo++], ver1 = md[mdo++];
            (ver0 == 73 || ver1 == 88) && (mdo += 2110), ver0 == 70 && (tree = 2), tiff_bps == 14 && (tree += 3);
            for (var vpred = [[0, 0], [0, 0]], bin = img.isLE ? UTIF3._binLE : UTIF3._binBE, i = 0; i < 2; i++) for (var j = 0; j < 2; j++)
              vpred[i][j] = bin.readShort(md, mdo), mdo += 2;
            var max = 1 << tiff_bps & 32767, step = 0, csize = bin.readShort(md, mdo);
            mdo += 2, csize > 1 && (step = Math.floor(max / (csize - 1))), ver0 == 68 && ver1 == 32 && step > 0 && (split = bin.readShort(md, 562));
            var i, row, col, len, shl, diff, min_v = 0, hpred = [0, 0], huff = make_decoder(nikon_tree[tree]), prm = [off, 0, 0, 0];
            for (min_v = row = 0; row < height; row++)
              for (split && row == split && (huff = make_decoder(nikon_tree[tree + 1])), col = 0; col < raw_width; col++) {
                i = getbithuff(data, prm, huff[0], huff), len = i & 15, shl = i >>> 4, diff = (getbithuff(data, prm, len - shl, 0) << 1) + 1 << shl >>> 1, (diff & 1 << len - 1) == 0 && (diff -= (1 << len) - (shl == 0 ? 1 : 0)), col < 2 ? hpred[col] = vpred[row & 1][col] += diff : hpred[col & 1] += diff;
                var clr = Math.min(Math.max(hpred[col & 1], 0), (1 << tiff_bps) - 1), bti = (row * raw_width + col) * tiff_bps;
                UTIF3.decode._putsF(tgt, bti, clr << 16 - tiff_bps);
              }
          }, UTIF3.decode._putsF = function(dt, pos, val) {
            val = val << 8 - (pos & 7);
            var o = pos >>> 3;
            dt[o] |= val >>> 16, dt[o + 1] |= val >>> 8, dt[o + 2] |= val;
          }, UTIF3.decode._getbithuff = function(data, prm, nbits, huff) {
            var zero_after_ff = 0, get_byte = UTIF3.decode._get_byte, c, off = prm[0], bitbuf = prm[1], vbits = prm[2], reset = prm[3];
            if (nbits == 0 || vbits < 0) return 0;
            for (; !reset && vbits < nbits && (c = data[off++]) != -1 && !(reset = zero_after_ff && c == 255 && data[off++]); )
              bitbuf = (bitbuf << 8) + c, vbits += 8;
            if (c = bitbuf << 32 - vbits >>> 32 - nbits, huff ? (vbits -= huff[c + 1] >>> 8, c = huff[c + 1] & 255) : vbits -= nbits, vbits < 0) throw "e";
            return prm[0] = off, prm[1] = bitbuf, prm[2] = vbits, prm[3] = reset, c;
          }, UTIF3.decode._make_decoder = function(source) {
            var max, len, h, i, j, huff = [];
            for (max = 16; max != 0 && !source[max]; max--) ;
            var si = 17;
            for (huff[0] = max, h = len = 1; len <= max; len++)
              for (i = 0; i < source[len]; i++, ++si)
                for (j = 0; j < 1 << max - len; j++)
                  h <= 1 << max && (huff[h++] = len << 8 | source[si]);
            return huff;
          }, UTIF3.decode._decodeNewJPEG = function(img, data, off, len, tgt, toff) {
            var tables = img.t347, tlen = tables ? tables.length : 0, buff = new Uint8Array(tlen + len);
            if (tables) {
              for (var SOI = 216, EOI2 = 217, boff = 0, i = 0; i < tlen - 1 && !(tables[i] == 255 && tables[i + 1] == EOI2); i++)
                buff[boff++] = tables[i];
              var byte1 = data[off], byte2 = data[off + 1];
              (byte1 != 255 || byte2 != SOI) && (buff[boff++] = byte1, buff[boff++] = byte2);
              for (var i = 2; i < len; i++) buff[boff++] = data[off + i];
            } else for (var i = 0; i < len; i++) buff[i] = data[off + i];
            if (img.t262[0] == 32803 || img.t262[0] == 34892) {
              var bps = img.t258[0], out = UTIF3.LosslessJpegDecode(buff), olen = out.length;
              if (bps == 16)
                if (img.isLE) for (var i = 0; i < olen; i++)
                  tgt[toff + (i << 1)] = out[i] & 255, tgt[toff + (i << 1) + 1] = out[i] >>> 8;
                else for (var i = 0; i < olen; i++)
                  tgt[toff + (i << 1)] = out[i] >>> 8, tgt[toff + (i << 1) + 1] = out[i] & 255;
              else if (bps == 14 || bps == 12)
                for (var rst = 16 - bps, i = 0; i < olen; i++) UTIF3.decode._putsF(tgt, i * bps, out[i] << rst);
              else throw new Error("unsupported bit depth " + bps);
            } else {
              var parser = new UTIF3.JpegDecoder();
              parser.parse(buff);
              for (var decoded = parser.getData(parser.width, parser.height), i = 0; i < decoded.length; i++) tgt[toff + i] = decoded[i];
            }
            img.t262[0] == 6 && (img.t262[0] = 2);
          }, UTIF3.decode._decodeOldJPEGInit = function(img, data, off, len) {
            var SOI = 216, EOI2 = 217, DQT = 219, DHT = 196, DRI = 221, SOF0 = 192, SOS2 = 218, joff = 0, soff = 0, tables, sosMarker2, isTiled = !1, i, j, k, jpgIchgFmt = img.t513, jifoff = jpgIchgFmt ? jpgIchgFmt[0] : 0, jpgIchgFmtLen = img.t514, jiflen = jpgIchgFmtLen ? jpgIchgFmtLen[0] : 0, soffTag = img.t324 || img.t273 || jpgIchgFmt, ycbcrss = img.t530, ssx = 0, ssy = 0, spp = img.t277 ? img.t277[0] : 1, jpgresint = img.t515;
            if (soffTag && (soff = soffTag[0], isTiled = soffTag.length > 1), !isTiled) {
              if (data[off] == 255 && data[off + 1] == SOI) return { jpegOffset: off };
              if (jpgIchgFmt != null && (data[off + jifoff] == 255 && data[off + jifoff + 1] == SOI ? joff = off + jifoff : log("JPEGInterchangeFormat does not point to SOI"), jpgIchgFmtLen == null ? log("JPEGInterchangeFormatLength field is missing") : (jifoff >= soff || jifoff + jiflen <= soff) && log("JPEGInterchangeFormatLength field value is invalid"), joff != null))
                return { jpegOffset: joff };
            }
            if (ycbcrss != null && (ssx = ycbcrss[0], ssy = ycbcrss[1]), jpgIchgFmt != null && jpgIchgFmtLen != null)
              if (jiflen >= 2 && jifoff + jiflen <= soff) {
                for (data[off + jifoff + jiflen - 2] == 255 && data[off + jifoff + jiflen - 1] == SOI ? tables = new Uint8Array(jiflen - 2) : tables = new Uint8Array(jiflen), i = 0; i < tables.length; i++) tables[i] = data[off + jifoff + i];
                log("Incorrect JPEG interchange format: using JPEGInterchangeFormat offset to derive tables");
              } else log("JPEGInterchangeFormat+JPEGInterchangeFormatLength > offset to first strip or tile");
            if (tables == null) {
              var ooff = 0, out = [];
              out[ooff++] = 255, out[ooff++] = SOI;
              var qtables = img.t519;
              if (qtables == null) throw new Error("JPEGQTables tag is missing");
              for (i = 0; i < qtables.length; i++)
                for (out[ooff++] = 255, out[ooff++] = DQT, out[ooff++] = 0, out[ooff++] = 67, out[ooff++] = i, j = 0; j < 64; j++) out[ooff++] = data[off + qtables[i] + j];
              for (k = 0; k < 2; k++) {
                var htables = img[k == 0 ? "t520" : "t521"];
                if (htables == null) throw new Error((k == 0 ? "JPEGDCTables" : "JPEGACTables") + " tag is missing");
                for (i = 0; i < htables.length; i++) {
                  out[ooff++] = 255, out[ooff++] = DHT;
                  var nc = 19;
                  for (j = 0; j < 16; j++) nc += data[off + htables[i] + j];
                  for (out[ooff++] = nc >>> 8, out[ooff++] = nc & 255, out[ooff++] = i | k << 4, j = 0; j < 16; j++) out[ooff++] = data[off + htables[i] + j];
                  for (j = 0; j < nc; j++) out[ooff++] = data[off + htables[i] + 16 + j];
                }
              }
              if (out[ooff++] = 255, out[ooff++] = SOF0, out[ooff++] = 0, out[ooff++] = 8 + 3 * spp, out[ooff++] = 8, out[ooff++] = img.height >>> 8 & 255, out[ooff++] = img.height & 255, out[ooff++] = img.width >>> 8 & 255, out[ooff++] = img.width & 255, out[ooff++] = spp, spp == 1)
                out[ooff++] = 1, out[ooff++] = 17, out[ooff++] = 0;
              else for (i = 0; i < 3; i++)
                out[ooff++] = i + 1, out[ooff++] = i != 0 ? 17 : (ssx & 15) << 4 | ssy & 15, out[ooff++] = i;
              jpgresint != null && jpgresint[0] != 0 && (out[ooff++] = 255, out[ooff++] = DRI, out[ooff++] = 0, out[ooff++] = 4, out[ooff++] = jpgresint[0] >>> 8 & 255, out[ooff++] = jpgresint[0] & 255), tables = new Uint8Array(out);
            }
            var sofpos = -1;
            for (i = 0; i < tables.length - 1; ) {
              if (tables[i] == 255 && tables[i + 1] == SOF0) {
                sofpos = i;
                break;
              }
              i++;
            }
            if (sofpos == -1) {
              var tmptab = new Uint8Array(tables.length + 10 + 3 * spp);
              tmptab.set(tables);
              var tmpoff = tables.length;
              if (sofpos = tables.length, tables = tmptab, tables[tmpoff++] = 255, tables[tmpoff++] = SOF0, tables[tmpoff++] = 0, tables[tmpoff++] = 8 + 3 * spp, tables[tmpoff++] = 8, tables[tmpoff++] = img.height >>> 8 & 255, tables[tmpoff++] = img.height & 255, tables[tmpoff++] = img.width >>> 8 & 255, tables[tmpoff++] = img.width & 255, tables[tmpoff++] = spp, spp == 1)
                tables[tmpoff++] = 1, tables[tmpoff++] = 17, tables[tmpoff++] = 0;
              else for (i = 0; i < 3; i++)
                tables[tmpoff++] = i + 1, tables[tmpoff++] = i != 0 ? 17 : (ssx & 15) << 4 | ssy & 15, tables[tmpoff++] = i;
            }
            if (data[soff] == 255 && data[soff + 1] == SOS2) {
              var soslen = data[soff + 2] << 8 | data[soff + 3];
              for (sosMarker2 = new Uint8Array(soslen + 2), sosMarker2[0] = data[soff], sosMarker2[1] = data[soff + 1], sosMarker2[2] = data[soff + 2], sosMarker2[3] = data[soff + 3], i = 0; i < soslen - 2; i++) sosMarker2[i + 4] = data[soff + i + 4];
            } else {
              sosMarker2 = new Uint8Array(8 + 2 * spp);
              var sosoff = 0;
              if (sosMarker2[sosoff++] = 255, sosMarker2[sosoff++] = SOS2, sosMarker2[sosoff++] = 0, sosMarker2[sosoff++] = 6 + 2 * spp, sosMarker2[sosoff++] = spp, spp == 1)
                sosMarker2[sosoff++] = 1, sosMarker2[sosoff++] = 0;
              else for (i = 0; i < 3; i++)
                sosMarker2[sosoff++] = i + 1, sosMarker2[sosoff++] = i << 4 | i;
              sosMarker2[sosoff++] = 0, sosMarker2[sosoff++] = 63, sosMarker2[sosoff++] = 0;
            }
            return { jpegOffset: off, tables, sosMarker: sosMarker2, sofPosition: sofpos };
          }, UTIF3.decode._decodeOldJPEG = function(img, data, off, len, tgt, toff) {
            var i, dlen, tlen, buff, buffoff, jpegData = UTIF3.decode._decodeOldJPEGInit(img, data, off, len);
            if (jpegData.jpegOffset != null)
              for (dlen = off + len - jpegData.jpegOffset, buff = new Uint8Array(dlen), i = 0; i < dlen; i++) buff[i] = data[jpegData.jpegOffset + i];
            else {
              for (tlen = jpegData.tables.length, buff = new Uint8Array(tlen + jpegData.sosMarker.length + len + 2), buff.set(jpegData.tables), buffoff = tlen, buff[jpegData.sofPosition + 5] = img.height >>> 8 & 255, buff[jpegData.sofPosition + 6] = img.height & 255, buff[jpegData.sofPosition + 7] = img.width >>> 8 & 255, buff[jpegData.sofPosition + 8] = img.width & 255, (data[off] != 255 || data[off + 1] != SOS) && (buff.set(jpegData.sosMarker, buffoff), buffoff += sosMarker.length), i = 0; i < len; i++) buff[buffoff++] = data[off + i];
              buff[buffoff++] = 255, buff[buffoff++] = EOI;
            }
            var parser = new UTIF3.JpegDecoder();
            parser.parse(buff);
            for (var decoded = parser.getData(parser.width, parser.height), i = 0; i < decoded.length; i++) tgt[toff + i] = decoded[i];
            img.t262 && img.t262[0] == 6 && (img.t262[0] = 2);
          }, UTIF3.decode._decodePackBits = function(data, off, len, tgt, toff) {
            for (var sa = new Int8Array(data.buffer), ta = new Int8Array(tgt.buffer), lim = off + len; off < lim; ) {
              var n = sa[off];
              if (off++, n >= 0 && n < 128) for (var i = 0; i < n + 1; i++)
                ta[toff] = sa[off], toff++, off++;
              if (n >= -127 && n < 0) {
                for (var i = 0; i < -n + 1; i++)
                  ta[toff] = sa[off], toff++;
                off++;
              }
            }
          }, UTIF3.decode._decodeThunder = function(data, off, len, tgt, toff) {
            for (var d2 = [0, 1, 0, -1], d3 = [0, 1, 2, 3, 0, -3, -2, -1], lim = off + len, qoff = toff * 2, px = 0; off < lim; ) {
              var b = data[off], msk = b >>> 6, n = b & 63;
              if (off++, msk == 3 && (px = n & 15, tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1), qoff++), msk == 0) for (var i = 0; i < n; i++)
                tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1), qoff++;
              if (msk == 2) for (var i = 0; i < 2; i++) {
                var d = n >>> 3 * (1 - i) & 7;
                d != 4 && (px += d3[d], tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1), qoff++);
              }
              if (msk == 1) for (var i = 0; i < 3; i++) {
                var d = n >>> 2 * (2 - i) & 3;
                d != 2 && (px += d2[d], tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1), qoff++);
              }
            }
          }, UTIF3.decode._dmap = { 1: 0, "011": 1, "000011": 2, "0000011": 3, "010": -1, "000010": -2, "0000010": -3 }, UTIF3.decode._lens = (function() {
            var addKeys = function(lens, arr, i0, inc) {
              for (var i = 0; i < arr.length; i++) lens[arr[i]] = i0 + i * inc;
            }, termW = "00110101,000111,0111,1000,1011,1100,1110,1111,10011,10100,00111,01000,001000,000011,110100,110101,101010,101011,0100111,0001100,0001000,0010111,0000011,0000100,0101000,0101011,0010011,0100100,0011000,00000010,00000011,00011010,00011011,00010010,00010011,00010100,00010101,00010110,00010111,00101000,00101001,00101010,00101011,00101100,00101101,00000100,00000101,00001010,00001011,01010010,01010011,01010100,01010101,00100100,00100101,01011000,01011001,01011010,01011011,01001010,01001011,00110010,00110011,00110100", termB = "0000110111,010,11,10,011,0011,0010,00011,000101,000100,0000100,0000101,0000111,00000100,00000111,000011000,0000010111,0000011000,0000001000,00001100111,00001101000,00001101100,00000110111,00000101000,00000010111,00000011000,000011001010,000011001011,000011001100,000011001101,000001101000,000001101001,000001101010,000001101011,000011010010,000011010011,000011010100,000011010101,000011010110,000011010111,000001101100,000001101101,000011011010,000011011011,000001010100,000001010101,000001010110,000001010111,000001100100,000001100101,000001010010,000001010011,000000100100,000000110111,000000111000,000000100111,000000101000,000001011000,000001011001,000000101011,000000101100,000001011010,000001100110,000001100111", makeW = "11011,10010,010111,0110111,00110110,00110111,01100100,01100101,01101000,01100111,011001100,011001101,011010010,011010011,011010100,011010101,011010110,011010111,011011000,011011001,011011010,011011011,010011000,010011001,010011010,011000,010011011", makeB = "0000001111,000011001000,000011001001,000001011011,000000110011,000000110100,000000110101,0000001101100,0000001101101,0000001001010,0000001001011,0000001001100,0000001001101,0000001110010,0000001110011,0000001110100,0000001110101,0000001110110,0000001110111,0000001010010,0000001010011,0000001010100,0000001010101,0000001011010,0000001011011,0000001100100,0000001100101", makeA = "00000001000,00000001100,00000001101,000000010010,000000010011,000000010100,000000010101,000000010110,000000010111,000000011100,000000011101,000000011110,000000011111";
            termW = termW.split(","), termB = termB.split(","), makeW = makeW.split(","), makeB = makeB.split(","), makeA = makeA.split(",");
            var lensW = {}, lensB = {};
            return addKeys(lensW, termW, 0, 1), addKeys(lensW, makeW, 64, 64), addKeys(lensW, makeA, 1792, 64), addKeys(lensB, termB, 0, 1), addKeys(lensB, makeB, 64, 64), addKeys(lensB, makeA, 1792, 64), [lensW, lensB];
          })(), UTIF3.decode._decodeG4 = function(data, off, slen, tgt, toff, w, fo) {
            for (var U = UTIF3.decode, boff = off << 3, len = 0, wrd = "", line = [], pline = [], i = 0; i < w; i++) pline.push(0);
            pline = U._makeDiff(pline);
            for (var a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, clr = 0, y = 0, mode = "", toRead = 0, bipl = Math.ceil(w / 8) * 8; boff >>> 3 < off + slen; ) {
              b1 = U._findDiff(pline, a0 + (a0 == 0 ? 0 : 1), 1 - clr), b2 = U._findDiff(pline, b1, clr);
              var bit = 0;
              if (fo == 1 && (bit = data[boff >>> 3] >>> 7 - (boff & 7) & 1), fo == 2 && (bit = data[boff >>> 3] >>> (boff & 7) & 1), boff++, wrd += bit, mode == "H") {
                if (U._lens[clr][wrd] != null) {
                  var dl = U._lens[clr][wrd];
                  wrd = "", len += dl, dl < 64 && (U._addNtimes(line, len, clr), a0 += len, clr = 1 - clr, len = 0, toRead--, toRead == 0 && (mode = ""));
                }
              } else
                wrd == "0001" && (wrd = "", U._addNtimes(line, b2 - a0, clr), a0 = b2), wrd == "001" && (wrd = "", mode = "H", toRead = 2), U._dmap[wrd] != null && (a1 = b1 + U._dmap[wrd], U._addNtimes(line, a1 - a0, clr), a0 = a1, wrd = "", clr = 1 - clr);
              line.length == w && mode == "" && (U._writeBits(line, tgt, toff * 8 + y * bipl), clr = 0, y++, a0 = 0, pline = U._makeDiff(line), line = []);
            }
          }, UTIF3.decode._findDiff = function(line, x, clr) {
            for (var i = 0; i < line.length; i += 2) if (line[i] >= x && line[i + 1] == clr) return line[i];
          }, UTIF3.decode._makeDiff = function(line) {
            var out = [];
            line[0] == 1 && out.push(0, 1);
            for (var i = 1; i < line.length; i++) line[i - 1] != line[i] && out.push(i, line[i]);
            return out.push(line.length, 0, line.length, 1), out;
          }, UTIF3.decode._decodeG3 = function(data, off, slen, tgt, toff, w, fo) {
            for (var U = UTIF3.decode, boff = off << 3, len = 0, wrd = "", line = [], pline = [], i = 0; i < w; i++) line.push(0);
            for (var a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, clr = 0, y = -1, mode = "", toRead = 0, is1D = !1, bipl = Math.ceil(w / 8) * 8; boff >>> 3 < off + slen; ) {
              b1 = U._findDiff(pline, a0 + (a0 == 0 ? 0 : 1), 1 - clr), b2 = U._findDiff(pline, b1, clr);
              var bit = 0;
              if (fo == 1 && (bit = data[boff >>> 3] >>> 7 - (boff & 7) & 1), fo == 2 && (bit = data[boff >>> 3] >>> (boff & 7) & 1), boff++, wrd += bit, is1D) {
                if (U._lens[clr][wrd] != null) {
                  var dl = U._lens[clr][wrd];
                  wrd = "", len += dl, dl < 64 && (U._addNtimes(line, len, clr), clr = 1 - clr, len = 0);
                }
              } else if (mode == "H") {
                if (U._lens[clr][wrd] != null) {
                  var dl = U._lens[clr][wrd];
                  wrd = "", len += dl, dl < 64 && (U._addNtimes(line, len, clr), a0 += len, clr = 1 - clr, len = 0, toRead--, toRead == 0 && (mode = ""));
                }
              } else
                wrd == "0001" && (wrd = "", U._addNtimes(line, b2 - a0, clr), a0 = b2), wrd == "001" && (wrd = "", mode = "H", toRead = 2), U._dmap[wrd] != null && (a1 = b1 + U._dmap[wrd], U._addNtimes(line, a1 - a0, clr), a0 = a1, wrd = "", clr = 1 - clr);
              wrd.endsWith("000000000001") && (y >= 0 && U._writeBits(line, tgt, toff * 8 + y * bipl), fo == 1 && (is1D = (data[boff >>> 3] >>> 7 - (boff & 7) & 1) == 1), fo == 2 && (is1D = (data[boff >>> 3] >>> (boff & 7) & 1) == 1), boff++, U._decodeG3.allow2D == null && (U._decodeG3.allow2D = is1D), U._decodeG3.allow2D || (is1D = !0, boff--), wrd = "", clr = 0, y++, a0 = 0, pline = U._makeDiff(line), line = []);
            }
            line.length == w && U._writeBits(line, tgt, toff * 8 + y * bipl);
          }, UTIF3.decode._addNtimes = function(arr, n, val) {
            for (var i = 0; i < n; i++) arr.push(val);
          }, UTIF3.decode._writeBits = function(bits, tgt, boff) {
            for (var i = 0; i < bits.length; i++) tgt[boff + i >>> 3] |= bits[i] << 7 - (boff + i & 7);
          }, UTIF3.decode._decodeLZW = function(data, off, tgt, toff) {
            if (UTIF3.decode._lzwTab == null) {
              for (var tb = new Uint32Array(65535), tn = new Uint16Array(65535), chr = new Uint8Array(2e6), i = 0; i < 256; i++)
                chr[i << 2] = i, tb[i] = i << 2, tn[i] = 1;
              UTIF3.decode._lzwTab = [tb, tn, chr];
            }
            for (var copy = UTIF3.decode._copyData, tab = UTIF3.decode._lzwTab[0], tln = UTIF3.decode._lzwTab[1], chr = UTIF3.decode._lzwTab[2], totl = 258, chrl = 1032, bits = 9, boff = off << 3, ClearCode = 256, EoiCode = 257, v = 0, Code = 0, OldCode = 0; v = data[boff >>> 3] << 16 | data[boff + 8 >>> 3] << 8 | data[boff + 16 >>> 3], Code = v >> 24 - (boff & 7) - bits & (1 << bits) - 1, boff += bits, Code != EoiCode; ) {
              if (Code == ClearCode) {
                if (bits = 9, totl = 258, chrl = 1032, v = data[boff >>> 3] << 16 | data[boff + 8 >>> 3] << 8 | data[boff + 16 >>> 3], Code = v >> 24 - (boff & 7) - bits & (1 << bits) - 1, boff += bits, Code == EoiCode) break;
                tgt[toff] = Code, toff++;
              } else if (Code < totl) {
                var cd = tab[Code], cl = tln[Code];
                if (copy(chr, cd, tgt, toff, cl), toff += cl, OldCode >= totl)
                  tab[totl] = chrl, chr[tab[totl]] = cd[0], tln[totl] = 1, chrl = chrl + 1 + 3 & -4, totl++;
                else {
                  tab[totl] = chrl;
                  var nit = tab[OldCode], nil = tln[OldCode];
                  copy(chr, nit, chr, chrl, nil), chr[chrl + nil] = chr[cd], nil++, tln[totl] = nil, totl++, chrl = chrl + nil + 3 & -4;
                }
                totl + 1 == 1 << bits && bits++;
              } else {
                if (OldCode >= totl)
                  tab[totl] = chrl, tln[totl] = 0, totl++;
                else {
                  tab[totl] = chrl;
                  var nit = tab[OldCode], nil = tln[OldCode];
                  copy(chr, nit, chr, chrl, nil), chr[chrl + nil] = chr[chrl], nil++, tln[totl] = nil, totl++, copy(chr, chrl, tgt, toff, nil), toff += nil, chrl = chrl + nil + 3 & -4;
                }
                totl + 1 == 1 << bits && bits++;
              }
              OldCode = Code;
            }
          }, UTIF3.decode._copyData = function(s, so, t, to, l) {
            for (var i = 0; i < l; i += 4)
              t[to + i] = s[so + i], t[to + i + 1] = s[so + i + 1], t[to + i + 2] = s[so + i + 2], t[to + i + 3] = s[so + i + 3];
          }, UTIF3.tags = {}, UTIF3.ttypes = { 256: 3, 257: 3, 258: 3, 259: 3, 262: 3, 273: 4, 274: 3, 277: 3, 278: 4, 279: 4, 282: 5, 283: 5, 284: 3, 286: 5, 287: 5, 296: 3, 305: 2, 306: 2, 338: 3, 513: 4, 514: 4, 34665: 4 }, UTIF3._readIFD = function(bin, data, offset, ifds, depth, debug) {
            var cnt = bin.readUshort(data, offset);
            offset += 2;
            var ifd = {};
            ifds.push(ifd), debug && log("   ".repeat(depth), ifds.length - 1, ">>>----------------");
            for (var i = 0; i < cnt; i++) {
              var tag = bin.readUshort(data, offset);
              offset += 2;
              var type = bin.readUshort(data, offset);
              offset += 2;
              var num = bin.readUint(data, offset);
              offset += 4;
              var voff = bin.readUint(data, offset);
              offset += 4;
              var arr = [];
              if ((type == 1 || type == 7) && (arr = new Uint8Array(data.buffer, num < 5 ? offset - 4 : voff, num)), type == 2) {
                var o0 = num < 5 ? offset - 4 : voff, c = data[o0];
                c < 128 ? arr.push(bin.readASCII(data, o0, num - 1)) : arr = new Uint8Array(data.buffer, o0, num - 1);
              }
              if (type == 3)
                for (var j = 0; j < num; j++) arr.push(bin.readUshort(data, (num < 3 ? offset - 4 : voff) + 2 * j));
              if (type == 4)
                for (var j = 0; j < num; j++) arr.push(bin.readUint(data, (num < 2 ? offset - 4 : voff) + 4 * j));
              if (type == 5)
                for (var j = 0; j < num; j++) arr.push(bin.readUint(data, voff + j * 8) / bin.readUint(data, voff + j * 8 + 4));
              if (type == 8)
                for (var j = 0; j < num; j++) arr.push(bin.readShort(data, (num < 3 ? offset - 4 : voff) + 2 * j));
              if (type == 9)
                for (var j = 0; j < num; j++) arr.push(bin.readInt(data, (num < 2 ? offset - 4 : voff) + 4 * j));
              if (type == 10)
                for (var j = 0; j < num; j++) arr.push(bin.readInt(data, voff + j * 8) / bin.readInt(data, voff + j * 8 + 4));
              if (type == 11)
                for (var j = 0; j < num; j++) arr.push(bin.readFloat(data, voff + j * 4));
              if (type == 12)
                for (var j = 0; j < num; j++) arr.push(bin.readDouble(data, voff + j * 8));
              if (ifd["t" + tag] = arr, num != 0 && arr.length == 0 && log("unknown TIFF tag type: ", type, "num:", num), debug && log("   ".repeat(depth), tag, type, UTIF3.tags[tag], arr), !(tag == 330 && ifd.t272 && ifd.t272[0] == "DSLR-A100")) {
                if (tag == 330 || tag == 34665 || tag == 50740 && bin.readUshort(data, bin.readUint(arr, 0)) < 300) {
                  for (var oarr = tag == 50740 ? [bin.readUint(arr, 0)] : arr, subfd = [], j = 0; j < oarr.length; j++) UTIF3._readIFD(bin, data, oarr[j], subfd, depth + 1, debug);
                  tag == 330 && (ifd.subIFD = subfd), tag == 34665 && (ifd.exifIFD = subfd[0]), tag == 50740 && (ifd.dngPrvt = subfd[0]);
                }
              }
              if (tag == 37500) {
                var mn = arr;
                if (bin.readASCII(mn, 0, 5) == "Nikon") ifd.makerNote = UTIF3.decode(mn.slice(10).buffer)[0];
                else if (bin.readUshort(data, voff) < 300) {
                  var subsub = [];
                  UTIF3._readIFD(bin, data, voff, subsub, depth + 1, debug), ifd.makerNote = subsub[0];
                }
              }
            }
            return debug && log("   ".repeat(depth), "<<<---------------"), offset;
          }, UTIF3._writeIFD = function(bin, data, offset, ifd) {
            var keys = Object.keys(ifd);
            bin.writeUshort(data, offset, keys.length), offset += 2;
            for (var eoff = offset + keys.length * 12 + 4, ki = 0; ki < keys.length; ki++) {
              var key = keys[ki], tag = parseInt(key.slice(1)), type = UTIF3.ttypes[tag];
              if (type == null) throw new Error("unknown type of tag: " + tag);
              var val = ifd[key];
              type == 2 && (val = val[0] + "\0");
              var num = val.length;
              bin.writeUshort(data, offset, tag), offset += 2, bin.writeUshort(data, offset, type), offset += 2, bin.writeUint(data, offset, num), offset += 4;
              var dlen = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][type] * num, toff = offset;
              if (dlen > 4 && (bin.writeUint(data, offset, eoff), toff = eoff), type == 2 && bin.writeASCII(data, toff, val), type == 3)
                for (var i = 0; i < num; i++) bin.writeUshort(data, toff + 2 * i, val[i]);
              if (type == 4)
                for (var i = 0; i < num; i++) bin.writeUint(data, toff + 4 * i, val[i]);
              if (type == 5)
                for (var i = 0; i < num; i++)
                  bin.writeUint(data, toff + 8 * i, Math.round(val[i] * 1e4)), bin.writeUint(data, toff + 8 * i + 4, 1e4);
              if (type == 12)
                for (var i = 0; i < num; i++) bin.writeDouble(data, toff + 8 * i, val[i]);
              dlen > 4 && (dlen += dlen & 1, eoff += dlen), offset += 4;
            }
            return [offset, eoff];
          }, UTIF3.toRGBA8 = function(out) {
            var w = out.width, h = out.height, area = w * h, qarea = area * 4, data = out.data, img = new Uint8Array(area * 4), intp = out.t262 ? out.t262[0] : 2, bps = out.t258 ? Math.min(32, out.t258[0]) : 1;
            if (intp == 0)
              for (var bpl = Math.ceil(bps * w / 8), y = 0; y < h; y++) {
                var off = y * bpl, io = y * w;
                if (bps == 1) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 3)] >> 7 - (i & 7) & 1;
                  img[qi] = img[qi + 1] = img[qi + 2] = (1 - px) * 255, img[qi + 3] = 255;
                }
                if (bps == 4) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 1)] >> 4 - 4 * (i & 1) & 15;
                  img[qi] = img[qi + 1] = img[qi + 2] = (15 - px) * 17, img[qi + 3] = 255;
                }
                if (bps == 8) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + i];
                  img[qi] = img[qi + 1] = img[qi + 2] = 255 - px, img[qi + 3] = 255;
                }
              }
            else if (intp == 1)
              for (var bpl = Math.ceil(bps * w / 8), y = 0; y < h; y++) {
                var off = y * bpl, io = y * w;
                if (bps == 1) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 3)] >> 7 - (i & 7) & 1;
                  img[qi] = img[qi + 1] = img[qi + 2] = px * 255, img[qi + 3] = 255;
                }
                if (bps == 2) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 2)] >> 6 - 2 * (i & 3) & 3;
                  img[qi] = img[qi + 1] = img[qi + 2] = px * 85, img[qi + 3] = 255;
                }
                if (bps == 8) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + i];
                  img[qi] = img[qi + 1] = img[qi + 2] = px, img[qi + 3] = 255;
                }
                if (bps == 16) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (2 * i + 1)];
                  img[qi] = img[qi + 1] = img[qi + 2] = Math.min(255, px), img[qi + 3] = 255;
                }
              }
            else if (intp == 2) {
              var smpls = out.t258 ? out.t258.length : 3;
              if (bps == 8) {
                if (smpls == 4) for (var i = 0; i < qarea; i++) img[i] = data[i];
                if (smpls == 3) for (var i = 0; i < area; i++) {
                  var qi = i << 2, ti = i * 3;
                  img[qi] = data[ti], img[qi + 1] = data[ti + 1], img[qi + 2] = data[ti + 2], img[qi + 3] = 255;
                }
              } else {
                if (smpls == 4) for (var i = 0; i < area; i++) {
                  var qi = i << 2, ti = i * 8 + 1;
                  img[qi] = data[ti], img[qi + 1] = data[ti + 2], img[qi + 2] = data[ti + 4], img[qi + 3] = data[ti + 6];
                }
                if (smpls == 3) for (var i = 0; i < area; i++) {
                  var qi = i << 2, ti = i * 6 + 1;
                  img[qi] = data[ti], img[qi + 1] = data[ti + 2], img[qi + 2] = data[ti + 4], img[qi + 3] = 255;
                }
              }
            } else if (intp == 3)
              for (var map = out.t320, i = 0; i < area; i++) {
                var qi = i << 2, mi = data[i];
                img[qi] = map[mi] >> 8, img[qi + 1] = map[256 + mi] >> 8, img[qi + 2] = map[512 + mi] >> 8, img[qi + 3] = 255;
              }
            else if (intp == 5)
              for (var smpls = out.t258 ? out.t258.length : 4, gotAlpha = smpls > 4 ? 1 : 0, i = 0; i < area; i++) {
                var qi = i << 2, si = i * smpls, C = 255 - data[si], M = 255 - data[si + 1], Y = 255 - data[si + 2], K = (255 - data[si + 3]) * (1 / 255);
                img[qi] = ~~(C * K + 0.5), img[qi + 1] = ~~(M * K + 0.5), img[qi + 2] = ~~(Y * K + 0.5), img[qi + 3] = 255 * (1 - gotAlpha) + data[si + 4] * gotAlpha;
              }
            else log("Unknown Photometric interpretation: " + intp);
            return img;
          }, UTIF3.replaceIMG = function(imgs) {
            imgs == null && (imgs = document.getElementsByTagName("img"));
            for (var sufs = ["tif", "tiff", "dng", "cr2", "nef"], i = 0; i < imgs.length; i++) {
              var img = imgs[i], src = img.getAttribute("src");
              if (src != null) {
                var suff = src.split(".").pop().toLowerCase();
                if (sufs.indexOf(suff) != -1) {
                  var xhr = new XMLHttpRequest();
                  UTIF3._xhrs.push(xhr), UTIF3._imgs.push(img), xhr.open("GET", src), xhr.responseType = "arraybuffer", xhr.onload = UTIF3._imgLoaded, xhr.send();
                }
              }
            }
          }, UTIF3._xhrs = [], UTIF3._imgs = [], UTIF3._imgLoaded = function(e) {
            var buff = e.target.response, ifds = UTIF3.decode(buff), vsns = ifds, ma = 0, page = vsns[0];
            ifds[0].subIFD && (vsns = vsns.concat(ifds[0].subIFD));
            for (var i = 0; i < vsns.length; i++) {
              var img = vsns[i];
              if (!(img.t258 == null || img.t258.length < 3)) {
                var ar = img.t256 * img.t257;
                ar > ma && (ma = ar, page = img);
              }
            }
            UTIF3.decodeImage(buff, page, ifds);
            var rgba = UTIF3.toRGBA8(page), w = page.width, h = page.height, ind = UTIF3._xhrs.indexOf(e.target), img = UTIF3._imgs[ind];
            UTIF3._xhrs.splice(ind, 1), UTIF3._imgs.splice(ind, 1);
            var cnv = document.createElement("canvas");
            cnv.width = w, cnv.height = h;
            for (var ctx2 = cnv.getContext("2d"), imgd = ctx2.createImageData(w, h), i = 0; i < rgba.length; i++) imgd.data[i] = rgba[i];
            ctx2.putImageData(imgd, 0, 0), img.setAttribute("src", cnv.toDataURL());
          }, UTIF3._binBE = {
            nextZero: function(data, o) {
              for (; data[o] != 0; ) o++;
              return o;
            },
            readUshort: function(buff, p) {
              return buff[p] << 8 | buff[p + 1];
            },
            readShort: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              return a[0] = buff[p + 1], a[1] = buff[p + 0], UTIF3._binBE.i16[0];
            },
            readInt: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              return a[0] = buff[p + 3], a[1] = buff[p + 2], a[2] = buff[p + 1], a[3] = buff[p + 0], UTIF3._binBE.i32[0];
            },
            readUint: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              return a[0] = buff[p + 3], a[1] = buff[p + 2], a[2] = buff[p + 1], a[3] = buff[p + 0], UTIF3._binBE.ui32[0];
            },
            readASCII: function(buff, p, l) {
              for (var s = "", i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);
              return s;
            },
            readFloat: function(buff, p) {
              for (var a = UTIF3._binBE.ui8, i = 0; i < 4; i++) a[i] = buff[p + 3 - i];
              return UTIF3._binBE.fl32[0];
            },
            readDouble: function(buff, p) {
              for (var a = UTIF3._binBE.ui8, i = 0; i < 8; i++) a[i] = buff[p + 7 - i];
              return UTIF3._binBE.fl64[0];
            },
            writeUshort: function(buff, p, n) {
              buff[p] = n >> 8 & 255, buff[p + 1] = n & 255;
            },
            writeUint: function(buff, p, n) {
              buff[p] = n >> 24 & 255, buff[p + 1] = n >> 16 & 255, buff[p + 2] = n >> 8 & 255, buff[p + 3] = n >> 0 & 255;
            },
            writeASCII: function(buff, p, s) {
              for (var i = 0; i < s.length; i++) buff[p + i] = s.charCodeAt(i);
            },
            writeDouble: function(buff, p, n) {
              UTIF3._binBE.fl64[0] = n;
              for (var i = 0; i < 8; i++) buff[p + i] = UTIF3._binBE.ui8[7 - i];
            }
          }, UTIF3._binBE.ui8 = new Uint8Array(8), UTIF3._binBE.i16 = new Int16Array(UTIF3._binBE.ui8.buffer), UTIF3._binBE.i32 = new Int32Array(UTIF3._binBE.ui8.buffer), UTIF3._binBE.ui32 = new Uint32Array(UTIF3._binBE.ui8.buffer), UTIF3._binBE.fl32 = new Float32Array(UTIF3._binBE.ui8.buffer), UTIF3._binBE.fl64 = new Float64Array(UTIF3._binBE.ui8.buffer), UTIF3._binLE = {
            nextZero: UTIF3._binBE.nextZero,
            readUshort: function(buff, p) {
              return buff[p + 1] << 8 | buff[p];
            },
            readShort: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              return a[0] = buff[p + 0], a[1] = buff[p + 1], UTIF3._binBE.i16[0];
            },
            readInt: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              return a[0] = buff[p + 0], a[1] = buff[p + 1], a[2] = buff[p + 2], a[3] = buff[p + 3], UTIF3._binBE.i32[0];
            },
            readUint: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              return a[0] = buff[p + 0], a[1] = buff[p + 1], a[2] = buff[p + 2], a[3] = buff[p + 3], UTIF3._binBE.ui32[0];
            },
            readASCII: UTIF3._binBE.readASCII,
            readFloat: function(buff, p) {
              for (var a = UTIF3._binBE.ui8, i = 0; i < 4; i++) a[i] = buff[p + i];
              return UTIF3._binBE.fl32[0];
            },
            readDouble: function(buff, p) {
              for (var a = UTIF3._binBE.ui8, i = 0; i < 8; i++) a[i] = buff[p + i];
              return UTIF3._binBE.fl64[0];
            }
          }, UTIF3._copyTile = function(tb, tw, th, b, w, h, xoff, yoff) {
            for (var xlim = Math.min(tw, w - xoff), ylim = Math.min(th, h - yoff), y = 0; y < ylim; y++)
              for (var tof = (yoff + y) * w + xoff, sof = y * tw, x = 0; x < xlim; x++) b[tof + x] = tb[sof + x];
          }, UTIF3.LosslessJpegDecode = (function() {
            function t(Z) {
              this.w = Z, this.N = 0, this._ = 0, this.G = 0;
            }
            t.prototype = { t: function(Z) {
              this.N = Math.max(0, Math.min(this.w.length, Z));
            }, i: function() {
              return this.w[this.N++];
            }, l: function() {
              var Z = this.N;
              return this.N += 2, this.w[Z] << 8 | this.w[Z + 1];
            }, J: function() {
              return this._ == 0 && (this.G = this.w[this.N], this.N += 1 + (this.G + 1 >>> 8), this._ = 8), this.G >>> --this._ & 1;
            }, Z: function(Z) {
              var X = this._, s = this.G, E = Math.min(X, Z);
              Z -= E, X -= E;
              for (var Y = s >>> X & (1 << E) - 1; Z > 0; )
                s = this.w[this.N], this.N += 1 + (s + 1 >>> 8), E = Math.min(8, Z), Z -= E, X = 8 - E, Y <<= E, Y |= s >>> X & (1 << E) - 1;
              return this._ = X, this.G = s, Y;
            } };
            var i = {};
            i.X = function() {
              return [0, 0, -1];
            }, i.s = function(Z, X, s) {
              Z[i.Y(Z, 0, s) + 2] = X;
            }, i.Y = function(Z, X, s) {
              if (Z[X + 2] != -1) return 0;
              if (s == 0) return X;
              for (var E = 0; E < 2; E++) {
                Z[X + E] == 0 && (Z[X + E] = Z.length, Z.push(0), Z.push(0), Z.push(-1));
                var Y = i.Y(Z, Z[X + E], s - 1);
                if (Y != 0) return Y;
              }
              return 0;
            }, i.B = function(Z, X) {
              for (var s = 0, E = 0, Y = 0, B = X._, $ = X.G, e = X.N; ; )
                if (B == 0 && ($ = X.w[e], e += 1 + ($ + 1 >>> 8), B = 8), Y = $ >>> --B & 1, s = Z[s + Y], E = Z[s + 2], E != -1)
                  return X._ = B, X.G = $, X.N = e, E;
              return -1;
            };
            function l(Z) {
              this.z = new t(Z), this.D(this.z);
            }
            l.prototype = { $: function(Z, X) {
              this.Q = Z.i(), this.F = Z.l(), this.o = Z.l();
              var s = this.O = Z.i();
              this.L = [];
              for (var E = 0; E < s; E++) {
                var Y = Z.i(), B = Z.i();
                Z.i(), this.L[Y] = E;
              }
              Z.t(Z.N + X - (6 + s * 3));
            }, e: function() {
              var Z = 0, X = this.z.i();
              this.H == null && (this.H = {});
              for (var s = this.H[X] = i.X(), E = [], Y = 0; Y < 16; Y++)
                E[Y] = this.z.i(), Z += E[Y];
              for (var Y = 0; Y < 16; Y++) for (var B = 0; B < E[Y]; B++) i.s(s, this.z.i(), Y + 1);
              return Z + 17;
            }, W: function(Z) {
              for (; Z > 0; ) Z -= this.e();
            }, p: function(Z, X) {
              var s = Z.i();
              this.U || (this.U = []);
              for (var E = 0; E < s; E++) {
                var Y = Z.i(), B = Z.i();
                this.U[this.L[Y]] = this.H[B >>> 4];
              }
              this.g = Z.i(), Z.t(Z.N + X - (2 + s * 2));
            }, D: function(Z) {
              var X = !1, s = Z.l();
              if (s === l.q)
                do {
                  var s = Z.l(), E = Z.l() - 2;
                  switch (s) {
                    case l.m:
                      this.$(Z, E);
                      break;
                    case l.K:
                      this.W(E);
                      break;
                    case l.V:
                      this.p(Z, E), X = !0;
                      break;
                    default:
                      Z.t(Z.N + E);
                      break;
                  }
                } while (!X);
            }, I: function(Z, X) {
              var s = i.B(X, Z);
              if (s == 16) return -32768;
              var E = Z.Z(s);
              return (E & 1 << s - 1) == 0 && (E -= (1 << s) - 1), E;
            }, B: function(Z, X) {
              for (var s = this.z, E = this.O, Y = this.F, B = this.I, $ = this.g, e = this.o * E, W = this.U, p = 0; p < E; p++)
                Z[p] = B(s, W[p]) + (1 << this.Q - 1);
              for (var D = E; D < e; D += E)
                for (var p = 0; p < E; p++) Z[D + p] = B(s, W[p]) + Z[D + p - E];
              for (var I = X, m = 1; m < Y; m++) {
                for (var p = 0; p < E; p++)
                  Z[I + p] = B(s, W[p]) + Z[I + p - X];
                for (var D = E; D < e; D += E)
                  for (var p = 0; p < E; p++) {
                    var K = I + D + p, q = Z[K - E];
                    $ == 6 && (q = Z[K - X] + (q - Z[K - E - X] >>> 1)), Z[K] = q + B(s, W[p]);
                  }
                I += X;
              }
            } }, l.m = 65475, l.K = 65476, l.q = 65496, l.V = 65498;
            function J(Z) {
              var X = new l(Z), s = X.Q > 8 ? Uint16Array : Uint8Array, E = new s(X.o * X.F * X.O), Y = X.o * X.O;
              return X.B(E, Y), E;
            }
            return J;
          })();
        })(UTIF2, pako);
      })();
    }
  });

  // node_modules/@xmldom/xmldom/lib/conventions.js
  var require_conventions = __commonJS({
    "node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
      "use strict";
      function find(list, predicate, ac) {
        if (ac === void 0 && (ac = Array.prototype), list && typeof ac.find == "function")
          return ac.find.call(list, predicate);
        for (var i = 0; i < list.length; i++)
          if (hasOwn(list, i)) {
            var item = list[i];
            if (predicate.call(void 0, item, i, list))
              return item;
          }
      }
      function freeze(object, oc) {
        return oc === void 0 && (oc = Object), oc && typeof oc.getOwnPropertyDescriptors == "function" && (object = oc.create(null, oc.getOwnPropertyDescriptors(object))), oc && typeof oc.freeze == "function" ? oc.freeze(object) : object;
      }
      function hasOwn(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
      }
      function assign(target, source) {
        if (target === null || typeof target != "object")
          throw new TypeError("target is not an object");
        for (var key in source)
          hasOwn(source, key) && (target[key] = source[key]);
        return target;
      }
      var HTML_BOOLEAN_ATTRIBUTES = freeze({
        allowfullscreen: !0,
        async: !0,
        autofocus: !0,
        autoplay: !0,
        checked: !0,
        controls: !0,
        default: !0,
        defer: !0,
        disabled: !0,
        formnovalidate: !0,
        hidden: !0,
        ismap: !0,
        itemscope: !0,
        loop: !0,
        multiple: !0,
        muted: !0,
        nomodule: !0,
        novalidate: !0,
        open: !0,
        playsinline: !0,
        readonly: !0,
        required: !0,
        reversed: !0,
        selected: !0
      });
      function isHTMLBooleanAttribute(name) {
        return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
      }
      var HTML_VOID_ELEMENTS = freeze({
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
      });
      function isHTMLVoidElement(tagName) {
        return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
      }
      var HTML_RAW_TEXT_ELEMENTS = freeze({
        script: !1,
        style: !1,
        textarea: !0,
        title: !0
      });
      function isHTMLRawTextElement(tagName) {
        var key = tagName.toLowerCase();
        return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && !HTML_RAW_TEXT_ELEMENTS[key];
      }
      function isHTMLEscapableRawTextElement(tagName) {
        var key = tagName.toLowerCase();
        return hasOwn(HTML_RAW_TEXT_ELEMENTS, key) && HTML_RAW_TEXT_ELEMENTS[key];
      }
      function isHTMLMimeType(mimeType) {
        return mimeType === MIME_TYPE.HTML;
      }
      function hasDefaultHTMLNamespace(mimeType) {
        return isHTMLMimeType(mimeType) || mimeType === MIME_TYPE.XML_XHTML_APPLICATION;
      }
      var MIME_TYPE = freeze({
        /**
         * `text/html`, the only mime type that triggers treating an XML document as HTML.
         *
         * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/HTML Wikipedia
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
         * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring
         *      WHATWG HTML Spec
         */
        HTML: "text/html",
        /**
         * `application/xml`, the standard mime type for XML documents.
         *
         * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType
         *      registration
         * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
         * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
         */
        XML_APPLICATION: "application/xml",
        /**
         * `text/xml`, an alias for `application/xml`.
         *
         * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
         * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
         * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
         */
        XML_TEXT: "text/xml",
        /**
         * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
         * but is parsed as an XML document.
         *
         * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType
         *      registration
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
         * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
         */
        XML_XHTML_APPLICATION: "application/xhtml+xml",
        /**
         * `image/svg+xml`,
         *
         * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
         * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
         * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
         */
        XML_SVG_IMAGE: "image/svg+xml"
      }), _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
        return MIME_TYPE[key];
      });
      function isValidMimeType(mimeType) {
        return _MIME_TYPES.indexOf(mimeType) > -1;
      }
      var NAMESPACE = freeze({
        /**
         * The XHTML namespace.
         *
         * @see http://www.w3.org/1999/xhtml
         */
        HTML: "http://www.w3.org/1999/xhtml",
        /**
         * The SVG namespace.
         *
         * @see http://www.w3.org/2000/svg
         */
        SVG: "http://www.w3.org/2000/svg",
        /**
         * The `xml:` namespace.
         *
         * @see http://www.w3.org/XML/1998/namespace
         */
        XML: "http://www.w3.org/XML/1998/namespace",
        /**
         * The `xmlns:` namespace.
         *
         * @see https://www.w3.org/2000/xmlns/
         */
        XMLNS: "http://www.w3.org/2000/xmlns/"
      });
      exports.assign = assign;
      exports.find = find;
      exports.freeze = freeze;
      exports.HTML_BOOLEAN_ATTRIBUTES = HTML_BOOLEAN_ATTRIBUTES;
      exports.HTML_RAW_TEXT_ELEMENTS = HTML_RAW_TEXT_ELEMENTS;
      exports.HTML_VOID_ELEMENTS = HTML_VOID_ELEMENTS;
      exports.hasDefaultHTMLNamespace = hasDefaultHTMLNamespace;
      exports.hasOwn = hasOwn;
      exports.isHTMLBooleanAttribute = isHTMLBooleanAttribute;
      exports.isHTMLRawTextElement = isHTMLRawTextElement;
      exports.isHTMLEscapableRawTextElement = isHTMLEscapableRawTextElement;
      exports.isHTMLMimeType = isHTMLMimeType;
      exports.isHTMLVoidElement = isHTMLVoidElement;
      exports.isValidMimeType = isValidMimeType;
      exports.MIME_TYPE = MIME_TYPE;
      exports.NAMESPACE = NAMESPACE;
    }
  });

  // node_modules/@xmldom/xmldom/lib/errors.js
  var require_errors = __commonJS({
    "node_modules/@xmldom/xmldom/lib/errors.js"(exports) {
      "use strict";
      var conventions = require_conventions();
      function extendError(constructor, writableName) {
        constructor.prototype = Object.create(Error.prototype, {
          constructor: { value: constructor },
          name: { value: constructor.name, enumerable: !0, writable: writableName }
        });
      }
      var DOMExceptionName = conventions.freeze({
        /**
         * the default value as defined by the spec
         */
        Error: "Error",
        /**
         * @deprecated
         * Use RangeError instead.
         */
        IndexSizeError: "IndexSizeError",
        /**
         * @deprecated
         * Just to match the related static code, not part of the spec.
         */
        DomstringSizeError: "DomstringSizeError",
        HierarchyRequestError: "HierarchyRequestError",
        WrongDocumentError: "WrongDocumentError",
        InvalidCharacterError: "InvalidCharacterError",
        /**
         * @deprecated
         * Just to match the related static code, not part of the spec.
         */
        NoDataAllowedError: "NoDataAllowedError",
        NoModificationAllowedError: "NoModificationAllowedError",
        NotFoundError: "NotFoundError",
        NotSupportedError: "NotSupportedError",
        InUseAttributeError: "InUseAttributeError",
        InvalidStateError: "InvalidStateError",
        SyntaxError: "SyntaxError",
        InvalidModificationError: "InvalidModificationError",
        NamespaceError: "NamespaceError",
        /**
         * @deprecated
         * Use TypeError for invalid arguments,
         * "NotSupportedError" DOMException for unsupported operations,
         * and "NotAllowedError" DOMException for denied requests instead.
         */
        InvalidAccessError: "InvalidAccessError",
        /**
         * @deprecated
         * Just to match the related static code, not part of the spec.
         */
        ValidationError: "ValidationError",
        /**
         * @deprecated
         * Use TypeError instead.
         */
        TypeMismatchError: "TypeMismatchError",
        SecurityError: "SecurityError",
        NetworkError: "NetworkError",
        AbortError: "AbortError",
        /**
         * @deprecated
         * Just to match the related static code, not part of the spec.
         */
        URLMismatchError: "URLMismatchError",
        QuotaExceededError: "QuotaExceededError",
        TimeoutError: "TimeoutError",
        InvalidNodeTypeError: "InvalidNodeTypeError",
        DataCloneError: "DataCloneError",
        EncodingError: "EncodingError",
        NotReadableError: "NotReadableError",
        UnknownError: "UnknownError",
        ConstraintError: "ConstraintError",
        DataError: "DataError",
        TransactionInactiveError: "TransactionInactiveError",
        ReadOnlyError: "ReadOnlyError",
        VersionError: "VersionError",
        OperationError: "OperationError",
        NotAllowedError: "NotAllowedError",
        OptOutError: "OptOutError"
      }), DOMExceptionNames = Object.keys(DOMExceptionName);
      function isValidDomExceptionCode(value) {
        return typeof value == "number" && value >= 1 && value <= 25;
      }
      function endsWithError(value) {
        return typeof value == "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
      }
      function DOMException(messageOrCode, nameOrMessage) {
        isValidDomExceptionCode(messageOrCode) ? (this.name = DOMExceptionNames[messageOrCode], this.message = nameOrMessage || "") : (this.message = messageOrCode, this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error), Error.captureStackTrace && Error.captureStackTrace(this, DOMException);
      }
      extendError(DOMException, !0);
      Object.defineProperties(DOMException.prototype, {
        code: {
          enumerable: !0,
          get: function() {
            var code = DOMExceptionNames.indexOf(this.name);
            return isValidDomExceptionCode(code) ? code : 0;
          }
        }
      });
      var ExceptionCode = {
        INDEX_SIZE_ERR: 1,
        DOMSTRING_SIZE_ERR: 2,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        INVALID_CHARACTER_ERR: 5,
        NO_DATA_ALLOWED_ERR: 6,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INUSE_ATTRIBUTE_ERR: 10,
        INVALID_STATE_ERR: 11,
        SYNTAX_ERR: 12,
        INVALID_MODIFICATION_ERR: 13,
        NAMESPACE_ERR: 14,
        INVALID_ACCESS_ERR: 15,
        VALIDATION_ERR: 16,
        TYPE_MISMATCH_ERR: 17,
        SECURITY_ERR: 18,
        NETWORK_ERR: 19,
        ABORT_ERR: 20,
        URL_MISMATCH_ERR: 21,
        QUOTA_EXCEEDED_ERR: 22,
        TIMEOUT_ERR: 23,
        INVALID_NODE_TYPE_ERR: 24,
        DATA_CLONE_ERR: 25
      }, entries = Object.entries(ExceptionCode);
      for (i = 0; i < entries.length; i++)
        key = entries[i][0], DOMException[key] = entries[i][1];
      var key, i;
      function ParseError(message, locator) {
        this.message = message, this.locator = locator, Error.captureStackTrace && Error.captureStackTrace(this, ParseError);
      }
      extendError(ParseError);
      exports.DOMException = DOMException;
      exports.DOMExceptionName = DOMExceptionName;
      exports.ExceptionCode = ExceptionCode;
      exports.ParseError = ParseError;
    }
  });

  // node_modules/@xmldom/xmldom/lib/grammar.js
  var require_grammar = __commonJS({
    "node_modules/@xmldom/xmldom/lib/grammar.js"(exports) {
      "use strict";
      function detectUnicodeSupport(RegExpImpl) {
        try {
          typeof RegExpImpl != "function" && (RegExpImpl = RegExp);
          var match = new RegExpImpl("𝌆", "u").exec("𝌆");
          return !!match && match[0].length === 2;
        } catch {
        }
        return !1;
      }
      var UNICODE_SUPPORT = detectUnicodeSupport();
      function chars(regexp) {
        if (regexp.source[0] !== "[")
          throw new Error(regexp + " can not be used with chars");
        return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
      }
      function chars_without(regexp, search) {
        if (regexp.source[0] !== "[")
          throw new Error("/" + regexp.source + "/ can not be used with chars_without");
        if (!search || typeof search != "string")
          throw new Error(JSON.stringify(search) + " is not a valid search");
        if (regexp.source.indexOf(search) === -1)
          throw new Error('"' + search + '" is not is /' + regexp.source + "/");
        if (search === "-" && regexp.source.indexOf(search) !== 1)
          throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
        return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
      }
      function reg(args) {
        var self2 = this;
        return new RegExp(
          Array.prototype.slice.call(arguments).map(function(part) {
            var isStr = typeof part == "string";
            if (isStr && self2 === void 0 && part === "|")
              throw new Error("use regg instead of reg to wrap expressions with `|`!");
            return isStr ? part : part.source;
          }).join(""),
          UNICODE_SUPPORT ? "mu" : "m"
        );
      }
      function regg(args) {
        if (arguments.length === 0)
          throw new Error("no parameters provided");
        return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
      }
      var UNICODE_REPLACEMENT_CHARACTER = "�", Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
      UNICODE_SUPPORT && (Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]"));
      var InvalidChar = new RegExp("[^" + chars(Char) + "]", UNICODE_SUPPORT ? "u" : ""), _SChar = /[\x20\x09\x0D\x0A]/, SChar_s = chars(_SChar), S = reg(_SChar, "+"), S_OPT = reg(_SChar, "*"), NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      UNICODE_SUPPORT && (NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]"));
      var NameStartChar_s = chars(NameStartChar), NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]"), Name = reg(NameStartChar, NameChar, "*"), Nmtoken = reg(NameChar, "+"), EntityRef = reg("&", Name, ";"), CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/), Reference = regg(EntityRef, "|", CharRef), PEReference = reg("%", Name, ";"), EntityValue = regg(
        reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'),
        "|",
        reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'")
      ), AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'"), NCNameStartChar = chars_without(NameStartChar, ":"), NCNameChar = chars_without(NameChar, ":"), NCName = reg(NCNameStartChar, NCNameChar, "*"), QName = reg(NCName, regg(":", NCName), "?"), QName_exact = reg("^", QName, "$"), QName_group = reg("(", QName, ")"), SystemLiteral = regg(/"[^"]*"|'[^']*'/), PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/), PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/, PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'"), COMMENT_START = "<!--", COMMENT_END = "-->", Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END), PCDATA = "#PCDATA", Mixed = regg(
        reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/),
        "|",
        reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
      ), _children_quantity = /[?*+]?/, children = reg(
        /\([^>]+\)/,
        _children_quantity
        /*regg(choice, '|', seq), _children_quantity*/
      ), contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children), ELEMENTDECL_START = "<!ELEMENT", elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">"), NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/), Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/), EnumeratedType = regg(NotationType, "|", Enumeration), AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType), DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue)), AttDef = regg(S, Name, S, AttType, S, DefaultDecl), ATTLIST_DECL_START = "<!ATTLIST", AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">"), ABOUT_LEGACY_COMPAT = "about:legacy-compat", ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'"), SYSTEM = "SYSTEM", PUBLIC = "PUBLIC", ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral)), ExternalID_match = reg(
        "^",
        regg(
          regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"),
          "|",
          regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")
        )
      ), PubidLiteral_match = reg("^", PubidLiteral, "$"), SystemLiteral_match = reg("^", SystemLiteral, "$"), NDataDecl = regg(S, "NDATA", S, Name), EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?")), ENTITY_DECL_START = "<!ENTITY", GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">"), PEDef = regg(EntityValue, "|", ExternalID), PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">"), EntityDecl = regg(GEDecl, "|", PEDecl), PublicID = reg(PUBLIC, S, PubidLiteral), NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">"), Eq = reg(S_OPT, "=", S_OPT), VersionNum = /1[.]\d+/, VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"')), EncName = /[A-Za-z][-A-Za-z0-9._]*/, EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'")), SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"')), XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/), DOCTYPE_DECL_START = "<!DOCTYPE", CDATA_START = "<![CDATA[", CDATA_END = "]]>", CDStart = /<!\[CDATA\[/, CDEnd = /\]\]>/, CData = reg(Char, "*?", CDEnd), CDSect = reg(CDStart, CData);
      exports.chars = chars;
      exports.chars_without = chars_without;
      exports.detectUnicodeSupport = detectUnicodeSupport;
      exports.reg = reg;
      exports.regg = regg;
      exports.ABOUT_LEGACY_COMPAT = ABOUT_LEGACY_COMPAT;
      exports.ABOUT_LEGACY_COMPAT_SystemLiteral = ABOUT_LEGACY_COMPAT_SystemLiteral;
      exports.AttlistDecl = AttlistDecl;
      exports.CDATA_START = CDATA_START;
      exports.CDATA_END = CDATA_END;
      exports.CDSect = CDSect;
      exports.Char = Char;
      exports.Comment = Comment;
      exports.COMMENT_START = COMMENT_START;
      exports.COMMENT_END = COMMENT_END;
      exports.DOCTYPE_DECL_START = DOCTYPE_DECL_START;
      exports.elementdecl = elementdecl;
      exports.EntityDecl = EntityDecl;
      exports.EntityValue = EntityValue;
      exports.ExternalID = ExternalID;
      exports.ExternalID_match = ExternalID_match;
      exports.Name = Name;
      exports.NotationDecl = NotationDecl;
      exports.Reference = Reference;
      exports.PEReference = PEReference;
      exports.PI = PI;
      exports.PUBLIC = PUBLIC;
      exports.PubidLiteral = PubidLiteral;
      exports.PubidLiteral_match = PubidLiteral_match;
      exports.QName = QName;
      exports.QName_exact = QName_exact;
      exports.QName_group = QName_group;
      exports.S = S;
      exports.SChar_s = SChar_s;
      exports.S_OPT = S_OPT;
      exports.SYSTEM = SYSTEM;
      exports.SystemLiteral = SystemLiteral;
      exports.SystemLiteral_match = SystemLiteral_match;
      exports.InvalidChar = InvalidChar;
      exports.UNICODE_REPLACEMENT_CHARACTER = UNICODE_REPLACEMENT_CHARACTER;
      exports.UNICODE_SUPPORT = UNICODE_SUPPORT;
      exports.XMLDecl = XMLDecl;
    }
  });

  // node_modules/@xmldom/xmldom/lib/dom.js
  var require_dom = __commonJS({
    "node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
      "use strict";
      var conventions = require_conventions(), find = conventions.find, hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace, hasOwn = conventions.hasOwn, isHTMLMimeType = conventions.isHTMLMimeType, isHTMLRawTextElement = conventions.isHTMLRawTextElement, isHTMLVoidElement = conventions.isHTMLVoidElement, MIME_TYPE = conventions.MIME_TYPE, NAMESPACE = conventions.NAMESPACE, PDC = /* @__PURE__ */ Symbol(), errors = require_errors(), DOMException = errors.DOMException, DOMExceptionName = errors.DOMExceptionName, g = require_grammar();
      function checkSymbol(symbol) {
        if (symbol !== PDC)
          throw new TypeError("Illegal constructor");
      }
      function notEmptyString(input) {
        return input !== "";
      }
      function splitOnASCIIWhitespace(input) {
        return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
      }
      function orderedSetReducer(current, element) {
        return hasOwn(current, element) || (current[element] = !0), current;
      }
      function toOrderedSet(input) {
        if (!input) return [];
        var list = splitOnASCIIWhitespace(input);
        return Object.keys(list.reduce(orderedSetReducer, {}));
      }
      function arrayIncludes(list) {
        return function(element) {
          return list && list.indexOf(element) !== -1;
        };
      }
      function validateQualifiedName(qualifiedName) {
        if (!g.QName_exact.test(qualifiedName))
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
      }
      function validateAndExtract(namespace, qualifiedName) {
        validateQualifiedName(qualifiedName), namespace = namespace || null;
        var prefix = null, localName = qualifiedName;
        if (qualifiedName.indexOf(":") >= 0) {
          var splitResult = qualifiedName.split(":");
          prefix = splitResult[0], localName = splitResult[1];
        }
        if (prefix !== null && namespace === null)
          throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
        if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML)
          throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
        if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS)
          throw new DOMException(
            DOMException.NAMESPACE_ERR,
            'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
          );
        if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns")
          throw new DOMException(
            DOMException.NAMESPACE_ERR,
            'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
          );
        return [namespace, prefix, localName];
      }
      function copy(src, dest) {
        for (var p in src)
          hasOwn(src, p) && (dest[p] = src[p]);
      }
      function _extends(Class, Super) {
        var pt = Class.prototype;
        if (!(pt instanceof Super)) {
          let t = function() {
          };
          t.prototype = Super.prototype, t = new t(), copy(pt, t), Class.prototype = pt = t;
        }
        pt.constructor != Class && (typeof Class != "function" && console.error("unknown Class:" + Class), pt.constructor = Class);
      }
      var NodeType = {}, ELEMENT_NODE = NodeType.ELEMENT_NODE = 1, ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2, TEXT_NODE = NodeType.TEXT_NODE = 3, CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4, ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5, ENTITY_NODE = NodeType.ENTITY_NODE = 6, PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7, COMMENT_NODE = NodeType.COMMENT_NODE = 8, DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9, DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10, DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11, NOTATION_NODE = NodeType.NOTATION_NODE = 12, DocumentPosition = conventions.freeze({
        DOCUMENT_POSITION_DISCONNECTED: 1,
        DOCUMENT_POSITION_PRECEDING: 2,
        DOCUMENT_POSITION_FOLLOWING: 4,
        DOCUMENT_POSITION_CONTAINS: 8,
        DOCUMENT_POSITION_CONTAINED_BY: 16,
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32
      });
      function commonAncestor(a, b) {
        if (b.length < a.length) return commonAncestor(b, a);
        var c = null;
        for (var n in a) {
          if (a[n] !== b[n]) return c;
          c = a[n];
        }
        return c;
      }
      function docGUID(doc) {
        return doc.guid || (doc.guid = Math.random()), doc.guid;
      }
      function NodeList() {
      }
      NodeList.prototype = {
        /**
         * The number of nodes in the list. The range of valid child node indices is 0 to length-1
         * inclusive.
         *
         * @type {number}
         */
        length: 0,
        /**
         * Returns the item at `index`. If index is greater than or equal to the number of nodes in
         * the list, this returns null.
         *
         * @param index
         * Unsigned long Index into the collection.
         * @returns {Node | null}
         * The node at position `index` in the NodeList,
         * or null if that is not a valid index.
         */
        item: function(index) {
          return index >= 0 && index < this.length ? this[index] : null;
        },
        /**
         * Returns a string representation of the NodeList.
         *
         * Accepts the same `options` object as `XMLSerializer.prototype.serializeToString`
         * (`requireWellFormed`, `splitCDATASections`, `nodeFilter`). Passing a function is treated as
         * a legacy `nodeFilter` for backward compatibility.
         *
         * @param {Object | function} [options]
         * @param {boolean} [options.requireWellFormed=false]
         * @param {boolean} [options.splitCDATASections=true]
         * @param {function} [options.nodeFilter]
         * @returns {string}
         */
        toString: function(options) {
          var opts;
          typeof options == "function" ? opts = { requireWellFormed: !1, splitCDATASections: !0, nodeFilter: options } : options ? opts = {
            requireWellFormed: !!options.requireWellFormed,
            splitCDATASections: options.splitCDATASections !== !1,
            nodeFilter: options.nodeFilter || null
          } : opts = { requireWellFormed: !1, splitCDATASections: !0, nodeFilter: null };
          for (var buf = [], i = 0; i < this.length; i++)
            serializeToString(this[i], buf, null, opts);
          return buf.join("");
        },
        /**
         * Filters the NodeList based on a predicate.
         *
         * @param {function(Node): boolean} predicate
         * - A predicate function to filter the NodeList.
         * @returns {Node[]}
         * An array of nodes that satisfy the predicate.
         * @private
         */
        filter: function(predicate) {
          return Array.prototype.filter.call(this, predicate);
        },
        /**
         * Returns the first index at which a given node can be found in the NodeList, or -1 if it is
         * not present.
         *
         * @param {Node} item
         * - The Node item to locate in the NodeList.
         * @returns {number}
         * The first index of the node in the NodeList; -1 if not found.
         * @private
         */
        indexOf: function(item) {
          return Array.prototype.indexOf.call(this, item);
        }
      };
      NodeList.prototype[Symbol.iterator] = function() {
        var me = this, index = 0;
        return {
          next: function() {
            return index < me.length ? {
              value: me[index++],
              done: !1
            } : {
              done: !0
            };
          },
          return: function() {
            return {
              done: !0
            };
          }
        };
      };
      function LiveNodeList(node, refresh) {
        this._node = node, this._refresh = refresh, _updateLiveList(this);
      }
      function _updateLiveList(list) {
        var inc = list._node._inc || list._node.ownerDocument._inc;
        if (list._inc !== inc) {
          var ls = list._refresh(list._node);
          if (__set__(list, "length", ls.length), !list.$$length || ls.length < list.$$length)
            for (var i = ls.length; i in list; i++)
              hasOwn(list, i) && delete list[i];
          copy(ls, list), list._inc = inc;
        }
      }
      LiveNodeList.prototype.item = function(i) {
        return _updateLiveList(this), this[i] || null;
      };
      _extends(LiveNodeList, NodeList);
      function NamedNodeMap() {
      }
      function _findNodeIndex(list, node) {
        for (var i = 0; i < list.length; ) {
          if (list[i] === node)
            return i;
          i++;
        }
      }
      function _addNamedNode(el, list, newAttr, oldAttr) {
        if (oldAttr ? list[_findNodeIndex(list, oldAttr)] = newAttr : (list[list.length] = newAttr, list.length++), el) {
          newAttr.ownerElement = el;
          var doc = el.ownerDocument;
          doc && (oldAttr && _onRemoveAttribute(doc, el, oldAttr), _onAddAttribute(doc, el, newAttr));
        }
      }
      function _removeNamedNode(el, list, attr) {
        var i = _findNodeIndex(list, attr);
        if (i >= 0) {
          for (var lastIndex = list.length - 1; i <= lastIndex; )
            list[i] = list[++i];
          if (list.length = lastIndex, el) {
            var doc = el.ownerDocument;
            doc && _onRemoveAttribute(doc, el, attr), attr.ownerElement = null;
          }
        }
      }
      NamedNodeMap.prototype = {
        length: 0,
        item: NodeList.prototype.item,
        /**
         * Get an attribute by name. Note: Name is in lower case in case of HTML namespace and
         * document.
         *
         * @param {string} localName
         * The local name of the attribute.
         * @returns {Attr | null}
         * The attribute with the given local name, or null if no such attribute exists.
         * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-name
         */
        getNamedItem: function(localName) {
          this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace() && (localName = localName.toLowerCase());
          for (var i = 0; i < this.length; ) {
            var attr = this[i];
            if (attr.nodeName === localName)
              return attr;
            i++;
          }
          return null;
        },
        /**
         * Set an attribute.
         *
         * @param {Attr} attr
         * The attribute to set.
         * @returns {Attr | null}
         * The old attribute with the same local name and namespace URI as the new one, or null if no
         * such attribute exists.
         * @throws {DOMException}
         * With code:
         * - {@link INUSE_ATTRIBUTE_ERR} - If the attribute is already an attribute of another
         * element.
         * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
         */
        setNamedItem: function(attr) {
          var el = attr.ownerElement;
          if (el && el !== this._ownerElement)
            throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
          var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
          return oldAttr === attr ? attr : (_addNamedNode(this._ownerElement, this, attr, oldAttr), oldAttr);
        },
        /**
         * Set an attribute, replacing an existing attribute with the same local name and namespace
         * URI if one exists.
         *
         * @param {Attr} attr
         * The attribute to set.
         * @returns {Attr | null}
         * The old attribute with the same local name and namespace URI as the new one, or null if no
         * such attribute exists.
         * @throws {DOMException}
         * Throws a DOMException with the name "InUseAttributeError" if the attribute is already an
         * attribute of another element.
         * @see https://dom.spec.whatwg.org/#concept-element-attributes-set
         */
        setNamedItemNS: function(attr) {
          return this.setNamedItem(attr);
        },
        /**
         * Removes an attribute specified by the local name.
         *
         * @param {string} localName
         * The local name of the attribute to be removed.
         * @returns {Attr}
         * The attribute node that was removed.
         * @throws {DOMException}
         * With code:
         * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given name is found.
         * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditem
         * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-name
         */
        removeNamedItem: function(localName) {
          var attr = this.getNamedItem(localName);
          if (!attr)
            throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
          return _removeNamedNode(this._ownerElement, this, attr), attr;
        },
        /**
         * Removes an attribute specified by the namespace and local name.
         *
         * @param {string | null} namespaceURI
         * The namespace URI of the attribute to be removed.
         * @param {string} localName
         * The local name of the attribute to be removed.
         * @returns {Attr}
         * The attribute node that was removed.
         * @throws {DOMException}
         * With code:
         * - {@link DOMException.NOT_FOUND_ERR} if no attribute with the given namespace URI and local
         * name is found.
         * @see https://dom.spec.whatwg.org/#dom-namednodemap-removenameditemns
         * @see https://dom.spec.whatwg.org/#concept-element-attributes-remove-by-namespace
         */
        removeNamedItemNS: function(namespaceURI, localName) {
          var attr = this.getNamedItemNS(namespaceURI, localName);
          if (!attr)
            throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
          return _removeNamedNode(this._ownerElement, this, attr), attr;
        },
        /**
         * Get an attribute by namespace and local name.
         *
         * @param {string | null} namespaceURI
         * The namespace URI of the attribute.
         * @param {string} localName
         * The local name of the attribute.
         * @returns {Attr | null}
         * The attribute with the given namespace URI and local name, or null if no such attribute
         * exists.
         * @see https://dom.spec.whatwg.org/#concept-element-attributes-get-by-namespace
         */
        getNamedItemNS: function(namespaceURI, localName) {
          namespaceURI || (namespaceURI = null);
          for (var i = 0; i < this.length; ) {
            var node = this[i];
            if (node.localName === localName && node.namespaceURI === namespaceURI)
              return node;
            i++;
          }
          return null;
        }
      };
      NamedNodeMap.prototype[Symbol.iterator] = function() {
        var me = this, index = 0;
        return {
          next: function() {
            return index < me.length ? {
              value: me[index++],
              done: !1
            } : {
              done: !0
            };
          },
          return: function() {
            return {
              done: !0
            };
          }
        };
      };
      function DOMImplementation() {
      }
      DOMImplementation.prototype = {
        /**
         * Test if the DOM implementation implements a specific feature and version, as specified in
         * {@link https://www.w3.org/TR/DOM-Level-3-Core/core.html#DOMFeatures DOM Features}.
         *
         * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given
         * feature is supported. The different implementations fairly diverged in what kind of
         * features were reported. The latest version of the spec settled to force this method to
         * always return true, where the functionality was accurate and in use.
         *
         * @deprecated
         * It is deprecated and modern browsers return true in all cases.
         * @function DOMImplementation#hasFeature
         * @param {string} feature
         * The name of the feature to test.
         * @param {string} [version]
         * This is the version number of the feature to test.
         * @returns {boolean}
         * Always returns true.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
         * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-5CED94D7 DOM Level 3 Core
         */
        hasFeature: function(feature, version) {
          return !0;
        },
        /**
         * Creates a DOM Document object of the specified type with its document element. Note that
         * based on the {@link DocumentType}
         * given to create the document, the implementation may instantiate specialized
         * {@link Document} objects that support additional features than the "Core", such as "HTML"
         * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML}.
         * On the other hand, setting the {@link DocumentType} after the document was created makes
         * this very unlikely to happen. Alternatively, specialized {@link Document} creation methods,
         * such as createHTMLDocument
         * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#DOM2HTML DOM Level 2 HTML},
         * can be used to obtain specific types of {@link Document} objects.
         *
         * __It behaves slightly different from the description in the living standard__:
         * - There is no interface/class `XMLDocument`, it returns a `Document`
         * instance (with it's `type` set to `'xml'`).
         * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
         *
         * @function DOMImplementation.createDocument
         * @param {string | null} namespaceURI
         * The
         * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-namespaceURI namespace URI}
         * of the document element to create or null.
         * @param {string | null} qualifiedName
         * The
         * {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified name}
         * of the document element to be created or null.
         * @param {DocumentType | null} [doctype=null]
         * The type of document to be created or null. When doctype is not null, its
         * {@link Node#ownerDocument} attribute is set to the document being created. Default is
         * `null`
         * @returns {Document}
         * A new {@link Document} object with its document element. If the NamespaceURI,
         * qualifiedName, and doctype are null, the returned {@link Document} is empty with no
         * document element.
         * @throws {DOMException}
         * With code:
         *
         * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
         * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
         * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed, if the qualifiedName has a
         * prefix and the namespaceURI is null, or if the qualifiedName is null and the namespaceURI
         * is different from null, or if the qualifiedName has a prefix that is "xml" and the
         * namespaceURI is different from "{@link http://www.w3.org/XML/1998/namespace}"
         * {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#Namespaces XML Namespaces},
         * or if the DOM implementation does not support the "XML" feature but a non-null namespace
         * URI was provided, since namespaces were defined by XML.
         * - `WRONG_DOCUMENT_ERR`: Raised if doctype has already been used with a different document
         * or was created from a different implementation.
         * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
         * "XML" and the language exposed through the Document does not support XML Namespaces (such
         * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
         * @since DOM Level 2.
         * @see {@link #createHTMLDocument}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument DOM Living Standard
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-2-Core-DOM-createDocument DOM
         *      Level 3 Core
         * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM
         *      Level 2 Core (initial)
         */
        createDocument: function(namespaceURI, qualifiedName, doctype) {
          var contentType = MIME_TYPE.XML_APPLICATION;
          namespaceURI === NAMESPACE.HTML ? contentType = MIME_TYPE.XML_XHTML_APPLICATION : namespaceURI === NAMESPACE.SVG && (contentType = MIME_TYPE.XML_SVG_IMAGE);
          var doc = new Document(PDC, { contentType });
          if (doc.implementation = this, doc.childNodes = new NodeList(), doc.doctype = doctype || null, doctype && doc.appendChild(doctype), qualifiedName) {
            var root = doc.createElementNS(namespaceURI, qualifiedName);
            doc.appendChild(root);
          }
          return doc;
        },
        /**
         * Creates an empty DocumentType node. Entity declarations and notations are not made
         * available. Entity reference expansions and default attribute additions do not occur.
         *
         * **This behavior is slightly different from the one in the specs**:
         * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
         * - `publicId` and `systemId` contain the raw data including any possible quotes,
         *   so they can always be serialized back to the original value
         * - `internalSubset` contains the raw string between `[` and `]` if present,
         *   but is not parsed or validated in any form.
         *
         * @function DOMImplementation#createDocumentType
         * @param {string} qualifiedName
         * The {@link https://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-qualifiedname qualified
         * name} of the document type to be created.
         * @param {string} [publicId]
         * The external subset public identifier. Stored verbatim including surrounding quotes.
         * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
         * if the value is non-empty and does not match the XML `PubidLiteral` production
         * (W3C DOM Parsing §3.2.1.3; XML 1.0 production [12]). Creation-time validation is not
         * enforced — deferred to a future breaking release.
         * @param {string} [systemId]
         * The external subset system identifier. Stored verbatim including surrounding quotes.
         * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
         * if the value is non-empty and does not match the XML `SystemLiteral` production
         * (W3C DOM Parsing §3.2.1.3; XML 1.0 production [11]). Creation-time validation is not
         * enforced — deferred to a future breaking release.
         * @param {string} [internalSubset]
         * The internal subset or an empty string if it is not present. Stored verbatim.
         * When serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
         * if the value contains `"]>"`. Creation-time validation is not enforced.
         * @returns {DocumentType}
         * A new {@link DocumentType} node with {@link Node#ownerDocument} set to null.
         * @throws {DOMException}
         * With code:
         *
         * - `INVALID_CHARACTER_ERR`: Raised if the specified qualified name is not an XML name
         * according to {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#XML XML 1.0}.
         * - `NAMESPACE_ERR`: Raised if the qualifiedName is malformed.
         * - `NOT_SUPPORTED_ERR`: May be raised if the implementation does not support the feature
         * "XML" and the language exposed through the Document does not support XML Namespaces (such
         * as {@link https://www.w3.org/TR/DOM-Level-3-Core/references.html#HTML40 HTML 4.01}).
         * @since DOM Level 2.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType
         *      MDN
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living
         *      Standard
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Level-3-Core-DOM-createDocType DOM
         *      Level 3 Core
         * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM
         *      Level 2 Core
         * @see https://github.com/xmldom/xmldom/blob/master/CHANGELOG.md#050
         * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-Core-DocType-internalSubset
         * @prettierignore
         */
        createDocumentType: function(qualifiedName, publicId, systemId, internalSubset) {
          validateQualifiedName(qualifiedName);
          var node = new DocumentType(PDC);
          return node.name = qualifiedName, node.nodeName = qualifiedName, node.publicId = publicId || "", node.systemId = systemId || "", node.internalSubset = internalSubset || "", node.childNodes = new NodeList(), node;
        },
        /**
         * Returns an HTML document, that might already have a basic DOM structure.
         *
         * __It behaves slightly different from the description in the living standard__:
         * - If the first argument is `false` no initial nodes are added (steps 3-7 in the specs are
         * omitted)
         * - `encoding`, `mode`, `origin`, `url` fields are currently not declared.
         *
         * @param {string | false} [title]
         * A string containing the title to give the new HTML document.
         * @returns {Document}
         * The HTML document.
         * @since WHATWG Living Standard.
         * @see {@link #createDocument}
         * @see https://dom.spec.whatwg.org/#dom-domimplementation-createhtmldocument
         * @see https://dom.spec.whatwg.org/#html-document
         */
        createHTMLDocument: function(title) {
          var doc = new Document(PDC, { contentType: MIME_TYPE.HTML });
          if (doc.implementation = this, doc.childNodes = new NodeList(), title !== !1) {
            doc.doctype = this.createDocumentType("html"), doc.doctype.ownerDocument = doc, doc.appendChild(doc.doctype);
            var htmlNode = doc.createElement("html");
            doc.appendChild(htmlNode);
            var headNode = doc.createElement("head");
            if (htmlNode.appendChild(headNode), typeof title == "string") {
              var titleNode = doc.createElement("title");
              titleNode.appendChild(doc.createTextNode(title)), headNode.appendChild(titleNode);
            }
            htmlNode.appendChild(doc.createElement("body"));
          }
          return doc;
        }
      };
      function Node(symbol) {
        checkSymbol(symbol);
      }
      Node.prototype = {
        /**
         * The first child of this node.
         *
         * @type {Node | null}
         */
        firstChild: null,
        /**
         * The last child of this node.
         *
         * @type {Node | null}
         */
        lastChild: null,
        /**
         * The previous sibling of this node.
         *
         * @type {Node | null}
         */
        previousSibling: null,
        /**
         * The next sibling of this node.
         *
         * @type {Node | null}
         */
        nextSibling: null,
        /**
         * The parent node of this node.
         *
         * @type {Node | null}
         */
        parentNode: null,
        /**
         * The parent element of this node.
         *
         * @type {Element | null}
         */
        get parentElement() {
          return this.parentNode && this.parentNode.nodeType === this.ELEMENT_NODE ? this.parentNode : null;
        },
        /**
         * The child nodes of this node.
         *
         * @type {NodeList}
         */
        childNodes: null,
        /**
         * The document object associated with this node.
         *
         * @type {Document | null}
         */
        ownerDocument: null,
        /**
         * The value of this node.
         *
         * @type {string | null}
         */
        nodeValue: null,
        /**
         * The namespace URI of this node.
         *
         * @type {string | null}
         */
        namespaceURI: null,
        /**
         * The prefix of the namespace for this node.
         *
         * @type {string | null}
         */
        prefix: null,
        /**
         * The local part of the qualified name of this node.
         *
         * @type {string | null}
         */
        localName: null,
        /**
         * The baseURI is currently always `about:blank`,
         * since that's what happens when you create a document from scratch.
         *
         * @type {'about:blank'}
         */
        baseURI: "about:blank",
        /**
         * Is true if this node is part of a document.
         *
         * @type {boolean}
         */
        get isConnected() {
          var rootNode = this.getRootNode();
          return rootNode && rootNode.nodeType === rootNode.DOCUMENT_NODE;
        },
        /**
         * Checks whether `other` is an inclusive descendant of this node.
         *
         * @param {Node | null | undefined} other
         * The node to check.
         * @returns {boolean}
         * True if `other` is an inclusive descendant of this node; false otherwise.
         * @see https://dom.spec.whatwg.org/#dom-node-contains
         */
        contains: function(other) {
          if (!other) return !1;
          var parent = other;
          do {
            if (this === parent) return !0;
            parent = parent.parentNode;
          } while (parent);
          return !1;
        },
        /**
         * @typedef GetRootNodeOptions
         * @property {boolean} [composed=false]
         */
        /**
         * Searches for the root node of this node.
         *
         * **This behavior is slightly different from the in the specs**:
         * - ignores `options.composed`, since `ShadowRoot`s are unsupported, always returns root.
         *
         * @param {GetRootNodeOptions} [options]
         * @returns {Node}
         * Root node.
         * @see https://dom.spec.whatwg.org/#dom-node-getrootnode
         * @see https://dom.spec.whatwg.org/#concept-shadow-including-root
         */
        getRootNode: function(options) {
          var parent = this;
          do {
            if (!parent.parentNode)
              return parent;
            parent = parent.parentNode;
          } while (parent);
        },
        /**
         * Checks whether the given node is equal to this node.
         *
         * Two nodes are equal when they have the same type, defining characteristics (for the type),
         * and the same childNodes. The comparison is iterative to avoid stack overflows on
         * deeply-nested trees. Attribute nodes of each Element pair are also pushed onto the stack
         * and compared the same way.
         *
         * @param {Node} [otherNode]
         * @returns {boolean}
         * @see https://dom.spec.whatwg.org/#concept-node-equals
         * @see ../docs/walk-dom.md.
         */
        isEqualNode: function(otherNode) {
          if (!otherNode) return !1;
          for (var stack = [{ node: this, other: otherNode }]; stack.length > 0; ) {
            var pair = stack.pop(), node = pair.node, other = pair.other;
            if (node.nodeType !== other.nodeType) return !1;
            switch (node.nodeType) {
              case node.DOCUMENT_TYPE_NODE:
                if (node.name !== other.name || node.publicId !== other.publicId || node.systemId !== other.systemId) return !1;
                break;
              case node.ELEMENT_NODE:
                if (node.namespaceURI !== other.namespaceURI || node.prefix !== other.prefix || node.localName !== other.localName || node.attributes.length !== other.attributes.length) return !1;
                for (var i = 0; i < node.attributes.length; i++) {
                  var attr = node.attributes.item(i), otherAttr = other.getAttributeNodeNS(attr.namespaceURI, attr.localName);
                  if (!otherAttr) return !1;
                  stack.push({ node: attr, other: otherAttr });
                }
                break;
              case node.ATTRIBUTE_NODE:
                if (node.namespaceURI !== other.namespaceURI || node.localName !== other.localName || node.value !== other.value) return !1;
                break;
              case node.PROCESSING_INSTRUCTION_NODE:
                if (node.target !== other.target || node.data !== other.data) return !1;
                break;
              case node.TEXT_NODE:
              case node.CDATA_SECTION_NODE:
              case node.COMMENT_NODE:
                if (node.data !== other.data) return !1;
                break;
            }
            if (node.childNodes.length !== other.childNodes.length) return !1;
            for (var i = node.childNodes.length - 1; i >= 0; i--)
              stack.push({ node: node.childNodes[i], other: other.childNodes[i] });
          }
          return !0;
        },
        /**
         * Checks whether or not the given node is this node.
         *
         * @param {Node} [otherNode]
         */
        isSameNode: function(otherNode) {
          return this === otherNode;
        },
        /**
         * Inserts a node before a reference node as a child of this node.
         *
         * @param {Node} newChild
         * The new child node to be inserted.
         * @param {Node | null} refChild
         * The reference node before which newChild will be inserted.
         * @returns {Node}
         * The new child node successfully inserted.
         * @throws {DOMException}
         * Throws a DOMException if inserting the node would result in a DOM tree that is not
         * well-formed, or if `child` is provided but is not a child of `parent`.
         * See {@link _insertBefore} for more details.
         * @since Modified in DOM L2
         */
        insertBefore: function(newChild, refChild) {
          return _insertBefore(this, newChild, refChild);
        },
        /**
         * Replaces an old child node with a new child node within this node.
         *
         * @param {Node} newChild
         * The new node that is to replace the old node.
         * If it already exists in the DOM, it is removed from its original position.
         * @param {Node} oldChild
         * The existing child node to be replaced.
         * @returns {Node}
         * Returns the replaced child node.
         * @throws {DOMException}
         * Throws a DOMException if replacing the node would result in a DOM tree that is not
         * well-formed, or if `oldChild` is not a child of `this`.
         * This can also occur if the pre-replacement validity assertion fails.
         * See {@link _insertBefore}, {@link Node.removeChild}, and
         * {@link assertPreReplacementValidityInDocument} for more details.
         * @see https://dom.spec.whatwg.org/#concept-node-replace
         */
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument), oldChild && this.removeChild(oldChild);
        },
        /**
         * Removes an existing child node from this node.
         *
         * @param {Node} oldChild
         * The child node to be removed.
         * @returns {Node}
         * Returns the removed child node.
         * @throws {DOMException}
         * Throws a DOMException if `oldChild` is not a child of `this`.
         * See {@link _removeChild} for more details.
         */
        removeChild: function(oldChild) {
          return _removeChild(this, oldChild);
        },
        /**
         * Appends a child node to this node.
         *
         * @param {Node} newChild
         * The child node to be appended to this node.
         * If it already exists in the DOM, it is removed from its original position.
         * @returns {Node}
         * Returns the appended child node.
         * @throws {DOMException}
         * Throws a DOMException if appending the node would result in a DOM tree that is not
         * well-formed, or if `newChild` is not a valid Node.
         * See {@link insertBefore} for more details.
         */
        appendChild: function(newChild) {
          return this.insertBefore(newChild, null);
        },
        /**
         * Determines whether this node has any child nodes.
         *
         * @returns {boolean}
         * Returns true if this node has any child nodes, and false otherwise.
         */
        hasChildNodes: function() {
          return this.firstChild != null;
        },
        /**
         * Creates a copy of the calling node.
         *
         * @param {boolean} deep
         * If true, the contents of the node are recursively copied.
         * If false, only the node itself (and its attributes, if it is an element) are copied.
         * @returns {Node}
         * Returns the newly created copy of the node.
         * @throws {DOMException}
         * May throw a DOMException if operations within {@link Element#setAttributeNode} or
         * {@link Node#appendChild} (which are potentially invoked in this method) do not meet their
         * specific constraints.
         * @see {@link cloneNode}
         */
        cloneNode: function(deep) {
          return cloneNode(this.ownerDocument || this, this, deep);
        },
        /**
         * Puts the specified node and all of its subtree into a "normalized" form. In a normalized
         * subtree, no text nodes in the subtree are empty and there are no adjacent text nodes.
         *
         * Specifically, this method merges any adjacent text nodes (i.e., nodes for which `nodeType`
         * is `TEXT_NODE`) into a single node with the combined data. It also removes any empty text
         * nodes.
         *
         * This method iterativly traverses all child nodes to normalize all descendent nodes within
         * the subtree.
         *
         * @throws {DOMException}
         * May throw a DOMException if operations within removeChild or appendData (which are
         * potentially invoked in this method) do not meet their specific constraints.
         * @since Modified in DOM Level 2
         * @see {@link Node.removeChild}
         * @see {@link CharacterData.appendData}
         * @see ../docs/walk-dom.md.
         */
        normalize: function() {
          walkDOM(this, null, {
            enter: function(node) {
              for (var child = node.firstChild; child; ) {
                var next = child.nextSibling;
                next !== null && next.nodeType === TEXT_NODE && child.nodeType === TEXT_NODE ? (node.removeChild(next), child.appendData(next.data)) : child = next;
              }
              return !0;
            }
          });
        },
        /**
         * Checks whether the DOM implementation implements a specific feature and its version.
         *
         * @deprecated
         * Since `DOMImplementation.hasFeature` is deprecated and always returns true.
         * @param {string} feature
         * The package name of the feature to test. This is the same name that can be passed to the
         * method `hasFeature` on `DOMImplementation`.
         * @param {string} version
         * This is the version number of the package name to test.
         * @returns {boolean}
         * Returns true in all cases in the current implementation.
         * @since Introduced in DOM Level 2
         * @see {@link DOMImplementation.hasFeature}
         */
        isSupported: function(feature, version) {
          return this.ownerDocument.implementation.hasFeature(feature, version);
        },
        /**
         * Look up the prefix associated to the given namespace URI, starting from this node.
         * **The default namespace declarations are ignored by this method.**
         * See Namespace Prefix Lookup for details on the algorithm used by this method.
         *
         * **This behavior is different from the in the specs**:
         * - no node type specific handling
         * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
         *
         * @param {string | null} namespaceURI
         * The namespace URI for which to find the associated prefix.
         * @returns {string | null}
         * The associated prefix, if found; otherwise, null.
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
         * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
         * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
         * @see https://github.com/xmldom/xmldom/issues/322
         * @prettierignore
         */
        lookupPrefix: function(namespaceURI) {
          for (var el = this; el; ) {
            var map = el._nsMap;
            if (map) {
              for (var n in map)
                if (hasOwn(map, n) && map[n] === namespaceURI)
                  return n;
            }
            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
          }
          return null;
        },
        /**
         * This function is used to look up the namespace URI associated with the given prefix,
         * starting from this node.
         *
         * **This behavior is different from the in the specs**:
         * - no node type specific handling
         * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
         *
         * @param {string | null} prefix
         * The prefix for which to find the associated namespace URI.
         * @returns {string | null}
         * The associated namespace URI, if found; otherwise, null.
         * @since DOM Level 3
         * @see https://dom.spec.whatwg.org/#dom-node-lookupnamespaceuri
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI
         * @prettierignore
         */
        lookupNamespaceURI: function(prefix) {
          for (var el = this; el; ) {
            var map = el._nsMap;
            if (map && hasOwn(map, prefix))
              return map[prefix];
            el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
          }
          return null;
        },
        /**
         * Determines whether the given namespace URI is the default namespace.
         *
         * The function works by looking up the prefix associated with the given namespace URI. If no
         * prefix is found (i.e., the namespace URI is not registered in the namespace map of this
         * node or any of its ancestors), it returns `true`, implying the namespace URI is considered
         * the default.
         *
         * **This behavior is different from the in the specs**:
         * - no node type specific handling
         * - uses the internal attribute _nsMap for resolving namespaces that is updated when changing attributes
         *
         * @param {string | null} namespaceURI
         * The namespace URI to be checked.
         * @returns {boolean}
         * Returns true if the given namespace URI is the default namespace, false otherwise.
         * @since DOM Level 3
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-isDefaultNamespace
         * @see https://dom.spec.whatwg.org/#dom-node-isdefaultnamespace
         * @prettierignore
         */
        isDefaultNamespace: function(namespaceURI) {
          var prefix = this.lookupPrefix(namespaceURI);
          return prefix == null;
        },
        /**
         * Compares the reference node with a node with regard to their position in the document and
         * according to the document order.
         *
         * @param {Node} other
         * The node to compare the reference node to.
         * @returns {number}
         * Returns how the node is positioned relatively to the reference node according to the
         * bitmask. 0 if reference node and given node are the same.
         * @since DOM Level 3
         * @see https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/core.html#Node3-compare
         * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
         */
        compareDocumentPosition: function(other) {
          if (this === other) return 0;
          var node1 = other, node2 = this, attr1 = null, attr2 = null;
          if (node1 instanceof Attr && (attr1 = node1, node1 = attr1.ownerElement), node2 instanceof Attr && (attr2 = node2, node2 = attr2.ownerElement, attr1 && node1 && node2 === node1))
            for (var i = 0, attr; attr = node2.attributes[i]; i++) {
              if (attr === attr1)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
              if (attr === attr2)
                return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            }
          if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument)
            return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
          if (attr2 && node1 === node2)
            return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          if (attr1 && node1 === node2)
            return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          for (var chain1 = [], ancestor1 = node1.parentNode; ancestor1; ) {
            if (!attr2 && ancestor1 === node2)
              return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            chain1.push(ancestor1), ancestor1 = ancestor1.parentNode;
          }
          chain1.reverse();
          for (var chain2 = [], ancestor2 = node2.parentNode; ancestor2; ) {
            if (!attr1 && ancestor2 === node1)
              return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
            chain2.push(ancestor2), ancestor2 = ancestor2.parentNode;
          }
          chain2.reverse();
          var ca = commonAncestor(chain1, chain2);
          for (var n in ca.childNodes) {
            var child = ca.childNodes[n];
            if (child === node2) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            if (child === node1) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
            if (chain2.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            if (chain1.indexOf(child) >= 0) return DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          }
          return 0;
        }
      };
      function _xmlEncoder(c) {
        return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
      }
      copy(NodeType, Node);
      copy(NodeType, Node.prototype);
      copy(DocumentPosition, Node);
      copy(DocumentPosition, Node.prototype);
      function _visitNode(node, callback) {
        walkDOM(node, null, {
          enter: function(n) {
            return callback(n) ? walkDOM.STOP : !0;
          }
        });
      }
      function walkDOM(node, context, callbacks) {
        for (var stack = [{ node, context, phase: walkDOM.ENTER }]; stack.length > 0; ) {
          var frame = stack.pop();
          if (frame.phase === walkDOM.ENTER) {
            var childContext = callbacks.enter(frame.node, frame.context);
            if (childContext === walkDOM.STOP)
              return walkDOM.STOP;
            if (stack.push({ node: frame.node, context: childContext, phase: walkDOM.EXIT }), childContext == null)
              continue;
            for (var child = frame.node.lastChild; child; )
              stack.push({ node: child, context: childContext, phase: walkDOM.ENTER }), child = child.previousSibling;
          } else
            callbacks.exit && callbacks.exit(frame.node, frame.context);
        }
      }
      walkDOM.STOP = /* @__PURE__ */ Symbol("walkDOM.STOP");
      walkDOM.ENTER = 0;
      walkDOM.EXIT = 1;
      function Document(symbol, options) {
        checkSymbol(symbol);
        var opt = options || {};
        this.ownerDocument = this, this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION, this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
      }
      function _onAddAttribute(doc, el, newAttr) {
        doc && doc._inc++;
        var ns2 = newAttr.namespaceURI;
        ns2 === NAMESPACE.XMLNS && (el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value);
      }
      function _onRemoveAttribute(doc, el, newAttr, remove) {
        doc && doc._inc++;
        var ns2 = newAttr.namespaceURI;
        ns2 === NAMESPACE.XMLNS && delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
      function _onUpdateChild(doc, parent, newChild) {
        if (doc && doc._inc) {
          doc._inc++;
          var childNodes = parent.childNodes;
          if (newChild && !newChild.nextSibling)
            childNodes[childNodes.length++] = newChild;
          else {
            for (var child = parent.firstChild, i = 0; child; )
              childNodes[i++] = child, child = child.nextSibling;
            childNodes.length = i, delete childNodes[childNodes.length];
          }
        }
      }
      function _removeChild(parentNode, child) {
        if (parentNode !== child.parentNode)
          throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
        var oldPreviousSibling = child.previousSibling, oldNextSibling = child.nextSibling;
        return oldPreviousSibling ? oldPreviousSibling.nextSibling = oldNextSibling : parentNode.firstChild = oldNextSibling, oldNextSibling ? oldNextSibling.previousSibling = oldPreviousSibling : parentNode.lastChild = oldPreviousSibling, _onUpdateChild(parentNode.ownerDocument, parentNode), child.parentNode = null, child.previousSibling = null, child.nextSibling = null, child;
      }
      function hasValidParentNodeType(node) {
        return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
      }
      function hasInsertableNodeType(node) {
        return node && (node.nodeType === Node.CDATA_SECTION_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.DOCUMENT_TYPE_NODE || node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE || node.nodeType === Node.TEXT_NODE);
      }
      function isDocTypeNode(node) {
        return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
      }
      function isElementNode(node) {
        return node && node.nodeType === Node.ELEMENT_NODE;
      }
      function isTextNode(node) {
        return node && node.nodeType === Node.TEXT_NODE;
      }
      function isElementInsertionPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        if (find(parentChildNodes, isElementNode) || isDocTypeNode(child))
          return !1;
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function isElementReplacementPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        function hasElementChildThatIsNotChild(node) {
          return isElementNode(node) && node !== child;
        }
        if (find(parentChildNodes, hasElementChildThatIsNotChild))
          return !1;
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function assertPreInsertionValidity1to5(parent, node, child) {
        if (!hasValidParentNodeType(parent))
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
        if (child && child.parentNode !== parent)
          throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
        if (
          // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
          !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
          // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
          // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
          // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
          isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
        )
          throw new DOMException(
            DOMException.HIERARCHY_REQUEST_ERR,
            "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
          );
      }
      function assertPreInsertionValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [], nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
        if (isElementNode(node) && !isElementInsertionPossible(parent, child))
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        if (isDocTypeNode(node)) {
          if (find(parentChildNodes, isDocTypeNode))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          if (!child && parentElementChild)
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
      function assertPreReplacementValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [], nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
        if (isElementNode(node) && !isElementReplacementPossible(parent, child))
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        if (isDocTypeNode(node)) {
          if (find(parentChildNodes, function(node2) {
            return isDocTypeNode(node2) && node2 !== child;
          }))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child))
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
      function _insertBefore(parent, node, child, _inDocumentAssertion) {
        assertPreInsertionValidity1to5(parent, node, child), parent.nodeType === Node.DOCUMENT_NODE && (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
        var cp = node.parentNode;
        if (cp && cp.removeChild(node), node.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var newFirst = node.firstChild;
          if (newFirst == null)
            return node;
          var newLast = node.lastChild;
        } else
          newFirst = newLast = node;
        var pre = child ? child.previousSibling : parent.lastChild;
        newFirst.previousSibling = pre, newLast.nextSibling = child, pre ? pre.nextSibling = newFirst : parent.firstChild = newFirst, child == null ? parent.lastChild = newLast : child.previousSibling = newLast;
        do
          newFirst.parentNode = parent;
        while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
        return _onUpdateChild(parent.ownerDocument || parent, parent, node), node.nodeType == DOCUMENT_FRAGMENT_NODE && (node.firstChild = node.lastChild = null), node;
      }
      Document.prototype = {
        /**
         * The implementation that created this document.
         *
         * @type DOMImplementation
         * @readonly
         */
        implementation: null,
        nodeName: "#document",
        nodeType: DOCUMENT_NODE,
        /**
         * The DocumentType node of the document.
         *
         * @type DocumentType
         * @readonly
         */
        doctype: null,
        documentElement: null,
        _inc: 1,
        insertBefore: function(newChild, refChild) {
          if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
            for (var child = newChild.firstChild; child; ) {
              var next = child.nextSibling;
              this.insertBefore(child, refChild), child = next;
            }
            return newChild;
          }
          return _insertBefore(this, newChild, refChild), newChild.ownerDocument = this, this.documentElement === null && newChild.nodeType === ELEMENT_NODE && (this.documentElement = newChild), newChild;
        },
        removeChild: function(oldChild) {
          var removed = _removeChild(this, oldChild);
          return removed === this.documentElement && (this.documentElement = null), removed;
        },
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument), newChild.ownerDocument = this, oldChild && this.removeChild(oldChild), isElementNode(newChild) && (this.documentElement = newChild);
        },
        /**
         * Imports a node from another document into this document, creating a new copy owned by this
         * document. The source node and its subtree are not modified.
         *
         * @param {Node} importedNode
         * The node to import.
         * @param {boolean} deep
         * If true, the contents of the node are recursively imported.
         * If false, only the node itself (and its attributes, if it is an element) are imported.
         * @returns {Node}
         * Returns the newly created import of the node.
         * @see {@link importNode}
         * @see {@link https://dom.spec.whatwg.org/#dom-document-importnode}
         */
        importNode: function(importedNode, deep) {
          return importNode(this, importedNode, deep);
        },
        // Introduced in DOM Level 2:
        getElementById: function(id) {
          var rtv = null;
          return _visitNode(this.documentElement, function(node) {
            if (node.nodeType == ELEMENT_NODE && node.getAttribute("id") == id)
              return rtv = node, !0;
          }), rtv;
        },
        /**
         * Creates a new `Element` that is owned by this `Document`.
         * In HTML Documents `localName` is the lower cased `tagName`,
         * otherwise no transformation is being applied.
         * When `contentType` implies the HTML namespace, it will be set as `namespaceURI`.
         *
         * __This implementation differs from the specification:__ - The provided name is not checked
         * against the `Name` production,
         * so no related error will be thrown.
         * - There is no interface `HTMLElement`, it is always an `Element`.
         * - There is no support for a second argument to indicate using custom elements.
         *
         * @param {string} tagName
         * @returns {Element}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
         * @see https://dom.spec.whatwg.org/#dom-document-createelement
         * @see https://dom.spec.whatwg.org/#concept-create-element
         */
        createElement: function(tagName) {
          var node = new Element(PDC);
          node.ownerDocument = this, this.type === "html" && (tagName = tagName.toLowerCase()), hasDefaultHTMLNamespace(this.contentType) && (node.namespaceURI = NAMESPACE.HTML), node.nodeName = tagName, node.tagName = tagName, node.localName = tagName, node.childNodes = new NodeList();
          var attrs = node.attributes = new NamedNodeMap();
          return attrs._ownerElement = node, node;
        },
        /**
         * @returns {DocumentFragment}
         */
        createDocumentFragment: function() {
          var node = new DocumentFragment(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node;
        },
        /**
         * @param {string} data
         * @returns {Text}
         */
        createTextNode: function(data) {
          var node = new Text(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.appendData(data), node;
        },
        /**
         * @param {string} data
         * @returns {Comment}
         * @see https://dom.spec.whatwg.org/#dom-document-createcomment
         * @see https://www.w3.org/TR/xml/#NT-Comment XML 1.0 production [15]
         * @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.3
         *
         *      Note: no validation is performed at creation time. When the resulting document is
         *      serialized with `requireWellFormed: true`, the serializer throws `InvalidStateError`
         *      if the comment data contains `--` anywhere, ends with `-`, or contains characters
         *      outside the XML Char production (W3C DOM Parsing §3.2.1.3). Without that option the
         *      data is emitted verbatim.
         */
        createComment: function(data) {
          var node = new Comment(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.appendData(data), node;
        },
        /**
         * Returns a new CDATASection node whose data is `data`.
         *
         * __This implementation differs from the specification:__ - calling this method on an HTML
         * document does not throw `NotSupportedError`.
         *
         * @param {string} data
         * @returns {CDATASection}
         * @throws {DOMException}
         * With code `INVALID_CHARACTER_ERR` if `data` contains `"]]>"`.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createCDATASection
         * @see https://dom.spec.whatwg.org/#dom-document-createcdatasection
         */
        createCDATASection: function(data) {
          if (data.indexOf("]]>") !== -1)
            throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'data contains "]]>"');
          var node = new CDATASection(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.appendData(data), node;
        },
        /**
         * Returns a ProcessingInstruction node whose target is target and data is data.
         *
         * __This behavior is slightly different from the in the specs__:
         * - it does not do any input validation on the arguments and doesn't throw
         * "InvalidCharacterError".
         *
         * Note: When the resulting document is serialized with `requireWellFormed: true`, the
         * serializer throws `InvalidStateError` if `.target` contains `:` or is an ASCII
         * case-insensitive match for `"xml"`, or if `.data` contains `?>` or characters outside the
         * XML Char production (W3C DOM Parsing §3.2.1.7). Without that option the data is emitted
         * verbatim.
         *
         * @param {string} target
         * @param {string} data
         * @returns {ProcessingInstruction}
         * @see https://developer.mozilla.org/docs/Web/API/Document/createProcessingInstruction
         * @see https://dom.spec.whatwg.org/#dom-document-createprocessinginstruction
         * @see https://www.w3.org/TR/DOM-Parsing/#dfn-concept-serialize-xml §3.2.1.7
         */
        createProcessingInstruction: function(target, data) {
          var node = new ProcessingInstruction(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.nodeName = node.target = target, node.nodeValue = node.data = data, node;
        },
        /**
         * Creates an `Attr` node that is owned by this document.
         * In HTML Documents `localName` is the lower cased `name`,
         * otherwise no transformation is being applied.
         *
         * __This implementation differs from the specification:__ - The provided name is not checked
         * against the `Name` production,
         * so no related error will be thrown.
         *
         * @param {string} name
         * @returns {Attr}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createAttribute
         * @see https://dom.spec.whatwg.org/#dom-document-createattribute
         */
        createAttribute: function(name) {
          if (!g.QName_exact.test(name))
            throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
          return this.type === "html" && (name = name.toLowerCase()), this._createAttribute(name);
        },
        _createAttribute: function(name) {
          var node = new Attr(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.name = name, node.nodeName = name, node.localName = name, node.specified = !0, node;
        },
        /**
         * Creates an EntityReference object.
         * The current implementation does not fill the `childNodes` with those of the corresponding
         * `Entity`
         *
         * @deprecated
         * In DOM Level 4.
         * @param {string} name
         * The name of the entity to reference. No namespace well-formedness checks are performed.
         * @returns {EntityReference}
         * @throws {DOMException}
         * With code `INVALID_CHARACTER_ERR` when `name` is not valid.
         * @throws {DOMException}
         * with code `NOT_SUPPORTED_ERR` when the document is of type `html`
         * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-392B75AE
         */
        createEntityReference: function(name) {
          if (!g.Name.test(name))
            throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
          if (this.type === "html")
            throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
          var node = new EntityReference(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.nodeName = name, node;
        },
        // Introduced in DOM Level 2:
        /**
         * @param {string} namespaceURI
         * @param {string} qualifiedName
         * @returns {Element}
         */
        createElementNS: function(namespaceURI, qualifiedName) {
          var validated = validateAndExtract(namespaceURI, qualifiedName), node = new Element(PDC), attrs = node.attributes = new NamedNodeMap();
          return node.childNodes = new NodeList(), node.ownerDocument = this, node.nodeName = qualifiedName, node.tagName = qualifiedName, node.namespaceURI = validated[0], node.prefix = validated[1], node.localName = validated[2], attrs._ownerElement = node, node;
        },
        // Introduced in DOM Level 2:
        /**
         * @param {string} namespaceURI
         * @param {string} qualifiedName
         * @returns {Attr}
         */
        createAttributeNS: function(namespaceURI, qualifiedName) {
          var validated = validateAndExtract(namespaceURI, qualifiedName), node = new Attr(PDC);
          return node.ownerDocument = this, node.childNodes = new NodeList(), node.nodeName = qualifiedName, node.name = qualifiedName, node.specified = !0, node.namespaceURI = validated[0], node.prefix = validated[1], node.localName = validated[2], node;
        }
      };
      _extends(Document, Node);
      function Element(symbol) {
        checkSymbol(symbol), this._nsMap = /* @__PURE__ */ Object.create(null);
      }
      Element.prototype = {
        nodeType: ELEMENT_NODE,
        /**
         * The attributes of this element.
         *
         * @type {NamedNodeMap | null}
         */
        attributes: null,
        getQualifiedName: function() {
          return this.prefix ? this.prefix + ":" + this.localName : this.localName;
        },
        _isInHTMLDocumentAndNamespace: function() {
          return this.ownerDocument.type === "html" && this.namespaceURI === NAMESPACE.HTML;
        },
        /**
         * Implementaton of Level2 Core function hasAttributes.
         *
         * @returns {boolean}
         * True if attribute list is not empty.
         * @see https://www.w3.org/TR/DOM-Level-2-Core/#core-ID-NodeHasAttrs
         */
        hasAttributes: function() {
          return !!(this.attributes && this.attributes.length);
        },
        hasAttribute: function(name) {
          return !!this.getAttributeNode(name);
        },
        /**
         * Returns element’s first attribute whose qualified name is `name`, and `null`
         * if there is no such attribute.
         *
         * @param {string} name
         * @returns {string | null}
         */
        getAttribute: function(name) {
          var attr = this.getAttributeNode(name);
          return attr ? attr.value : null;
        },
        getAttributeNode: function(name) {
          return this._isInHTMLDocumentAndNamespace() && (name = name.toLowerCase()), this.attributes.getNamedItem(name);
        },
        /**
         * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
         *
         * @param {string} name
         * @param {string} value
         */
        setAttribute: function(name, value) {
          this._isInHTMLDocumentAndNamespace() && (name = name.toLowerCase());
          var attr = this.getAttributeNode(name);
          attr ? attr.value = attr.nodeValue = "" + value : (attr = this.ownerDocument._createAttribute(name), attr.value = attr.nodeValue = "" + value, this.setAttributeNode(attr));
        },
        removeAttribute: function(name) {
          var attr = this.getAttributeNode(name);
          attr && this.removeAttributeNode(attr);
        },
        setAttributeNode: function(newAttr) {
          return this.attributes.setNamedItem(newAttr);
        },
        setAttributeNodeNS: function(newAttr) {
          return this.attributes.setNamedItemNS(newAttr);
        },
        removeAttributeNode: function(oldAttr) {
          return this.attributes.removeNamedItem(oldAttr.nodeName);
        },
        //get real attribute name,and remove it by removeAttributeNode
        removeAttributeNS: function(namespaceURI, localName) {
          var old = this.getAttributeNodeNS(namespaceURI, localName);
          old && this.removeAttributeNode(old);
        },
        hasAttributeNS: function(namespaceURI, localName) {
          return this.getAttributeNodeNS(namespaceURI, localName) != null;
        },
        /**
         * Returns element’s attribute whose namespace is `namespaceURI` and local name is
         * `localName`,
         * or `null` if there is no such attribute.
         *
         * @param {string} namespaceURI
         * @param {string} localName
         * @returns {string | null}
         */
        getAttributeNS: function(namespaceURI, localName) {
          var attr = this.getAttributeNodeNS(namespaceURI, localName);
          return attr ? attr.value : null;
        },
        /**
         * Sets the value of element’s attribute whose namespace is `namespaceURI` and local name is
         * `localName` to value.
         *
         * @param {string} namespaceURI
         * @param {string} qualifiedName
         * @param {string} value
         * @see https://dom.spec.whatwg.org/#dom-element-setattributens
         */
        setAttributeNS: function(namespaceURI, qualifiedName, value) {
          var validated = validateAndExtract(namespaceURI, qualifiedName), localName = validated[2], attr = this.getAttributeNodeNS(namespaceURI, localName);
          attr ? attr.value = attr.nodeValue = "" + value : (attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName), attr.value = attr.nodeValue = "" + value, this.setAttributeNode(attr));
        },
        getAttributeNodeNS: function(namespaceURI, localName) {
          return this.attributes.getNamedItemNS(namespaceURI, localName);
        },
        /**
         * Returns a LiveNodeList of all child elements which have **all** of the given class name(s).
         *
         * Returns an empty list if `classNames` is an empty string or only contains HTML white space
         * characters.
         *
         * Warning: This returns a live LiveNodeList.
         * Changes in the DOM will reflect in the array as the changes occur.
         * If an element selected by this array no longer qualifies for the selector,
         * it will automatically be removed. Be aware of this for iteration purposes.
         *
         * @param {string} classNames
         * Is a string representing the class name(s) to match; multiple class names are separated by
         * (ASCII-)whitespace.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByClassName
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
         * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
         */
        getElementsByClassName: function(classNames) {
          var classNamesSet = toOrderedSet(classNames);
          return new LiveNodeList(this, function(base) {
            var ls = [];
            return classNamesSet.length > 0 && _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  matches && ls.push(node);
                }
              }
            }), ls;
          });
        },
        /**
         * Returns a LiveNodeList of elements with the given qualifiedName.
         * Searching for all descendants can be done by passing `*` as `qualifiedName`.
         *
         * All descendants of the specified element are searched, but not the element itself.
         * The returned list is live, which means it updates itself with the DOM tree automatically.
         * Therefore, there is no need to call `Element.getElementsByTagName()`
         * with the same element and arguments repeatedly if the DOM changes in between calls.
         *
         * When called on an HTML element in an HTML document,
         * `getElementsByTagName` lower-cases the argument before searching for it.
         * This is undesirable when trying to match camel-cased SVG elements (such as
         * `<linearGradient>`) in an HTML document.
         * Instead, use `Element.getElementsByTagNameNS()`,
         * which preserves the capitalization of the tag name.
         *
         * `Element.getElementsByTagName` is similar to `Document.getElementsByTagName()`,
         * except that it only searches for elements that are descendants of the specified element.
         *
         * @param {string} qualifiedName
         * @returns {LiveNodeList}
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getElementsByTagName
         * @see https://dom.spec.whatwg.org/#concept-getelementsbytagname
         */
        getElementsByTagName: function(qualifiedName) {
          var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html", lowerQualifiedName = qualifiedName.toLowerCase();
          return new LiveNodeList(this, function(base) {
            var ls = [];
            return _visitNode(base, function(node) {
              if (!(node === base || node.nodeType !== ELEMENT_NODE))
                if (qualifiedName === "*")
                  ls.push(node);
                else {
                  var nodeQualifiedName = node.getQualifiedName(), matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
                  nodeQualifiedName === matchingQName && ls.push(node);
                }
            }), ls;
          });
        },
        getElementsByTagNameNS: function(namespaceURI, localName) {
          return new LiveNodeList(this, function(base) {
            var ls = [];
            return _visitNode(base, function(node) {
              node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName) && ls.push(node);
            }), ls;
          });
        }
      };
      Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
      Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
      Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
      _extends(Element, Node);
      function Attr(symbol) {
        checkSymbol(symbol), this.namespaceURI = null, this.prefix = null, this.ownerElement = null;
      }
      Attr.prototype.nodeType = ATTRIBUTE_NODE;
      _extends(Attr, Node);
      function CharacterData(symbol) {
        checkSymbol(symbol);
      }
      CharacterData.prototype = {
        data: "",
        substringData: function(offset, count) {
          return this.data.substring(offset, offset + count);
        },
        appendData: function(text) {
          text = this.data + text, this.nodeValue = this.data = text, this.length = text.length;
        },
        insertData: function(offset, text) {
          this.replaceData(offset, 0, text);
        },
        deleteData: function(offset, count) {
          this.replaceData(offset, count, "");
        },
        replaceData: function(offset, count, text) {
          var start = this.data.substring(0, offset), end = this.data.substring(offset + count);
          text = start + text + end, this.nodeValue = this.data = text, this.length = text.length;
        }
      };
      _extends(CharacterData, Node);
      function Text(symbol) {
        checkSymbol(symbol);
      }
      Text.prototype = {
        nodeName: "#text",
        nodeType: TEXT_NODE,
        splitText: function(offset) {
          var text = this.data, newText = text.substring(offset);
          text = text.substring(0, offset), this.data = this.nodeValue = text, this.length = text.length;
          var newNode = this.ownerDocument.createTextNode(newText);
          return this.parentNode && this.parentNode.insertBefore(newNode, this.nextSibling), newNode;
        }
      };
      _extends(Text, CharacterData);
      function Comment(symbol) {
        checkSymbol(symbol);
      }
      Comment.prototype = {
        nodeName: "#comment",
        nodeType: COMMENT_NODE
      };
      _extends(Comment, CharacterData);
      function CDATASection(symbol) {
        checkSymbol(symbol);
      }
      CDATASection.prototype = {
        nodeName: "#cdata-section",
        nodeType: CDATA_SECTION_NODE
      };
      _extends(CDATASection, Text);
      function DocumentType(symbol) {
        checkSymbol(symbol);
      }
      DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
      _extends(DocumentType, Node);
      function Notation(symbol) {
        checkSymbol(symbol);
      }
      Notation.prototype.nodeType = NOTATION_NODE;
      _extends(Notation, Node);
      function Entity(symbol) {
        checkSymbol(symbol);
      }
      Entity.prototype.nodeType = ENTITY_NODE;
      _extends(Entity, Node);
      function EntityReference(symbol) {
        checkSymbol(symbol);
      }
      EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
      _extends(EntityReference, Node);
      function DocumentFragment(symbol) {
        checkSymbol(symbol);
      }
      DocumentFragment.prototype.nodeName = "#document-fragment";
      DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
      _extends(DocumentFragment, Node);
      function ProcessingInstruction(symbol) {
        checkSymbol(symbol);
      }
      ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
      _extends(ProcessingInstruction, CharacterData);
      function XMLSerializer2() {
      }
      XMLSerializer2.prototype.serializeToString = function(node, options) {
        return nodeSerializeToString.call(node, options);
      };
      Node.prototype.toString = nodeSerializeToString;
      function nodeSerializeToString(options) {
        var opts;
        typeof options == "function" ? opts = { requireWellFormed: !1, splitCDATASections: !0, nodeFilter: options } : options != null ? opts = {
          requireWellFormed: !!options.requireWellFormed,
          splitCDATASections: options.splitCDATASections !== !1,
          nodeFilter: options.nodeFilter || null
        } : opts = { requireWellFormed: !1, splitCDATASections: !0, nodeFilter: null };
        var buf = [], refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this, prefix = refNode.prefix, uri = refNode.namespaceURI;
        if (uri && prefix == null) {
          var prefix = refNode.lookupPrefix(uri);
          if (prefix == null)
            var visibleNamespaces = [
              { namespace: uri, prefix: null }
              //{namespace:uri,prefix:''}
            ];
        }
        return serializeToString(this, buf, visibleNamespaces, opts), buf.join("");
      }
      function needNamespaceDefine(node, isHTML, visibleNamespaces) {
        var prefix = node.prefix || "", uri = node.namespaceURI;
        if (!uri || prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS)
          return !1;
        for (var i = visibleNamespaces.length; i--; ) {
          var ns2 = visibleNamespaces[i];
          if (ns2.prefix === prefix)
            return ns2.namespace !== uri;
        }
        return !0;
      }
      function addSerializedAttribute(buf, qualifiedName, value) {
        buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
      }
      function serializeToString(node, buf, visibleNamespaces, opts) {
        visibleNamespaces || (visibleNamespaces = []);
        var nodeFilter = opts.nodeFilter, requireWellFormed = opts.requireWellFormed, splitCDATASections = opts.splitCDATASections, doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument, isHTML = doc.type === "html";
        walkDOM(
          node,
          { ns: visibleNamespaces },
          {
            enter: function(n, ctx2) {
              var namespaces = ctx2.ns;
              if (nodeFilter)
                if (n = nodeFilter(n), n) {
                  if (typeof n == "string")
                    return buf.push(n), null;
                } else
                  return null;
              switch (n.nodeType) {
                case ELEMENT_NODE:
                  var attrs = n.attributes, len = attrs.length, nodeName = n.tagName, prefixedNodeName = nodeName;
                  if (!isHTML && !n.prefix && n.namespaceURI) {
                    for (var defaultNS, ai = 0; ai < attrs.length; ai++)
                      if (attrs.item(ai).name === "xmlns") {
                        defaultNS = attrs.item(ai).value;
                        break;
                      }
                    if (!defaultNS)
                      for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                        var nsEntry = namespaces[nsi];
                        if (nsEntry.prefix === "" && nsEntry.namespace === n.namespaceURI) {
                          defaultNS = nsEntry.namespace;
                          break;
                        }
                      }
                    if (defaultNS !== n.namespaceURI)
                      for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                        var nsEntry = namespaces[nsi];
                        if (nsEntry.namespace === n.namespaceURI) {
                          nsEntry.prefix && (prefixedNodeName = nsEntry.prefix + ":" + nodeName);
                          break;
                        }
                      }
                  }
                  buf.push("<", prefixedNodeName);
                  for (var childNamespaces = namespaces.slice(), i = 0; i < len; i++) {
                    var attr = attrs.item(i);
                    attr.prefix == "xmlns" ? childNamespaces.push({
                      prefix: attr.localName,
                      namespace: attr.value
                    }) : attr.nodeName == "xmlns" && childNamespaces.push({ prefix: "", namespace: attr.value });
                  }
                  for (var i = 0; i < len; i++) {
                    var attr = attrs.item(i);
                    if (needNamespaceDefine(attr, isHTML, childNamespaces)) {
                      var attrPrefix = attr.prefix || "", uri = attr.namespaceURI;
                      addSerializedAttribute(buf, attrPrefix ? "xmlns:" + attrPrefix : "xmlns", uri), childNamespaces.push({ prefix: attrPrefix, namespace: uri });
                    }
                    var filteredAttr = nodeFilter ? nodeFilter(attr) : attr;
                    filteredAttr && (typeof filteredAttr == "string" ? buf.push(filteredAttr) : addSerializedAttribute(buf, filteredAttr.name, filteredAttr.value));
                  }
                  if (nodeName === prefixedNodeName && needNamespaceDefine(n, isHTML, childNamespaces)) {
                    var nodePrefix = n.prefix || "", uri = n.namespaceURI;
                    addSerializedAttribute(buf, nodePrefix ? "xmlns:" + nodePrefix : "xmlns", uri), childNamespaces.push({ prefix: nodePrefix, namespace: uri });
                  }
                  var canCloseTag = !n.firstChild;
                  if (canCloseTag && (isHTML || n.namespaceURI === NAMESPACE.HTML) && (canCloseTag = isHTMLVoidElement(nodeName)), canCloseTag)
                    return buf.push("/>"), null;
                  if (buf.push(">"), isHTML && isHTMLRawTextElement(nodeName)) {
                    for (var child = n.firstChild; child; )
                      child.data ? buf.push(child.data) : serializeToString(child, buf, childNamespaces.slice(), opts), child = child.nextSibling;
                    return buf.push("</", prefixedNodeName, ">"), null;
                  }
                  return { ns: childNamespaces, tag: prefixedNodeName };
                case DOCUMENT_NODE:
                case DOCUMENT_FRAGMENT_NODE:
                  if (requireWellFormed && n.nodeType === DOCUMENT_NODE && n.documentElement == null)
                    throw new DOMException("The Document has no documentElement", DOMExceptionName.InvalidStateError);
                  return { ns: namespaces };
                case ATTRIBUTE_NODE:
                  return addSerializedAttribute(buf, n.name, n.value), null;
                case TEXT_NODE:
                  if (requireWellFormed && g.InvalidChar.test(n.data))
                    throw new DOMException(
                      "The Text node data contains characters outside the XML Char production",
                      DOMExceptionName.InvalidStateError
                    );
                  return buf.push(n.data.replace(/[<&>]/g, _xmlEncoder)), null;
                case CDATA_SECTION_NODE:
                  if (requireWellFormed && n.data.indexOf("]]>") !== -1)
                    throw new DOMException('The CDATASection data contains "]]>"', DOMExceptionName.InvalidStateError);
                  return splitCDATASections ? buf.push(g.CDATA_START, n.data.replace(/]]>/g, "]]]]><![CDATA[>"), g.CDATA_END) : buf.push(g.CDATA_START, n.data, g.CDATA_END), null;
                case COMMENT_NODE:
                  if (requireWellFormed) {
                    if (g.InvalidChar.test(n.data))
                      throw new DOMException(
                        "The comment node data contains characters outside the XML Char production",
                        DOMExceptionName.InvalidStateError
                      );
                    if (n.data.indexOf("--") !== -1 || n.data[n.data.length - 1] === "-")
                      throw new DOMException(
                        'The comment node data contains "--" or ends with "-"',
                        DOMExceptionName.InvalidStateError
                      );
                  }
                  return buf.push(g.COMMENT_START, n.data, g.COMMENT_END), null;
                case DOCUMENT_TYPE_NODE:
                  var pubid = n.publicId, sysid = n.systemId;
                  if (requireWellFormed) {
                    if (pubid && !g.PubidLiteral_match.test(pubid))
                      throw new DOMException("DocumentType publicId is not a valid PubidLiteral", DOMExceptionName.InvalidStateError);
                    if (sysid && sysid !== "." && !g.SystemLiteral_match.test(sysid))
                      throw new DOMException("DocumentType systemId is not a valid SystemLiteral", DOMExceptionName.InvalidStateError);
                    if (n.internalSubset && n.internalSubset.indexOf("]>") !== -1)
                      throw new DOMException('DocumentType internalSubset contains "]>"', DOMExceptionName.InvalidStateError);
                  }
                  return buf.push(g.DOCTYPE_DECL_START, " ", n.name), pubid ? (buf.push(" ", g.PUBLIC, " ", pubid), sysid && sysid !== "." && buf.push(" ", sysid)) : sysid && sysid !== "." && buf.push(" ", g.SYSTEM, " ", sysid), n.internalSubset && buf.push(" [", n.internalSubset, "]"), buf.push(">"), null;
                case PROCESSING_INSTRUCTION_NODE:
                  if (requireWellFormed) {
                    if (n.target.indexOf(":") !== -1 || n.target.toLowerCase() === "xml")
                      throw new DOMException("The ProcessingInstruction target is not well-formed", DOMExceptionName.InvalidStateError);
                    if (g.InvalidChar.test(n.data))
                      throw new DOMException(
                        "The ProcessingInstruction data contains characters outside the XML Char production",
                        DOMExceptionName.InvalidStateError
                      );
                    if (n.data.indexOf("?>") !== -1)
                      throw new DOMException('The ProcessingInstruction data contains "?>"', DOMExceptionName.InvalidStateError);
                  }
                  return buf.push("<?", n.target, " ", n.data, "?>"), null;
                case ENTITY_REFERENCE_NODE:
                  return buf.push("&", n.nodeName, ";"), null;
                //case ENTITY_NODE:
                //case NOTATION_NODE:
                default:
                  return buf.push("??", n.nodeName), null;
              }
            },
            exit: function(n, childCtx) {
              childCtx && childCtx.tag && buf.push("</", childCtx.tag, ">");
            }
          }
        );
      }
      function importNode(doc, node, deep) {
        var destRoot;
        return walkDOM(node, null, {
          enter: function(srcNode, destParent) {
            var destNode = srcNode.cloneNode(!1);
            destNode.ownerDocument = doc, destNode.parentNode = null, destParent === null ? destRoot = destNode : destParent.appendChild(destNode);
            var shouldDeep = srcNode.nodeType === ATTRIBUTE_NODE || deep;
            return shouldDeep ? destNode : null;
          }
        }), destRoot;
      }
      function cloneNode(doc, node, deep) {
        var destRoot;
        return walkDOM(node, null, {
          enter: function(srcNode, destParent) {
            var destNode = new srcNode.constructor(PDC);
            for (var n in srcNode)
              if (hasOwn(srcNode, n)) {
                var v = srcNode[n];
                typeof v != "object" && v != destNode[n] && (destNode[n] = v);
              }
            srcNode.childNodes && (destNode.childNodes = new NodeList()), destNode.ownerDocument = doc;
            var shouldDeep = deep;
            switch (destNode.nodeType) {
              case ELEMENT_NODE:
                var attrs = srcNode.attributes, attrs2 = destNode.attributes = new NamedNodeMap(), len = attrs.length;
                attrs2._ownerElement = destNode;
                for (var i = 0; i < len; i++)
                  destNode.setAttributeNode(cloneNode(doc, attrs.item(i), !0));
                break;
              case ATTRIBUTE_NODE:
                shouldDeep = !0;
            }
            return destParent !== null ? destParent.appendChild(destNode) : destRoot = destNode, shouldDeep ? destNode : null;
          }
        }), destRoot;
      }
      function __set__(object, key, value) {
        object[key] = value;
      }
      function childrenRefresh(node) {
        for (var ls = [], child = node.firstChild; child; )
          child.nodeType === ELEMENT_NODE && ls.push(child), child = child.nextSibling;
        return ls;
      }
      try {
        Object.defineProperty && (Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            return _updateLiveList(this), this.$$length;
          }
        }), Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            if (this.nodeType === ELEMENT_NODE || this.nodeType === DOCUMENT_FRAGMENT_NODE) {
              var buf = [];
              return walkDOM(this, null, {
                enter: function(n) {
                  if (n.nodeType === ELEMENT_NODE || n.nodeType === DOCUMENT_FRAGMENT_NODE)
                    return !0;
                  if (n.nodeType === PROCESSING_INSTRUCTION_NODE || n.nodeType === COMMENT_NODE)
                    return null;
                  buf.push(n.nodeValue);
                }
              }), buf.join("");
            }
            return this.nodeValue;
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                for (; this.firstChild; )
                  this.removeChild(this.firstChild);
                (data || String(data)) && this.appendChild(this.ownerDocument.createTextNode(data));
                break;
              default:
                this.data = data, this.value = data, this.nodeValue = data;
            }
          }
        }), Object.defineProperty(Element.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        }), Object.defineProperty(Document.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        }), Object.defineProperty(DocumentFragment.prototype, "children", {
          get: function() {
            return new LiveNodeList(this, childrenRefresh);
          }
        }), __set__ = function(object, key, value) {
          object["$$" + key] = value;
        });
      } catch {
      }
      exports._updateLiveList = _updateLiveList;
      exports.Attr = Attr;
      exports.CDATASection = CDATASection;
      exports.CharacterData = CharacterData;
      exports.Comment = Comment;
      exports.Document = Document;
      exports.DocumentFragment = DocumentFragment;
      exports.DocumentType = DocumentType;
      exports.DOMImplementation = DOMImplementation;
      exports.Element = Element;
      exports.Entity = Entity;
      exports.EntityReference = EntityReference;
      exports.LiveNodeList = LiveNodeList;
      exports.NamedNodeMap = NamedNodeMap;
      exports.Node = Node;
      exports.NodeList = NodeList;
      exports.Notation = Notation;
      exports.Text = Text;
      exports.ProcessingInstruction = ProcessingInstruction;
      exports.walkDOM = walkDOM;
      exports.XMLSerializer = XMLSerializer2;
    }
  });

  // node_modules/@xmldom/xmldom/lib/entities.js
  var require_entities = __commonJS({
    "node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
      "use strict";
      var freeze = require_conventions().freeze;
      exports.XML_ENTITIES = freeze({
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        quot: '"'
      });
      exports.HTML_ENTITIES = freeze({
        Aacute: "Á",
        aacute: "á",
        Abreve: "Ă",
        abreve: "ă",
        ac: "∾",
        acd: "∿",
        acE: "∾̳",
        Acirc: "Â",
        acirc: "â",
        acute: "´",
        Acy: "А",
        acy: "а",
        AElig: "Æ",
        aelig: "æ",
        af: "⁡",
        Afr: "𝔄",
        afr: "𝔞",
        Agrave: "À",
        agrave: "à",
        alefsym: "ℵ",
        aleph: "ℵ",
        Alpha: "Α",
        alpha: "α",
        Amacr: "Ā",
        amacr: "ā",
        amalg: "⨿",
        AMP: "&",
        amp: "&",
        And: "⩓",
        and: "∧",
        andand: "⩕",
        andd: "⩜",
        andslope: "⩘",
        andv: "⩚",
        ang: "∠",
        ange: "⦤",
        angle: "∠",
        angmsd: "∡",
        angmsdaa: "⦨",
        angmsdab: "⦩",
        angmsdac: "⦪",
        angmsdad: "⦫",
        angmsdae: "⦬",
        angmsdaf: "⦭",
        angmsdag: "⦮",
        angmsdah: "⦯",
        angrt: "∟",
        angrtvb: "⊾",
        angrtvbd: "⦝",
        angsph: "∢",
        angst: "Å",
        angzarr: "⍼",
        Aogon: "Ą",
        aogon: "ą",
        Aopf: "𝔸",
        aopf: "𝕒",
        ap: "≈",
        apacir: "⩯",
        apE: "⩰",
        ape: "≊",
        apid: "≋",
        apos: "'",
        ApplyFunction: "⁡",
        approx: "≈",
        approxeq: "≊",
        Aring: "Å",
        aring: "å",
        Ascr: "𝒜",
        ascr: "𝒶",
        Assign: "≔",
        ast: "*",
        asymp: "≈",
        asympeq: "≍",
        Atilde: "Ã",
        atilde: "ã",
        Auml: "Ä",
        auml: "ä",
        awconint: "∳",
        awint: "⨑",
        backcong: "≌",
        backepsilon: "϶",
        backprime: "‵",
        backsim: "∽",
        backsimeq: "⋍",
        Backslash: "∖",
        Barv: "⫧",
        barvee: "⊽",
        Barwed: "⌆",
        barwed: "⌅",
        barwedge: "⌅",
        bbrk: "⎵",
        bbrktbrk: "⎶",
        bcong: "≌",
        Bcy: "Б",
        bcy: "б",
        bdquo: "„",
        becaus: "∵",
        Because: "∵",
        because: "∵",
        bemptyv: "⦰",
        bepsi: "϶",
        bernou: "ℬ",
        Bernoullis: "ℬ",
        Beta: "Β",
        beta: "β",
        beth: "ℶ",
        between: "≬",
        Bfr: "𝔅",
        bfr: "𝔟",
        bigcap: "⋂",
        bigcirc: "◯",
        bigcup: "⋃",
        bigodot: "⨀",
        bigoplus: "⨁",
        bigotimes: "⨂",
        bigsqcup: "⨆",
        bigstar: "★",
        bigtriangledown: "▽",
        bigtriangleup: "△",
        biguplus: "⨄",
        bigvee: "⋁",
        bigwedge: "⋀",
        bkarow: "⤍",
        blacklozenge: "⧫",
        blacksquare: "▪",
        blacktriangle: "▴",
        blacktriangledown: "▾",
        blacktriangleleft: "◂",
        blacktriangleright: "▸",
        blank: "␣",
        blk12: "▒",
        blk14: "░",
        blk34: "▓",
        block: "█",
        bne: "=⃥",
        bnequiv: "≡⃥",
        bNot: "⫭",
        bnot: "⌐",
        Bopf: "𝔹",
        bopf: "𝕓",
        bot: "⊥",
        bottom: "⊥",
        bowtie: "⋈",
        boxbox: "⧉",
        boxDL: "╗",
        boxDl: "╖",
        boxdL: "╕",
        boxdl: "┐",
        boxDR: "╔",
        boxDr: "╓",
        boxdR: "╒",
        boxdr: "┌",
        boxH: "═",
        boxh: "─",
        boxHD: "╦",
        boxHd: "╤",
        boxhD: "╥",
        boxhd: "┬",
        boxHU: "╩",
        boxHu: "╧",
        boxhU: "╨",
        boxhu: "┴",
        boxminus: "⊟",
        boxplus: "⊞",
        boxtimes: "⊠",
        boxUL: "╝",
        boxUl: "╜",
        boxuL: "╛",
        boxul: "┘",
        boxUR: "╚",
        boxUr: "╙",
        boxuR: "╘",
        boxur: "└",
        boxV: "║",
        boxv: "│",
        boxVH: "╬",
        boxVh: "╫",
        boxvH: "╪",
        boxvh: "┼",
        boxVL: "╣",
        boxVl: "╢",
        boxvL: "╡",
        boxvl: "┤",
        boxVR: "╠",
        boxVr: "╟",
        boxvR: "╞",
        boxvr: "├",
        bprime: "‵",
        Breve: "˘",
        breve: "˘",
        brvbar: "¦",
        Bscr: "ℬ",
        bscr: "𝒷",
        bsemi: "⁏",
        bsim: "∽",
        bsime: "⋍",
        bsol: "\\",
        bsolb: "⧅",
        bsolhsub: "⟈",
        bull: "•",
        bullet: "•",
        bump: "≎",
        bumpE: "⪮",
        bumpe: "≏",
        Bumpeq: "≎",
        bumpeq: "≏",
        Cacute: "Ć",
        cacute: "ć",
        Cap: "⋒",
        cap: "∩",
        capand: "⩄",
        capbrcup: "⩉",
        capcap: "⩋",
        capcup: "⩇",
        capdot: "⩀",
        CapitalDifferentialD: "ⅅ",
        caps: "∩︀",
        caret: "⁁",
        caron: "ˇ",
        Cayleys: "ℭ",
        ccaps: "⩍",
        Ccaron: "Č",
        ccaron: "č",
        Ccedil: "Ç",
        ccedil: "ç",
        Ccirc: "Ĉ",
        ccirc: "ĉ",
        Cconint: "∰",
        ccups: "⩌",
        ccupssm: "⩐",
        Cdot: "Ċ",
        cdot: "ċ",
        cedil: "¸",
        Cedilla: "¸",
        cemptyv: "⦲",
        cent: "¢",
        CenterDot: "·",
        centerdot: "·",
        Cfr: "ℭ",
        cfr: "𝔠",
        CHcy: "Ч",
        chcy: "ч",
        check: "✓",
        checkmark: "✓",
        Chi: "Χ",
        chi: "χ",
        cir: "○",
        circ: "ˆ",
        circeq: "≗",
        circlearrowleft: "↺",
        circlearrowright: "↻",
        circledast: "⊛",
        circledcirc: "⊚",
        circleddash: "⊝",
        CircleDot: "⊙",
        circledR: "®",
        circledS: "Ⓢ",
        CircleMinus: "⊖",
        CirclePlus: "⊕",
        CircleTimes: "⊗",
        cirE: "⧃",
        cire: "≗",
        cirfnint: "⨐",
        cirmid: "⫯",
        cirscir: "⧂",
        ClockwiseContourIntegral: "∲",
        CloseCurlyDoubleQuote: "”",
        CloseCurlyQuote: "’",
        clubs: "♣",
        clubsuit: "♣",
        Colon: "∷",
        colon: ":",
        Colone: "⩴",
        colone: "≔",
        coloneq: "≔",
        comma: ",",
        commat: "@",
        comp: "∁",
        compfn: "∘",
        complement: "∁",
        complexes: "ℂ",
        cong: "≅",
        congdot: "⩭",
        Congruent: "≡",
        Conint: "∯",
        conint: "∮",
        ContourIntegral: "∮",
        Copf: "ℂ",
        copf: "𝕔",
        coprod: "∐",
        Coproduct: "∐",
        COPY: "©",
        copy: "©",
        copysr: "℗",
        CounterClockwiseContourIntegral: "∳",
        crarr: "↵",
        Cross: "⨯",
        cross: "✗",
        Cscr: "𝒞",
        cscr: "𝒸",
        csub: "⫏",
        csube: "⫑",
        csup: "⫐",
        csupe: "⫒",
        ctdot: "⋯",
        cudarrl: "⤸",
        cudarrr: "⤵",
        cuepr: "⋞",
        cuesc: "⋟",
        cularr: "↶",
        cularrp: "⤽",
        Cup: "⋓",
        cup: "∪",
        cupbrcap: "⩈",
        CupCap: "≍",
        cupcap: "⩆",
        cupcup: "⩊",
        cupdot: "⊍",
        cupor: "⩅",
        cups: "∪︀",
        curarr: "↷",
        curarrm: "⤼",
        curlyeqprec: "⋞",
        curlyeqsucc: "⋟",
        curlyvee: "⋎",
        curlywedge: "⋏",
        curren: "¤",
        curvearrowleft: "↶",
        curvearrowright: "↷",
        cuvee: "⋎",
        cuwed: "⋏",
        cwconint: "∲",
        cwint: "∱",
        cylcty: "⌭",
        Dagger: "‡",
        dagger: "†",
        daleth: "ℸ",
        Darr: "↡",
        dArr: "⇓",
        darr: "↓",
        dash: "‐",
        Dashv: "⫤",
        dashv: "⊣",
        dbkarow: "⤏",
        dblac: "˝",
        Dcaron: "Ď",
        dcaron: "ď",
        Dcy: "Д",
        dcy: "д",
        DD: "ⅅ",
        dd: "ⅆ",
        ddagger: "‡",
        ddarr: "⇊",
        DDotrahd: "⤑",
        ddotseq: "⩷",
        deg: "°",
        Del: "∇",
        Delta: "Δ",
        delta: "δ",
        demptyv: "⦱",
        dfisht: "⥿",
        Dfr: "𝔇",
        dfr: "𝔡",
        dHar: "⥥",
        dharl: "⇃",
        dharr: "⇂",
        DiacriticalAcute: "´",
        DiacriticalDot: "˙",
        DiacriticalDoubleAcute: "˝",
        DiacriticalGrave: "`",
        DiacriticalTilde: "˜",
        diam: "⋄",
        Diamond: "⋄",
        diamond: "⋄",
        diamondsuit: "♦",
        diams: "♦",
        die: "¨",
        DifferentialD: "ⅆ",
        digamma: "ϝ",
        disin: "⋲",
        div: "÷",
        divide: "÷",
        divideontimes: "⋇",
        divonx: "⋇",
        DJcy: "Ђ",
        djcy: "ђ",
        dlcorn: "⌞",
        dlcrop: "⌍",
        dollar: "$",
        Dopf: "𝔻",
        dopf: "𝕕",
        Dot: "¨",
        dot: "˙",
        DotDot: "⃜",
        doteq: "≐",
        doteqdot: "≑",
        DotEqual: "≐",
        dotminus: "∸",
        dotplus: "∔",
        dotsquare: "⊡",
        doublebarwedge: "⌆",
        DoubleContourIntegral: "∯",
        DoubleDot: "¨",
        DoubleDownArrow: "⇓",
        DoubleLeftArrow: "⇐",
        DoubleLeftRightArrow: "⇔",
        DoubleLeftTee: "⫤",
        DoubleLongLeftArrow: "⟸",
        DoubleLongLeftRightArrow: "⟺",
        DoubleLongRightArrow: "⟹",
        DoubleRightArrow: "⇒",
        DoubleRightTee: "⊨",
        DoubleUpArrow: "⇑",
        DoubleUpDownArrow: "⇕",
        DoubleVerticalBar: "∥",
        DownArrow: "↓",
        Downarrow: "⇓",
        downarrow: "↓",
        DownArrowBar: "⤓",
        DownArrowUpArrow: "⇵",
        DownBreve: "̑",
        downdownarrows: "⇊",
        downharpoonleft: "⇃",
        downharpoonright: "⇂",
        DownLeftRightVector: "⥐",
        DownLeftTeeVector: "⥞",
        DownLeftVector: "↽",
        DownLeftVectorBar: "⥖",
        DownRightTeeVector: "⥟",
        DownRightVector: "⇁",
        DownRightVectorBar: "⥗",
        DownTee: "⊤",
        DownTeeArrow: "↧",
        drbkarow: "⤐",
        drcorn: "⌟",
        drcrop: "⌌",
        Dscr: "𝒟",
        dscr: "𝒹",
        DScy: "Ѕ",
        dscy: "ѕ",
        dsol: "⧶",
        Dstrok: "Đ",
        dstrok: "đ",
        dtdot: "⋱",
        dtri: "▿",
        dtrif: "▾",
        duarr: "⇵",
        duhar: "⥯",
        dwangle: "⦦",
        DZcy: "Џ",
        dzcy: "џ",
        dzigrarr: "⟿",
        Eacute: "É",
        eacute: "é",
        easter: "⩮",
        Ecaron: "Ě",
        ecaron: "ě",
        ecir: "≖",
        Ecirc: "Ê",
        ecirc: "ê",
        ecolon: "≕",
        Ecy: "Э",
        ecy: "э",
        eDDot: "⩷",
        Edot: "Ė",
        eDot: "≑",
        edot: "ė",
        ee: "ⅇ",
        efDot: "≒",
        Efr: "𝔈",
        efr: "𝔢",
        eg: "⪚",
        Egrave: "È",
        egrave: "è",
        egs: "⪖",
        egsdot: "⪘",
        el: "⪙",
        Element: "∈",
        elinters: "⏧",
        ell: "ℓ",
        els: "⪕",
        elsdot: "⪗",
        Emacr: "Ē",
        emacr: "ē",
        empty: "∅",
        emptyset: "∅",
        EmptySmallSquare: "◻",
        emptyv: "∅",
        EmptyVerySmallSquare: "▫",
        emsp: " ",
        emsp13: " ",
        emsp14: " ",
        ENG: "Ŋ",
        eng: "ŋ",
        ensp: " ",
        Eogon: "Ę",
        eogon: "ę",
        Eopf: "𝔼",
        eopf: "𝕖",
        epar: "⋕",
        eparsl: "⧣",
        eplus: "⩱",
        epsi: "ε",
        Epsilon: "Ε",
        epsilon: "ε",
        epsiv: "ϵ",
        eqcirc: "≖",
        eqcolon: "≕",
        eqsim: "≂",
        eqslantgtr: "⪖",
        eqslantless: "⪕",
        Equal: "⩵",
        equals: "=",
        EqualTilde: "≂",
        equest: "≟",
        Equilibrium: "⇌",
        equiv: "≡",
        equivDD: "⩸",
        eqvparsl: "⧥",
        erarr: "⥱",
        erDot: "≓",
        Escr: "ℰ",
        escr: "ℯ",
        esdot: "≐",
        Esim: "⩳",
        esim: "≂",
        Eta: "Η",
        eta: "η",
        ETH: "Ð",
        eth: "ð",
        Euml: "Ë",
        euml: "ë",
        euro: "€",
        excl: "!",
        exist: "∃",
        Exists: "∃",
        expectation: "ℰ",
        ExponentialE: "ⅇ",
        exponentiale: "ⅇ",
        fallingdotseq: "≒",
        Fcy: "Ф",
        fcy: "ф",
        female: "♀",
        ffilig: "ﬃ",
        fflig: "ﬀ",
        ffllig: "ﬄ",
        Ffr: "𝔉",
        ffr: "𝔣",
        filig: "ﬁ",
        FilledSmallSquare: "◼",
        FilledVerySmallSquare: "▪",
        fjlig: "fj",
        flat: "♭",
        fllig: "ﬂ",
        fltns: "▱",
        fnof: "ƒ",
        Fopf: "𝔽",
        fopf: "𝕗",
        ForAll: "∀",
        forall: "∀",
        fork: "⋔",
        forkv: "⫙",
        Fouriertrf: "ℱ",
        fpartint: "⨍",
        frac12: "½",
        frac13: "⅓",
        frac14: "¼",
        frac15: "⅕",
        frac16: "⅙",
        frac18: "⅛",
        frac23: "⅔",
        frac25: "⅖",
        frac34: "¾",
        frac35: "⅗",
        frac38: "⅜",
        frac45: "⅘",
        frac56: "⅚",
        frac58: "⅝",
        frac78: "⅞",
        frasl: "⁄",
        frown: "⌢",
        Fscr: "ℱ",
        fscr: "𝒻",
        gacute: "ǵ",
        Gamma: "Γ",
        gamma: "γ",
        Gammad: "Ϝ",
        gammad: "ϝ",
        gap: "⪆",
        Gbreve: "Ğ",
        gbreve: "ğ",
        Gcedil: "Ģ",
        Gcirc: "Ĝ",
        gcirc: "ĝ",
        Gcy: "Г",
        gcy: "г",
        Gdot: "Ġ",
        gdot: "ġ",
        gE: "≧",
        ge: "≥",
        gEl: "⪌",
        gel: "⋛",
        geq: "≥",
        geqq: "≧",
        geqslant: "⩾",
        ges: "⩾",
        gescc: "⪩",
        gesdot: "⪀",
        gesdoto: "⪂",
        gesdotol: "⪄",
        gesl: "⋛︀",
        gesles: "⪔",
        Gfr: "𝔊",
        gfr: "𝔤",
        Gg: "⋙",
        gg: "≫",
        ggg: "⋙",
        gimel: "ℷ",
        GJcy: "Ѓ",
        gjcy: "ѓ",
        gl: "≷",
        gla: "⪥",
        glE: "⪒",
        glj: "⪤",
        gnap: "⪊",
        gnapprox: "⪊",
        gnE: "≩",
        gne: "⪈",
        gneq: "⪈",
        gneqq: "≩",
        gnsim: "⋧",
        Gopf: "𝔾",
        gopf: "𝕘",
        grave: "`",
        GreaterEqual: "≥",
        GreaterEqualLess: "⋛",
        GreaterFullEqual: "≧",
        GreaterGreater: "⪢",
        GreaterLess: "≷",
        GreaterSlantEqual: "⩾",
        GreaterTilde: "≳",
        Gscr: "𝒢",
        gscr: "ℊ",
        gsim: "≳",
        gsime: "⪎",
        gsiml: "⪐",
        Gt: "≫",
        GT: ">",
        gt: ">",
        gtcc: "⪧",
        gtcir: "⩺",
        gtdot: "⋗",
        gtlPar: "⦕",
        gtquest: "⩼",
        gtrapprox: "⪆",
        gtrarr: "⥸",
        gtrdot: "⋗",
        gtreqless: "⋛",
        gtreqqless: "⪌",
        gtrless: "≷",
        gtrsim: "≳",
        gvertneqq: "≩︀",
        gvnE: "≩︀",
        Hacek: "ˇ",
        hairsp: " ",
        half: "½",
        hamilt: "ℋ",
        HARDcy: "Ъ",
        hardcy: "ъ",
        hArr: "⇔",
        harr: "↔",
        harrcir: "⥈",
        harrw: "↭",
        Hat: "^",
        hbar: "ℏ",
        Hcirc: "Ĥ",
        hcirc: "ĥ",
        hearts: "♥",
        heartsuit: "♥",
        hellip: "…",
        hercon: "⊹",
        Hfr: "ℌ",
        hfr: "𝔥",
        HilbertSpace: "ℋ",
        hksearow: "⤥",
        hkswarow: "⤦",
        hoarr: "⇿",
        homtht: "∻",
        hookleftarrow: "↩",
        hookrightarrow: "↪",
        Hopf: "ℍ",
        hopf: "𝕙",
        horbar: "―",
        HorizontalLine: "─",
        Hscr: "ℋ",
        hscr: "𝒽",
        hslash: "ℏ",
        Hstrok: "Ħ",
        hstrok: "ħ",
        HumpDownHump: "≎",
        HumpEqual: "≏",
        hybull: "⁃",
        hyphen: "‐",
        Iacute: "Í",
        iacute: "í",
        ic: "⁣",
        Icirc: "Î",
        icirc: "î",
        Icy: "И",
        icy: "и",
        Idot: "İ",
        IEcy: "Е",
        iecy: "е",
        iexcl: "¡",
        iff: "⇔",
        Ifr: "ℑ",
        ifr: "𝔦",
        Igrave: "Ì",
        igrave: "ì",
        ii: "ⅈ",
        iiiint: "⨌",
        iiint: "∭",
        iinfin: "⧜",
        iiota: "℩",
        IJlig: "Ĳ",
        ijlig: "ĳ",
        Im: "ℑ",
        Imacr: "Ī",
        imacr: "ī",
        image: "ℑ",
        ImaginaryI: "ⅈ",
        imagline: "ℐ",
        imagpart: "ℑ",
        imath: "ı",
        imof: "⊷",
        imped: "Ƶ",
        Implies: "⇒",
        in: "∈",
        incare: "℅",
        infin: "∞",
        infintie: "⧝",
        inodot: "ı",
        Int: "∬",
        int: "∫",
        intcal: "⊺",
        integers: "ℤ",
        Integral: "∫",
        intercal: "⊺",
        Intersection: "⋂",
        intlarhk: "⨗",
        intprod: "⨼",
        InvisibleComma: "⁣",
        InvisibleTimes: "⁢",
        IOcy: "Ё",
        iocy: "ё",
        Iogon: "Į",
        iogon: "į",
        Iopf: "𝕀",
        iopf: "𝕚",
        Iota: "Ι",
        iota: "ι",
        iprod: "⨼",
        iquest: "¿",
        Iscr: "ℐ",
        iscr: "𝒾",
        isin: "∈",
        isindot: "⋵",
        isinE: "⋹",
        isins: "⋴",
        isinsv: "⋳",
        isinv: "∈",
        it: "⁢",
        Itilde: "Ĩ",
        itilde: "ĩ",
        Iukcy: "І",
        iukcy: "і",
        Iuml: "Ï",
        iuml: "ï",
        Jcirc: "Ĵ",
        jcirc: "ĵ",
        Jcy: "Й",
        jcy: "й",
        Jfr: "𝔍",
        jfr: "𝔧",
        jmath: "ȷ",
        Jopf: "𝕁",
        jopf: "𝕛",
        Jscr: "𝒥",
        jscr: "𝒿",
        Jsercy: "Ј",
        jsercy: "ј",
        Jukcy: "Є",
        jukcy: "є",
        Kappa: "Κ",
        kappa: "κ",
        kappav: "ϰ",
        Kcedil: "Ķ",
        kcedil: "ķ",
        Kcy: "К",
        kcy: "к",
        Kfr: "𝔎",
        kfr: "𝔨",
        kgreen: "ĸ",
        KHcy: "Х",
        khcy: "х",
        KJcy: "Ќ",
        kjcy: "ќ",
        Kopf: "𝕂",
        kopf: "𝕜",
        Kscr: "𝒦",
        kscr: "𝓀",
        lAarr: "⇚",
        Lacute: "Ĺ",
        lacute: "ĺ",
        laemptyv: "⦴",
        lagran: "ℒ",
        Lambda: "Λ",
        lambda: "λ",
        Lang: "⟪",
        lang: "⟨",
        langd: "⦑",
        langle: "⟨",
        lap: "⪅",
        Laplacetrf: "ℒ",
        laquo: "«",
        Larr: "↞",
        lArr: "⇐",
        larr: "←",
        larrb: "⇤",
        larrbfs: "⤟",
        larrfs: "⤝",
        larrhk: "↩",
        larrlp: "↫",
        larrpl: "⤹",
        larrsim: "⥳",
        larrtl: "↢",
        lat: "⪫",
        lAtail: "⤛",
        latail: "⤙",
        late: "⪭",
        lates: "⪭︀",
        lBarr: "⤎",
        lbarr: "⤌",
        lbbrk: "❲",
        lbrace: "{",
        lbrack: "[",
        lbrke: "⦋",
        lbrksld: "⦏",
        lbrkslu: "⦍",
        Lcaron: "Ľ",
        lcaron: "ľ",
        Lcedil: "Ļ",
        lcedil: "ļ",
        lceil: "⌈",
        lcub: "{",
        Lcy: "Л",
        lcy: "л",
        ldca: "⤶",
        ldquo: "“",
        ldquor: "„",
        ldrdhar: "⥧",
        ldrushar: "⥋",
        ldsh: "↲",
        lE: "≦",
        le: "≤",
        LeftAngleBracket: "⟨",
        LeftArrow: "←",
        Leftarrow: "⇐",
        leftarrow: "←",
        LeftArrowBar: "⇤",
        LeftArrowRightArrow: "⇆",
        leftarrowtail: "↢",
        LeftCeiling: "⌈",
        LeftDoubleBracket: "⟦",
        LeftDownTeeVector: "⥡",
        LeftDownVector: "⇃",
        LeftDownVectorBar: "⥙",
        LeftFloor: "⌊",
        leftharpoondown: "↽",
        leftharpoonup: "↼",
        leftleftarrows: "⇇",
        LeftRightArrow: "↔",
        Leftrightarrow: "⇔",
        leftrightarrow: "↔",
        leftrightarrows: "⇆",
        leftrightharpoons: "⇋",
        leftrightsquigarrow: "↭",
        LeftRightVector: "⥎",
        LeftTee: "⊣",
        LeftTeeArrow: "↤",
        LeftTeeVector: "⥚",
        leftthreetimes: "⋋",
        LeftTriangle: "⊲",
        LeftTriangleBar: "⧏",
        LeftTriangleEqual: "⊴",
        LeftUpDownVector: "⥑",
        LeftUpTeeVector: "⥠",
        LeftUpVector: "↿",
        LeftUpVectorBar: "⥘",
        LeftVector: "↼",
        LeftVectorBar: "⥒",
        lEg: "⪋",
        leg: "⋚",
        leq: "≤",
        leqq: "≦",
        leqslant: "⩽",
        les: "⩽",
        lescc: "⪨",
        lesdot: "⩿",
        lesdoto: "⪁",
        lesdotor: "⪃",
        lesg: "⋚︀",
        lesges: "⪓",
        lessapprox: "⪅",
        lessdot: "⋖",
        lesseqgtr: "⋚",
        lesseqqgtr: "⪋",
        LessEqualGreater: "⋚",
        LessFullEqual: "≦",
        LessGreater: "≶",
        lessgtr: "≶",
        LessLess: "⪡",
        lesssim: "≲",
        LessSlantEqual: "⩽",
        LessTilde: "≲",
        lfisht: "⥼",
        lfloor: "⌊",
        Lfr: "𝔏",
        lfr: "𝔩",
        lg: "≶",
        lgE: "⪑",
        lHar: "⥢",
        lhard: "↽",
        lharu: "↼",
        lharul: "⥪",
        lhblk: "▄",
        LJcy: "Љ",
        ljcy: "љ",
        Ll: "⋘",
        ll: "≪",
        llarr: "⇇",
        llcorner: "⌞",
        Lleftarrow: "⇚",
        llhard: "⥫",
        lltri: "◺",
        Lmidot: "Ŀ",
        lmidot: "ŀ",
        lmoust: "⎰",
        lmoustache: "⎰",
        lnap: "⪉",
        lnapprox: "⪉",
        lnE: "≨",
        lne: "⪇",
        lneq: "⪇",
        lneqq: "≨",
        lnsim: "⋦",
        loang: "⟬",
        loarr: "⇽",
        lobrk: "⟦",
        LongLeftArrow: "⟵",
        Longleftarrow: "⟸",
        longleftarrow: "⟵",
        LongLeftRightArrow: "⟷",
        Longleftrightarrow: "⟺",
        longleftrightarrow: "⟷",
        longmapsto: "⟼",
        LongRightArrow: "⟶",
        Longrightarrow: "⟹",
        longrightarrow: "⟶",
        looparrowleft: "↫",
        looparrowright: "↬",
        lopar: "⦅",
        Lopf: "𝕃",
        lopf: "𝕝",
        loplus: "⨭",
        lotimes: "⨴",
        lowast: "∗",
        lowbar: "_",
        LowerLeftArrow: "↙",
        LowerRightArrow: "↘",
        loz: "◊",
        lozenge: "◊",
        lozf: "⧫",
        lpar: "(",
        lparlt: "⦓",
        lrarr: "⇆",
        lrcorner: "⌟",
        lrhar: "⇋",
        lrhard: "⥭",
        lrm: "‎",
        lrtri: "⊿",
        lsaquo: "‹",
        Lscr: "ℒ",
        lscr: "𝓁",
        Lsh: "↰",
        lsh: "↰",
        lsim: "≲",
        lsime: "⪍",
        lsimg: "⪏",
        lsqb: "[",
        lsquo: "‘",
        lsquor: "‚",
        Lstrok: "Ł",
        lstrok: "ł",
        Lt: "≪",
        LT: "<",
        lt: "<",
        ltcc: "⪦",
        ltcir: "⩹",
        ltdot: "⋖",
        lthree: "⋋",
        ltimes: "⋉",
        ltlarr: "⥶",
        ltquest: "⩻",
        ltri: "◃",
        ltrie: "⊴",
        ltrif: "◂",
        ltrPar: "⦖",
        lurdshar: "⥊",
        luruhar: "⥦",
        lvertneqq: "≨︀",
        lvnE: "≨︀",
        macr: "¯",
        male: "♂",
        malt: "✠",
        maltese: "✠",
        Map: "⤅",
        map: "↦",
        mapsto: "↦",
        mapstodown: "↧",
        mapstoleft: "↤",
        mapstoup: "↥",
        marker: "▮",
        mcomma: "⨩",
        Mcy: "М",
        mcy: "м",
        mdash: "—",
        mDDot: "∺",
        measuredangle: "∡",
        MediumSpace: " ",
        Mellintrf: "ℳ",
        Mfr: "𝔐",
        mfr: "𝔪",
        mho: "℧",
        micro: "µ",
        mid: "∣",
        midast: "*",
        midcir: "⫰",
        middot: "·",
        minus: "−",
        minusb: "⊟",
        minusd: "∸",
        minusdu: "⨪",
        MinusPlus: "∓",
        mlcp: "⫛",
        mldr: "…",
        mnplus: "∓",
        models: "⊧",
        Mopf: "𝕄",
        mopf: "𝕞",
        mp: "∓",
        Mscr: "ℳ",
        mscr: "𝓂",
        mstpos: "∾",
        Mu: "Μ",
        mu: "μ",
        multimap: "⊸",
        mumap: "⊸",
        nabla: "∇",
        Nacute: "Ń",
        nacute: "ń",
        nang: "∠⃒",
        nap: "≉",
        napE: "⩰̸",
        napid: "≋̸",
        napos: "ŉ",
        napprox: "≉",
        natur: "♮",
        natural: "♮",
        naturals: "ℕ",
        nbsp: " ",
        nbump: "≎̸",
        nbumpe: "≏̸",
        ncap: "⩃",
        Ncaron: "Ň",
        ncaron: "ň",
        Ncedil: "Ņ",
        ncedil: "ņ",
        ncong: "≇",
        ncongdot: "⩭̸",
        ncup: "⩂",
        Ncy: "Н",
        ncy: "н",
        ndash: "–",
        ne: "≠",
        nearhk: "⤤",
        neArr: "⇗",
        nearr: "↗",
        nearrow: "↗",
        nedot: "≐̸",
        NegativeMediumSpace: "​",
        NegativeThickSpace: "​",
        NegativeThinSpace: "​",
        NegativeVeryThinSpace: "​",
        nequiv: "≢",
        nesear: "⤨",
        nesim: "≂̸",
        NestedGreaterGreater: "≫",
        NestedLessLess: "≪",
        NewLine: `
`,
        nexist: "∄",
        nexists: "∄",
        Nfr: "𝔑",
        nfr: "𝔫",
        ngE: "≧̸",
        nge: "≱",
        ngeq: "≱",
        ngeqq: "≧̸",
        ngeqslant: "⩾̸",
        nges: "⩾̸",
        nGg: "⋙̸",
        ngsim: "≵",
        nGt: "≫⃒",
        ngt: "≯",
        ngtr: "≯",
        nGtv: "≫̸",
        nhArr: "⇎",
        nharr: "↮",
        nhpar: "⫲",
        ni: "∋",
        nis: "⋼",
        nisd: "⋺",
        niv: "∋",
        NJcy: "Њ",
        njcy: "њ",
        nlArr: "⇍",
        nlarr: "↚",
        nldr: "‥",
        nlE: "≦̸",
        nle: "≰",
        nLeftarrow: "⇍",
        nleftarrow: "↚",
        nLeftrightarrow: "⇎",
        nleftrightarrow: "↮",
        nleq: "≰",
        nleqq: "≦̸",
        nleqslant: "⩽̸",
        nles: "⩽̸",
        nless: "≮",
        nLl: "⋘̸",
        nlsim: "≴",
        nLt: "≪⃒",
        nlt: "≮",
        nltri: "⋪",
        nltrie: "⋬",
        nLtv: "≪̸",
        nmid: "∤",
        NoBreak: "⁠",
        NonBreakingSpace: " ",
        Nopf: "ℕ",
        nopf: "𝕟",
        Not: "⫬",
        not: "¬",
        NotCongruent: "≢",
        NotCupCap: "≭",
        NotDoubleVerticalBar: "∦",
        NotElement: "∉",
        NotEqual: "≠",
        NotEqualTilde: "≂̸",
        NotExists: "∄",
        NotGreater: "≯",
        NotGreaterEqual: "≱",
        NotGreaterFullEqual: "≧̸",
        NotGreaterGreater: "≫̸",
        NotGreaterLess: "≹",
        NotGreaterSlantEqual: "⩾̸",
        NotGreaterTilde: "≵",
        NotHumpDownHump: "≎̸",
        NotHumpEqual: "≏̸",
        notin: "∉",
        notindot: "⋵̸",
        notinE: "⋹̸",
        notinva: "∉",
        notinvb: "⋷",
        notinvc: "⋶",
        NotLeftTriangle: "⋪",
        NotLeftTriangleBar: "⧏̸",
        NotLeftTriangleEqual: "⋬",
        NotLess: "≮",
        NotLessEqual: "≰",
        NotLessGreater: "≸",
        NotLessLess: "≪̸",
        NotLessSlantEqual: "⩽̸",
        NotLessTilde: "≴",
        NotNestedGreaterGreater: "⪢̸",
        NotNestedLessLess: "⪡̸",
        notni: "∌",
        notniva: "∌",
        notnivb: "⋾",
        notnivc: "⋽",
        NotPrecedes: "⊀",
        NotPrecedesEqual: "⪯̸",
        NotPrecedesSlantEqual: "⋠",
        NotReverseElement: "∌",
        NotRightTriangle: "⋫",
        NotRightTriangleBar: "⧐̸",
        NotRightTriangleEqual: "⋭",
        NotSquareSubset: "⊏̸",
        NotSquareSubsetEqual: "⋢",
        NotSquareSuperset: "⊐̸",
        NotSquareSupersetEqual: "⋣",
        NotSubset: "⊂⃒",
        NotSubsetEqual: "⊈",
        NotSucceeds: "⊁",
        NotSucceedsEqual: "⪰̸",
        NotSucceedsSlantEqual: "⋡",
        NotSucceedsTilde: "≿̸",
        NotSuperset: "⊃⃒",
        NotSupersetEqual: "⊉",
        NotTilde: "≁",
        NotTildeEqual: "≄",
        NotTildeFullEqual: "≇",
        NotTildeTilde: "≉",
        NotVerticalBar: "∤",
        npar: "∦",
        nparallel: "∦",
        nparsl: "⫽⃥",
        npart: "∂̸",
        npolint: "⨔",
        npr: "⊀",
        nprcue: "⋠",
        npre: "⪯̸",
        nprec: "⊀",
        npreceq: "⪯̸",
        nrArr: "⇏",
        nrarr: "↛",
        nrarrc: "⤳̸",
        nrarrw: "↝̸",
        nRightarrow: "⇏",
        nrightarrow: "↛",
        nrtri: "⋫",
        nrtrie: "⋭",
        nsc: "⊁",
        nsccue: "⋡",
        nsce: "⪰̸",
        Nscr: "𝒩",
        nscr: "𝓃",
        nshortmid: "∤",
        nshortparallel: "∦",
        nsim: "≁",
        nsime: "≄",
        nsimeq: "≄",
        nsmid: "∤",
        nspar: "∦",
        nsqsube: "⋢",
        nsqsupe: "⋣",
        nsub: "⊄",
        nsubE: "⫅̸",
        nsube: "⊈",
        nsubset: "⊂⃒",
        nsubseteq: "⊈",
        nsubseteqq: "⫅̸",
        nsucc: "⊁",
        nsucceq: "⪰̸",
        nsup: "⊅",
        nsupE: "⫆̸",
        nsupe: "⊉",
        nsupset: "⊃⃒",
        nsupseteq: "⊉",
        nsupseteqq: "⫆̸",
        ntgl: "≹",
        Ntilde: "Ñ",
        ntilde: "ñ",
        ntlg: "≸",
        ntriangleleft: "⋪",
        ntrianglelefteq: "⋬",
        ntriangleright: "⋫",
        ntrianglerighteq: "⋭",
        Nu: "Ν",
        nu: "ν",
        num: "#",
        numero: "№",
        numsp: " ",
        nvap: "≍⃒",
        nVDash: "⊯",
        nVdash: "⊮",
        nvDash: "⊭",
        nvdash: "⊬",
        nvge: "≥⃒",
        nvgt: ">⃒",
        nvHarr: "⤄",
        nvinfin: "⧞",
        nvlArr: "⤂",
        nvle: "≤⃒",
        nvlt: "<⃒",
        nvltrie: "⊴⃒",
        nvrArr: "⤃",
        nvrtrie: "⊵⃒",
        nvsim: "∼⃒",
        nwarhk: "⤣",
        nwArr: "⇖",
        nwarr: "↖",
        nwarrow: "↖",
        nwnear: "⤧",
        Oacute: "Ó",
        oacute: "ó",
        oast: "⊛",
        ocir: "⊚",
        Ocirc: "Ô",
        ocirc: "ô",
        Ocy: "О",
        ocy: "о",
        odash: "⊝",
        Odblac: "Ő",
        odblac: "ő",
        odiv: "⨸",
        odot: "⊙",
        odsold: "⦼",
        OElig: "Œ",
        oelig: "œ",
        ofcir: "⦿",
        Ofr: "𝔒",
        ofr: "𝔬",
        ogon: "˛",
        Ograve: "Ò",
        ograve: "ò",
        ogt: "⧁",
        ohbar: "⦵",
        ohm: "Ω",
        oint: "∮",
        olarr: "↺",
        olcir: "⦾",
        olcross: "⦻",
        oline: "‾",
        olt: "⧀",
        Omacr: "Ō",
        omacr: "ō",
        Omega: "Ω",
        omega: "ω",
        Omicron: "Ο",
        omicron: "ο",
        omid: "⦶",
        ominus: "⊖",
        Oopf: "𝕆",
        oopf: "𝕠",
        opar: "⦷",
        OpenCurlyDoubleQuote: "“",
        OpenCurlyQuote: "‘",
        operp: "⦹",
        oplus: "⊕",
        Or: "⩔",
        or: "∨",
        orarr: "↻",
        ord: "⩝",
        order: "ℴ",
        orderof: "ℴ",
        ordf: "ª",
        ordm: "º",
        origof: "⊶",
        oror: "⩖",
        orslope: "⩗",
        orv: "⩛",
        oS: "Ⓢ",
        Oscr: "𝒪",
        oscr: "ℴ",
        Oslash: "Ø",
        oslash: "ø",
        osol: "⊘",
        Otilde: "Õ",
        otilde: "õ",
        Otimes: "⨷",
        otimes: "⊗",
        otimesas: "⨶",
        Ouml: "Ö",
        ouml: "ö",
        ovbar: "⌽",
        OverBar: "‾",
        OverBrace: "⏞",
        OverBracket: "⎴",
        OverParenthesis: "⏜",
        par: "∥",
        para: "¶",
        parallel: "∥",
        parsim: "⫳",
        parsl: "⫽",
        part: "∂",
        PartialD: "∂",
        Pcy: "П",
        pcy: "п",
        percnt: "%",
        period: ".",
        permil: "‰",
        perp: "⊥",
        pertenk: "‱",
        Pfr: "𝔓",
        pfr: "𝔭",
        Phi: "Φ",
        phi: "φ",
        phiv: "ϕ",
        phmmat: "ℳ",
        phone: "☎",
        Pi: "Π",
        pi: "π",
        pitchfork: "⋔",
        piv: "ϖ",
        planck: "ℏ",
        planckh: "ℎ",
        plankv: "ℏ",
        plus: "+",
        plusacir: "⨣",
        plusb: "⊞",
        pluscir: "⨢",
        plusdo: "∔",
        plusdu: "⨥",
        pluse: "⩲",
        PlusMinus: "±",
        plusmn: "±",
        plussim: "⨦",
        plustwo: "⨧",
        pm: "±",
        Poincareplane: "ℌ",
        pointint: "⨕",
        Popf: "ℙ",
        popf: "𝕡",
        pound: "£",
        Pr: "⪻",
        pr: "≺",
        prap: "⪷",
        prcue: "≼",
        prE: "⪳",
        pre: "⪯",
        prec: "≺",
        precapprox: "⪷",
        preccurlyeq: "≼",
        Precedes: "≺",
        PrecedesEqual: "⪯",
        PrecedesSlantEqual: "≼",
        PrecedesTilde: "≾",
        preceq: "⪯",
        precnapprox: "⪹",
        precneqq: "⪵",
        precnsim: "⋨",
        precsim: "≾",
        Prime: "″",
        prime: "′",
        primes: "ℙ",
        prnap: "⪹",
        prnE: "⪵",
        prnsim: "⋨",
        prod: "∏",
        Product: "∏",
        profalar: "⌮",
        profline: "⌒",
        profsurf: "⌓",
        prop: "∝",
        Proportion: "∷",
        Proportional: "∝",
        propto: "∝",
        prsim: "≾",
        prurel: "⊰",
        Pscr: "𝒫",
        pscr: "𝓅",
        Psi: "Ψ",
        psi: "ψ",
        puncsp: " ",
        Qfr: "𝔔",
        qfr: "𝔮",
        qint: "⨌",
        Qopf: "ℚ",
        qopf: "𝕢",
        qprime: "⁗",
        Qscr: "𝒬",
        qscr: "𝓆",
        quaternions: "ℍ",
        quatint: "⨖",
        quest: "?",
        questeq: "≟",
        QUOT: '"',
        quot: '"',
        rAarr: "⇛",
        race: "∽̱",
        Racute: "Ŕ",
        racute: "ŕ",
        radic: "√",
        raemptyv: "⦳",
        Rang: "⟫",
        rang: "⟩",
        rangd: "⦒",
        range: "⦥",
        rangle: "⟩",
        raquo: "»",
        Rarr: "↠",
        rArr: "⇒",
        rarr: "→",
        rarrap: "⥵",
        rarrb: "⇥",
        rarrbfs: "⤠",
        rarrc: "⤳",
        rarrfs: "⤞",
        rarrhk: "↪",
        rarrlp: "↬",
        rarrpl: "⥅",
        rarrsim: "⥴",
        Rarrtl: "⤖",
        rarrtl: "↣",
        rarrw: "↝",
        rAtail: "⤜",
        ratail: "⤚",
        ratio: "∶",
        rationals: "ℚ",
        RBarr: "⤐",
        rBarr: "⤏",
        rbarr: "⤍",
        rbbrk: "❳",
        rbrace: "}",
        rbrack: "]",
        rbrke: "⦌",
        rbrksld: "⦎",
        rbrkslu: "⦐",
        Rcaron: "Ř",
        rcaron: "ř",
        Rcedil: "Ŗ",
        rcedil: "ŗ",
        rceil: "⌉",
        rcub: "}",
        Rcy: "Р",
        rcy: "р",
        rdca: "⤷",
        rdldhar: "⥩",
        rdquo: "”",
        rdquor: "”",
        rdsh: "↳",
        Re: "ℜ",
        real: "ℜ",
        realine: "ℛ",
        realpart: "ℜ",
        reals: "ℝ",
        rect: "▭",
        REG: "®",
        reg: "®",
        ReverseElement: "∋",
        ReverseEquilibrium: "⇋",
        ReverseUpEquilibrium: "⥯",
        rfisht: "⥽",
        rfloor: "⌋",
        Rfr: "ℜ",
        rfr: "𝔯",
        rHar: "⥤",
        rhard: "⇁",
        rharu: "⇀",
        rharul: "⥬",
        Rho: "Ρ",
        rho: "ρ",
        rhov: "ϱ",
        RightAngleBracket: "⟩",
        RightArrow: "→",
        Rightarrow: "⇒",
        rightarrow: "→",
        RightArrowBar: "⇥",
        RightArrowLeftArrow: "⇄",
        rightarrowtail: "↣",
        RightCeiling: "⌉",
        RightDoubleBracket: "⟧",
        RightDownTeeVector: "⥝",
        RightDownVector: "⇂",
        RightDownVectorBar: "⥕",
        RightFloor: "⌋",
        rightharpoondown: "⇁",
        rightharpoonup: "⇀",
        rightleftarrows: "⇄",
        rightleftharpoons: "⇌",
        rightrightarrows: "⇉",
        rightsquigarrow: "↝",
        RightTee: "⊢",
        RightTeeArrow: "↦",
        RightTeeVector: "⥛",
        rightthreetimes: "⋌",
        RightTriangle: "⊳",
        RightTriangleBar: "⧐",
        RightTriangleEqual: "⊵",
        RightUpDownVector: "⥏",
        RightUpTeeVector: "⥜",
        RightUpVector: "↾",
        RightUpVectorBar: "⥔",
        RightVector: "⇀",
        RightVectorBar: "⥓",
        ring: "˚",
        risingdotseq: "≓",
        rlarr: "⇄",
        rlhar: "⇌",
        rlm: "‏",
        rmoust: "⎱",
        rmoustache: "⎱",
        rnmid: "⫮",
        roang: "⟭",
        roarr: "⇾",
        robrk: "⟧",
        ropar: "⦆",
        Ropf: "ℝ",
        ropf: "𝕣",
        roplus: "⨮",
        rotimes: "⨵",
        RoundImplies: "⥰",
        rpar: ")",
        rpargt: "⦔",
        rppolint: "⨒",
        rrarr: "⇉",
        Rrightarrow: "⇛",
        rsaquo: "›",
        Rscr: "ℛ",
        rscr: "𝓇",
        Rsh: "↱",
        rsh: "↱",
        rsqb: "]",
        rsquo: "’",
        rsquor: "’",
        rthree: "⋌",
        rtimes: "⋊",
        rtri: "▹",
        rtrie: "⊵",
        rtrif: "▸",
        rtriltri: "⧎",
        RuleDelayed: "⧴",
        ruluhar: "⥨",
        rx: "℞",
        Sacute: "Ś",
        sacute: "ś",
        sbquo: "‚",
        Sc: "⪼",
        sc: "≻",
        scap: "⪸",
        Scaron: "Š",
        scaron: "š",
        sccue: "≽",
        scE: "⪴",
        sce: "⪰",
        Scedil: "Ş",
        scedil: "ş",
        Scirc: "Ŝ",
        scirc: "ŝ",
        scnap: "⪺",
        scnE: "⪶",
        scnsim: "⋩",
        scpolint: "⨓",
        scsim: "≿",
        Scy: "С",
        scy: "с",
        sdot: "⋅",
        sdotb: "⊡",
        sdote: "⩦",
        searhk: "⤥",
        seArr: "⇘",
        searr: "↘",
        searrow: "↘",
        sect: "§",
        semi: ";",
        seswar: "⤩",
        setminus: "∖",
        setmn: "∖",
        sext: "✶",
        Sfr: "𝔖",
        sfr: "𝔰",
        sfrown: "⌢",
        sharp: "♯",
        SHCHcy: "Щ",
        shchcy: "щ",
        SHcy: "Ш",
        shcy: "ш",
        ShortDownArrow: "↓",
        ShortLeftArrow: "←",
        shortmid: "∣",
        shortparallel: "∥",
        ShortRightArrow: "→",
        ShortUpArrow: "↑",
        shy: "­",
        Sigma: "Σ",
        sigma: "σ",
        sigmaf: "ς",
        sigmav: "ς",
        sim: "∼",
        simdot: "⩪",
        sime: "≃",
        simeq: "≃",
        simg: "⪞",
        simgE: "⪠",
        siml: "⪝",
        simlE: "⪟",
        simne: "≆",
        simplus: "⨤",
        simrarr: "⥲",
        slarr: "←",
        SmallCircle: "∘",
        smallsetminus: "∖",
        smashp: "⨳",
        smeparsl: "⧤",
        smid: "∣",
        smile: "⌣",
        smt: "⪪",
        smte: "⪬",
        smtes: "⪬︀",
        SOFTcy: "Ь",
        softcy: "ь",
        sol: "/",
        solb: "⧄",
        solbar: "⌿",
        Sopf: "𝕊",
        sopf: "𝕤",
        spades: "♠",
        spadesuit: "♠",
        spar: "∥",
        sqcap: "⊓",
        sqcaps: "⊓︀",
        sqcup: "⊔",
        sqcups: "⊔︀",
        Sqrt: "√",
        sqsub: "⊏",
        sqsube: "⊑",
        sqsubset: "⊏",
        sqsubseteq: "⊑",
        sqsup: "⊐",
        sqsupe: "⊒",
        sqsupset: "⊐",
        sqsupseteq: "⊒",
        squ: "□",
        Square: "□",
        square: "□",
        SquareIntersection: "⊓",
        SquareSubset: "⊏",
        SquareSubsetEqual: "⊑",
        SquareSuperset: "⊐",
        SquareSupersetEqual: "⊒",
        SquareUnion: "⊔",
        squarf: "▪",
        squf: "▪",
        srarr: "→",
        Sscr: "𝒮",
        sscr: "𝓈",
        ssetmn: "∖",
        ssmile: "⌣",
        sstarf: "⋆",
        Star: "⋆",
        star: "☆",
        starf: "★",
        straightepsilon: "ϵ",
        straightphi: "ϕ",
        strns: "¯",
        Sub: "⋐",
        sub: "⊂",
        subdot: "⪽",
        subE: "⫅",
        sube: "⊆",
        subedot: "⫃",
        submult: "⫁",
        subnE: "⫋",
        subne: "⊊",
        subplus: "⪿",
        subrarr: "⥹",
        Subset: "⋐",
        subset: "⊂",
        subseteq: "⊆",
        subseteqq: "⫅",
        SubsetEqual: "⊆",
        subsetneq: "⊊",
        subsetneqq: "⫋",
        subsim: "⫇",
        subsub: "⫕",
        subsup: "⫓",
        succ: "≻",
        succapprox: "⪸",
        succcurlyeq: "≽",
        Succeeds: "≻",
        SucceedsEqual: "⪰",
        SucceedsSlantEqual: "≽",
        SucceedsTilde: "≿",
        succeq: "⪰",
        succnapprox: "⪺",
        succneqq: "⪶",
        succnsim: "⋩",
        succsim: "≿",
        SuchThat: "∋",
        Sum: "∑",
        sum: "∑",
        sung: "♪",
        Sup: "⋑",
        sup: "⊃",
        sup1: "¹",
        sup2: "²",
        sup3: "³",
        supdot: "⪾",
        supdsub: "⫘",
        supE: "⫆",
        supe: "⊇",
        supedot: "⫄",
        Superset: "⊃",
        SupersetEqual: "⊇",
        suphsol: "⟉",
        suphsub: "⫗",
        suplarr: "⥻",
        supmult: "⫂",
        supnE: "⫌",
        supne: "⊋",
        supplus: "⫀",
        Supset: "⋑",
        supset: "⊃",
        supseteq: "⊇",
        supseteqq: "⫆",
        supsetneq: "⊋",
        supsetneqq: "⫌",
        supsim: "⫈",
        supsub: "⫔",
        supsup: "⫖",
        swarhk: "⤦",
        swArr: "⇙",
        swarr: "↙",
        swarrow: "↙",
        swnwar: "⤪",
        szlig: "ß",
        Tab: "	",
        target: "⌖",
        Tau: "Τ",
        tau: "τ",
        tbrk: "⎴",
        Tcaron: "Ť",
        tcaron: "ť",
        Tcedil: "Ţ",
        tcedil: "ţ",
        Tcy: "Т",
        tcy: "т",
        tdot: "⃛",
        telrec: "⌕",
        Tfr: "𝔗",
        tfr: "𝔱",
        there4: "∴",
        Therefore: "∴",
        therefore: "∴",
        Theta: "Θ",
        theta: "θ",
        thetasym: "ϑ",
        thetav: "ϑ",
        thickapprox: "≈",
        thicksim: "∼",
        ThickSpace: "  ",
        thinsp: " ",
        ThinSpace: " ",
        thkap: "≈",
        thksim: "∼",
        THORN: "Þ",
        thorn: "þ",
        Tilde: "∼",
        tilde: "˜",
        TildeEqual: "≃",
        TildeFullEqual: "≅",
        TildeTilde: "≈",
        times: "×",
        timesb: "⊠",
        timesbar: "⨱",
        timesd: "⨰",
        tint: "∭",
        toea: "⤨",
        top: "⊤",
        topbot: "⌶",
        topcir: "⫱",
        Topf: "𝕋",
        topf: "𝕥",
        topfork: "⫚",
        tosa: "⤩",
        tprime: "‴",
        TRADE: "™",
        trade: "™",
        triangle: "▵",
        triangledown: "▿",
        triangleleft: "◃",
        trianglelefteq: "⊴",
        triangleq: "≜",
        triangleright: "▹",
        trianglerighteq: "⊵",
        tridot: "◬",
        trie: "≜",
        triminus: "⨺",
        TripleDot: "⃛",
        triplus: "⨹",
        trisb: "⧍",
        tritime: "⨻",
        trpezium: "⏢",
        Tscr: "𝒯",
        tscr: "𝓉",
        TScy: "Ц",
        tscy: "ц",
        TSHcy: "Ћ",
        tshcy: "ћ",
        Tstrok: "Ŧ",
        tstrok: "ŧ",
        twixt: "≬",
        twoheadleftarrow: "↞",
        twoheadrightarrow: "↠",
        Uacute: "Ú",
        uacute: "ú",
        Uarr: "↟",
        uArr: "⇑",
        uarr: "↑",
        Uarrocir: "⥉",
        Ubrcy: "Ў",
        ubrcy: "ў",
        Ubreve: "Ŭ",
        ubreve: "ŭ",
        Ucirc: "Û",
        ucirc: "û",
        Ucy: "У",
        ucy: "у",
        udarr: "⇅",
        Udblac: "Ű",
        udblac: "ű",
        udhar: "⥮",
        ufisht: "⥾",
        Ufr: "𝔘",
        ufr: "𝔲",
        Ugrave: "Ù",
        ugrave: "ù",
        uHar: "⥣",
        uharl: "↿",
        uharr: "↾",
        uhblk: "▀",
        ulcorn: "⌜",
        ulcorner: "⌜",
        ulcrop: "⌏",
        ultri: "◸",
        Umacr: "Ū",
        umacr: "ū",
        uml: "¨",
        UnderBar: "_",
        UnderBrace: "⏟",
        UnderBracket: "⎵",
        UnderParenthesis: "⏝",
        Union: "⋃",
        UnionPlus: "⊎",
        Uogon: "Ų",
        uogon: "ų",
        Uopf: "𝕌",
        uopf: "𝕦",
        UpArrow: "↑",
        Uparrow: "⇑",
        uparrow: "↑",
        UpArrowBar: "⤒",
        UpArrowDownArrow: "⇅",
        UpDownArrow: "↕",
        Updownarrow: "⇕",
        updownarrow: "↕",
        UpEquilibrium: "⥮",
        upharpoonleft: "↿",
        upharpoonright: "↾",
        uplus: "⊎",
        UpperLeftArrow: "↖",
        UpperRightArrow: "↗",
        Upsi: "ϒ",
        upsi: "υ",
        upsih: "ϒ",
        Upsilon: "Υ",
        upsilon: "υ",
        UpTee: "⊥",
        UpTeeArrow: "↥",
        upuparrows: "⇈",
        urcorn: "⌝",
        urcorner: "⌝",
        urcrop: "⌎",
        Uring: "Ů",
        uring: "ů",
        urtri: "◹",
        Uscr: "𝒰",
        uscr: "𝓊",
        utdot: "⋰",
        Utilde: "Ũ",
        utilde: "ũ",
        utri: "▵",
        utrif: "▴",
        uuarr: "⇈",
        Uuml: "Ü",
        uuml: "ü",
        uwangle: "⦧",
        vangrt: "⦜",
        varepsilon: "ϵ",
        varkappa: "ϰ",
        varnothing: "∅",
        varphi: "ϕ",
        varpi: "ϖ",
        varpropto: "∝",
        vArr: "⇕",
        varr: "↕",
        varrho: "ϱ",
        varsigma: "ς",
        varsubsetneq: "⊊︀",
        varsubsetneqq: "⫋︀",
        varsupsetneq: "⊋︀",
        varsupsetneqq: "⫌︀",
        vartheta: "ϑ",
        vartriangleleft: "⊲",
        vartriangleright: "⊳",
        Vbar: "⫫",
        vBar: "⫨",
        vBarv: "⫩",
        Vcy: "В",
        vcy: "в",
        VDash: "⊫",
        Vdash: "⊩",
        vDash: "⊨",
        vdash: "⊢",
        Vdashl: "⫦",
        Vee: "⋁",
        vee: "∨",
        veebar: "⊻",
        veeeq: "≚",
        vellip: "⋮",
        Verbar: "‖",
        verbar: "|",
        Vert: "‖",
        vert: "|",
        VerticalBar: "∣",
        VerticalLine: "|",
        VerticalSeparator: "❘",
        VerticalTilde: "≀",
        VeryThinSpace: " ",
        Vfr: "𝔙",
        vfr: "𝔳",
        vltri: "⊲",
        vnsub: "⊂⃒",
        vnsup: "⊃⃒",
        Vopf: "𝕍",
        vopf: "𝕧",
        vprop: "∝",
        vrtri: "⊳",
        Vscr: "𝒱",
        vscr: "𝓋",
        vsubnE: "⫋︀",
        vsubne: "⊊︀",
        vsupnE: "⫌︀",
        vsupne: "⊋︀",
        Vvdash: "⊪",
        vzigzag: "⦚",
        Wcirc: "Ŵ",
        wcirc: "ŵ",
        wedbar: "⩟",
        Wedge: "⋀",
        wedge: "∧",
        wedgeq: "≙",
        weierp: "℘",
        Wfr: "𝔚",
        wfr: "𝔴",
        Wopf: "𝕎",
        wopf: "𝕨",
        wp: "℘",
        wr: "≀",
        wreath: "≀",
        Wscr: "𝒲",
        wscr: "𝓌",
        xcap: "⋂",
        xcirc: "◯",
        xcup: "⋃",
        xdtri: "▽",
        Xfr: "𝔛",
        xfr: "𝔵",
        xhArr: "⟺",
        xharr: "⟷",
        Xi: "Ξ",
        xi: "ξ",
        xlArr: "⟸",
        xlarr: "⟵",
        xmap: "⟼",
        xnis: "⋻",
        xodot: "⨀",
        Xopf: "𝕏",
        xopf: "𝕩",
        xoplus: "⨁",
        xotime: "⨂",
        xrArr: "⟹",
        xrarr: "⟶",
        Xscr: "𝒳",
        xscr: "𝓍",
        xsqcup: "⨆",
        xuplus: "⨄",
        xutri: "△",
        xvee: "⋁",
        xwedge: "⋀",
        Yacute: "Ý",
        yacute: "ý",
        YAcy: "Я",
        yacy: "я",
        Ycirc: "Ŷ",
        ycirc: "ŷ",
        Ycy: "Ы",
        ycy: "ы",
        yen: "¥",
        Yfr: "𝔜",
        yfr: "𝔶",
        YIcy: "Ї",
        yicy: "ї",
        Yopf: "𝕐",
        yopf: "𝕪",
        Yscr: "𝒴",
        yscr: "𝓎",
        YUcy: "Ю",
        yucy: "ю",
        Yuml: "Ÿ",
        yuml: "ÿ",
        Zacute: "Ź",
        zacute: "ź",
        Zcaron: "Ž",
        zcaron: "ž",
        Zcy: "З",
        zcy: "з",
        Zdot: "Ż",
        zdot: "ż",
        zeetrf: "ℨ",
        ZeroWidthSpace: "​",
        Zeta: "Ζ",
        zeta: "ζ",
        Zfr: "ℨ",
        zfr: "𝔷",
        ZHcy: "Ж",
        zhcy: "ж",
        zigrarr: "⇝",
        Zopf: "ℤ",
        zopf: "𝕫",
        Zscr: "𝒵",
        zscr: "𝓏",
        zwj: "‍",
        zwnj: "‌"
      });
      exports.entityMap = exports.HTML_ENTITIES;
    }
  });

  // node_modules/@xmldom/xmldom/lib/sax.js
  var require_sax = __commonJS({
    "node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
      "use strict";
      var conventions = require_conventions(), g = require_grammar(), errors = require_errors(), isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement, isHTMLMimeType = conventions.isHTMLMimeType, isHTMLRawTextElement = conventions.isHTMLRawTextElement, hasOwn = conventions.hasOwn, NAMESPACE = conventions.NAMESPACE, ParseError = errors.ParseError, DOMException = errors.DOMException, S_TAG = 0, S_ATTR = 1, S_ATTR_SPACE = 2, S_EQ = 3, S_ATTR_NOQUOT_VALUE = 4, S_ATTR_END = 5, S_TAG_SPACE = 6, S_TAG_CLOSE = 7;
      function XMLReader() {
      }
      XMLReader.prototype = {
        parse: function(source, defaultNSMap, entityMap) {
          var domBuilder = this.domBuilder;
          domBuilder.startDocument(), _copy(defaultNSMap, defaultNSMap = /* @__PURE__ */ Object.create(null)), parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler), domBuilder.endDocument();
        }
      };
      var ENTITY_REG = /&#?\w+;?/g;
      function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
        var isHTML = isHTMLMimeType(domBuilder.mimeType);
        source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0 && errorHandler.warning("Unicode replacement character detected, source encoding issues?");
        function fixedFromCharCode(code) {
          if (code > 65535) {
            code -= 65536;
            var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
            return String.fromCharCode(surrogate1, surrogate2);
          } else
            return String.fromCharCode(code);
        }
        function entityReplacer(a2) {
          var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
          if (!isHTML && complete !== a2)
            return errorHandler.error("EntityRef: expecting ;"), a2;
          var match = g.Reference.exec(complete);
          if (!match || match[0].length !== complete.length)
            return errorHandler.error("entity not matching Reference production: " + a2), a2;
          var k = complete.slice(1, -1);
          return hasOwn(entityMap, k) ? entityMap[k] : k.charAt(0) === "#" ? fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x"))) : (errorHandler.error("entity not found:" + a2), a2);
        }
        function appendText(end2) {
          if (end2 > start) {
            var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
            locator && position(start), domBuilder.characters(xt, 0, end2 - start), start = end2;
          }
        }
        var lineStart = 0, lineEnd = 0, linePattern = /\r\n?|\n|$/g, locator = domBuilder.locator;
        function position(p, m) {
          for (; p >= lineEnd && (m = linePattern.exec(source)); )
            lineStart = lineEnd, lineEnd = m.index + m[0].length, locator.lineNumber++;
          locator.columnNumber = p - lineStart + 1;
        }
        for (var parseStack = [{ currentNSMap: defaultNSMapCopy }], unclosedTags = [], start = 0; ; ) {
          try {
            var tagStart = source.indexOf("<", start);
            if (tagStart < 0) {
              if (!isHTML && unclosedTags.length > 0)
                return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
              if (!source.substring(start).match(/^\s*$/)) {
                var doc = domBuilder.doc, text = doc.createTextNode(source.substring(start));
                if (doc.documentElement)
                  return errorHandler.error("Extra content at the end of the document");
                doc.appendChild(text), domBuilder.currentElement = text;
              }
              return;
            }
            if (tagStart > start) {
              var fromSource = source.substring(start, tagStart);
              !isHTML && unclosedTags.length === 0 && (fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), ""), fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'")), appendText(tagStart);
            }
            switch (source.charAt(tagStart + 1)) {
              case "/":
                var end = source.indexOf(">", tagStart + 2), tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : void 0);
                if (!tagNameRaw)
                  return errorHandler.fatalError("end tag name missing");
                var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
                if (!tagNameMatch)
                  return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
                if (!domBuilder.currentElement && !domBuilder.doc.documentElement)
                  return;
                var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
                if (currentTagName !== tagNameMatch[1]) {
                  var tagNameLower = tagNameMatch[1].toLowerCase();
                  if (!isHTML || currentTagName.toLowerCase() !== tagNameLower)
                    return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
                }
                var config = parseStack.pop();
                unclosedTags.pop();
                var localNSMap = config.localNSMap;
                if (domBuilder.endElement(config.uri, config.localName, currentTagName), localNSMap)
                  for (var prefix in localNSMap)
                    hasOwn(localNSMap, prefix) && domBuilder.endPrefixMapping(prefix);
                end++;
                break;
              // end element
              case "?":
                locator && position(tagStart), end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
                break;
              case "!":
                locator && position(tagStart), end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
                break;
              default:
                locator && position(tagStart);
                var el = new ElementAttributes(), currentNSMap = parseStack[parseStack.length - 1].currentNSMap, end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML), len = el.length;
                if (el.closed || (isHTML && conventions.isHTMLVoidElement(el.tagName) ? el.closed = !0 : unclosedTags.push(el.tagName)), locator && len) {
                  for (var locator2 = copyLocator(locator, {}), i = 0; i < len; i++) {
                    var a = el[i];
                    position(a.offset), a.locator = copyLocator(locator, {});
                  }
                  domBuilder.locator = locator2, appendElement(el, domBuilder, currentNSMap) && parseStack.push(el), domBuilder.locator = locator;
                } else
                  appendElement(el, domBuilder, currentNSMap) && parseStack.push(el);
                isHTML && !el.closed ? end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder) : end++;
            }
          } catch (e) {
            if (e instanceof ParseError)
              throw e;
            if (e instanceof DOMException)
              throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
            errorHandler.error("element parse error: " + e), end = -1;
          }
          end > start ? start = end : appendText(Math.max(tagStart, start) + 1);
        }
      }
      function copyLocator(f, t) {
        return t.lineNumber = f.lineNumber, t.columnNumber = f.columnNumber, t;
      }
      function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
        function addAttribute(qname, value2, startIndex) {
          if (hasOwn(el.attributeNames, qname))
            return errorHandler.fatalError("Attribute " + qname + " redefined");
          if (!isHTML && value2.indexOf("<") >= 0)
            return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
          el.addValue(
            qname,
            // @see https://www.w3.org/TR/xml/#AVNormalize
            // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
            // - recursive replacement of (DTD) entity references
            // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
            value2.replace(/[\t\n\r]/g, " ").replace(ENTITY_REG, entityReplacer),
            startIndex
          );
        }
        for (var attrName, value, p = ++start, s = S_TAG; ; ) {
          var c = source.charAt(p);
          switch (c) {
            case "=":
              if (s === S_ATTR)
                attrName = source.slice(start, p), s = S_EQ;
              else if (s === S_ATTR_SPACE)
                s = S_EQ;
              else
                throw new Error("attribute equal must after attrName");
              break;
            case "'":
            case '"':
              if (s === S_EQ || s === S_ATTR)
                if (s === S_ATTR && (errorHandler.warning('attribute value must after "="'), attrName = source.slice(start, p)), start = p + 1, p = source.indexOf(c, start), p > 0)
                  value = source.slice(start, p), addAttribute(attrName, value, start - 1), s = S_ATTR_END;
                else
                  throw new Error("attribute value no end '" + c + "' match");
              else if (s == S_ATTR_NOQUOT_VALUE)
                value = source.slice(start, p), addAttribute(attrName, value, start), errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!"), start = p + 1, s = S_ATTR_END;
              else
                throw new Error('attribute value must after "="');
              break;
            case "/":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  s = S_TAG_CLOSE, el.closed = !0;
                case S_ATTR_NOQUOT_VALUE:
                case S_ATTR:
                  break;
                case S_ATTR_SPACE:
                  el.closed = !0;
                  break;
                //case S_EQ:
                default:
                  throw new Error("attribute invalid close char('/')");
              }
              break;
            case "":
              return errorHandler.error("unexpected end of input"), s == S_TAG && el.setTagName(source.slice(start, p)), p;
            case ">":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  break;
                //normal
                case S_ATTR_NOQUOT_VALUE:
                //Compatible state
                case S_ATTR:
                  value = source.slice(start, p), value.slice(-1) === "/" && (el.closed = !0, value = value.slice(0, -1));
                case S_ATTR_SPACE:
                  s === S_ATTR_SPACE && (value = attrName), s == S_ATTR_NOQUOT_VALUE ? (errorHandler.warning('attribute "' + value + '" missed quot(")!'), addAttribute(attrName, value, start)) : (isHTML || errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!'), addAttribute(value, value, start));
                  break;
                case S_EQ:
                  if (!isHTML)
                    return errorHandler.fatalError(`AttValue: ' or " expected`);
              }
              return p;
            /*xml space '\x20' | #x9 | #xD | #xA; */
            case "":
              c = " ";
            default:
              if (c <= " ")
                switch (s) {
                  case S_TAG:
                    el.setTagName(source.slice(start, p)), s = S_TAG_SPACE;
                    break;
                  case S_ATTR:
                    attrName = source.slice(start, p), s = S_ATTR_SPACE;
                    break;
                  case S_ATTR_NOQUOT_VALUE:
                    var value = source.slice(start, p);
                    errorHandler.warning('attribute "' + value + '" missed quot(")!!'), addAttribute(attrName, value, start);
                  case S_ATTR_END:
                    s = S_TAG_SPACE;
                    break;
                }
              else
                switch (s) {
                  //case S_TAG:void();break;
                  //case S_ATTR:void();break;
                  //case S_ATTR_NOQUOT_VALUE:void();break;
                  case S_ATTR_SPACE:
                    isHTML || errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!'), addAttribute(attrName, attrName, start), start = p, s = S_ATTR;
                    break;
                  case S_ATTR_END:
                    errorHandler.warning('attribute space is required"' + attrName + '"!!');
                  case S_TAG_SPACE:
                    s = S_ATTR, start = p;
                    break;
                  case S_EQ:
                    s = S_ATTR_NOQUOT_VALUE, start = p;
                    break;
                  case S_TAG_CLOSE:
                    throw new Error("elements closed character '/' and '>' must be connected to");
                }
          }
          p++;
        }
      }
      function appendElement(el, domBuilder, currentNSMap) {
        for (var tagName = el.tagName, localNSMap = null, i = el.length; i--; ) {
          var a = el[i], qName = a.qName, value = a.value, nsp = qName.indexOf(":");
          if (nsp > 0)
            var prefix = a.prefix = qName.slice(0, nsp), localName = qName.slice(nsp + 1), nsPrefix = prefix === "xmlns" && localName;
          else
            localName = qName, prefix = null, nsPrefix = qName === "xmlns" && "";
          a.localName = localName, nsPrefix !== !1 && (localNSMap == null && (localNSMap = /* @__PURE__ */ Object.create(null), _copy(currentNSMap, currentNSMap = /* @__PURE__ */ Object.create(null))), currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value, a.uri = NAMESPACE.XMLNS, domBuilder.startPrefixMapping(nsPrefix, value));
        }
        for (var i = el.length; i--; )
          a = el[i], a.prefix && (a.prefix === "xml" && (a.uri = NAMESPACE.XML), a.prefix !== "xmlns" && (a.uri = currentNSMap[a.prefix]));
        var nsp = tagName.indexOf(":");
        nsp > 0 ? (prefix = el.prefix = tagName.slice(0, nsp), localName = el.localName = tagName.slice(nsp + 1)) : (prefix = null, localName = el.localName = tagName);
        var ns2 = el.uri = currentNSMap[prefix || ""];
        if (domBuilder.startElement(ns2, localName, tagName, el), el.closed) {
          if (domBuilder.endElement(ns2, localName, tagName), localNSMap)
            for (prefix in localNSMap)
              hasOwn(localNSMap, prefix) && domBuilder.endPrefixMapping(prefix);
        } else
          return el.currentNSMap = currentNSMap, el.localNSMap = localNSMap, !0;
      }
      function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
        var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
        if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
          var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd), text = source.substring(elStartEnd + 1, elEndStart);
          return isEscapableRaw && (text = text.replace(ENTITY_REG, entityReplacer)), domBuilder.characters(text, 0, text.length), elEndStart;
        }
        return elStartEnd + 1;
      }
      function _copy(source, target) {
        for (var n in source)
          hasOwn(source, n) && (target[n] = source[n]);
      }
      function parseUtils(source, start) {
        var index = start;
        function char(n) {
          return n = n || 0, source.charAt(index + n);
        }
        function skip(n) {
          n = n || 1, index += n;
        }
        function skipBlanks() {
          for (var blanks = 0; index < source.length; ) {
            var c = char();
            if (c !== " " && c !== `
` && c !== "	" && c !== "\r")
              return blanks;
            blanks++, skip();
          }
          return -1;
        }
        function substringFromIndex() {
          return source.substring(index);
        }
        function substringStartsWith(text) {
          return source.substring(index, index + text.length) === text;
        }
        function substringStartsWithCaseInsensitive(text) {
          return source.substring(index, index + text.length).toUpperCase() === text.toUpperCase();
        }
        function getMatch(args) {
          var expr = g.reg("^", args), match = expr.exec(substringFromIndex());
          return match ? (skip(match[0].length), match[0]) : null;
        }
        return {
          char,
          getIndex: function() {
            return index;
          },
          getMatch,
          getSource: function() {
            return source;
          },
          skip,
          skipBlanks,
          substringFromIndex,
          substringStartsWith,
          substringStartsWithCaseInsensitive
        };
      }
      function parseDoctypeInternalSubset(p, errorHandler) {
        function parsePI(p2, errorHandler2) {
          var match = g.PI.exec(p2.substringFromIndex());
          return match ? match[1].toLowerCase() === "xml" ? errorHandler2.fatalError(
            "xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex()
          ) : (p2.skip(match[0].length), match[0]) : errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
        }
        var source = p.getSource();
        if (p.char() === "[") {
          p.skip(1);
          for (var intSubsetStart = p.getIndex(); p.getIndex() < source.length; ) {
            if (p.skipBlanks(), p.char() === "]") {
              var internalSubset = source.substring(intSubsetStart, p.getIndex());
              return p.skip(1), internalSubset;
            }
            var current = null;
            if (p.char() === "<" && p.char(1) === "!")
              switch (p.char(2)) {
                case "E":
                  p.char(3) === "L" ? current = p.getMatch(g.elementdecl) : p.char(3) === "N" && (current = p.getMatch(g.EntityDecl));
                  break;
                case "A":
                  current = p.getMatch(g.AttlistDecl);
                  break;
                case "N":
                  current = p.getMatch(g.NotationDecl);
                  break;
                case "-":
                  current = p.getMatch(g.Comment);
                  break;
              }
            else if (p.char() === "<" && p.char(1) === "?")
              current = parsePI(p, errorHandler);
            else if (p.char() === "%")
              current = p.getMatch(g.PEReference);
            else
              return errorHandler.fatalError("Error detected in Markup declaration");
            if (!current)
              return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
          }
          return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
        }
      }
      function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
        var p = parseUtils(source, start);
        switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
          case "-":
            var comment = p.getMatch(g.Comment);
            return comment ? (domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length), p.getIndex()) : errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
          case "[":
            var cdata = p.getMatch(g.CDSect);
            return cdata ? !isHTML && !domBuilder.currentElement ? errorHandler.fatalError("CDATA outside of element") : (domBuilder.startCDATA(), domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length), domBuilder.endCDATA(), p.getIndex()) : errorHandler.fatalError("Invalid CDATA starting at position " + start);
          case "D": {
            if (domBuilder.doc && domBuilder.doc.documentElement)
              return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
            if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START))
              return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
            if (p.skip(g.DOCTYPE_DECL_START.length), p.skipBlanks() < 1)
              return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
            var doctype = {
              name: void 0,
              publicId: void 0,
              systemId: void 0,
              internalSubset: void 0
            };
            if (doctype.name = p.getMatch(g.Name), !doctype.name)
              return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
            if (isHTML && doctype.name.toLowerCase() !== "html" && errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex()), p.skipBlanks(), p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
              var match = g.ExternalID_match.exec(p.substringFromIndex());
              if (!match)
                return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
              match.groups.SystemLiteralOnly !== void 0 ? doctype.systemId = match.groups.SystemLiteralOnly : (doctype.systemId = match.groups.SystemLiteral, doctype.publicId = match.groups.PubidLiteral), p.skip(match[0].length);
            } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
              if (p.skip(g.SYSTEM.length), p.skipBlanks() < 1)
                return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
              if (doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral), !doctype.systemId)
                return errorHandler.fatalError(
                  "Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex()
                );
            }
            return isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId) && errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex()), isHTML || (p.skipBlanks(), doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler)), p.skipBlanks(), p.char() !== ">" ? errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex()) : (p.skip(1), domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset), domBuilder.endDTD(), p.getIndex());
          }
          default:
            return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
        }
      }
      function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
        var match = source.substring(start).match(g.PI);
        if (!match)
          return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
        if (match[1].toLowerCase() === "xml") {
          if (start > 0)
            return errorHandler.fatalError(
              "processing instruction at position " + start + " is an xml declaration which is only at the start of the document"
            );
          if (!g.XMLDecl.test(source.substring(start)))
            return errorHandler.fatalError("xml declaration is not well-formed");
        }
        return domBuilder.processingInstruction(match[1], match[2]), start + match[0].length;
      }
      function ElementAttributes() {
        this.attributeNames = /* @__PURE__ */ Object.create(null);
      }
      ElementAttributes.prototype = {
        setTagName: function(tagName) {
          if (!g.QName_exact.test(tagName))
            throw new Error("invalid tagName:" + tagName);
          this.tagName = tagName;
        },
        addValue: function(qName, value, offset) {
          if (!g.QName_exact.test(qName))
            throw new Error("invalid attribute:" + qName);
          this.attributeNames[qName] = this.length, this[this.length++] = { qName, value, offset };
        },
        length: 0,
        getLocalName: function(i) {
          return this[i].localName;
        },
        getLocator: function(i) {
          return this[i].locator;
        },
        getQName: function(i) {
          return this[i].qName;
        },
        getURI: function(i) {
          return this[i].uri;
        },
        getValue: function(i) {
          return this[i].value;
        }
        //	,getIndex:function(uri, localName)){
        //		if(localName){
        //
        //		}else{
        //			var qName = uri
        //		}
        //	},
        //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
        //	getType:function(uri,localName){}
        //	getType:function(i){},
      };
      exports.XMLReader = XMLReader;
      exports.parseUtils = parseUtils;
      exports.parseDoctypeCommentOrCData = parseDoctypeCommentOrCData;
    }
  });

  // node_modules/@xmldom/xmldom/lib/dom-parser.js
  var require_dom_parser = __commonJS({
    "node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
      "use strict";
      var conventions = require_conventions(), dom = require_dom(), errors = require_errors(), entities = require_entities(), sax = require_sax(), DOMImplementation = dom.DOMImplementation, hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace, isHTMLMimeType = conventions.isHTMLMimeType, isValidMimeType = conventions.isValidMimeType, MIME_TYPE = conventions.MIME_TYPE, NAMESPACE = conventions.NAMESPACE, ParseError = errors.ParseError, XMLReader = sax.XMLReader;
      function normalizeLineEndings(input) {
        return input.replace(/\r[\n\u0085]/g, `
`).replace(/[\r\u0085\u2028\u2029]/g, `
`);
      }
      function DOMParser2(options) {
        if (options = options || {}, options.locator === void 0 && (options.locator = !0), this.assign = options.assign || conventions.assign, this.domHandler = options.domHandler || DOMHandler, this.onError = options.onError || options.errorHandler, options.errorHandler && typeof options.errorHandler != "function")
          throw new TypeError("errorHandler object is no longer supported, switch to onError!");
        options.errorHandler && options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this), this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings, this.locator = !!options.locator, this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), options.xmlns);
      }
      DOMParser2.prototype.parseFromString = function(source, mimeType) {
        if (!isValidMimeType(mimeType))
          throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
        var defaultNSMap = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns), entityMap = entities.XML_ENTITIES, defaultNamespace = defaultNSMap[""] || null;
        hasDefaultHTMLNamespace(mimeType) ? (entityMap = entities.HTML_ENTITIES, defaultNamespace = NAMESPACE.HTML) : mimeType === MIME_TYPE.XML_SVG_IMAGE && (defaultNamespace = NAMESPACE.SVG), defaultNSMap[""] = defaultNamespace, defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
        var domBuilder = new this.domHandler({
          mimeType,
          defaultNamespace,
          onError: this.onError
        }), locator = this.locator ? {} : void 0;
        this.locator && domBuilder.setDocumentLocator(locator);
        var sax2 = new XMLReader();
        sax2.errorHandler = domBuilder, sax2.domBuilder = domBuilder;
        var isXml = !conventions.isHTMLMimeType(mimeType);
        return isXml && typeof source != "string" && sax2.errorHandler.fatalError("source is not a string"), sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap), domBuilder.doc.documentElement || sax2.errorHandler.fatalError("missing root element"), domBuilder.doc;
      };
      function DOMHandler(options) {
        var opt = options || {};
        this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION, this.defaultNamespace = opt.defaultNamespace || null, this.cdata = !1, this.currentElement = void 0, this.doc = void 0, this.locator = void 0, this.onError = opt.onError;
      }
      function position(locator, node) {
        node.lineNumber = locator.lineNumber, node.columnNumber = locator.columnNumber;
      }
      DOMHandler.prototype = {
        /**
         * Either creates an XML or an HTML document and stores it under `this.doc`.
         * If it is an XML document, `this.defaultNamespace` is used to create it,
         * and it will not contain any `childNodes`.
         * If it is an HTML document, it will be created without any `childNodes`.
         *
         * @see http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
         */
        startDocument: function() {
          var impl = new DOMImplementation();
          this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(!1) : impl.createDocument(this.defaultNamespace, "");
        },
        startElement: function(namespaceURI, localName, qName, attrs) {
          var doc = this.doc, el = doc.createElementNS(namespaceURI, qName || localName), len = attrs.length;
          appendElement(this, el), this.currentElement = el, this.locator && position(this.locator, el);
          for (var i = 0; i < len; i++) {
            var namespaceURI = attrs.getURI(i), value = attrs.getValue(i), qName = attrs.getQName(i), attr = doc.createAttributeNS(namespaceURI, qName);
            this.locator && position(attrs.getLocator(i), attr), attr.value = attr.nodeValue = value, el.setAttributeNode(attr);
          }
        },
        endElement: function(namespaceURI, localName, qName) {
          this.currentElement = this.currentElement.parentNode;
        },
        startPrefixMapping: function(prefix, uri) {
        },
        endPrefixMapping: function(prefix) {
        },
        processingInstruction: function(target, data) {
          var ins = this.doc.createProcessingInstruction(target, data);
          this.locator && position(this.locator, ins), appendElement(this, ins);
        },
        ignorableWhitespace: function(ch, start, length) {
        },
        characters: function(chars, start, length) {
          if (chars = _toString.apply(this, arguments), chars) {
            if (this.cdata)
              var charNode = this.doc.createCDATASection(chars);
            else
              var charNode = this.doc.createTextNode(chars);
            this.currentElement ? this.currentElement.appendChild(charNode) : /^\s*$/.test(chars) && this.doc.appendChild(charNode), this.locator && position(this.locator, charNode);
          }
        },
        skippedEntity: function(name) {
        },
        endDocument: function() {
          this.doc.normalize();
        },
        /**
         * Stores the locator to be able to set the `columnNumber` and `lineNumber`
         * on the created DOM nodes.
         *
         * @param {Locator} locator
         */
        setDocumentLocator: function(locator) {
          locator && (locator.lineNumber = 0), this.locator = locator;
        },
        //LexicalHandler
        comment: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          var comm = this.doc.createComment(chars);
          this.locator && position(this.locator, comm), appendElement(this, comm);
        },
        startCDATA: function() {
          this.cdata = !0;
        },
        endCDATA: function() {
          this.cdata = !1;
        },
        startDTD: function(name, publicId, systemId, internalSubset) {
          var impl = this.doc.implementation;
          if (impl && impl.createDocumentType) {
            var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
            this.locator && position(this.locator, dt), appendElement(this, dt), this.doc.doctype = dt;
          }
        },
        reportError: function(level, message) {
          if (typeof this.onError == "function")
            try {
              this.onError(level, message, this);
            } catch (e) {
              throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
            }
          else
            console.error("[xmldom " + level + "]	" + message, _locator(this.locator));
        },
        /**
         * @see http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
         */
        warning: function(message) {
          this.reportError("warning", message);
        },
        error: function(message) {
          this.reportError("error", message);
        },
        /**
         * This function reports a fatal error and throws a ParseError.
         *
         * @param {string} message
         * - The message to be used for reporting and throwing the error.
         * @returns {never}
         * This function always throws an error and never returns a value.
         * @throws {ParseError}
         * Always throws a ParseError with the provided message.
         */
        fatalError: function(message) {
          throw this.reportError("fatalError", message), new ParseError(message, this.locator);
        }
      };
      function _locator(l) {
        if (l)
          return `
@#[line:` + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
      function _toString(chars, start, length) {
        return typeof chars == "string" ? chars.substr(start, length) : chars.length >= start + length || start ? new java.lang.String(chars, start, length) + "" : chars;
      }
      "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(
        /\w+/g,
        function(key) {
          DOMHandler.prototype[key] = function() {
            return null;
          };
        }
      );
      function appendElement(handler, node) {
        handler.currentElement ? handler.currentElement.appendChild(node) : handler.doc.appendChild(node);
      }
      function onErrorStopParsing(level) {
        if (level === "error") throw "onErrorStopParsing";
      }
      function onWarningStopParsing() {
        throw "onWarningStopParsing";
      }
      exports.__DOMHandler = DOMHandler;
      exports.DOMParser = DOMParser2;
      exports.normalizeLineEndings = normalizeLineEndings;
      exports.onErrorStopParsing = onErrorStopParsing;
      exports.onWarningStopParsing = onWarningStopParsing;
    }
  });

  // node_modules/@xmldom/xmldom/lib/index.js
  var require_lib = __commonJS({
    "node_modules/@xmldom/xmldom/lib/index.js"(exports) {
      "use strict";
      var conventions = require_conventions();
      exports.assign = conventions.assign;
      exports.hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
      exports.isHTMLMimeType = conventions.isHTMLMimeType;
      exports.isValidMimeType = conventions.isValidMimeType;
      exports.MIME_TYPE = conventions.MIME_TYPE;
      exports.NAMESPACE = conventions.NAMESPACE;
      var errors = require_errors();
      exports.DOMException = errors.DOMException;
      exports.DOMExceptionName = errors.DOMExceptionName;
      exports.ExceptionCode = errors.ExceptionCode;
      exports.ParseError = errors.ParseError;
      var dom = require_dom();
      exports.Attr = dom.Attr;
      exports.CDATASection = dom.CDATASection;
      exports.CharacterData = dom.CharacterData;
      exports.Comment = dom.Comment;
      exports.Document = dom.Document;
      exports.DocumentFragment = dom.DocumentFragment;
      exports.DocumentType = dom.DocumentType;
      exports.DOMImplementation = dom.DOMImplementation;
      exports.Element = dom.Element;
      exports.Entity = dom.Entity;
      exports.EntityReference = dom.EntityReference;
      exports.LiveNodeList = dom.LiveNodeList;
      exports.NamedNodeMap = dom.NamedNodeMap;
      exports.Node = dom.Node;
      exports.NodeList = dom.NodeList;
      exports.Notation = dom.Notation;
      exports.ProcessingInstruction = dom.ProcessingInstruction;
      exports.Text = dom.Text;
      exports.XMLSerializer = dom.XMLSerializer;
      var domParser = require_dom_parser();
      exports.DOMParser = domParser.DOMParser;
      exports.normalizeLineEndings = domParser.normalizeLineEndings;
      exports.onErrorStopParsing = domParser.onErrorStopParsing;
      exports.onWarningStopParsing = domParser.onWarningStopParsing;
    }
  });

  // src/common/relationship.ts
  function parseRelationships(root, xml) {
    return xml.elements(root).map((e) => ({
      id: xml.attr(e, "Id"),
      type: xml.attr(e, "Type"),
      target: xml.attr(e, "Target"),
      targetMode: xml.attr(e, "TargetMode")
    }));
  }

  // src/utils.ts
  function encloseFontFamily(fontFamily) {
    return /^[^"'].*\s.*[^"']$/.test(fontFamily) ? `'${fontFamily}'` : fontFamily;
  }
  function splitPath(path) {
    let si = path.lastIndexOf("/") + 1, folder = si == 0 ? "" : path.substring(0, si), fileName = si == 0 ? path : path.substring(si);
    return [folder, fileName];
  }
  function resolvePath(path, base) {
    try {
      let prefix = "http://docx/";
      return new URL(path, prefix + base).toString().substring(prefix.length);
    } catch {
      return `${base}${path}`;
    }
  }
  function keyBy(array, by) {
    return array.reduce((result, item) => (result[by(item)] = item, result), {});
  }
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = () => resolve(reader.result), reader.onerror = () => reject(), reader.readAsDataURL(blob);
    });
  }
  function clamp(val, min, max) {
    return min > val ? min : max < val ? max : val;
  }

  // src/document/common.ts
  var ns = {
    wordml: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    drawingml: "http://schemas.openxmlformats.org/drawingml/2006/main",
    picture: "http://schemas.openxmlformats.org/drawingml/2006/picture",
    wordprocessingCanvas: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
    wordprocessingGroup: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
    wordprocessingShape: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
    chart: "http://schemas.openxmlformats.org/drawingml/2006/chart",
    diagram: "http://schemas.openxmlformats.org/drawingml/2006/diagram",
    relationship: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    drawing2014: "http://schemas.microsoft.com/office/drawing/2014/main",
    ink2010: "http://schemas.microsoft.com/office/2010/ink",
    word2010: "http://schemas.microsoft.com/office/word/2010/wordml",
    compatibility: "http://schemas.openxmlformats.org/markup-compatibility/2006",
    math: "http://schemas.openxmlformats.org/officeDocument/2006/math"
  }, LengthUsage = {
    Dxa: { mul: 0.05, unit: "pt" },
    //twips
    SignedDxa: { mul: 0.05, unit: "pt" },
    //twips, can be negative
    Emu: { mul: 1 / 12700, unit: "pt" },
    FontSize: { mul: 0.5, unit: "pt" },
    SignedHalfPoint: { mul: 0.5, unit: "pt" },
    Border: { mul: 0.125, unit: "pt", min: 0.25, max: 12 },
    //NOTE: http://officeopenxml.com/WPtextBorders.php
    Point: { mul: 1, unit: "pt" },
    Percent: { mul: 0.02, unit: "%" },
    LineHeight: { mul: 1 / 240, unit: "" },
    VmlEmu: { mul: 1 / 12700, unit: "" }
  };
  function convertLength(val, usage = LengthUsage.Dxa) {
    if (val == null || val === "" || /.+(p[xt]|[%])$/i.test(val))
      return val;
    var parsed = parseFloat(val);
    if (Number.isNaN(parsed))
      return null;
    var num = parsed * usage.mul;
    return usage.min != null && usage.max != null && (num = clamp(num, usage.min, usage.max)), `${num.toFixed(2)}${usage.unit}`;
  }
  function convertBoolean(v, defaultValue = !1) {
    switch (v) {
      case "1":
        return !0;
      case "0":
        return !1;
      case "on":
        return !0;
      case "off":
        return !1;
      case "true":
        return !0;
      case "false":
        return !1;
      default:
        return defaultValue;
    }
  }
  function parseCommonProperty(elem, props, xml) {
    if (elem.namespaceURI != ns.wordml)
      return !1;
    switch (elem.localName) {
      case "color":
        props.color = xml.attr(elem, "val");
        break;
      case "sz":
        props.fontSize = xml.lengthAttr(elem, "val", LengthUsage.FontSize);
        break;
      case "szCs":
        props.complexScriptFontSize = xml.lengthAttr(elem, "val", LengthUsage.FontSize);
        break;
      default:
        return !1;
    }
    return !0;
  }

  // src/parser/xml-parser.ts
  function parseXmlString(xmlString, trimXmlDeclaration = !1) {
    trimXmlDeclaration && (xmlString = xmlString.replace(/<[?].*[?]>/, "")), xmlString = removeUTF8BOM(xmlString);
    let result = new DOMParser().parseFromString(xmlString, "application/xml"), errorText = hasXmlParserError(result);
    if (errorText)
      throw new Error(errorText);
    return result;
  }
  function hasXmlParserError(doc) {
    return doc.getElementsByTagName("parsererror")[0]?.textContent;
  }
  function removeUTF8BOM(data) {
    return data.charCodeAt(0) === 65279 ? data.substring(1) : data;
  }
  function serializeXmlString(elem) {
    return new XMLSerializer().serializeToString(elem);
  }
  var XmlParser = class {
    elements(elem, localName = null) {
      let result = [];
      for (let i = 0, l = elem.childNodes.length; i < l; i++) {
        let c = elem.childNodes.item(i);
        c.nodeType == 1 && (localName == null || c.localName == localName) && result.push(c);
      }
      return result;
    }
    element(elem, localName) {
      for (let i = 0, l = elem.childNodes.length; i < l; i++) {
        let c = elem.childNodes.item(i);
        if (c.nodeType == 1 && c.localName == localName)
          return c;
      }
      return null;
    }
    elementAttr(elem, localName, attrLocalName) {
      var el = this.element(elem, localName);
      return el ? this.attr(el, attrLocalName) : void 0;
    }
    attrs(elem) {
      return Array.from(elem.attributes);
    }
    attr(elem, localName) {
      for (let i = 0, l = elem.attributes.length; i < l; i++) {
        let a = elem.attributes.item(i);
        if (a && a.localName == localName)
          return a.value;
      }
      return null;
    }
    intAttr(node, attrName, defaultValue = null) {
      var val = this.attr(node, attrName);
      return val != null && val !== "" ? parseInt(val, 10) : defaultValue;
    }
    hexAttr(node, attrName, defaultValue = null) {
      var val = this.attr(node, attrName);
      return val != null && val !== "" ? parseInt(val, 16) : defaultValue;
    }
    floatAttr(node, attrName, defaultValue = null) {
      var val = this.attr(node, attrName);
      return val != null && val !== "" ? parseFloat(val) : defaultValue;
    }
    boolAttr(node, attrName, defaultValue = null) {
      return convertBoolean(this.attr(node, attrName), defaultValue);
    }
    lengthAttr(node, attrName, usage = LengthUsage.Dxa) {
      return convertLength(this.attr(node, attrName), usage);
    }
  }, globalXmlParser = new XmlParser(), xml_parser_default = globalXmlParser;

  // src/common/part.ts
  var Part = class {
    constructor(_package, path) {
      this._package = _package;
      this.path = path;
    }
    async load() {
      let [rels, xmlText] = await Promise.all([
        this._package.loadRelationships(this.path),
        this._package.load(this.path)
      ]);
      this.rels = rels;
      let xmlDoc = this._package.parseXmlDocument(xmlText);
      this._package.options.keepOrigin && (this._xmlDocument = xmlDoc), this.parseXml(xmlDoc.firstElementChild ?? xmlDoc.documentElement);
    }
    save() {
      this._package.update(this.path, serializeXmlString(this._xmlDocument));
    }
    parseXml(root) {
    }
  };

  // src/font-table/fonts.ts
  var embedFontTypeMap = {
    embedRegular: "regular",
    embedBold: "bold",
    embedItalic: "italic",
    embedBoldItalic: "boldItalic"
  };
  function parseFonts(root, xml) {
    return xml.elements(root).map((el) => parseFont(el, xml));
  }
  function parseFont(elem, xml) {
    let result = {
      name: xml.attr(elem, "name"),
      embedFontRefs: []
    };
    for (let el of xml.elements(elem))
      switch (el.localName) {
        case "family":
          result.family = xml.attr(el, "val");
          break;
        case "altName":
          result.altName = xml.attr(el, "val");
          break;
        case "embedRegular":
        case "embedBold":
        case "embedItalic":
        case "embedBoldItalic":
          result.embedFontRefs.push(parseEmbedFontRef(el, xml));
          break;
      }
    return result;
  }
  function parseEmbedFontRef(elem, xml) {
    return {
      id: xml.attr(elem, "id"),
      key: xml.attr(elem, "fontKey"),
      type: embedFontTypeMap[elem.localName]
    };
  }

  // src/font-table/font-table.ts
  var FontTablePart = class extends Part {
    parseXml(root) {
      this.fonts = parseFonts(root, this._package.xmlParser);
    }
  };

  // src/common/content-types.ts
  function parseContentTypes(root, xml) {
    return xml.elements(root).map((e) => ({
      extension: xml.attr(e, "Extension"),
      partName: xml.attr(e, "PartName"),
      contentType: xml.attr(e, "ContentType")
    }));
  }

  // src/common/zip-archive.ts
  var ZipEntry = class {
    constructor(archive, metadata) {
      this.archive = archive;
      this.metadata = metadata;
    }
    async async(type = "string") {
      let data = this.updatedData ?? await this.archive.readEntryData(this.metadata);
      return convertZipOutput(data, type);
    }
    setContent(content) {
      this.updatedData = zipContentToBytes(content), this.metadata.compression = 0, this.metadata.compressedSize = this.updatedData.length, this.metadata.uncompressedSize = this.updatedData.length, this.metadata.crc32 = crc32(this.updatedData);
    }
    async bytes() {
      return this.updatedData ?? await this.archive.readEntryData(this.metadata);
    }
  }, ZipArchive = class _ZipArchive {
    constructor(source) {
      this.source = source;
      this.files = {};
      this.bytesRead = 0;
      this.readOperations = 0;
      this.directoryBytesRead = 0;
      this.entryBytesRead = 0;
      this.entryReads = 0;
      this.disposed = !1;
      this.sourceKind = source.kind, this.sourceSize = source.size, this.fullyMaterialized = source.fullyMaterialized;
    }
    static async loadAsync(input) {
      let archive = new _ZipArchive(createByteSource(input));
      return await archive.readCentralDirectory(), archive;
    }
    getReadStats() {
      return {
        sourceKind: this.sourceKind,
        sourceSize: this.sourceSize,
        bytesRead: this.bytesRead,
        readOperations: this.readOperations,
        directoryBytesRead: this.directoryBytesRead,
        entryBytesRead: this.entryBytesRead,
        entryReads: this.entryReads,
        fullyMaterialized: this.fullyMaterialized,
        disposed: this.disposed
      };
    }
    dispose() {
      this.disposed = !0, this.source = null, this.files = {};
    }
    file(path, content) {
      let normalized = normalizePath(path), entry = this.files[normalized] ?? this.files[normalized.replace(/\//g, "\\")];
      return arguments.length === 1 || (entry || (entry = new ZipEntry(this, {
        name: normalized,
        flags: 2048,
        compression: 0,
        crc32: 0,
        compressedSize: 0,
        uncompressedSize: 0,
        localHeaderOffset: 0
      }), this.files[normalized] = entry), entry.setContent(content)), entry;
    }
    async generateAsync(options = { type: "blob" }) {
      let localParts = [], centralParts = [], offset = 0;
      for (let entry of Object.values(this.files)) {
        let nameBytes = encodeUtf8(entry.metadata.name), data = await entry.bytes(), crc = crc32(data), local = new Uint8Array(30 + nameBytes.length), localView = new DataView(local.buffer);
        writeU32(localView, 0, 67324752), writeU16(localView, 4, 20), writeU16(localView, 6, 2048), writeU16(localView, 8, 0), writeU16(localView, 10, 0), writeU16(localView, 12, 0), writeU32(localView, 14, crc), writeU32(localView, 18, data.length), writeU32(localView, 22, data.length), writeU16(localView, 26, nameBytes.length), writeU16(localView, 28, 0), local.set(nameBytes, 30), localParts.push(local, data);
        let central = new Uint8Array(46 + nameBytes.length), centralView = new DataView(central.buffer);
        writeU32(centralView, 0, 33639248), writeU16(centralView, 4, 20), writeU16(centralView, 6, 20), writeU16(centralView, 8, 2048), writeU16(centralView, 10, 0), writeU16(centralView, 12, 0), writeU16(centralView, 14, 0), writeU32(centralView, 16, crc), writeU32(centralView, 20, data.length), writeU32(centralView, 24, data.length), writeU16(centralView, 28, nameBytes.length), writeU16(centralView, 30, 0), writeU16(centralView, 32, 0), writeU16(centralView, 34, 0), writeU16(centralView, 36, 0), writeU32(centralView, 38, 0), writeU32(centralView, 42, offset), central.set(nameBytes, 46), centralParts.push(central), offset += local.length + data.length;
      }
      let centralOffset = offset, centralSize = centralParts.reduce((sum, part) => sum + part.length, 0), end = new Uint8Array(22), endView = new DataView(end.buffer);
      return writeU32(endView, 0, 101010256), writeU16(endView, 4, 0), writeU16(endView, 6, 0), writeU16(endView, 8, centralParts.length), writeU16(endView, 10, centralParts.length), writeU32(endView, 12, centralSize), writeU32(endView, 16, centralOffset), writeU16(endView, 20, 0), convertZipOutput(concatBytes([...localParts, ...centralParts, end]), options.type);
    }
    async readEntryData(entry) {
      if (entry.flags & 1)
        throw new Error(`Encrypted ZIP entry is not supported: ${entry.name}`);
      let localHeader = await this.readRange(entry.localHeaderOffset, entry.localHeaderOffset + 30, "entry"), view = dataView(localHeader);
      if (readU32(view, 0) !== 67324752)
        throw new Error(`Invalid ZIP local header for ${entry.name}`);
      let nameLength = readU16(view, 26), extraLength = readU16(view, 28), dataStart = entry.localHeaderOffset + 30 + nameLength + extraLength, compressed = await this.readRange(dataStart, dataStart + entry.compressedSize, "entry");
      switch (this.entryReads++, entry.compression) {
        case 0:
          return compressed;
        case 8:
          return inflateRaw(compressed);
        default:
          throw new Error(`Unsupported ZIP compression method ${entry.compression} for ${entry.name}`);
      }
    }
    async readCentralDirectory() {
      let sourceSize = this.requireSource().size, tailSize = Math.min(sourceSize, 65557), tailOffset = sourceSize - tailSize, tail = await this.readRange(tailOffset, sourceSize, "directory"), tailView = dataView(tail), eocd = findEndOfCentralDirectory(tailView), diskNumber = readU16(tailView, eocd + 4), centralDisk = readU16(tailView, eocd + 6), diskEntries = readU16(tailView, eocd + 8), totalEntries = readU16(tailView, eocd + 10), centralSize = readU32(tailView, eocd + 12), centralOffset = readU32(tailView, eocd + 16);
      if (diskNumber !== 0 || centralDisk !== 0 || diskEntries !== totalEntries)
        throw new Error("Multi-disk ZIP packages are not supported");
      if (totalEntries === 65535 || centralSize === 4294967295 || centralOffset === 4294967295)
        throw new Error("ZIP64 packages are not supported");
      if (centralOffset + centralSize > sourceSize)
        throw new Error("Invalid ZIP central directory bounds");
      let central = centralOffset >= tailOffset ? tail.slice(centralOffset - tailOffset, centralOffset - tailOffset + centralSize) : await this.readRange(centralOffset, centralOffset + centralSize, "directory"), view = dataView(central), offset = 0;
      for (let i = 0; i < totalEntries; i++) {
        if (readU32(view, offset) !== 33639248)
          throw new Error("Invalid ZIP central directory");
        let flags = readU16(view, offset + 8), compression = readU16(view, offset + 10), crc = readU32(view, offset + 16), compressedSize = readU32(view, offset + 20), uncompressedSize = readU32(view, offset + 24), nameLength = readU16(view, offset + 28), extraLength = readU16(view, offset + 30), commentLength = readU16(view, offset + 32), localHeaderOffset = readU32(view, offset + 42);
        if (offset + 46 + nameLength + extraLength + commentLength > central.byteLength)
          throw new Error("Invalid ZIP central directory entry bounds");
        let nameBytes = central.slice(offset + 46, offset + 46 + nameLength), name = decodeFileName(nameBytes, flags);
        this.files[name] = new ZipEntry(this, {
          name,
          flags,
          compression,
          crc32: crc,
          compressedSize,
          uncompressedSize,
          localHeaderOffset
        }), offset += 46 + nameLength + extraLength + commentLength;
      }
    }
    requireSource() {
      if (!this.source || this.disposed)
        throw new Error("ZIP package has been disposed");
      return this.source;
    }
    async readRange(start, end, category) {
      let source = this.requireSource(), safeStart = Math.max(0, Math.min(source.size, start)), safeEnd = Math.max(safeStart, Math.min(source.size, end));
      if (safeStart !== start || safeEnd !== end)
        throw new Error(`Invalid ZIP byte range ${start}-${end}`);
      let data = await source.slice(safeStart, safeEnd);
      if (data.byteLength !== safeEnd - safeStart)
        throw new Error(`Incomplete ZIP byte range ${start}-${end}`);
      return this.bytesRead += data.byteLength, this.readOperations++, category === "directory" ? this.directoryBytesRead += data.byteLength : this.entryBytesRead += data.byteLength, data;
    }
  };
  function createByteSource(input) {
    if (typeof Blob < "u" && input instanceof Blob)
      return {
        kind: "blob",
        size: input.size,
        fullyMaterialized: !1,
        async slice(start, end) {
          return new Uint8Array(await input.slice(start, end).arrayBuffer());
        }
      };
    let bytes;
    if (input instanceof Uint8Array)
      bytes = input;
    else if (input instanceof ArrayBuffer)
      bytes = new Uint8Array(input);
    else if (ArrayBuffer.isView(input))
      bytes = new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    else
      throw new Error("Unsupported ZIP input type");
    return {
      kind: "memory",
      size: bytes.byteLength,
      fullyMaterialized: !0,
      async slice(start, end) {
        return bytes.slice(start, end);
      }
    };
  }
  function zipContentToBytes(content) {
    if (content instanceof Uint8Array)
      return content;
    if (content instanceof ArrayBuffer)
      return new Uint8Array(content);
    if (ArrayBuffer.isView(content))
      return new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
    if (typeof content == "string")
      return encodeUtf8(content);
    throw new Error("Unsupported ZIP entry content type");
  }
  async function inflateRaw(data) {
    let zlib = await nodeZlib();
    if (zlib?.inflateRawSync)
      return new Uint8Array(zlib.inflateRawSync(data));
    let DecompressionStreamCtor = globalThis.DecompressionStream;
    if (DecompressionStreamCtor) {
      let stream = new Blob([toArrayBuffer(data)]).stream().pipeThrough(new DecompressionStreamCtor("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    throw new Error("This runtime does not support deflate-raw ZIP entries");
  }
  var nodeZlibPromise;
  function nodeZlib() {
    return nodeZlibPromise ?? (nodeZlibPromise = (async () => {
      let processObject = globalThis.process;
      if (!processObject?.versions?.node)
        return null;
      let getBuiltinModule = processObject?.getBuiltinModule;
      if (typeof getBuiltinModule == "function")
        return getBuiltinModule.call(processObject, "node:zlib");
      try {
        return await import("node:zlib");
      } catch {
        return null;
      }
    })());
  }
  function convertZipOutput(data, type) {
    switch (type) {
      case "string":
      case "text":
        return decodeUtf8(data);
      case "uint8array":
        return data;
      case "arraybuffer":
        return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
      case "array":
        return Array.from(data);
      case "nodebuffer": {
        let BufferCtor = globalThis.Buffer;
        return BufferCtor ? BufferCtor.from(data) : data;
      }
      case "base64":
        return bytesToBase64(data);
      default:
        return new Blob([toArrayBuffer(data)]);
    }
  }
  function toArrayBuffer(data) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  function findEndOfCentralDirectory(view) {
    let min = Math.max(0, view.byteLength - 22 - 65535);
    for (let i = view.byteLength - 22; i >= min; i--)
      if (readU32(view, i) === 101010256 && i + 22 + readU16(view, i + 20) === view.byteLength)
        return i;
    throw new Error("Invalid ZIP file: missing end of central directory");
  }
  function normalizePath(path) {
    return path.startsWith("/") ? path.substring(1) : path;
  }
  function dataView(data) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  function readU16(view, offset) {
    return view.getUint16(offset, !0);
  }
  function readU32(view, offset) {
    return view.getUint32(offset, !0);
  }
  function writeU16(view, offset, value) {
    view.setUint16(offset, value, !0);
  }
  function writeU32(view, offset, value) {
    view.setUint32(offset, value >>> 0, !0);
  }
  function encodeUtf8(text) {
    return new TextEncoder().encode(text);
  }
  function decodeUtf8(data) {
    return new TextDecoder("utf-8").decode(data);
  }
  function decodeFileName(data, flags) {
    if (flags & 2048)
      return decodeUtf8(data);
    let text = "";
    for (let byte of data)
      text += String.fromCharCode(byte);
    return text;
  }
  function concatBytes(parts) {
    let total = parts.reduce((sum, part) => sum + part.length, 0), result = new Uint8Array(total), offset = 0;
    for (let part of parts)
      result.set(part, offset), offset += part.length;
    return result;
  }
  function bytesToBase64(data) {
    let BufferCtor = globalThis.Buffer;
    if (BufferCtor)
      return BufferCtor.from(data).toString("base64");
    let binary = "";
    for (let i = 0; i < data.length; i++)
      binary += String.fromCharCode(data[i]);
    return btoa(binary);
  }
  var crcTable = makeCrcTable();
  function crc32(data) {
    let crc = 4294967295;
    for (let byte of data)
      crc = crcTable[(crc ^ byte) & 255] ^ crc >>> 8;
    return (crc ^ 4294967295) >>> 0;
  }
  function makeCrcTable() {
    let table = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++)
        c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
      table[i] = c >>> 0;
    }
    return table;
  }

  // src/common/open-xml-package.ts
  var OpenXmlPackage = class _OpenXmlPackage {
    constructor(_zip, options) {
      this._zip = _zip;
      this.options = options;
      this.xmlParser = new XmlParser();
    }
    get(path) {
      let p = normalizePath2(path);
      return this._zip.files[p] ?? this._zip.files[p.replace(/\//g, "\\")];
    }
    update(path, content) {
      this._zip.file(path, content);
    }
    static async load(input, options) {
      let zip = await ZipArchive.loadAsync(input);
      return new _OpenXmlPackage(zip, options);
    }
    save(type = "blob") {
      return this._zip.generateAsync({ type });
    }
    load(path, type = "string") {
      return this.get(path)?.async(type) ?? Promise.resolve(null);
    }
    listEntries() {
      return Object.keys(this._zip.files);
    }
    getStreamStatus() {
      return {
        ...this._zip.getReadStats(),
        entryCount: this.listEntries().length,
        remote: !1
      };
    }
    dispose() {
      this._zip.dispose();
    }
    async loadRelationships(path = null) {
      let relsPath = "_rels/.rels";
      if (path != null) {
        let [f, fn] = splitPath(path);
        relsPath = `${f}_rels/${fn}.rels`;
      }
      let txt = await this.load(relsPath);
      return txt ? parseRelationships(rootElement(this.parseXmlDocument(txt)), this.xmlParser) : null;
    }
    async loadContentTypes() {
      let txt = await this.load("[Content_Types].xml");
      return txt ? parseContentTypes(rootElement(this.parseXmlDocument(txt)), this.xmlParser) : [];
    }
    /** @internal */
    parseXmlDocument(txt) {
      return parseXmlString(txt, this.options.trimXmlDeclaration);
    }
  };
  function rootElement(doc) {
    return doc.firstElementChild ?? doc.documentElement;
  }
  function normalizePath2(path) {
    return path.startsWith("/") ? path.substr(1) : path;
  }

  // src/document/document-part.ts
  var DocumentPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path), this._documentParser = parser;
    }
    parseXml(root) {
      this.body = this._documentParser.parseDocumentFile(root);
    }
  };

  // src/document/border.ts
  function parseBorder(elem, xml) {
    return {
      type: xml.attr(elem, "val"),
      color: xml.attr(elem, "color"),
      size: xml.lengthAttr(elem, "sz", LengthUsage.Border),
      offset: xml.lengthAttr(elem, "space", LengthUsage.Point),
      frame: xml.boolAttr(elem, "frame"),
      shadow: xml.boolAttr(elem, "shadow")
    };
  }
  function parseBorders(elem, xml) {
    var result = {};
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "left":
          result.left = parseBorder(e, xml);
          break;
        case "top":
          result.top = parseBorder(e, xml);
          break;
        case "right":
          result.right = parseBorder(e, xml);
          break;
        case "bottom":
          result.bottom = parseBorder(e, xml);
          break;
      }
    return result;
  }

  // src/document/section.ts
  function parseSectionProperties(elem, xml = xml_parser_default) {
    var section = {};
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "pgSz":
          section.pageSize = {
            width: xml.lengthAttr(e, "w"),
            height: xml.lengthAttr(e, "h"),
            orientation: xml.attr(e, "orient")
          };
          break;
        case "type":
          section.type = xml.attr(e, "val");
          break;
        case "pgMar":
          section.pageMargins = {
            left: xml.lengthAttr(e, "left"),
            right: xml.lengthAttr(e, "right"),
            top: xml.lengthAttr(e, "top"),
            bottom: xml.lengthAttr(e, "bottom"),
            header: xml.lengthAttr(e, "header"),
            footer: xml.lengthAttr(e, "footer"),
            gutter: xml.lengthAttr(e, "gutter")
          };
          break;
        case "cols":
          section.columns = parseColumns(e, xml);
          break;
        case "headerReference":
          (section.headerRefs ?? (section.headerRefs = [])).push(parseFooterHeaderReference(e, xml));
          break;
        case "footerReference":
          (section.footerRefs ?? (section.footerRefs = [])).push(parseFooterHeaderReference(e, xml));
          break;
        case "titlePg":
          section.titlePage = xml.boolAttr(e, "val", !0);
          break;
        case "pgBorders":
          section.pageBorders = parseBorders(e, xml);
          break;
        case "pgNumType":
          section.pageNumber = parsePageNumber(e, xml);
          break;
        case "docGrid":
          section.docGrid = parseDocumentGrid(e, xml);
          break;
      }
    return section;
  }
  function parseColumns(elem, xml) {
    return {
      numberOfColumns: xml.intAttr(elem, "num"),
      space: xml.lengthAttr(elem, "space"),
      separator: xml.boolAttr(elem, "sep"),
      equalWidth: xml.boolAttr(elem, "equalWidth", !0),
      columns: xml.elements(elem, "col").map((e) => ({
        width: xml.lengthAttr(e, "w"),
        space: xml.lengthAttr(e, "space")
      }))
    };
  }
  function parsePageNumber(elem, xml) {
    return {
      chapSep: xml.attr(elem, "chapSep"),
      chapStyle: xml.attr(elem, "chapStyle"),
      format: xml.attr(elem, "fmt"),
      start: xml.intAttr(elem, "start")
    };
  }
  function parseDocumentGrid(elem, xml) {
    let charSpaceRaw = xml.intAttr(elem, "charSpace", null);
    return {
      type: xml.attr(elem, "type"),
      linePitch: xml.lengthAttr(elem, "linePitch"),
      charSpace: charSpaceRaw == null ? null : `${(charSpaceRaw / 4096).toFixed(4)}em`,
      charSpaceRaw
    };
  }
  function parseFooterHeaderReference(elem, xml) {
    return {
      id: xml.attr(elem, "id"),
      type: xml.attr(elem, "type")
    };
  }

  // src/document/line-spacing.ts
  function normalizeLineRule(value) {
    return value === "exact" ? "exactly" : value;
  }
  function parseLineSpacing(elem, xml) {
    return {
      before: xml.lengthAttr(elem, "before"),
      after: xml.lengthAttr(elem, "after"),
      beforeLines: xml.intAttr(elem, "beforeLines"),
      afterLines: xml.intAttr(elem, "afterLines"),
      beforeAutoSpacing: xml.boolAttr(elem, "beforeAutospacing"),
      afterAutoSpacing: xml.boolAttr(elem, "afterAutospacing"),
      line: xml.intAttr(elem, "line"),
      lineRule: normalizeLineRule(xml.attr(elem, "lineRule"))
    };
  }

  // src/document/run.ts
  function parseRunProperties(elem, xml) {
    let result = {};
    for (let el of xml.elements(elem))
      parseRunProperty(el, result, xml);
    return result;
  }
  function parseRunProperty(elem, props, xml) {
    return !!parseCommonProperty(elem, props, xml);
  }

  // src/document/paragraph.ts
  function parseParagraphProperties(elem, xml) {
    let result = {};
    for (let el of xml.elements(elem))
      parseParagraphProperty(el, result, xml);
    return result;
  }
  function parseParagraphProperty(elem, props, xml) {
    if (elem.namespaceURI != ns.wordml)
      return !1;
    if (parseCommonProperty(elem, props, xml))
      return !0;
    switch (elem.localName) {
      case "tabs":
        props.tabs = parseTabs(elem, xml);
        break;
      case "sectPr":
        props.sectionProps = parseSectionProperties(elem, xml);
        break;
      case "numPr":
        props.numbering = parseNumbering(elem, xml);
        break;
      case "spacing":
        return props.lineSpacing = parseLineSpacing(elem, xml), !1;
        break;
      case "textAlignment":
        return props.textAlignment = xml.attr(elem, "val"), !1;
        break;
      case "keepLines":
        props.keepLines = xml.boolAttr(elem, "val", !0);
        break;
      case "keepNext":
        props.keepNext = xml.boolAttr(elem, "val", !0);
        break;
      case "pageBreakBefore":
        props.pageBreakBefore = xml.boolAttr(elem, "val", !0);
        break;
      case "widowControl":
        props.widowControl = xml.boolAttr(elem, "val", !0);
        break;
      case "contextualSpacing":
        props.contextualSpacing = xml.boolAttr(elem, "val", !0);
        break;
      case "outlineLvl":
        props.outlineLevel = xml.intAttr(elem, "val");
        break;
      case "pStyle":
        props.styleName = xml.attr(elem, "val");
        break;
      case "rPr":
        props.runProps = parseRunProperties(elem, xml);
        break;
      default:
        return !1;
    }
    return !0;
  }
  function parseTabs(elem, xml) {
    return xml.elements(elem, "tab").map((e) => ({
      position: xml.lengthAttr(e, "pos"),
      leader: xml.attr(e, "leader"),
      style: xml.attr(e, "val")
    }));
  }
  function parseNumbering(elem, xml) {
    var result = {};
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "numId":
          result.id = xml.attr(e, "val");
          break;
        case "ilvl":
          result.level = xml.intAttr(e, "val");
          break;
      }
    return result;
  }

  // src/numbering/numbering.ts
  function parseNumberingPart(elem, xml) {
    let result = {
      numberings: [],
      abstractNumberings: [],
      bulletPictures: []
    };
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "num":
          result.numberings.push(parseNumbering2(e, xml));
          break;
        case "abstractNum":
          result.abstractNumberings.push(parseAbstractNumbering(e, xml));
          break;
        case "numPicBullet":
          result.bulletPictures.push(parseNumberingBulletPicture(e, xml));
          break;
      }
    return result;
  }
  function parseNumbering2(elem, xml) {
    let result = {
      id: xml.attr(elem, "numId"),
      overrides: []
    };
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "abstractNumId":
          result.abstractId = xml.attr(e, "val");
          break;
        case "lvlOverride":
          result.overrides.push(parseNumberingLevelOverrride(e, xml));
          break;
      }
    return result;
  }
  function parseAbstractNumbering(elem, xml) {
    let result = {
      id: xml.attr(elem, "abstractNumId"),
      levels: []
    };
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "name":
          result.name = xml.attr(e, "val");
          break;
        case "multiLevelType":
          result.multiLevelType = xml.attr(e, "val");
          break;
        case "numStyleLink":
          result.numberingStyleLink = xml.attr(e, "val");
          break;
        case "styleLink":
          result.styleLink = xml.attr(e, "val");
          break;
        case "lvl":
          result.levels.push(parseNumberingLevel(e, xml));
          break;
      }
    return result;
  }
  function parseNumberingLevel(elem, xml) {
    let result = {
      level: xml.intAttr(elem, "ilvl")
    };
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "start":
          result.start = xml.attr(e, "val");
          break;
        case "lvlRestart":
          result.restart = xml.intAttr(e, "val");
          break;
        case "numFmt":
          result.format = xml.attr(e, "val");
          break;
        case "lvlText":
          result.text = xml.attr(e, "val");
          break;
        case "lvlJc":
          result.justification = xml.attr(e, "val");
          break;
        case "lvlPicBulletId":
          result.bulletPictureId = xml.attr(e, "val");
          break;
        case "pStyle":
          result.paragraphStyle = xml.attr(e, "val");
          break;
        case "pPr":
          result.paragraphProps = parseParagraphProperties(e, xml);
          break;
        case "rPr":
          result.runProps = parseRunProperties(e, xml);
          break;
      }
    return result;
  }
  function parseNumberingLevelOverrride(elem, xml) {
    let result = {
      level: xml.intAttr(elem, "ilvl")
    };
    for (let e of xml.elements(elem))
      switch (e.localName) {
        case "startOverride":
          result.start = xml.intAttr(e, "val");
          break;
        case "lvl":
          result.numberingLevel = parseNumberingLevel(e, xml);
          break;
      }
    return result;
  }
  function parseNumberingBulletPicture(elem, xml) {
    var id = xml.attr(elem, "numPicBulletId"), pict = xml.element(elem, "pict"), shape = pict && xml.element(pict, "shape"), imagedata = shape && xml.element(shape, "imagedata");
    if (imagedata)
      return {
        id,
        referenceId: xml.attr(imagedata, "id"),
        style: xml.attr(shape, "style")
      };
    var drawing = xml.element(elem, "drawing"), blip = drawing && findDescendant(drawing, "blip", xml);
    return blip ? {
      id,
      referenceId: xml.attr(blip, "embed") ?? xml.attr(blip, "link"),
      style: null
    } : null;
  }
  function findDescendant(elem, localName, xml) {
    for (let child of xml.elements(elem)) {
      if (child.localName == localName)
        return child;
      let nested = findDescendant(child, localName, xml);
      if (nested)
        return nested;
    }
    return null;
  }

  // src/numbering/numbering-part.ts
  var NumberingPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path), this._documentParser = parser;
    }
    parseXml(root) {
      Object.assign(this, parseNumberingPart(root, this._package.xmlParser)), this.domNumberings = this._documentParser.parseNumberingFile(root);
    }
  };

  // src/styles/styles-part.ts
  var StylesPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path), this._documentParser = parser;
    }
    parseXml(root) {
      this.styles = this._documentParser.parseStylesFile(root);
    }
  };

  // src/document/dom.ts
  var OpenXmlElementBase = class {
    constructor() {
      this.children = [];
      this.cssStyle = {};
    }
  };

  // src/header-footer/elements.ts
  var WmlHeader = class extends OpenXmlElementBase {
    constructor() {
      super(...arguments);
      this.type = "header" /* Header */;
    }
  }, WmlFooter = class extends OpenXmlElementBase {
    constructor() {
      super(...arguments);
      this.type = "footer" /* Footer */;
    }
  };

  // src/header-footer/parts.ts
  var BaseHeaderFooterPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path), this._documentParser = parser;
    }
    parseXml(root) {
      this.rootElement = this.createRootElement(), this.rootElement.children = this._documentParser.parseBodyElements(root);
    }
  }, HeaderPart = class extends BaseHeaderFooterPart {
    createRootElement() {
      return new WmlHeader();
    }
  }, FooterPart = class extends BaseHeaderFooterPart {
    createRootElement() {
      return new WmlFooter();
    }
  };

  // src/document-props/extended-props.ts
  function parseExtendedProps(root, xmlParser) {
    let result = {};
    for (let el of xmlParser.elements(root))
      switch (el.localName) {
        case "Template":
          result.template = el.textContent;
          break;
        case "Pages":
          result.pages = safeParseToInt(el.textContent);
          break;
        case "Words":
          result.words = safeParseToInt(el.textContent);
          break;
        case "Characters":
          result.characters = safeParseToInt(el.textContent);
          break;
        case "Application":
          result.application = el.textContent;
          break;
        case "Lines":
          result.lines = safeParseToInt(el.textContent);
          break;
        case "Paragraphs":
          result.paragraphs = safeParseToInt(el.textContent);
          break;
        case "Company":
          result.company = el.textContent;
          break;
        case "AppVersion":
          result.appVersion = el.textContent;
          break;
      }
    return result;
  }
  function safeParseToInt(value) {
    if (!(typeof value > "u"))
      return parseInt(value);
  }

  // src/document-props/extended-props-part.ts
  var ExtendedPropsPart = class extends Part {
    parseXml(root) {
      this.props = parseExtendedProps(root, this._package.xmlParser);
    }
  };

  // src/document-props/core-props.ts
  function parseCoreProps(root, xmlParser) {
    let result = {};
    for (let el of xmlParser.elements(root))
      switch (el.localName) {
        case "title":
          result.title = el.textContent;
          break;
        case "description":
          result.description = el.textContent;
          break;
        case "subject":
          result.subject = el.textContent;
          break;
        case "creator":
          result.creator = el.textContent;
          break;
        case "keywords":
          result.keywords = el.textContent;
          break;
        case "language":
          result.language = el.textContent;
          break;
        case "lastModifiedBy":
          result.lastModifiedBy = el.textContent;
          break;
        case "revision":
          el.textContent && (result.revision = parseInt(el.textContent));
          break;
      }
    return result;
  }

  // src/document-props/core-props-part.ts
  var CorePropsPart = class extends Part {
    parseXml(root) {
      this.props = parseCoreProps(root, this._package.xmlParser);
    }
  };

  // src/theme/theme.ts
  var DmlTheme = class {
  };
  function parseTheme(elem, xml) {
    var result = new DmlTheme(), themeElements = xml.element(elem, "themeElements");
    for (let el of xml.elements(themeElements))
      switch (el.localName) {
        case "clrScheme":
          result.colorScheme = parseColorScheme(el, xml);
          break;
        case "fontScheme":
          result.fontScheme = parseFontScheme(el, xml);
          break;
        case "fmtScheme":
          result.formatScheme = parseFormatScheme(el, xml);
          break;
      }
    return result;
  }
  function parseColorScheme(elem, xml) {
    var result = {
      name: xml.attr(elem, "name"),
      colors: {}
    };
    for (let el of xml.elements(elem)) {
      var srgbClr = xml.element(el, "srgbClr"), sysClr = xml.element(el, "sysClr");
      srgbClr ? result.colors[el.localName] = xml.attr(srgbClr, "val") : sysClr && (result.colors[el.localName] = xml.attr(sysClr, "lastClr"));
    }
    return result;
  }
  function parseFontScheme(elem, xml) {
    var result = {
      name: xml.attr(elem, "name")
    };
    for (let el of xml.elements(elem))
      switch (el.localName) {
        case "majorFont":
          result.majorFont = parseFontInfo(el, xml);
          break;
        case "minorFont":
          result.minorFont = parseFontInfo(el, xml);
          break;
      }
    return result;
  }
  function parseFontInfo(elem, xml) {
    let scriptTypefaces = {};
    for (let font of xml.elements(elem)) {
      if (font.localName != "font")
        continue;
      let script = xml.attr(font, "script"), typeface = xml.attr(font, "typeface");
      script && typeface && (scriptTypefaces[script] = typeface);
    }
    return {
      latinTypeface: xml.elementAttr(elem, "latin", "typeface"),
      eaTypeface: xml.elementAttr(elem, "ea", "typeface"),
      csTypeface: xml.elementAttr(elem, "cs", "typeface"),
      scriptTypefaces
    };
  }
  function parseFormatScheme(elem, xml) {
    let result = {
      name: xml.attr(elem, "name"),
      lineStyles: []
    }, lineStyleList = xml.element(elem, "lnStyleLst");
    if (lineStyleList)
      for (let line of xml.elements(lineStyleList, "ln"))
        result.lineStyles.push(parseThemeLineStyle(line, xml));
    return result;
  }
  function parseThemeLineStyle(elem, xml) {
    return {
      width: xml.floatAttr(elem, "w", null),
      cap: xml.attr(elem, "cap"),
      dash: xml.elementAttr(elem, "prstDash", "val")
    };
  }

  // src/theme/theme-part.ts
  var ThemePart = class extends Part {
    constructor(pkg, path) {
      super(pkg, path);
    }
    parseXml(root) {
      this.theme = parseTheme(root, this._package.xmlParser);
    }
  };

  // src/notes/elements.ts
  var WmlBaseNote = class {
  }, WmlFootnote = class extends WmlBaseNote {
    constructor() {
      super(...arguments);
      this.type = "footnote" /* Footnote */;
    }
  }, WmlEndnote = class extends WmlBaseNote {
    constructor() {
      super(...arguments);
      this.type = "endnote" /* Endnote */;
    }
  };

  // src/notes/parts.ts
  var BaseNotePart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path), this._documentParser = parser;
    }
  }, FootnotesPart = class extends BaseNotePart {
    constructor(pkg, path, parser) {
      super(pkg, path, parser);
    }
    parseXml(root) {
      this.notes = this._documentParser.parseNotes(root, "footnote", WmlFootnote);
    }
  }, EndnotesPart = class extends BaseNotePart {
    constructor(pkg, path, parser) {
      super(pkg, path, parser);
    }
    parseXml(root) {
      this.notes = this._documentParser.parseNotes(root, "endnote", WmlEndnote);
    }
  };

  // src/settings/settings.ts
  function parseSettings(elem, xml) {
    var result = {
      // OOXML defines omitted kinsoku as enabled for Simplified Chinese,
      // Traditional Chinese, and Japanese paragraphs.
      kinsoku: !0,
      // OOXML defines omitted overflowPunct as enabled. Keep the default here
      // so every renderer inherits Word's normal East Asian punctuation behavior.
      overflowPunctuation: !0,
      topLinePunctuation: !1,
      suppressTopSpacingAtPageStart: !1
    };
    for (let el of xml.elements(elem))
      switch (el.localName) {
        case "defaultTabStop":
          result.defaultTabStop = xml.lengthAttr(el, "val");
          break;
        case "footnotePr":
          result.footnoteProps = parseNoteProperties(el, xml);
          break;
        case "endnotePr":
          result.endnoteProps = parseNoteProperties(el, xml);
          break;
        case "autoHyphenation":
          result.autoHyphenation = xml.boolAttr(el, "val", !0);
          break;
        case "hyphenationZone":
          result.hyphenationZone = xml.lengthAttr(el, "val");
          break;
        case "kinsoku":
          result.kinsoku = xml.boolAttr(el, "val", !0);
          break;
        case "overflowPunct":
          result.overflowPunctuation = xml.boolAttr(el, "val", !0);
          break;
        case "topLinePunct":
          result.topLinePunctuation = xml.boolAttr(el, "val", !0);
          break;
        case "autoSpaceDE":
          result.autoSpaceDE = xml.boolAttr(el, "val", !0);
          break;
        case "autoSpaceDN":
          result.autoSpaceDN = xml.boolAttr(el, "val", !0);
          break;
        case "characterSpacingControl":
          result.characterSpacingControl = xml.attr(el, "val");
          break;
        case "noLineBreaksAfter":
          result.noLineBreaksAfter = xml.attr(el, "val") || el.textContent || "";
          break;
        case "noLineBreaksBefore":
          result.noLineBreaksBefore = xml.attr(el, "val") || el.textContent || "";
          break;
        case "evenAndOddHeaders":
          result.evenAndOddHeaders = xml.boolAttr(el, "val", !0);
          break;
        case "splitPgBreakAndParaMark":
          result.splitPageBreakAndParagraphMark = xml.boolAttr(el, "val", !0);
          break;
        case "mathPr":
          for (let c of xml.elements(el))
            c.localName == "mathFont" && (result.mathFont = xml.attr(c, "val")), c.localName == "defJc" && (result.mathDefaultJustification = xml.attr(c, "val"));
          break;
        case "compat":
          for (let c of xml.elements(el))
            c.localName == "adjustLineHeightInTable" && (result.adjustLineHeightInTable = xml.boolAttr(c, "val", !0)), c.localName == "useFELayout" && (result.useFELayout = xml.boolAttr(c, "val", !0)), c.localName == "balanceSingleByteDoubleByteWidth" && (result.balanceSingleByteDoubleByteWidth = xml.boolAttr(c, "val", !0)), c.localName == "doNotUseEastAsianBreakRules" && (result.doNotUseEastAsianBreakRules = xml.boolAttr(c, "val", !0)), c.localName == "doNotWrapTextWithPunct" && (result.doNotWrapTextWithPunct = xml.boolAttr(c, "val", !0)), c.localName == "allowSpaceOfSameStyleInTable" && (result.allowSpaceOfSameStyleInTable = xml.boolAttr(c, "val", !0)), (c.localName == "suppressTopSpacing" || c.localName == "suppressTopSpacingWP" || c.localName == "suppressSpacingAtTopOfPage") && (result.suppressTopSpacingAtPageStart = xml.boolAttr(c, "val", !0));
          break;
      }
    return result;
  }
  function parseNoteProperties(elem, xml) {
    var result = {
      defaultNoteIds: []
    };
    for (let el of xml.elements(elem))
      switch (el.localName) {
        case "numFmt":
          result.nummeringFormat = xml.attr(el, "val");
          break;
        case "footnote":
        case "endnote":
          result.defaultNoteIds.push(xml.attr(el, "id"));
          break;
      }
    return result;
  }

  // src/settings/settings-part.ts
  var SettingsPart = class extends Part {
    constructor(pkg, path) {
      super(pkg, path);
    }
    parseXml(root) {
      this.settings = parseSettings(root, this._package.xmlParser);
    }
  };

  // src/document-props/custom-props.ts
  function parseCustomProps(root, xml) {
    return xml.elements(root, "property").map((e) => {
      let firstChild = e.firstChild;
      return {
        formatId: xml.attr(e, "fmtid"),
        name: xml.attr(e, "name"),
        type: firstChild.nodeName,
        value: firstChild.textContent
      };
    });
  }

  // src/document-props/custom-props-part.ts
  var CustomPropsPart = class extends Part {
    parseXml(root) {
      this.props = parseCustomProps(root, this._package.xmlParser);
    }
  };

  // src/comments/comments-part.ts
  var CommentsPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path), this._documentParser = parser;
    }
    parseXml(root) {
      this.comments = this._documentParser.parseComments(root), this.commentMap = keyBy(this.comments, (x) => x.id);
    }
  };

  // src/comments/comments-extended-part.ts
  var CommentsExtendedPart = class extends Part {
    constructor(pkg, path) {
      super(pkg, path);
      this.comments = [];
    }
    parseXml(root) {
      let xml = this._package.xmlParser;
      for (let el of xml.elements(root, "commentEx"))
        this.comments.push({
          paraId: xml.attr(el, "paraId"),
          paraIdParent: xml.attr(el, "paraIdParent"),
          done: xml.boolAttr(el, "done")
        });
      this.commentMap = keyBy(this.comments, (x) => x.paraId);
    }
  };

  // src/metafile/emf-to-svg.ts
  var UPNG = __toESM(require_UPNG()), EMR = {
    HEADER: 1,
    POLYBEZIER: 2,
    POLYGON: 3,
    POLYLINE: 4,
    POLYBEZIERTO: 5,
    POLYLINETO: 6,
    POLYPOLYLINE: 7,
    POLYPOLYGON: 8,
    SETWINDOWEXTEX: 9,
    SETWINDOWORGEX: 10,
    SETVIEWPORTEXTEX: 11,
    SETVIEWPORTORGEX: 12,
    EOF: 14,
    SETPIXELV: 15,
    SETMAPMODE: 17,
    SETBKMODE: 18,
    SETPOLYFILLMODE: 19,
    SETTEXTALIGN: 22,
    SETTEXTCOLOR: 24,
    SETBKCOLOR: 25,
    MOVETOEX: 27,
    SCALEVIEWPORTEXTEX: 31,
    SCALEWINDOWEXTEX: 32,
    SAVEDC: 33,
    RESTOREDC: 34,
    SETWORLDTRANSFORM: 35,
    MODIFYWORLDTRANSFORM: 36,
    SELECTOBJECT: 37,
    CREATEPEN: 38,
    CREATEBRUSHINDIRECT: 39,
    DELETEOBJECT: 40,
    ANGLEARC: 41,
    ELLIPSE: 42,
    RECTANGLE: 43,
    ROUNDRECT: 44,
    ARC: 45,
    CHORD: 46,
    PIE: 47,
    LINETO: 54,
    ARCTO: 55,
    POLYDRAW: 56,
    BEGINPATH: 59,
    ENDPATH: 60,
    CLOSEFIGURE: 61,
    FILLPATH: 62,
    STROKEANDFILLPATH: 63,
    STROKEPATH: 64,
    GDICOMMENT: 70,
    BITBLT: 76,
    STRETCHBLT: 77,
    STRETCHDIBITS: 81,
    EXTCREATEFONTINDIRECTW: 82,
    EXTTEXTOUTA: 83,
    EXTTEXTOUTW: 84,
    POLYBEZIER16: 85,
    POLYGON16: 86,
    POLYLINE16: 87,
    POLYBEZIERTO16: 88,
    POLYLINETO16: 89,
    POLYPOLYLINE16: 90,
    POLYPOLYGON16: 91,
    POLYDRAW16: 92,
    EXTCREATEPEN: 95,
    POLYTEXTOUTA: 96,
    POLYTEXTOUTW: 97,
    SMALLTEXTOUT: 108,
    ALPHABLEND: 114,
    TRANSPARENTBLT: 116
  }, EMFPLUS = {
    HEADER: 16385,
    ENDOFFILE: 16386,
    GETDC: 16388,
    OBJECT: 16392,
    FILLRECTS: 16394,
    FILLPATH: 16404,
    DRAWPATH: 16405,
    SETANTIALIASMODE: 16414,
    SAVE: 16421,
    RESTORE: 16422,
    SETWORLDTRANSFORM: 16426,
    RESETWORLDTRANSFORM: 16427,
    SETPAGETRANSFORM: 16432
  }, EMFPLUS_OBJECT_TYPE_BRUSH = 1, EMFPLUS_OBJECT_TYPE_PEN = 2, EMFPLUS_OBJECT_TYPE_PATH = 3, EMFPLUS_COMMENT_IDENTIFIER = 726027589, EMFPLUS_PATH_POINT_FLAG_R = 1, EMFPLUS_PATH_POINT_FLAG_C = 2, EMFPLUS_PATH_POINT_TYPE_MASK = 7, EMFPLUS_PATH_POINT_TYPE_START = 0, EMFPLUS_PATH_POINT_TYPE_LINE = 1, EMFPLUS_PATH_POINT_TYPE_BEZIER = 3, EMFPLUS_PATH_POINT_TYPE_CLOSE = 128, EMFPLUS_FILL_USES_COLOR = 32768, PEN_DATA_TRANSFORM = 1, PEN_DATA_START_CAP = 2, PEN_DATA_END_CAP = 4, PEN_DATA_JOIN = 8, PEN_DATA_MITER_LIMIT = 16, PEN_DATA_LINE_STYLE = 32, PEN_DATA_DASHED_LINE_CAP = 64, PEN_DATA_DASHED_LINE_OFFSET = 128, PEN_DATA_DASHED_LINE = 256, PEN_DATA_NON_CENTER = 512, PEN_DATA_COMPOUND_LINE = 1024, STOCK_OBJECTS = {
    0: { type: "brush", color: "#ffffff" },
    1: { type: "brush", color: "#c0c0c0" },
    2: { type: "brush", color: "#808080" },
    3: { type: "brush", color: "#404040" },
    4: { type: "brush", color: "#000000" },
    5: { type: "brush", color: "none", nullBrush: !0 },
    6: { type: "pen", color: "#ffffff", width: 1 },
    7: { type: "pen", color: "#000000", width: 1 },
    8: { type: "pen", color: "none", width: 0, nullPen: !0 },
    18: { type: "brush", color: "#ffffff" },
    19: { type: "pen", color: "#000000", width: 1 }
  }, IDENTITY = { m11: 1, m12: 0, m21: 0, m22: 1, dx: 0, dy: 0 }, PS_ENDCAP_MASK = 3840, PS_ENDCAP_SQUARE = 256, PS_ENDCAP_FLAT = 512, PS_JOIN_MASK = 61440, PS_JOIN_BEVEL = 4096, PS_JOIN_MITER = 8192, EMF_FRAME_VIEWBOX_GUTTER_RATIO_LIMIT = 3e-3, WMF_PLACEABLE_KEY = 2596720087, WMF_META_ESCAPE = 1574, WMF_ESCAPE_MFCOMMENT = 15, WMFC_COMMENT_HEADER_BYTES = 34, WMF = {
    EOF: 0,
    SETBKCOLOR: 513,
    SETBKMODE: 258,
    SETMAPMODE: 259,
    SETTEXTCOLOR: 521,
    SETTEXTALIGN: 302,
    SETWINDOWORG: 523,
    SETWINDOWEXT: 524,
    SETVIEWPORTORG: 525,
    SETVIEWPORTEXT: 526,
    MOVETO: 532,
    LINETO: 531,
    DELETEOBJECT: 496,
    SELECTOBJECT: 301,
    CREATEPENINDIRECT: 762,
    CREATEFONTINDIRECT: 763,
    CREATEBRUSHINDIRECT: 764,
    POLYGON: 804,
    POLYLINE: 805,
    ELLIPSE: 1048,
    RECTANGLE: 1051,
    ROUNDRECT: 1564,
    ARC: 2071,
    PIE: 2074,
    CHORD: 2096,
    TEXTOUT: 1313,
    EXTTEXTOUT: 2610
  }, ROP_SRCAND = 8913094, ROP_SRCPAINT = 15597702, DIB_TO_PNG_MAX_PIXELS = 24 * 1024 * 1024;
  function isEmfBinary(data) {
    if (!data || data.length < 48)
      return !1;
    let view = toDataView(data);
    return view.getUint32(0, !0) == EMR.HEADER && view.getUint32(40, !0) == 1179469088;
  }
  function extractEmbeddedEmfBinary(data) {
    if (!data || data.length < 48)
      return null;
    let compressed = extractWmfCompressedEmfBinary(data);
    if (compressed)
      return compressed;
    for (let magicOffset = data.indexOf(32, 40); magicOffset >= 40 && magicOffset + 4 <= data.length; magicOffset = data.indexOf(32, magicOffset + 1)) {
      if (data[magicOffset + 1] !== 69 || data[magicOffset + 2] !== 77 || data[magicOffset + 3] !== 70)
        continue;
      let offset = magicOffset - 40;
      if (offset < 0 || offset + 88 > data.length || readU32LE(data, offset) !== EMR.HEADER || readU32LE(data, offset + 40) !== 1179469088)
        continue;
      let recordSize = readU32LE(data, offset + 4), totalBytes = offset + 52 <= data.length ? readU32LE(data, offset + 48) : 0, available = data.length - offset, size = totalBytes >= recordSize && totalBytes <= available ? totalBytes : available;
      if (size < 88)
        continue;
      let embedded = data.subarray(offset, offset + size);
      if (isEmfBinary(embedded))
        return embedded;
    }
    return null;
  }
  function extractWmfCompressedEmfBinary(data) {
    let wmfStart = readU32LE(data, 0) == WMF_PLACEABLE_KEY ? 22 : 0;
    if (wmfStart + 18 > data.length)
      return null;
    let fileType = readU16LE(data, wmfStart), headerWords = readU16LE(data, wmfStart + 2);
    if (fileType != 1 && fileType != 2 || headerWords < 9)
      return null;
    let offset = wmfStart + headerWords * 2, chunks = [], total = 0;
    for (let records = 0; offset + 6 <= data.length && records < 1e6; records++) {
      let recordWords = readU32LE(data, offset), recordBytes = recordWords * 2, fn = readU16LE(data, offset + 4);
      if (!recordWords || recordBytes < 6 || offset + recordBytes > data.length)
        break;
      if (fn == WMF_META_ESCAPE && recordBytes >= 10) {
        let escapeFunction = readU16LE(data, offset + 6), byteCount = readU16LE(data, offset + 8), payloadStart = offset + 10, payloadEnd = payloadStart + byteCount;
        if (escapeFunction == WMF_ESCAPE_MFCOMMENT && byteCount > WMFC_COMMENT_HEADER_BYTES && payloadEnd <= offset + recordBytes && data[payloadStart] == 87 && data[payloadStart + 1] == 77 && data[payloadStart + 2] == 70 && data[payloadStart + 3] == 67) {
          let chunk = data.subarray(payloadStart + WMFC_COMMENT_HEADER_BYTES, payloadEnd);
          chunks.push(chunk), total += chunk.length;
        }
      }
      offset += recordBytes;
    }
    if (!chunks.length || total <= 0 || total > data.length)
      return null;
    let out = new Uint8Array(total), outOffset = 0;
    for (let chunk of chunks)
      out.set(chunk, outOffset), outOffset += chunk.length;
    return isEmfBinary(out) ? out : null;
  }
  function convertEmfToSvgDataUrl(data, options) {
    let svg = convertEmfToSvg(data, options);
    return svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : null;
  }
  function isWmfBinary(data) {
    return !!parseWmfHeader(data);
  }
  function convertWmfToSvgDataUrl(data, options) {
    let svg = convertWmfToSvg(data, options);
    return svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : null;
  }
  function convertWmfToSvg(data, options = {}) {
    let header = parseWmfHeader(data);
    if (!header)
      return null;
    let view = toDataView(data), state = initialState(), objects = [], elements = [], observed = emptyBounds(), records = 0, shapeCount = 0, offset = header.recordsOffset, pathData = "", inPath = !1, maxRecords = options.maxRecords ?? 1e5, maxShapes = options.maxShapes ?? 5e4;
    header.viewBox && (state.windowOrg = { x: header.viewBox.left, y: header.viewBox.top }, state.windowExt = { x: header.viewBox.right - header.viewBox.left, y: header.viewBox.bottom - header.viewBox.top });
    let emit = (markup) => {
      !markup || shapeCount >= maxShapes || (elements.push(markup), shapeCount++);
    }, appendPath = (segment) => {
      segment && (pathData += (pathData ? " " : "") + segment);
    };
    for (; offset + 6 <= view.byteLength && records++ <= maxRecords; ) {
      let recordWords = view.getUint32(offset, !0), recordBytes = recordWords * 2, fn = view.getUint16(offset + 4, !0), paramsOffset = offset + 6, paramsBytes = recordBytes - 6;
      if (!recordWords || recordBytes < 6 || offset + recordBytes > view.byteLength)
        break;
      switch (fn) {
        case WMF.EOF:
          offset += recordBytes, records = maxRecords + 1;
          break;
        case WMF.SETBKMODE:
          paramsBytes >= 2 && (state.bkMode = view.getUint16(paramsOffset, !0));
          break;
        case WMF.SETBKCOLOR:
          paramsBytes >= 4 && (state.bkColor = colorRefToCss(view.getUint32(paramsOffset, !0)));
          break;
        case WMF.SETTEXTCOLOR:
          paramsBytes >= 4 && (state.textColor = colorRefToCss(view.getUint32(paramsOffset, !0)));
          break;
        case WMF.SETTEXTALIGN:
          paramsBytes >= 2 && (state.textAlign = view.getUint16(paramsOffset, !0));
          break;
        case WMF.SETWINDOWORG:
          paramsBytes >= 4 && (state.windowOrg = readWmfYXPoint(view, paramsOffset));
          break;
        case WMF.SETWINDOWEXT:
          paramsBytes >= 4 && (state.windowExt = readWmfYXPoint(view, paramsOffset));
          break;
        case WMF.SETVIEWPORTORG:
          paramsBytes >= 4 && (state.viewportOrg = readWmfYXPoint(view, paramsOffset));
          break;
        case WMF.SETVIEWPORTEXT:
          paramsBytes >= 4 && (state.viewportExt = readWmfYXPoint(view, paramsOffset));
          break;
        case WMF.MOVETO: {
          if (paramsBytes < 4)
            break;
          let p = transformPoint(state, readWmfYXPoint(view, paramsOffset));
          state.currentPoint = p, observePoint(observed, p), inPath && appendPath(`M ${fmt(p.x)} ${fmt(p.y)}`);
          break;
        }
        case WMF.LINETO: {
          if (paramsBytes < 4)
            break;
          let p = transformPoint(state, readWmfYXPoint(view, paramsOffset));
          observePoint(observed, state.currentPoint), observePoint(observed, p), inPath ? appendPath(`L ${fmt(p.x)} ${fmt(p.y)}`) : emit(`<path d="M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)} L ${fmt(p.x)} ${fmt(p.y)}" ${paintAttrs(state, !1, !0)}/>`), state.currentPoint = p;
          break;
        }
        case WMF.CREATEPENINDIRECT: {
          let pen = parseWmfPen(view, paramsOffset, paramsBytes);
          pen && storeWmfObject(objects, pen);
          break;
        }
        case WMF.CREATEBRUSHINDIRECT: {
          let brush = parseWmfBrush(view, paramsOffset, paramsBytes);
          brush && storeWmfObject(objects, brush);
          break;
        }
        case WMF.CREATEFONTINDIRECT: {
          let font = parseWmfFont(view, paramsOffset, paramsBytes);
          font && storeWmfObject(objects, font);
          break;
        }
        case WMF.SELECTOBJECT: {
          if (paramsBytes < 2)
            break;
          let handle = view.getUint16(paramsOffset, !0), obj = objects[handle] ?? STOCK_OBJECTS[handle];
          obj?.type == "pen" ? state.pen = clonePen(obj) : obj?.type == "brush" ? state.brush = cloneBrush(obj) : obj?.type == "font" && (state.font = { ...obj });
          break;
        }
        case WMF.DELETEOBJECT:
          paramsBytes >= 2 && (objects[view.getUint16(paramsOffset, !0)] = null);
          break;
        case WMF.POLYGON:
        case WMF.POLYLINE:
          emitWmfPoly(view, paramsOffset, paramsBytes, fn == WMF.POLYGON, inPath, state, observed, appendPath, emit);
          break;
        case WMF.RECTANGLE:
          emitWmfRect(view, paramsOffset, paramsBytes, state, observed, emit, !1);
          break;
        case WMF.ELLIPSE:
          emitWmfEllipse(view, paramsOffset, paramsBytes, state, observed, emit);
          break;
        case WMF.ROUNDRECT:
          emitWmfRect(view, paramsOffset + 4, Math.max(0, paramsBytes - 4), state, observed, emit, !0);
          break;
        case WMF.ARC:
        case WMF.CHORD:
        case WMF.PIE:
          emitWmfArcLike(view, paramsOffset, paramsBytes, fn, inPath, state, observed, appendPath, emit);
          break;
        case WMF.TEXTOUT:
          emitWmfTextOut(view, paramsOffset, paramsBytes, state, observed, emit);
          break;
        case WMF.EXTTEXTOUT:
          emitWmfExtTextOut(view, paramsOffset, paramsBytes, state, observed, emit);
          break;
      }
      offset += recordBytes;
    }
    if (pathData && emitPath(pathData, state, emit, !0, !0), !elements.length) {
      let fallbackBounds = wmfOutputBounds(header, state, observed), rasterFallback = emitEmbeddedRasterFallback(data, fallbackBounds);
      rasterFallback.length && elements.push(...rasterFallback);
    }
    let output = wmfOutputBounds(header, state, observed), width = Math.max(1, output.right - output.left), height = Math.max(1, output.bottom - output.top), physicalWidth = header.physicalWidth || Math.max(1, width) * 25.4 / 96, physicalHeight = header.physicalHeight || Math.max(1, height) * 25.4 / 96;
    if (!elements.length)
      return emptySvg(width, height, output.left, output.top, physicalWidth, physicalHeight, "Unsupported WMF image").replace('data-docx-metafile="emf"', 'data-docx-metafile="wmf"');
    let body = elements.join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(physicalWidth)}mm" height="${fmt(physicalHeight)}mm" viewBox="${fmt(output.left)} ${fmt(output.top)} ${fmt(width)} ${fmt(height)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="wmf"${svgMetafileMetadataAttrs(body)}>${body}</svg>`;
  }
  function convertEmfToSvg(data, options = {}) {
    if (!isEmfBinary(data))
      return null;
    let view = toDataView(data), headerSize = view.getUint32(4, !0), bounds = readRectL(view, 8), frame = readRectL(view, 24), device = view.byteLength >= 80 ? readSizeL(view, 72) : null, millimeters = view.byteLength >= 88 ? readSizeL(view, 80) : null, declaredRecords = view.byteLength >= 52 ? view.getUint32(48, !0) : 0, rawWidth = Math.max(1, inclusiveRectWidth(bounds)), rawHeight = Math.max(1, inclusiveRectHeight(bounds)), viewGutterRatio = emfFrameViewBoxGutterRatio(rawWidth, rawHeight, frame, device, millimeters), viewPadX = rawWidth * viewGutterRatio, viewPadY = rawHeight * viewGutterRatio, width = rawWidth + viewPadX * 2, height = rawHeight + viewPadY * 2, viewLeft = bounds.left - viewPadX, viewTop = bounds.top - viewPadY, physicalWidth = Math.max(1, inclusiveRectWidth(frame)) / 100, physicalHeight = Math.max(1, inclusiveRectHeight(frame)) / 100, state = initialState(), plusState = initialEmfPlusState(), stack = [], objects = {}, elements = [], skipGdiVectorFallback = hasEmfPlusVectorDrawing(data), offset = Math.max(8, headerSize || 108), records = 1, pathData = "", inPath = !1, shapeCount = 0, maxRecords = options.maxRecords ?? Math.max(1e4, declaredRecords + 100), maxShapes = options.maxShapes ?? 5e4, emit = (markup) => {
      !markup || shapeCount >= maxShapes || (elements.push(markup), shapeCount++);
    }, emitGdiShape = skipGdiVectorFallback ? () => {
    } : emit, appendPath = (segment) => {
      segment && (pathData += (pathData ? " " : "") + segment);
    };
    for (; offset + 8 <= view.byteLength && records++ <= maxRecords; ) {
      let type = view.getUint32(offset, !0), size = view.getUint32(offset + 4, !0);
      if (size < 8 || offset + size > view.byteLength)
        break;
      switch (type) {
        case EMR.EOF:
          offset += size, records = maxRecords + 1;
          break;
        case EMR.SETWINDOWEXTEX:
          state.windowExt = readSizeL(view, offset + 8);
          break;
        case EMR.SETWINDOWORGEX:
          state.windowOrg = readPointL(view, offset + 8);
          break;
        case EMR.SETVIEWPORTEXTEX:
          state.viewportExt = readSizeL(view, offset + 8);
          break;
        case EMR.SETVIEWPORTORGEX:
          state.viewportOrg = readPointL(view, offset + 8);
          break;
        case EMR.SCALEWINDOWEXTEX:
          state.windowExt && (state.windowExt = scaleExt(view, offset, state.windowExt));
          break;
        case EMR.SCALEVIEWPORTEXTEX:
          state.viewportExt && (state.viewportExt = scaleExt(view, offset, state.viewportExt));
          break;
        case EMR.SETWORLDTRANSFORM:
          state.world = readXForm(view, offset + 8);
          break;
        case EMR.MODIFYWORLDTRANSFORM: {
          let xf = readXForm(view, offset + 8), mode = view.getUint32(offset + 32, !0);
          mode == 1 ? state.world = cloneMatrix(IDENTITY) : mode == 2 ? state.world = multiplyMatrix(xf, state.world) : mode == 3 ? state.world = multiplyMatrix(state.world, xf) : mode == 4 && (state.world = xf);
          break;
        }
        case EMR.SAVEDC:
          stack.push(cloneState(state));
          break;
        case EMR.RESTOREDC: {
          let relative = view.getInt32(offset + 8, !0);
          if (relative < 0)
            for (let i = 0; i < Math.min(-relative, stack.length); i++)
              Object.assign(state, stack.pop());
          else if (relative > 0 && relative <= stack.length) {
            let restored = stack[relative - 1];
            stack.length = relative - 1, Object.assign(state, cloneState(restored));
          }
          break;
        }
        case EMR.SETBKMODE:
          state.bkMode = view.getUint32(offset + 8, !0);
          break;
        case EMR.SETPOLYFILLMODE:
          state.polyFillMode = view.getUint32(offset + 8, !0);
          break;
        case EMR.SETTEXTALIGN:
          state.textAlign = view.getUint32(offset + 8, !0);
          break;
        case EMR.SETTEXTCOLOR:
          state.textColor = colorRefToCss(view.getUint32(offset + 8, !0));
          break;
        case EMR.SETBKCOLOR:
          state.bkColor = colorRefToCss(view.getUint32(offset + 8, !0));
          break;
        case EMR.CREATEPEN: {
          let handle = view.getUint32(offset + 8, !0), style = view.getUint32(offset + 12, !0), width2 = Math.abs(view.getInt32(offset + 16, !0)), color = colorRefToCss(view.getUint32(offset + 24, !0));
          objects[handle] = createPenObject(style, color, width2 || 1, (style & 15) == 5);
          break;
        }
        case EMR.EXTCREATEPEN: {
          let handle = view.getUint32(offset + 8, !0), style = view.getUint32(offset + 28, !0), width2 = Math.abs(view.getInt32(offset + 32, !0)), brushStyle = view.getUint32(offset + 36, !0), color = colorRefToCss(view.getUint32(offset + 40, !0));
          objects[handle] = createPenObject(style, color, width2 || 1, (style & 15) == 5 || brushStyle == 1);
          break;
        }
        case EMR.CREATEBRUSHINDIRECT: {
          let handle = view.getUint32(offset + 8, !0), style = view.getUint32(offset + 12, !0), color = colorRefToCss(view.getUint32(offset + 16, !0));
          objects[handle] = { type: "brush", color, nullBrush: style == 1 };
          break;
        }
        case EMR.EXTCREATEFONTINDIRECTW: {
          let handle = view.getUint32(offset + 8, !0);
          objects[handle] = parseFont2(view, offset + 12, size - 12);
          break;
        }
        case EMR.SELECTOBJECT: {
          let handle = view.getUint32(offset + 8, !0), obj = handle & 2147483648 ? STOCK_OBJECTS[handle & 2147483647] : objects[handle];
          obj?.type == "pen" ? state.pen = clonePen(obj) : obj?.type == "brush" ? state.brush = cloneBrush(obj) : obj?.type == "font" && (state.font = { ...obj });
          break;
        }
        case EMR.DELETEOBJECT:
          delete objects[view.getUint32(offset + 8, !0)];
          break;
        case EMR.BEGINPATH:
          inPath = !0, pathData = "";
          break;
        case EMR.ENDPATH:
          inPath = !1;
          break;
        case EMR.CLOSEFIGURE:
          appendPath("Z");
          break;
        case EMR.MOVETOEX: {
          let p = transformPoint(state, readPointL(view, offset + 8));
          state.currentPoint = p, inPath && appendPath(`M ${fmt(p.x)} ${fmt(p.y)}`);
          break;
        }
        case EMR.LINETO: {
          let p = transformPoint(state, readPointL(view, offset + 8));
          inPath ? appendPath(`L ${fmt(p.x)} ${fmt(p.y)}`) : emitGdiShape(`<path d="M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)} L ${fmt(p.x)} ${fmt(p.y)}" ${paintAttrs(state, !1, !0)}/>`), state.currentPoint = p;
          break;
        }
        case EMR.POLYLINE:
        case EMR.POLYGON:
          emitPoly32(view, offset, type == EMR.POLYGON, !1, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYLINETO:
          emitPoly32(view, offset, !1, !0, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYLINE16:
        case EMR.POLYGON16:
          emitPoly16(view, offset, type == EMR.POLYGON16, !1, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYLINETO16:
          emitPoly16(view, offset, !1, !0, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIER:
          emitBezier(view, offset, !1, !1, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIERTO:
          emitBezier(view, offset, !1, !0, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIER16:
          emitBezier(view, offset, !0, !1, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIERTO16:
          emitBezier(view, offset, !0, !0, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYPOLYLINE:
        case EMR.POLYPOLYGON:
          emitPolyPoly(view, offset, type == EMR.POLYPOLYGON, !1, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYPOLYLINE16:
        case EMR.POLYPOLYGON16:
          emitPolyPoly(view, offset, type == EMR.POLYPOLYGON16, !0, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYDRAW:
          emitPolyDraw(view, offset, !1, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYDRAW16:
          emitPolyDraw(view, offset, !0, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.RECTANGLE:
          emitRect(view, offset, state, emitGdiShape, !1);
          break;
        case EMR.ELLIPSE:
          emitEllipse(view, offset, state, emitGdiShape);
          break;
        case EMR.ROUNDRECT:
          emitRect(view, offset, state, emitGdiShape, !0);
          break;
        case EMR.ARC:
        case EMR.ARCTO:
        case EMR.CHORD:
        case EMR.PIE:
          emitArcLike(view, offset, type, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.FILLPATH:
          emitPath(pathData, state, emitGdiShape, !0, !1), pathData = "";
          break;
        case EMR.STROKEPATH:
          emitPath(pathData, state, emitGdiShape, !1, !0), pathData = "";
          break;
        case EMR.STROKEANDFILLPATH:
          emitPath(pathData, state, emitGdiShape, !0, !0), pathData = "";
          break;
        case EMR.EXTTEXTOUTA:
        case EMR.EXTTEXTOUTW:
          emitExtTextOut(view, offset, size, state, emit, type == EMR.EXTTEXTOUTW);
          break;
        case EMR.POLYTEXTOUTA:
        case EMR.POLYTEXTOUTW:
          emitPolyTextOut(view, offset, size, state, emit, type == EMR.POLYTEXTOUTW);
          break;
        case EMR.SMALLTEXTOUT:
          emitSmallTextOut(view, offset, size, state, emit);
          break;
        case EMR.SETPIXELV:
          emitPixel(view, offset, state, emitGdiShape);
          break;
        case EMR.BITBLT:
        case EMR.STRETCHBLT:
        case EMR.STRETCHDIBITS:
        case EMR.ALPHABLEND:
        case EMR.TRANSPARENTBLT:
          emitBitmapRecord(view, offset, size, type, state, emit);
          break;
        case EMR.GDICOMMENT:
          emitEmfPlusComment(view, offset, size, plusState, emit);
          break;
      }
      offset += size;
    }
    if (pathData && emitPath(pathData, state, emitGdiShape, !0, !0), !elements.length) {
      let rasterFallback = emitEmbeddedRasterFallback(data, bounds);
      rasterFallback.length && elements.push(...rasterFallback);
    }
    if (!elements.length)
      return emptySvg(width, height, viewLeft, viewTop, physicalWidth, physicalHeight, "Unsupported EMF image");
    let body = elements.join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(physicalWidth)}mm" height="${fmt(physicalHeight)}mm" viewBox="${fmt(viewLeft)} ${fmt(viewTop)} ${fmt(width)} ${fmt(height)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="emf"${svgMetafileMetadataAttrs(body)}>${body}</svg>`;
  }
  function parseWmfHeader(data) {
    if (!data || data.length < 18)
      return null;
    let placeable = readU32LE(data, 0) == WMF_PLACEABLE_KEY && data.length >= 40, start = placeable ? 22 : 0;
    if (start + 18 > data.length)
      return null;
    let fileType = readU16LE(data, start), headerWords = readU16LE(data, start + 2), version = readU16LE(data, start + 4);
    if (fileType != 1 && fileType != 2 || headerWords < 9 || version < 256)
      return null;
    let recordsOffset = start + headerWords * 2;
    if (recordsOffset + 6 > data.length)
      return null;
    let viewBox = null, physicalWidth = 0, physicalHeight = 0;
    if (placeable) {
      let left = readI16LE(data, 6), top = readI16LE(data, 8), right = readI16LE(data, 10), bottom = readI16LE(data, 12), inch = readU16LE(data, 14), width = Math.abs(right - left), height = Math.abs(bottom - top);
      width > 0 && height > 0 && (viewBox = {
        left: Math.min(left, right),
        top: Math.min(top, bottom),
        right: Math.max(left, right),
        bottom: Math.max(top, bottom)
      }, inch > 0 && (physicalWidth = width * 25.4 / inch, physicalHeight = height * 25.4 / inch));
    }
    return { recordsOffset, viewBox, physicalWidth, physicalHeight };
  }
  function readWmfYXPoint(view, offset) {
    return { x: view.getInt16(offset + 2, !0), y: view.getInt16(offset, !0) };
  }
  function parseWmfPen(view, offset, available) {
    if (available < 10)
      return null;
    let style = view.getUint16(offset, !0), width = Math.abs(view.getInt16(offset + 2, !0)) || 1, color = colorRefToCss(view.getUint32(offset + 6, !0));
    return createPenObject(style, color, width, (style & 15) == 5);
  }
  function parseWmfBrush(view, offset, available) {
    if (available < 8)
      return null;
    let style = view.getUint16(offset, !0);
    return { type: "brush", color: colorRefToCss(view.getUint32(offset + 2, !0)), nullBrush: style == 1 };
  }
  function parseWmfFont(view, offset, available) {
    if (available < 5)
      return null;
    let height = view.getInt16(offset, !0), weight = available >= 10 ? view.getUint16(offset + 8, !0) : 400, italic = available >= 11 ? view.getUint8(offset + 10) != 0 : !1, underline = available >= 12 ? view.getUint8(offset + 11) != 0 : !1, charset = available >= 14 ? view.getUint8(offset + 13) : 0, family = "", faceOffset = offset + 18, faceBytes = Math.max(0, Math.min(64, available - 18));
    for (let i = 0; i < faceBytes; i++) {
      let code = view.getUint8(faceOffset + i);
      if (!code)
        break;
      family += String.fromCharCode(code);
    }
    return { type: "font", family, size: Math.abs(height) || 12, weight, italic, underline, charset };
  }
  function storeWmfObject(objects, object) {
    let index = objects.findIndex((item) => item == null);
    return index < 0 && (index = objects.length), objects[index] = object, index;
  }
  function emitWmfPoly(view, offset, size, closed, inPath, state, observed, appendPath, emit) {
    if (size < 2)
      return;
    let count = view.getUint16(offset, !0);
    if (!count || 2 + count * 4 > size)
      return;
    let points = [];
    for (let i = 0; i < count; i++) {
      let p = transformPoint(state, readPointS(view, offset + 2 + i * 4));
      observePoint(observed, p), points.push(p);
    }
    emitPolyline(points, closed, !1, inPath, state, appendPath, emit);
  }
  function emitWmfRect(view, offset, size, state, observed, emit, rounded) {
    if (size < 8)
      return;
    let r = readWmfLTRBRect(view, offset), p1 = transformPoint(state, { x: r.left, y: r.top }), p2 = transformPoint(state, { x: r.right, y: r.bottom });
    observePoint(observed, p1), observePoint(observed, p2);
    let x = Math.min(p1.x, p2.x), y = Math.min(p1.y, p2.y), w = Math.abs(p2.x - p1.x), h = Math.abs(p2.y - p1.y), radius = rounded ? ` rx="${fmt(Math.min(w, h) / 8)}" ry="${fmt(Math.min(w, h) / 8)}"` : "";
    emit(`<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}"${radius} ${paintAttrs(state, !0, !0)}/>`);
  }
  function emitWmfEllipse(view, offset, size, state, observed, emit) {
    if (size < 8)
      return;
    let r = readWmfLTRBRect(view, offset), p1 = transformPoint(state, { x: r.left, y: r.top }), p2 = transformPoint(state, { x: r.right, y: r.bottom });
    observePoint(observed, p1), observePoint(observed, p2);
    let cx = (p1.x + p2.x) / 2, cy = (p1.y + p2.y) / 2, rx = Math.abs(p2.x - p1.x) / 2, ry = Math.abs(p2.y - p1.y) / 2;
    emit(`<ellipse cx="${fmt(cx)}" cy="${fmt(cy)}" rx="${fmt(rx)}" ry="${fmt(ry)}" ${paintAttrs(state, !0, !0)}/>`);
  }
  function emitWmfArcLike(view, offset, size, type, inPath, state, observed, appendPath, emit) {
    if (size < 16)
      return;
    let endRef = readWmfYXPoint(view, offset), startRef = readWmfYXPoint(view, offset + 4), r = readWmfLTRBRect(view, offset + 8), cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, rxRaw = Math.abs(r.right - r.left) / 2, ryRaw = Math.abs(r.bottom - r.top) / 2;
    if (!rxRaw || !ryRaw)
      return;
    let startAngle = Math.atan2(startRef.y - cy, startRef.x - cx), endAngle = Math.atan2(endRef.y - cy, endRef.x - cx), delta = endAngle - startAngle;
    delta <= 0 && (delta += Math.PI * 2);
    let largeArc = delta > Math.PI ? 1 : 0, pStart = transformPoint(state, { x: cx + Math.cos(startAngle) * rxRaw, y: cy + Math.sin(startAngle) * ryRaw }), pEnd = transformPoint(state, { x: cx + Math.cos(endAngle) * rxRaw, y: cy + Math.sin(endAngle) * ryRaw }), pCenter = transformPoint(state, { x: cx, y: cy }), pRx = transformPoint(state, { x: cx + rxRaw, y: cy }), pRy = transformPoint(state, { x: cx, y: cy + ryRaw });
    observePoint(observed, pStart), observePoint(observed, pEnd), observePoint(observed, pCenter);
    let rx = Math.max(0.01, Math.abs(pRx.x - pCenter.x) || Math.abs(pRy.x - pCenter.x)), ry = Math.max(0.01, Math.abs(pRy.y - pCenter.y) || Math.abs(pRx.y - pCenter.y)), d = `M ${fmt(pStart.x)} ${fmt(pStart.y)} A ${fmt(rx)} ${fmt(ry)} 0 ${largeArc} 1 ${fmt(pEnd.x)} ${fmt(pEnd.y)}`, fill = !1, stroke = !0;
    type == WMF.CHORD ? (d += " Z", fill = !0) : type == WMF.PIE && (d += ` L ${fmt(pCenter.x)} ${fmt(pCenter.y)} Z`, fill = !0), inPath ? appendPath(d) : emit(`<path d="${d}" ${paintAttrs(state, fill, stroke)}/>`);
  }
  function emitWmfTextOut(view, offset, size, state, observed, emit) {
    if (size < 8)
      return;
    let chars = view.getUint16(offset, !0), textOffset = offset + 2, paddedTextBytes = chars + (chars & 1), pointOffset = textOffset + paddedTextBytes;
    if (!chars || pointOffset + 4 > offset + size)
      return;
    let text = decodeGdiText(new Uint8Array(view.buffer, view.byteOffset + textOffset, chars), state.font), recordRawRef = readWmfYXPoint(view, pointOffset), useCurrentPoint = !!(state.textAlign & 1), rawRef = useCurrentPoint && canUseWmfCurrentPointAsRaw(state) ? { x: state.currentPoint.x, y: state.currentPoint.y } : recordRawRef, ref = useCurrentPoint ? state.currentPoint : transformPoint(state, recordRawRef);
    observePoint(observed, ref), emitText(text, ref, state, emit, rawRef), useCurrentPoint && advanceWmfCurrentPointAfterText(state, rawRef, text, null);
  }
  function emitWmfExtTextOut(view, offset, size, state, observed, emit) {
    if (size < 8)
      return;
    let recordRawRef = readWmfYXPoint(view, offset), chars = view.getUint16(offset + 4, !0), options = view.getUint16(offset + 6, !0), textOffset = offset + 8;
    if (options & 6 && (textOffset += 8), !chars || textOffset + chars > offset + size)
      return;
    let text = decodeGdiText(new Uint8Array(view.buffer, view.byteOffset + textOffset, chars), state.font), dxOffset = textOffset + chars + (chars & 1), dx = [];
    if (dxOffset + chars * 2 <= offset + size)
      for (let i = 0; i < chars; i++)
        dx.push(view.getInt16(dxOffset + i * 2, !0));
    let useCurrentPoint = !!(state.textAlign & 1), rawRef = useCurrentPoint && canUseWmfCurrentPointAsRaw(state) ? { x: state.currentPoint.x, y: state.currentPoint.y } : recordRawRef, ref = useCurrentPoint ? state.currentPoint : transformPoint(state, recordRawRef);
    observePoint(observed, ref), emitText(text, ref, state, emit, rawRef, dx.length == chars ? dx : null), useCurrentPoint && advanceWmfCurrentPointAfterText(state, rawRef, text, dx.length == chars ? dx : null);
  }
  function readWmfLTRBRect(view, offset) {
    let bottom = view.getInt16(offset, !0), right = view.getInt16(offset + 2, !0), top = view.getInt16(offset + 4, !0);
    return { left: view.getInt16(offset + 6, !0), top, right, bottom };
  }
  function emptyBounds() {
    return { left: 1 / 0, top: 1 / 0, right: -1 / 0, bottom: -1 / 0 };
  }
  function observePoint(bounds, p) {
    !Number.isFinite(p.x) || !Number.isFinite(p.y) || (bounds.left = Math.min(bounds.left, p.x), bounds.top = Math.min(bounds.top, p.y), bounds.right = Math.max(bounds.right, p.x), bounds.bottom = Math.max(bounds.bottom, p.y));
  }
  function boundsFinite(bounds) {
    return Number.isFinite(bounds.left) && Number.isFinite(bounds.top) && Number.isFinite(bounds.right) && Number.isFinite(bounds.bottom) && bounds.right > bounds.left && bounds.bottom > bounds.top;
  }
  function wmfOutputBounds(header, state, observed) {
    if (header.viewBox)
      return header.viewBox;
    if (state.windowExt && state.windowExt.x && state.windowExt.y) {
      let right = state.windowOrg.x + state.windowExt.x, bottom = state.windowOrg.y + state.windowExt.y;
      return {
        left: Math.min(state.windowOrg.x, right),
        top: Math.min(state.windowOrg.y, bottom),
        right: Math.max(state.windowOrg.x, right),
        bottom: Math.max(state.windowOrg.y, bottom)
      };
    }
    return boundsFinite(observed) ? {
      left: observed.left,
      top: observed.top,
      right: observed.right,
      bottom: observed.bottom
    } : { left: 0, top: 0, right: 1, bottom: 1 };
  }
  function canUseWmfCurrentPointAsRaw(state) {
    let world = state.world;
    return world.m11 == 1 && world.m12 == 0 && world.m21 == 0 && world.m22 == 1 && world.dx == 0 && world.dy == 0 && !(state.windowExt && state.viewportExt && state.windowExt.x && state.windowExt.y);
  }
  function advanceWmfCurrentPointAfterText(state, rawRef, text, dx) {
    let advance = dx?.length ? dx.reduce((sum, value) => sum + (Number(value) || 0), 0) : Math.max(1, text.length) * Math.max(1, state.font?.size ?? 12) * 0.5;
    state.currentPoint = transformPoint(state, { x: rawRef.x + advance, y: rawRef.y });
  }
  function initialState() {
    return {
      world: cloneMatrix(IDENTITY),
      windowOrg: { x: 0, y: 0 },
      windowExt: null,
      viewportOrg: { x: 0, y: 0 },
      viewportExt: null,
      pen: { type: "pen", color: "#000000", width: 1 },
      brush: { type: "brush", color: "#ffffff", nullBrush: !0 },
      font: null,
      textColor: "#000000",
      bkColor: "#ffffff",
      bkMode: 1,
      polyFillMode: 1,
      textAlign: 0,
      currentPoint: { x: 0, y: 0 }
    };
  }
  function initialEmfPlusState() {
    return {
      world: cloneMatrix(IDENTITY),
      pageScale: 1,
      antiAlias: !0,
      smoothingMode: 4,
      objects: {},
      stack: []
    };
  }
  function hasEmfPlusVectorDrawing(data) {
    let view = toDataView(data), offset = Math.max(8, view.getUint32(4, !0) || 108);
    for (; offset + 8 <= view.byteLength; ) {
      let type = view.getUint32(offset, !0), size = view.getUint32(offset + 4, !0);
      if (size < 8 || offset + size > view.byteLength)
        break;
      if (type == EMR.GDICOMMENT && containsEmfPlusVectorRecord(view, offset, size))
        return !0;
      if (type == EMR.EOF)
        break;
      offset += size;
    }
    return !1;
  }
  function containsEmfPlusVectorRecord(view, recordOffset, recordSize) {
    if (recordSize < 16)
      return !1;
    let dataSize = view.getUint32(recordOffset + 8, !0), dataOffset = recordOffset + 12, end = Math.min(recordOffset + recordSize, dataOffset + dataSize);
    if (dataOffset + 4 > end || view.getUint32(dataOffset, !0) != EMFPLUS_COMMENT_IDENTIFIER)
      return !1;
    let p = dataOffset + 4;
    for (; p + 12 <= end; ) {
      let type = view.getUint16(p, !0), size = view.getUint32(p + 4, !0);
      if (type == EMFPLUS.DRAWPATH || type == EMFPLUS.FILLPATH || type == EMFPLUS.FILLRECTS)
        return !0;
      if (size < 12 || p + size > end)
        break;
      p += size;
    }
    return !1;
  }
  function emitEmfPlusComment(view, recordOffset, recordSize, state, emit) {
    if (recordSize < 16)
      return;
    let dataSize = view.getUint32(recordOffset + 8, !0), dataOffset = recordOffset + 12, end = Math.min(recordOffset + recordSize, dataOffset + dataSize);
    if (dataOffset + 4 > end || view.getUint32(dataOffset, !0) != EMFPLUS_COMMENT_IDENTIFIER)
      return;
    let p = dataOffset + 4;
    for (; p + 12 <= end; ) {
      let type = view.getUint16(p, !0), flags = view.getUint16(p + 2, !0), size = view.getUint32(p + 4, !0), payloadSize = view.getUint32(p + 8, !0), payloadOffset = p + 12;
      if (size < 12 || p + size > end || payloadOffset + payloadSize > p + size)
        break;
      switch (type) {
        case EMFPLUS.SETPAGETRANSFORM:
          if (payloadSize >= 4) {
            let pageScale = view.getFloat32(payloadOffset, !0);
            state.pageScale = Number.isFinite(pageScale) && pageScale > 0 ? pageScale : 1;
          }
          break;
        case EMFPLUS.SETWORLDTRANSFORM:
          payloadSize >= 24 && (state.world = readXForm(view, payloadOffset));
          break;
        case EMFPLUS.RESETWORLDTRANSFORM:
          state.world = cloneMatrix(IDENTITY);
          break;
        case EMFPLUS.SAVE:
          state.stack.push({
            id: payloadSize >= 4 ? view.getUint32(payloadOffset, !0) : state.stack.length,
            world: cloneMatrix(state.world),
            pageScale: state.pageScale,
            antiAlias: state.antiAlias,
            smoothingMode: state.smoothingMode
          });
          break;
        case EMFPLUS.RESTORE: {
          let id = payloadSize >= 4 ? view.getUint32(payloadOffset, !0) : null, restored;
          if (id == null)
            restored = state.stack.pop();
          else {
            let index = state.stack.map((saved) => saved.id).lastIndexOf(id);
            index >= 0 && (restored = state.stack[index], state.stack.length = index);
          }
          restored && (state.world = cloneMatrix(restored.world), state.pageScale = restored.pageScale, state.antiAlias = restored.antiAlias, state.smoothingMode = restored.smoothingMode);
          break;
        }
        case EMFPLUS.SETANTIALIASMODE:
          state.antiAlias = !!(flags & 1), state.smoothingMode = flags >>> 1 & 127;
          break;
        case EMFPLUS.OBJECT:
          readEmfPlusObject(view, payloadOffset, payloadSize, flags, state.objects);
          break;
        case EMFPLUS.FILLRECTS:
          emitEmfPlusFillRects(view, payloadOffset, payloadSize, flags, state, emit);
          break;
        case EMFPLUS.FILLPATH:
          emitEmfPlusFillPath(view, payloadOffset, payloadSize, flags, state, emit);
          break;
        case EMFPLUS.DRAWPATH:
          emitEmfPlusDrawPath(view, payloadOffset, payloadSize, flags, state, emit);
          break;
      }
      p += size;
    }
  }
  function readEmfPlusObject(view, offset, size, flags, objects) {
    if (size < 8)
      return;
    let objectId = flags & 255, objectType = flags >>> 8 & 127;
    if (objectType == EMFPLUS_OBJECT_TYPE_PATH) {
      let path = readEmfPlusPathObject(view, offset, size);
      path && (objects[objectId] = path);
    } else if (objectType == EMFPLUS_OBJECT_TYPE_PEN) {
      let pen = readEmfPlusPenObject(view, offset, size);
      pen && (objects[objectId] = pen);
    } else if (objectType == EMFPLUS_OBJECT_TYPE_BRUSH) {
      let brush = readEmfPlusBrushObject(view, offset, size);
      brush && (objects[objectId] = brush);
    }
  }
  function readEmfPlusPathObject(view, offset, size) {
    if (size < 12)
      return null;
    let count = view.getUint32(offset + 4, !0), flags = view.getUint32(offset + 8, !0);
    if (!count || count > 1e5 || flags & EMFPLUS_PATH_POINT_FLAG_R)
      return null;
    let compressed = !!(flags & EMFPLUS_PATH_POINT_FLAG_C), pointSize = compressed ? 4 : 8, pointsOffset = offset + 12, typesOffset = pointsOffset + count * pointSize;
    if (typesOffset + count > offset + size)
      return null;
    let points = [];
    for (let i = 0; i < count; i++) {
      let p = pointsOffset + i * pointSize;
      points.push(compressed ? readPointS(view, p) : { x: view.getFloat32(p, !0), y: view.getFloat32(p + 4, !0) });
    }
    let types = [];
    for (let i = 0; i < count; i++)
      types.push(view.getUint8(typesOffset + i));
    return { type: "plusPath", points, types };
  }
  function readEmfPlusPenObject(view, offset, size) {
    if (size < 24)
      return null;
    let p = offset + 4;
    p += 4;
    let penDataFlags = view.getUint32(p, !0);
    p += 4, p += 4;
    let width = view.getFloat32(p, !0);
    p += 4, penDataFlags & PEN_DATA_TRANSFORM && (p += 24);
    let lineCap = "butt", lineJoin = "miter";
    penDataFlags & PEN_DATA_START_CAP && (lineCap = emfPlusLineCap(view.getInt32(p, !0)), p += 4), penDataFlags & PEN_DATA_END_CAP && (lineCap = emfPlusLineCap(view.getInt32(p, !0)), p += 4), penDataFlags & PEN_DATA_JOIN && (lineJoin = emfPlusLineJoin(view.getInt32(p, !0)), p += 4), penDataFlags & PEN_DATA_MITER_LIMIT && (p += 4), penDataFlags & PEN_DATA_LINE_STYLE && (p += 4), penDataFlags & PEN_DATA_DASHED_LINE_CAP && (p += 4);
    let dashOffset;
    penDataFlags & PEN_DATA_DASHED_LINE_OFFSET && (dashOffset = view.getFloat32(p, !0), p += 4);
    let brushOffset = findEmfPlusGraphicsObjectVersion(view, p, offset + size), dashArray;
    if (penDataFlags & PEN_DATA_DASHED_LINE && brushOffset > p) {
      dashArray = [];
      for (let q = p; q + 4 <= brushOffset; q += 4) {
        let dash = view.getFloat32(q, !0);
        Number.isFinite(dash) && dash > 0 && dashArray.push(dash);
      }
      dashArray.length || (dashArray = void 0);
    }
    return penDataFlags & PEN_DATA_NON_CENTER && (brushOffset = findEmfPlusGraphicsObjectVersion(view, brushOffset, offset + size)), penDataFlags & PEN_DATA_COMPOUND_LINE && (brushOffset = findEmfPlusGraphicsObjectVersion(view, brushOffset, offset + size)), {
      type: "plusPen",
      color: (brushOffset >= offset && brushOffset < offset + size ? readEmfPlusBrushObject(view, brushOffset, offset + size - brushOffset) : null)?.color ?? "#000000",
      width: Number.isFinite(width) && width > 0 ? width : 1,
      lineCap,
      lineJoin,
      dashArray,
      dashOffset
    };
  }
  function readEmfPlusBrushObject(view, offset, size) {
    return size < 12 || view.getUint32(offset + 4, !0) != 0 ? null : { type: "plusBrush", color: argbToCss(view.getUint32(offset + 8, !0)) };
  }
  function findEmfPlusGraphicsObjectVersion(view, offset, end) {
    for (let p = Math.max(0, offset); p + 4 <= end; p += 4)
      if (view.getUint32(p, !0) == 3686797314)
        return p;
    return end;
  }
  function emitEmfPlusFillRects(view, offset, size, flags, state, emit) {
    if (size < 8)
      return;
    let color = flags & EMFPLUS_FILL_USES_COLOR ? argbToCss(view.getUint32(offset, !0)) : emfPlusBrushColor(state.objects[flags & 255]), countOffset = flags & EMFPLUS_FILL_USES_COLOR ? offset + 4 : offset, count = view.getUint32(countOffset, !0), rectsOffset = countOffset + 4;
    if (!(!color || !count || count > 1e5 || rectsOffset + count * 16 > offset + size))
      for (let i = 0; i < count; i++) {
        let p = rectsOffset + i * 16, x = view.getFloat32(p, !0), y = view.getFloat32(p + 4, !0), w = view.getFloat32(p + 8, !0), h = view.getFloat32(p + 12, !0), d = rectToPathData(x, y, w, h, state);
        d && emit(`<path d="${d}" fill="${color}" stroke="none"${emfPlusRenderingAttrs(state)}/>`);
      }
  }
  function emitEmfPlusFillPath(view, offset, size, flags, state, emit) {
    if (size < 4)
      return;
    let path = state.objects[flags & 255];
    if (path?.type != "plusPath")
      return;
    let color = flags & EMFPLUS_FILL_USES_COLOR ? argbToCss(view.getUint32(offset, !0)) : emfPlusBrushColor(state.objects[view.getUint32(offset, !0) & 255]);
    if (!color)
      return;
    let d = plusPathData(path, state);
    d && emit(`<path d="${d}" fill="${color}" fill-rule="evenodd" stroke="none"${emfPlusRenderingAttrs(state)}/>`);
  }
  function emitEmfPlusDrawPath(view, offset, size, flags, state, emit) {
    if (size < 4)
      return;
    let path = state.objects[flags & 255], pen = state.objects[view.getUint32(offset, !0) & 255];
    if (path?.type != "plusPath" || pen?.type != "plusPen")
      return;
    let d = plusPathData(path, state);
    d && emit(`<path d="${d}" fill="none" ${emfPlusPenAttrs(pen, state)}${emfPlusRenderingAttrs(state)}/>`);
  }
  function plusPathData(path, state) {
    let d = "";
    for (let i = 0; i < path.points.length; i++) {
      let type = path.types[i] ?? EMFPLUS_PATH_POINT_TYPE_LINE, op = type & EMFPLUS_PATH_POINT_TYPE_MASK, close = !!(type & EMFPLUS_PATH_POINT_TYPE_CLOSE);
      if (op == EMFPLUS_PATH_POINT_TYPE_START || !d) {
        let p = transformEmfPlusPoint(state, path.points[i]);
        d += `${d ? " " : ""}M ${fmt(p.x)} ${fmt(p.y)}`;
      } else if (op == EMFPLUS_PATH_POINT_TYPE_LINE) {
        let p = transformEmfPlusPoint(state, path.points[i]);
        d += ` L ${fmt(p.x)} ${fmt(p.y)}`;
      } else if (op == EMFPLUS_PATH_POINT_TYPE_BEZIER && i + 2 < path.points.length) {
        let p1 = transformEmfPlusPoint(state, path.points[i]), p2 = transformEmfPlusPoint(state, path.points[i + 1]), p3 = transformEmfPlusPoint(state, path.points[i + 2]);
        d += ` C ${fmt(p1.x)} ${fmt(p1.y)} ${fmt(p2.x)} ${fmt(p2.y)} ${fmt(p3.x)} ${fmt(p3.y)}`, close = close || !!(path.types[i + 2] & EMFPLUS_PATH_POINT_TYPE_CLOSE), i += 2;
      }
      close && (d += " Z");
    }
    return d;
  }
  function rectToPathData(x, y, w, h, state) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w) || !Number.isFinite(h))
      return "";
    let p1 = transformEmfPlusPoint(state, { x, y }), p2 = transformEmfPlusPoint(state, { x: x + w, y }), p3 = transformEmfPlusPoint(state, { x: x + w, y: y + h }), p4 = transformEmfPlusPoint(state, { x, y: y + h });
    return `M ${fmt(p1.x)} ${fmt(p1.y)} L ${fmt(p2.x)} ${fmt(p2.y)} L ${fmt(p3.x)} ${fmt(p3.y)} L ${fmt(p4.x)} ${fmt(p4.y)} Z`;
  }
  function transformEmfPlusPoint(state, p) {
    let world = state.world, scale = state.pageScale || 1;
    return {
      x: (p.x * world.m11 + p.y * world.m21 + world.dx) * scale,
      y: (p.x * world.m12 + p.y * world.m22 + world.dy) * scale
    };
  }
  function emfPlusPenAttrs(pen, state) {
    let strokeWidth = Math.max(0.35, pen.width * approximateMatrixScale(state.world) * (state.pageScale || 1)), attrs = [
      `stroke="${pen.color}"`,
      `stroke-width="${fmt(strokeWidth)}"`,
      `stroke-linecap="${pen.lineCap}"`,
      `stroke-linejoin="${pen.lineJoin}"`
    ];
    return pen.dashArray?.length && attrs.push(`stroke-dasharray="${pen.dashArray.map((v) => fmt(v * strokeWidth)).join(" ")}"`), pen.dashOffset && Number.isFinite(pen.dashOffset) && attrs.push(`stroke-dashoffset="${fmt(pen.dashOffset * strokeWidth)}"`), attrs.join(" ");
  }
  function emfPlusRenderingAttrs(state) {
    return state.antiAlias ? "" : ' shape-rendering="crispEdges"';
  }
  function emfPlusBrushColor(object) {
    return object?.type == "plusBrush" ? object.color : null;
  }
  function emfPlusLineCap(value) {
    return value == 1 ? "square" : value == 2 ? "round" : "butt";
  }
  function emfPlusLineJoin(value) {
    return value == 1 ? "bevel" : value == 2 ? "round" : "miter";
  }
  function approximateMatrixScale(matrix) {
    let sx = Math.hypot(matrix.m11, matrix.m12), sy = Math.hypot(matrix.m21, matrix.m22), scale = (sx + sy) / 2;
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }
  function argbToCss(argb) {
    let a = argb >>> 24 & 255, r = argb >>> 16 & 255, g = argb >>> 8 & 255, b = argb & 255;
    return a >= 255 ? `#${hex2(r)}${hex2(g)}${hex2(b)}` : `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a / 255))})`;
  }
  function cloneState(state) {
    return {
      world: cloneMatrix(state.world),
      windowOrg: { ...state.windowOrg },
      windowExt: state.windowExt ? { ...state.windowExt } : null,
      viewportOrg: { ...state.viewportOrg },
      viewportExt: state.viewportExt ? { ...state.viewportExt } : null,
      pen: clonePen(state.pen),
      brush: cloneBrush(state.brush),
      font: state.font ? { ...state.font } : null,
      textColor: state.textColor,
      bkColor: state.bkColor,
      bkMode: state.bkMode,
      polyFillMode: state.polyFillMode,
      textAlign: state.textAlign,
      currentPoint: { ...state.currentPoint }
    };
  }
  function clonePen(pen) {
    return { ...pen };
  }
  function createPenObject(style, color, width, nullPen) {
    return {
      type: "pen",
      color,
      width,
      lineCap: penLineCap(style),
      lineJoin: penLineJoin(style),
      nullPen
    };
  }
  function penLineCap(style) {
    let cap = style & PS_ENDCAP_MASK;
    return cap == PS_ENDCAP_SQUARE ? "square" : cap == PS_ENDCAP_FLAT ? "butt" : "round";
  }
  function penLineJoin(style) {
    let join = style & PS_JOIN_MASK;
    return join == PS_JOIN_BEVEL ? "bevel" : join == PS_JOIN_MITER ? "miter" : "round";
  }
  function cloneBrush(brush) {
    return { ...brush };
  }
  function cloneMatrix(m) {
    return { ...m };
  }
  function toDataView(data) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  function readRectL(view, offset) {
    return {
      left: view.getInt32(offset, !0),
      top: view.getInt32(offset + 4, !0),
      right: view.getInt32(offset + 8, !0),
      bottom: view.getInt32(offset + 12, !0)
    };
  }
  function inclusiveRectWidth(rect) {
    return rect.right - rect.left + 1;
  }
  function inclusiveRectHeight(rect) {
    return rect.bottom - rect.top + 1;
  }
  function readPointL(view, offset) {
    return { x: view.getInt32(offset, !0), y: view.getInt32(offset + 4, !0) };
  }
  function readSizeL(view, offset) {
    return readPointL(view, offset);
  }
  function emfFrameViewBoxGutterRatio(rawWidth, rawHeight, frame, device, millimeters) {
    if (!device || !millimeters || rawWidth <= 0 || rawHeight <= 0 || device.x <= 0 || device.y <= 0 || millimeters.x <= 0 || millimeters.y <= 0)
      return 0;
    let frameWidthMm = Math.max(1, inclusiveRectWidth(frame)) / 100, frameHeightMm = Math.max(1, inclusiveRectHeight(frame)) / 100, frameDeviceWidth = frameWidthMm * device.x / millimeters.x, frameDeviceHeight = frameHeightMm * device.y / millimeters.y, xSlackRatio = Math.max(0, (frameDeviceWidth - rawWidth) / (2 * rawWidth)), ySlackRatio = Math.max(0, (frameDeviceHeight - rawHeight) / (2 * rawHeight)), frameSlackRatio = Math.min(xSlackRatio, ySlackRatio);
    return Math.min(EMF_FRAME_VIEWBOX_GUTTER_RATIO_LIMIT, frameSlackRatio);
  }
  function readPointS(view, offset) {
    return { x: view.getInt16(offset, !0), y: view.getInt16(offset + 2, !0) };
  }
  function readXForm(view, offset) {
    return {
      m11: view.getFloat32(offset, !0),
      m12: view.getFloat32(offset + 4, !0),
      m21: view.getFloat32(offset + 8, !0),
      m22: view.getFloat32(offset + 12, !0),
      dx: view.getFloat32(offset + 16, !0),
      dy: view.getFloat32(offset + 20, !0)
    };
  }
  function multiplyMatrix(a, b) {
    return {
      m11: a.m11 * b.m11 + a.m12 * b.m21,
      m12: a.m11 * b.m12 + a.m12 * b.m22,
      m21: a.m21 * b.m11 + a.m22 * b.m21,
      m22: a.m21 * b.m12 + a.m22 * b.m22,
      dx: a.dx * b.m11 + a.dy * b.m21 + b.dx,
      dy: a.dx * b.m12 + a.dy * b.m22 + b.dy
    };
  }
  function transformPoint(state, p) {
    let world = state.world, x = p.x * world.m11 + p.y * world.m21 + world.dx, y = p.x * world.m12 + p.y * world.m22 + world.dy;
    return state.windowExt && state.viewportExt && state.windowExt.x && state.windowExt.y && (x = (x - state.windowOrg.x) * state.viewportExt.x / state.windowExt.x + state.viewportOrg.x, y = (y - state.windowOrg.y) * state.viewportExt.y / state.windowExt.y + state.viewportOrg.y), { x, y };
  }
  function approximateScale(state) {
    let sx = Math.hypot(state.world.m11, state.world.m12), sy = Math.hypot(state.world.m21, state.world.m22);
    state.windowExt && state.viewportExt && state.windowExt.x && state.windowExt.y && (sx *= Math.abs(state.viewportExt.x / state.windowExt.x), sy *= Math.abs(state.viewportExt.y / state.windowExt.y));
    let scale = (sx + sy) / 2;
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }
  function scaleExt(view, offset, current) {
    let xNum = view.getInt32(offset + 8, !0), xDen = view.getInt32(offset + 12, !0), yNum = view.getInt32(offset + 16, !0), yDen = view.getInt32(offset + 20, !0);
    return {
      x: xDen ? current.x * xNum / xDen : current.x,
      y: yDen ? current.y * yNum / yDen : current.y
    };
  }
  function colorRefToCss(color) {
    let r = color & 255, g = color >> 8 & 255, b = color >> 16 & 255;
    return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
  }
  function hex2(value) {
    return Math.max(0, Math.min(255, value | 0)).toString(16).padStart(2, "0");
  }
  function fmt(value) {
    return Number.isFinite(value) ? `${Math.round(value * 1e3) / 1e3}` : "0";
  }
  function esc(value) {
    return `${value ?? ""}`.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function unesc(value) {
    return `${value ?? ""}`.replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
  }
  function svgMetafileMetadataAttrs(body) {
    let fonts = /* @__PURE__ */ new Set(), re = /\bfont-family="([^"]+)"/g, match;
    for (; match = re.exec(body); ) {
      let family = unesc(match[1]).trim();
      family && fonts.add(family);
    }
    return fonts.size ? ` data-docx-fonts="${esc([...fonts].join(","))}"` : "";
  }
  function paintAttrs(state, fill, stroke) {
    let attrs = [];
    if (fill && !state.brush.nullBrush ? (attrs.push(`fill="${state.brush.color}"`), attrs.push(`fill-rule="${state.polyFillMode == 2 ? "nonzero" : "evenodd"}"`)) : attrs.push('fill="none"'), stroke && !state.pen.nullPen) {
      let scale = approximateScale(state), strokeWidth = state.pen.width == 0 ? 1 : Math.max(0.35, state.pen.width * scale);
      attrs.push(`stroke="${state.pen.color}"`), attrs.push(`stroke-width="${fmt(strokeWidth)}"`), attrs.push(`stroke-linecap="${state.pen.lineCap || "round"}"`), attrs.push(`stroke-linejoin="${state.pen.lineJoin || "round"}"`);
    } else
      attrs.push('stroke="none"');
    return attrs.join(" ");
  }
  function emitPath(pathData, state, emit, fill, stroke) {
    pathData && emit(`<path d="${pathData}" ${paintAttrs(state, fill, stroke)}/>`);
  }
  function emitPoly16(view, offset, closed, toCurrent, inPath, state, appendPath, emit) {
    let count = view.getUint32(offset + 24, !0);
    if (!count || offset + 28 + count * 4 > view.byteLength)
      return;
    let points = [];
    for (let i = 0; i < count; i++)
      points.push(transformPoint(state, readPointS(view, offset + 28 + i * 4)));
    emitPolyline(points, closed, toCurrent, inPath, state, appendPath, emit);
  }
  function emitPoly32(view, offset, closed, toCurrent, inPath, state, appendPath, emit) {
    let count = view.getUint32(offset + 24, !0);
    if (!count || offset + 28 + count * 8 > view.byteLength)
      return;
    let points = [];
    for (let i = 0; i < count; i++)
      points.push(transformPoint(state, readPointL(view, offset + 28 + i * 8)));
    emitPolyline(points, closed, toCurrent, inPath, state, appendPath, emit);
  }
  function emitPolyline(points, closed, toCurrent, inPath, state, appendPath, emit) {
    if (!points.length)
      return;
    let d = inPath && toCurrent ? "" : toCurrent ? `M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)}` : `M ${fmt(points[0].x)} ${fmt(points[0].y)}`, start = toCurrent ? 0 : 1;
    for (let i = start; i < points.length; i++)
      d += ` L ${fmt(points[i].x)} ${fmt(points[i].y)}`;
    closed && (d += " Z"), state.currentPoint = points[points.length - 1], inPath ? appendPath(d.trim()) : emit(`<path d="${d.trim()}" ${paintAttrs(state, closed, !0)}/>`);
  }
  function emitBezier(view, offset, shortPoints, toCurrent, inPath, state, appendPath, emit) {
    let count = view.getUint32(offset + 24, !0), pointSize = shortPoints ? 4 : 8;
    if (!count || offset + 28 + count * pointSize > view.byteLength)
      return;
    let points = [];
    for (let i = 0; i < count; i++) {
      let p = shortPoints ? readPointS(view, offset + 28 + i * pointSize) : readPointL(view, offset + 28 + i * pointSize);
      points.push(transformPoint(state, p));
    }
    let d = inPath && toCurrent ? "" : toCurrent ? `M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)}` : `M ${fmt(points[0].x)} ${fmt(points[0].y)}`, last = toCurrent ? state.currentPoint : points[0], start = toCurrent ? 0 : 1;
    for (let i = start; i + 2 < points.length; i += 3) {
      let p1 = points[i], p2 = points[i + 1], p3 = points[i + 2];
      d += ` C ${fmt(p1.x)} ${fmt(p1.y)} ${fmt(p2.x)} ${fmt(p2.y)} ${fmt(p3.x)} ${fmt(p3.y)}`, last = p3;
    }
    state.currentPoint = last, inPath ? appendPath(d.trim()) : emit(`<path d="${d.trim()}" ${paintAttrs(state, !1, !0)}/>`);
  }
  function emitPolyPoly(view, offset, closed, shortPoints, inPath, state, appendPath, emit) {
    let polys = view.getUint32(offset + 24, !0), totalPoints = view.getUint32(offset + 28, !0), countsOffset = offset + 32, pointsOffset = countsOffset + polys * 4, pointSize = shortPoints ? 4 : 8;
    if (!polys || !totalPoints || pointsOffset + totalPoints * pointSize > view.byteLength)
      return;
    let pointIndex = 0;
    for (let i = 0; i < polys; i++) {
      let count = view.getUint32(countsOffset + i * 4, !0);
      if (!count || pointIndex + count > totalPoints)
        break;
      let points = [];
      for (let j = 0; j < count; j++) {
        let pointOffset = pointsOffset + (pointIndex + j) * pointSize, p = shortPoints ? readPointS(view, pointOffset) : readPointL(view, pointOffset);
        points.push(transformPoint(state, p));
      }
      emitPolyline(points, closed, !1, inPath, state, appendPath, emit), pointIndex += count;
    }
  }
  function emitPolyDraw(view, offset, shortPoints, inPath, state, appendPath, emit) {
    let count = view.getUint32(offset + 24, !0), pointSize = shortPoints ? 4 : 8, pointsOffset = offset + 28, typesOffset = pointsOffset + count * pointSize;
    if (!count || typesOffset + count > view.byteLength)
      return;
    let points = [];
    for (let i2 = 0; i2 < count; i2++) {
      let pointOffset = pointsOffset + i2 * pointSize, p = shortPoints ? readPointS(view, pointOffset) : readPointL(view, pointOffset);
      points.push(transformPoint(state, p));
    }
    let d = "", i = 0;
    for (; i < count; ) {
      let t = view.getUint8(typesOffset + i), op = t & 6;
      op == 6 ? (d += ` M ${fmt(points[i].x)} ${fmt(points[i].y)}`, state.currentPoint = points[i], i++) : op == 2 ? (d += ` L ${fmt(points[i].x)} ${fmt(points[i].y)}`, state.currentPoint = points[i], i++) : op == 4 && i + 2 < count ? (d += ` C ${fmt(points[i].x)} ${fmt(points[i].y)} ${fmt(points[i + 1].x)} ${fmt(points[i + 1].y)} ${fmt(points[i + 2].x)} ${fmt(points[i + 2].y)}`, state.currentPoint = points[i + 2], i += 3) : i++, t & 1 && (d += " Z");
    }
    d = d.trim(), d && (inPath ? appendPath(d) : emit(`<path d="${d}" ${paintAttrs(state, !1, !0)}/>`));
  }
  function emitRect(view, offset, state, emit, rounded) {
    let r = readRectL(view, offset + 8), p1 = transformPoint(state, { x: r.left, y: r.top }), p2 = transformPoint(state, { x: r.right, y: r.bottom }), x = Math.min(p1.x, p2.x), y = Math.min(p1.y, p2.y), w = Math.abs(p2.x - p1.x), h = Math.abs(p2.y - p1.y), radius = rounded ? ` rx="${fmt(Math.min(w, h) / 8)}" ry="${fmt(Math.min(w, h) / 8)}"` : "";
    emit(`<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}"${radius} ${paintAttrs(state, !0, !0)}/>`);
  }
  function emitEllipse(view, offset, state, emit) {
    let r = readRectL(view, offset + 8), p1 = transformPoint(state, { x: r.left, y: r.top }), p2 = transformPoint(state, { x: r.right, y: r.bottom }), cx = (p1.x + p2.x) / 2, cy = (p1.y + p2.y) / 2, rx = Math.abs(p2.x - p1.x) / 2, ry = Math.abs(p2.y - p1.y) / 2;
    emit(`<ellipse cx="${fmt(cx)}" cy="${fmt(cy)}" rx="${fmt(rx)}" ry="${fmt(ry)}" ${paintAttrs(state, !0, !0)}/>`);
  }
  function emitArcLike(view, offset, type, inPath, state, appendPath, emit) {
    let r = readRectL(view, offset + 8), startRef = readPointL(view, offset + 24), endRef = readPointL(view, offset + 32), cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, rxRaw = Math.abs(r.right - r.left) / 2, ryRaw = Math.abs(r.bottom - r.top) / 2;
    if (!rxRaw || !ryRaw)
      return;
    let startAngle = Math.atan2(startRef.y - cy, startRef.x - cx), endAngle = Math.atan2(endRef.y - cy, endRef.x - cx), delta = endAngle - startAngle;
    delta <= 0 && (delta += Math.PI * 2);
    let largeArc = delta > Math.PI ? 1 : 0, pStart = transformPoint(state, { x: cx + Math.cos(startAngle) * rxRaw, y: cy + Math.sin(startAngle) * ryRaw }), pEnd = transformPoint(state, { x: cx + Math.cos(endAngle) * rxRaw, y: cy + Math.sin(endAngle) * ryRaw }), pCenter = transformPoint(state, { x: cx, y: cy }), pRx = transformPoint(state, { x: cx + rxRaw, y: cy }), pRy = transformPoint(state, { x: cx, y: cy + ryRaw }), rx = Math.max(0.01, Math.abs(pRx.x - pCenter.x) || Math.abs(pRy.x - pCenter.x)), ry = Math.max(0.01, Math.abs(pRy.y - pCenter.y) || Math.abs(pRx.y - pCenter.y)), arc = `A ${fmt(rx)} ${fmt(ry)} 0 ${largeArc} 1 ${fmt(pEnd.x)} ${fmt(pEnd.y)}`, d = `M ${fmt(pStart.x)} ${fmt(pStart.y)} ${arc}`, fill = !1, stroke = !0;
    type == EMR.CHORD ? (d += " Z", fill = !0) : type == EMR.PIE && (d += ` L ${fmt(pCenter.x)} ${fmt(pCenter.y)} Z`, fill = !0), type == EMR.ARCTO && (state.currentPoint = pEnd), inPath ? appendPath(d) : emit(`<path d="${d}" ${paintAttrs(state, fill, stroke)}/>`);
  }
  function parseFont2(view, offset, available) {
    let height = available >= 4 ? view.getInt32(offset, !0) : 12, weight = available >= 20 ? view.getInt32(offset + 16, !0) : 400, italic = available >= 21 ? view.getUint8(offset + 20) != 0 : !1, underline = available >= 22 ? view.getUint8(offset + 21) != 0 : !1, charset = available >= 24 ? view.getUint8(offset + 23) : 0, family = "", faceOffset = offset + 28, faceBytes = Math.max(0, Math.min(64, available - 28));
    for (let i = 0; i + 1 < faceBytes; i += 2) {
      let code = view.getUint16(faceOffset + i, !0);
      if (!code)
        break;
      family += String.fromCharCode(code);
    }
    return { type: "font", family, size: Math.abs(height) || 12, weight, italic, underline, charset };
  }
  function emitExtTextOut(view, offset, size, state, emit, unicode) {
    if (size < 76)
      return;
    let rawRef = readPointL(view, offset + 36), ref = transformPoint(state, rawRef), chars = view.getUint32(offset + 44, !0), offString = view.getUint32(offset + 48, !0);
    if (!chars || offString <= 0 || offString + chars * (unicode ? 2 : 1) > size)
      return;
    let text = unicode ? decodeUtf16(view, offset + offString, chars) : decodeGdiText(new Uint8Array(view.buffer, view.byteOffset + offset + offString, chars), state.font), dx = readTextDx(view, offset, size, chars, 72);
    emitText(text, ref, state, emit, rawRef, dx);
  }
  function emitPolyTextOut(view, offset, size, state, emit, unicode) {
    if (size < 40)
      return;
    let count = view.getUint32(offset + 36, !0), textOffset = offset + 40;
    for (let i = 0; i < count && textOffset + 40 <= offset + size; i++, textOffset += 40) {
      let rawRef = readPointL(view, textOffset), ref = transformPoint(state, rawRef), chars = view.getUint32(textOffset + 8, !0), offString = view.getUint32(textOffset + 12, !0);
      if (!chars || !offString || offString + chars * (unicode ? 2 : 1) > size)
        continue;
      let text = unicode ? decodeUtf16(view, offset + offString, chars) : decodeGdiText(new Uint8Array(view.buffer, view.byteOffset + offset + offString, chars), state.font), dx = readTextDx(view, offset, size, chars, textOffset + 36 - offset);
      emitText(text, ref, state, emit, rawRef, dx);
    }
  }
  function emitSmallTextOut(view, offset, size, state, emit) {
    if (size < 36)
      return;
    let ref = transformPoint(state, readPointL(view, offset + 8)), chars = view.getUint32(offset + 16, !0), textOffset = view.getUint32(offset + 20, !0) & 512 ? 40 : 28;
    if (!chars || textOffset + chars > size)
      return;
    let text = decodeGdiText(new Uint8Array(view.buffer, view.byteOffset + offset + textOffset, chars), state.font);
    emitText(text, ref, state, emit);
  }
  function readTextDx(view, recordOffset, recordSize, chars, offDxFieldOffset) {
    if (!chars || offDxFieldOffset + 4 > recordSize)
      return null;
    let offDx = view.getUint32(recordOffset + offDxFieldOffset, !0);
    if (!offDx || offDx + chars * 4 > recordSize)
      return null;
    let dx = [];
    for (let i = 0; i < chars; i++)
      dx.push(view.getUint32(recordOffset + offDx + i * 4, !0));
    return dx;
  }
  function decodeUtf16(view, offset, chars) {
    let text = "";
    for (let i = 0; i < chars; i++) {
      let code = view.getUint16(offset + i * 2, !0);
      code && (text += String.fromCharCode(code));
    }
    return text;
  }
  function decodeAnsi(bytes, encoding = "windows-1252") {
    if (!bytes.length)
      return "";
    let decoder = globalThis.TextDecoder;
    if (decoder)
      try {
        return new decoder(encoding).decode(bytes).replace(/\0+$/g, "");
      } catch {
        try {
          return new decoder("windows-1252").decode(bytes).replace(/\0+$/g, "");
        } catch {
        }
      }
    let text = "";
    for (let b of bytes)
      b && (text += String.fromCharCode(b));
    return text;
  }
  var SYMBOL_ENCODING_LOW = " !∀#∃%&∋()∗+,−./0123456789:;<=>?≅ΑΒΧ∆ΕΦΓΗΙϑΚΛΜΝΟΠΘΡΣΤΥςΩΞΨΖ[∴]⊥_⎯αβχδεφγηιϕκλµνοπθρστυϖωξψζ{|}∼", SYMBOL_ENCODING_HIGH = "€ϒ′≤⁄∞ƒ♣♦♥♠↔←↑→↓°±″≥×∝∂•÷≠≡≈…⏐⎯↵ℵℑℜ℘⊗⊕∅∩∪⊃⊇⊄⊂⊆∈∉∠∇®©™∏√⋅¬∧∨⇔⇐⇑⇒⇓◊〈®©™∑⎛⎜⎝⎡⎢⎣⎧⎨⎩⎪\0〉∫⌠⎮⌡⎞⎟⎠⎤⎥⎦⎫⎬⎭";
  function encodingForGdiCharset(font) {
    switch (font?.charset) {
      case 77:
        return "macintosh";
      case 128:
        return "shift_jis";
      case 129:
        return "euc-kr";
      case 134:
        return "gb18030";
      case 136:
        return "big5";
      case 161:
        return "windows-1253";
      case 162:
        return "windows-1254";
      case 163:
        return "windows-1258";
      case 177:
        return "windows-1255";
      case 178:
        return "windows-1256";
      case 186:
        return "windows-1257";
      case 204:
        return "windows-1251";
      case 222:
        return "windows-874";
      case 238:
        return "windows-1250";
      default:
        return "windows-1252";
    }
  }
  function decodeGdiText(bytes, font) {
    if (!(font?.charset == 2 || /(?:^|\s)Symbol(?:\s|$)/i.test(font?.family ?? "")))
      return decodeAnsi(bytes, encodingForGdiCharset(font));
    let text = "";
    for (let byte of bytes) {
      if (!byte)
        continue;
      let decoded = "";
      byte >= 32 && byte <= 126 ? decoded = SYMBOL_ENCODING_LOW[byte - 32] ?? "" : byte >= 160 && byte <= 254 && (decoded = SYMBOL_ENCODING_HIGH[byte - 160] ?? ""), text += decoded && decoded != "\0" ? decoded : String.fromCharCode(byte);
    }
    return text;
  }
  function textAttrs(state, ref) {
    let font = state.font, fontSize = Math.max(1, (font?.size ?? 12) * approximateScale(state));
    return [
      `x="${fmt(ref.x)}"`,
      `y="${fmt(ref.y)}"`,
      `fill="${state.textColor}"`,
      `font-size="${fmt(fontSize)}"`,
      font?.family ? `font-family="${esc(font.family)}"` : "",
      font?.weight ? `font-weight="${font.weight >= 600 ? "bold" : "normal"}"` : "",
      font?.italic ? 'font-style="italic"' : "",
      font?.underline ? 'text-decoration="underline"' : "",
      textAnchorAttr(state),
      baselineAttr(state)
    ].filter(Boolean).join(" ");
  }
  function textAnchorAttr(state) {
    let horizontal = state.textAlign & 6;
    return horizontal == 6 ? 'text-anchor="middle"' : horizontal == 2 ? 'text-anchor="end"' : "";
  }
  function baselineAttr(state) {
    let vertical = state.textAlign & 24;
    return vertical == 0 ? 'dominant-baseline="text-before-edge"' : vertical == 8 ? 'dominant-baseline="text-after-edge"' : "";
  }
  function canUseExplicitTextOrigins(state, text, dx) {
    return !dx || dx.length < text.length ? !1 : (state.textAlign & 6) == 0;
  }
  function emitText(text, ref, state, emit, rawRef, dx) {
    if (text) {
      if (rawRef && canUseExplicitTextOrigins(state, text, dx)) {
        let advance = 0, tspans = "";
        for (let i = 0; i < text.length; i++) {
          let p = transformPoint(state, { x: rawRef.x + advance, y: rawRef.y });
          tspans += `<tspan x="${fmt(p.x)}" y="${fmt(p.y)}">${esc(text[i])}</tspan>`, advance += dx[i] || 0;
        }
        emit(`<text ${textAttrs(state, ref)}>${tspans}</text>`);
        return;
      }
      emit(`<text ${textAttrs(state, ref)}>${esc(text)}</text>`);
    }
  }
  function emitPixel(view, offset, state, emit) {
    if (offset + 20 > view.byteLength)
      return;
    let p = transformPoint(state, readPointL(view, offset + 8)), color = colorRefToCss(view.getUint32(offset + 16, !0));
    emit(`<rect x="${fmt(p.x)}" y="${fmt(p.y)}" width="1" height="1" fill="${color}" stroke="none"/>`);
  }
  function emitBitmapRecord(view, offset, size, type, state, emit) {
    let xDest = 0, yDest = 0, cxDest = 0, cyDest = 0, offBmi = 0, cbBmi = 0, offBits = 0, cbBits = 0, rop = 0;
    if (type == EMR.STRETCHDIBITS) {
      if (size < 80)
        return;
      xDest = view.getInt32(offset + 24, !0), yDest = view.getInt32(offset + 28, !0), offBmi = view.getUint32(offset + 48, !0), cbBmi = view.getUint32(offset + 52, !0), offBits = view.getUint32(offset + 56, !0), cbBits = view.getUint32(offset + 60, !0), rop = view.getUint32(offset + 68, !0), cxDest = view.getInt32(offset + 72, !0), cyDest = view.getInt32(offset + 76, !0);
    } else {
      if (size < 100)
        return;
      xDest = view.getInt32(offset + 24, !0), yDest = view.getInt32(offset + 28, !0), cxDest = view.getInt32(offset + 32, !0), cyDest = view.getInt32(offset + 36, !0), offBmi = view.getUint32(offset + 84, !0), cbBmi = view.getUint32(offset + 88, !0), offBits = view.getUint32(offset + 92, !0), cbBits = view.getUint32(offset + 96, !0), rop = size >= 84 ? view.getUint32(offset + 80, !0) : 0;
    }
    if (!offBmi || !cbBmi || !offBits || !cbBits || offBmi + cbBmi > size || offBits + cbBits > size || (rop == ROP_SRCAND || rop == ROP_SRCPAINT) && isMonochromeDib(view, offset, offBmi, cbBmi))
      return;
    let imageUrl = dibToImageDataUrl(view, offset, offBmi, cbBmi, offBits, cbBits, rop);
    if (!imageUrl)
      return;
    let p1 = transformPoint(state, { x: xDest, y: yDest }), p2 = transformPoint(state, { x: xDest + cxDest, y: yDest + cyDest }), x = Math.min(p1.x, p2.x), y = Math.min(p1.y, p2.y), w = Math.abs(p2.x - p1.x), h = Math.abs(p2.y - p1.y);
    emit(`<image x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}" href="${imageUrl}" preserveAspectRatio="none"/>`);
  }
  function dibToImageDataUrl(view, recordOffset, offBmi, cbBmi, offBits, cbBits, rop) {
    let bmiStart = recordOffset + offBmi, bitsStart = recordOffset + offBits;
    if (cbBmi < 4 || bmiStart + cbBmi > view.byteLength || bitsStart + cbBits > view.byteLength)
      return null;
    let compression = view.getUint32(bmiStart, !0) >= 40 && cbBmi >= 20 ? view.getUint32(bmiStart + 16, !0) : 0, bits = new Uint8Array(view.buffer, view.byteOffset + bitsStart, cbBits);
    if (compression == 4)
      return `data:image/jpeg;base64,${base64(bits)}`;
    if (compression == 5)
      return `data:image/png;base64,${base64(bits)}`;
    let png = dibToPngDataUrl(view, bmiStart, cbBmi, bitsStart, cbBits, rop);
    if (png)
      return png;
    let dib = new Uint8Array(cbBmi + cbBits);
    return dib.set(new Uint8Array(view.buffer, view.byteOffset + bmiStart, cbBmi), 0), dib.set(bits, cbBmi), dibToBmpDataUrl(dib, cbBmi);
  }
  function isMonochromeDib(view, recordOffset, offBmi, cbBmi) {
    let bmiStart = recordOffset + offBmi;
    if (cbBmi < 16 || bmiStart + cbBmi > view.byteLength)
      return !1;
    let headerSize = view.getUint32(bmiStart, !0);
    return headerSize >= 40 && cbBmi >= 16 ? view.getUint16(bmiStart + 14, !0) == 1 : headerSize == 12 && cbBmi >= 10 ? view.getUint16(bmiStart + 10, !0) == 1 : !1;
  }
  function dibToPngDataUrl(view, bmiStart, cbBmi, bitsStart, cbBits, rop) {
    try {
      let info = readDibInfo(view, bmiStart, cbBmi);
      if (!info || !isReasonableRasterDimensions(info.width, info.height) || info.width * info.height > DIB_TO_PNG_MAX_PIXELS)
        return null;
      let stride = Math.floor((info.width * info.bitCount + 31) / 32) * 4;
      if (stride <= 0 || stride * info.height > cbBits)
        return null;
      let rgba = new Uint8Array(info.width * info.height * 4);
      for (let y = 0; y < info.height; y++) {
        let sourceY = info.bottomUp ? info.height - 1 - y : y, row = bitsStart + sourceY * stride;
        for (let x = 0; x < info.width; x++) {
          let out = (y * info.width + x) * 4;
          writeDibPixel(view, row, x, info, rgba, out), rop == ROP_SRCAND && isRgbNearWhite(rgba[out], rgba[out + 1], rgba[out + 2]) && (rgba[out + 3] = 0);
        }
      }
      let encoded = UPNG.encode([rgba.buffer], info.width, info.height, 0);
      return `data:image/png;base64,${base64(new Uint8Array(encoded))}`;
    } catch {
      return null;
    }
  }
  function isRgbNearWhite(r, g, b) {
    return r >= 250 && g >= 250 && b >= 250;
  }
  function readDibInfo(view, bmiStart, cbBmi) {
    if (cbBmi < 12 || bmiStart + cbBmi > view.byteLength)
      return null;
    let headerSize = view.getUint32(bmiStart, !0);
    if (headerSize == 12) {
      let width2 = view.getUint16(bmiStart + 4, !0), rawHeight2 = view.getUint16(bmiStart + 6, !0), bitCount2 = view.getUint16(bmiStart + 10, !0), palette2 = readDibPalette(view, bmiStart + headerSize, cbBmi - headerSize, bitCount2, 3, 0);
      return { width: width2, height: rawHeight2, bitCount: bitCount2, bottomUp: !0, palette: palette2, redMask: 0, greenMask: 0, blueMask: 0, alphaMask: 0 };
    }
    if (headerSize < 40 || cbBmi < headerSize || bmiStart + headerSize > view.byteLength)
      return null;
    let width = view.getInt32(bmiStart + 4, !0), rawHeight = view.getInt32(bmiStart + 8, !0), bitCount = view.getUint16(bmiStart + 14, !0), compression = view.getUint32(bmiStart + 16, !0), clrUsed = view.getUint32(bmiStart + 32, !0), maskOffset = bmiStart + headerSize, redMask = bitCount == 16 ? 31744 : 16711680, greenMask = bitCount == 16 ? 992 : 65280, blueMask = bitCount == 16 ? 31 : 255, alphaMask = bitCount == 32 ? 4278190080 : 0;
    compression == 3 && headerSize == 40 && cbBmi >= 52 && (redMask = view.getUint32(maskOffset, !0), greenMask = view.getUint32(maskOffset + 4, !0), blueMask = view.getUint32(maskOffset + 8, !0), maskOffset += 12, cbBmi >= 56 && (alphaMask = view.getUint32(maskOffset, !0), maskOffset += 4));
    let paletteOffset = headerSize == 40 && compression == 3 ? maskOffset : bmiStart + headerSize, palette = readDibPalette(view, paletteOffset, Math.max(0, bmiStart + cbBmi - paletteOffset), bitCount, 4, clrUsed);
    return {
      width: Math.abs(width),
      height: Math.abs(rawHeight),
      bitCount,
      bottomUp: rawHeight > 0,
      palette,
      redMask,
      greenMask,
      blueMask,
      alphaMask
    };
  }
  function readDibPalette(view, offset, availableBytes, bitCount, entryBytes, clrUsed) {
    if (bitCount > 8 || availableBytes < entryBytes)
      return [];
    let maxColors = Math.min(clrUsed || 1 << bitCount, Math.floor(availableBytes / entryBytes)), palette = [];
    for (let i = 0; i < maxColors; i++) {
      let p = offset + i * entryBytes;
      entryBytes == 3 ? palette.push([view.getUint8(p + 2), view.getUint8(p + 1), view.getUint8(p), 255]) : palette.push([view.getUint8(p + 2), view.getUint8(p + 1), view.getUint8(p), 255]);
    }
    return palette;
  }
  function writeDibPixel(view, row, x, info, rgba, out) {
    let r = 0, g = 0, b = 0, a = 255;
    if (info.bitCount == 1) {
      let index = view.getUint8(row + (x >> 3)) >> 7 - (x & 7) & 1;
      [r, g, b, a] = dibPaletteColor(info, index);
    } else if (info.bitCount == 4) {
      let value = view.getUint8(row + (x >> 1)), index = x & 1 ? value & 15 : value >> 4;
      [r, g, b, a] = dibPaletteColor(info, index);
    } else if (info.bitCount == 8)
      [r, g, b, a] = dibPaletteColor(info, view.getUint8(row + x));
    else if (info.bitCount == 16) {
      let value = view.getUint16(row + x * 2, !0);
      r = scaleMaskedColor(value, info.redMask), g = scaleMaskedColor(value, info.greenMask), b = scaleMaskedColor(value, info.blueMask);
    } else if (info.bitCount == 24)
      b = view.getUint8(row + x * 3), g = view.getUint8(row + x * 3 + 1), r = view.getUint8(row + x * 3 + 2);
    else if (info.bitCount == 32) {
      let value = view.getUint32(row + x * 4, !0);
      r = scaleMaskedColor(value, info.redMask), g = scaleMaskedColor(value, info.greenMask), b = scaleMaskedColor(value, info.blueMask), a = info.alphaMask ? scaleMaskedColor(value, info.alphaMask) : 255;
    }
    rgba[out] = r, rgba[out + 1] = g, rgba[out + 2] = b, rgba[out + 3] = a;
  }
  function dibPaletteColor(info, index) {
    return info.palette[index] ?? [index, index, index, 255];
  }
  function scaleMaskedColor(value, mask) {
    if (!mask)
      return 0;
    let shift = 0, m = mask >>> 0;
    for (; m && !(m & 1); )
      m >>>= 1, shift++;
    let max = m || 1;
    return Math.round(((value & mask) >>> shift) * 255 / max);
  }
  function dibToBmpDataUrl(dib, headerBytes) {
    if (!dib?.length || headerBytes <= 0 || headerBytes > dib.length)
      return null;
    let fileHeaderSize = 14, fileSize = fileHeaderSize + dib.length, pixelOffset = fileHeaderSize + headerBytes, out = new Uint8Array(fileSize);
    return out[0] = 66, out[1] = 77, writeU322(out, 2, fileSize), writeU322(out, 10, pixelOffset), out.set(dib, fileHeaderSize), `data:image/bmp;base64,${base64(out)}`;
  }
  function emitEmbeddedRasterFallback(data, bounds) {
    let url = findEmbeddedRasterDataUrl(data);
    if (!url)
      return [];
    let width = Math.max(1, bounds.right - bounds.left), height = Math.max(1, bounds.bottom - bounds.top);
    return [`<image x="${fmt(bounds.left)}" y="${fmt(bounds.top)}" width="${fmt(width)}" height="${fmt(height)}" href="${url}" preserveAspectRatio="xMidYMid meet"/>`];
  }
  function extractEmbeddedRasterDataUrl(data, options = {}) {
    let candidate = findBestEmbeddedRasterCandidate(data, options);
    return candidate ? `data:${candidate.mime};base64,${base64(candidate.data)}` : null;
  }
  function findEmbeddedRasterDataUrl(data) {
    return extractEmbeddedRasterDataUrl(data);
  }
  function findBestEmbeddedRasterCandidate(data, options = {}) {
    let best = null, consider = (candidate) => {
      !candidate || !embeddedRasterCandidateAllowed(candidate, options) || (!best || compareEmbeddedRasterCandidates(candidate, best) > 0) && (best = candidate);
    };
    return findPngCandidates(data, consider), findJpegCandidates(data, consider), findBmpCandidates(data, consider), best;
  }
  function embeddedRasterCandidateAllowed(candidate, options) {
    return !isReasonableRasterDimensions(candidate.width, candidate.height) || options.minWidth && candidate.width < options.minWidth || options.minHeight && candidate.height < options.minHeight || options.minArea && candidate.width * candidate.height < options.minArea ? !1 : candidate.bytes > 0;
  }
  function compareEmbeddedRasterCandidates(a, b) {
    let area = a.width * a.height - b.width * b.height;
    return area || a.bytes - b.bytes;
  }
  function isReasonableRasterDimensions(width, height) {
    return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0 && width <= 16384 && height <= 16384;
  }
  function findPngCandidates(data, emit) {
    let sig = [137, 80, 78, 71, 13, 10, 26, 10];
    for (let i = 0; i + sig.length + 12 <= data.length; i++) {
      if (!startsWith(data, sig, i))
        continue;
      let p = i + 8, lastValidEnd = p, hasIhdr = !1, hasIdat = !1, hasIend = !1, width = 0, height = 0;
      for (; p + 12 <= data.length; ) {
        let len = readU32BE(data, p);
        if (!isPngChunkType(data, p + 4) || p + 12 + len > data.length)
          break;
        let type = String.fromCharCode(data[p + 4], data[p + 5], data[p + 6], data[p + 7]);
        if (type == "IHDR" && len >= 8 && (width = readU32BE(data, p + 8), height = readU32BE(data, p + 12)), p += 12 + len, lastValidEnd = p, type == "IHDR" ? hasIhdr = !0 : type == "IDAT" && (hasIdat = !0), type == "IEND") {
          hasIend = !0, emit({ mime: "image/png", data: data.subarray(i, p), width, height, bytes: p - i });
          break;
        }
      }
      !hasIend && hasIhdr && hasIdat && lastValidEnd > i + 8 && emit({ mime: "image/png", data: appendPngIend(data.subarray(i, lastValidEnd)), width, height, bytes: lastValidEnd - i });
    }
  }
  function isPngChunkType(data, offset) {
    if (offset + 4 > data.length)
      return !1;
    for (let i = 0; i < 4; i++) {
      let c = data[offset + i];
      if (!(c >= 65 && c <= 90 || c >= 97 && c <= 122))
        return !1;
    }
    return !0;
  }
  function appendPngIend(data) {
    let iend = new Uint8Array([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]), out = new Uint8Array(data.length + iend.length);
    return out.set(data, 0), out.set(iend, data.length), out;
  }
  function findJpegCandidates(data, emit) {
    for (let i = 0; i + 4 < data.length; i++) {
      if (data[i] != 255 || data[i + 1] != 216 || data[i + 2] != 255)
        continue;
      let width = 0, height = 0;
      for (let j = i + 4; j + 1 < data.length; j++) {
        if (data[j] == 255 && data[j + 1] == 217) {
          emit({ mime: "image/jpeg", data: data.subarray(i, j + 2), width, height, bytes: j + 2 - i });
          break;
        }
        if (data[j] != 255 || j + 4 >= data.length)
          continue;
        let marker = data[j + 1];
        if (marker == 218)
          continue;
        let len = data[j + 2] << 8 | data[j + 3];
        len < 2 || j + 2 + len > data.length || (marker >= 192 && marker <= 195 || marker >= 197 && marker <= 199 || marker >= 201 && marker <= 203 || marker >= 205 && marker <= 207) && len >= 7 && (height = data[j + 5] << 8 | data[j + 6], width = data[j + 7] << 8 | data[j + 8]);
      }
    }
  }
  function findBmpCandidates(data, emit) {
    for (let i = 0; i + 14 < data.length; i++) {
      if (data[i] != 66 || data[i + 1] != 77)
        continue;
      let fileSize = readU32LE(data, i + 2);
      if (fileSize <= 14 || i + fileSize > data.length)
        continue;
      let dibOffset = i + 14, headerSize = dibOffset + 4 <= data.length ? readU32LE(data, dibOffset) : 0;
      if (headerSize < 12 || dibOffset + headerSize > data.length)
        continue;
      let width = headerSize >= 40 ? Math.abs(readS32LE(data, dibOffset + 4)) : readU16LE(data, dibOffset + 4), height = headerSize >= 40 ? Math.abs(readS32LE(data, dibOffset + 8)) : readU16LE(data, dibOffset + 6);
      emit({ mime: "image/bmp", data: data.subarray(i, i + fileSize), width, height, bytes: fileSize });
    }
  }
  function startsWith(data, sig, offset) {
    for (let i = 0; i < sig.length; i++)
      if (data[offset + i] != sig[i])
        return !1;
    return !0;
  }
  function readU32BE(data, offset) {
    return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
  }
  function readU32LE(data, offset) {
    return (data[offset] | data[offset + 1] << 8 | data[offset + 2] << 16 | data[offset + 3] << 24) >>> 0;
  }
  function readS32LE(data, offset) {
    let value = readU32LE(data, offset);
    return value > 2147483647 ? value - 4294967296 : value;
  }
  function readU16LE(data, offset) {
    return (data[offset] | data[offset + 1] << 8) >>> 0;
  }
  function readI16LE(data, offset) {
    let value = readU16LE(data, offset);
    return value > 32767 ? value - 65536 : value;
  }
  function writeU322(out, offset, value) {
    out[offset] = value & 255, out[offset + 1] = value >> 8 & 255, out[offset + 2] = value >> 16 & 255, out[offset + 3] = value >> 24 & 255;
  }
  function base64(bytes) {
    let binary = "";
    for (let i = 0; i < bytes.length; i += 32768)
      binary += String.fromCharCode(...bytes.subarray(i, i + 32768));
    if (typeof btoa == "function")
      return btoa(binary);
    let buffer = globalThis.Buffer;
    return buffer ? buffer.from(bytes).toString("base64") : binary;
  }
  function emptySvg(width, height, viewLeft, viewTop, physicalWidth, physicalHeight, message) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(physicalWidth)}mm" height="${fmt(physicalHeight)}mm" viewBox="${fmt(viewLeft)} ${fmt(viewTop)} ${fmt(width)} ${fmt(height)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="emf"><rect x="${fmt(viewLeft)}" y="${fmt(viewTop)}" width="${fmt(width)}" height="${fmt(height)}" fill="none" stroke="#999" stroke-width="1"/><text x="${fmt(viewLeft + width / 2)}" y="${fmt(viewTop + height / 2)}" text-anchor="middle" font-size="12" fill="#666">${esc(message)}</text></svg>`;
  }

  // src/model/word-document.ts
  var UTIF = __toESM(require_UTIF()), UPNG2 = __toESM(require_UPNG());

  // src/security/links.ts
  function normalizeHref(value) {
    return value?.trim().replace(/[\u0000-\u0020\u007f-\u009f]+/g, "") || void 0;
  }
  function sanitizeExternalResourceHref(value, policy = "block", allowInternalBlob = !1) {
    let compact = normalizeHref(value);
    if (compact) {
      if (/^data:image\//i.test(compact)) return compact;
      if (/^blob:/i.test(compact)) return allowInternalBlob ? compact : void 0;
      if (!(policy !== "allow" || compact.startsWith("//") || compact.includes("\\")))
        return /^https?:/i.test(compact) ? compact : void 0;
    }
  }
  function sanitizeDocumentStyleText(value) {
    return String(value ?? "").split(";").filter((entry) => /^\s*-?[a-z][a-z0-9-]*\s*:/i.test(entry) && !/(?:url|image-set|expression)\s*\(|@import|(?:java|vb)script\s*:|behavior\s*:|-moz-binding/i.test(entry)).join(";");
  }
  function sanitizeSvgPaint(value) {
    let paint = String(value ?? "").trim();
    return /^(?:none|transparent|currentcolor|#[0-9a-f]{3,8}|[a-z]{1,32}|(?:rgb|hsl)a?\([0-9%.,+\-\s]+\))$/i.test(paint) ? paint : void 0;
  }

  // src/model/word-document.ts
  var EMF_FULL_VECTOR_INPUT_LIMIT = 32 * 1024 * 1024, EMF_EMBEDDED_VECTOR_INPUT_LIMIT = 96 * 1024 * 1024, EMF_FULL_VECTOR_DATA_URL_LIMIT = 16 * 1024 * 1024, EMF_FULL_VECTOR_BLOB_URL_LIMIT = 128 * 1024 * 1024, EMF_LARGE_RASTER_PREVIEW_MIN_AREA = 128 * 1024, topLevelRels = [
    { type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */, target: "word/document.xml" },
    { type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" /* ExtendedProperties */, target: "docProps/app.xml" },
    { type: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" /* CoreProperties */, target: "docProps/core.xml" },
    { type: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties" /* CustomProperties */, target: "docProps/custom.xml" }
  ], WordDocument = class _WordDocument {
    constructor() {
      this._objectUrls = /* @__PURE__ */ new Set();
      this._assetUrlPromises = /* @__PURE__ */ new Map();
      this._disposed = !1;
      this.parts = [];
      this.partsMap = {};
      this.contentTypes = [];
      this._partLoadPromises = {};
    }
    static fromSnapshot(snapshot, options, sourcePackage) {
      let d = new _WordDocument();
      d._options = options, d.rels = snapshot.rels ?? [], d.contentTypes = snapshot.contentTypes ?? [], d.parts = [], d.partsMap = {}, d._package = sourcePackage;
      for (let partSnapshot of snapshot.parts ?? []) {
        let part = d.restoreSnapshotPart(partSnapshot);
        part && (d.parts.push(part), d.partsMap[part.path] = part);
      }
      return d;
    }
    static async load(blob, parser, options) {
      let pkg = await OpenXmlPackage.load(blob, options);
      try {
        return await this.loadPackage(pkg, parser, options);
      } catch (error) {
        throw pkg.dispose(), error;
      }
    }
    /** @internal Worker entrypoint that preserves package ownership after parsing. */
    static async loadPackage(pkg, parser, options) {
      var d = new _WordDocument();
      d._options = options, d._parser = parser, d._package = pkg, d.rels = await d._package.loadRelationships(), d.contentTypes = await d._package.loadContentTypes();
      let officeRel = d.rels.find((x) => x.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */) ?? topLevelRels.find((x) => x.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */);
      return await Promise.all(topLevelRels.filter((rel) => rel.type !== "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */).map((rel) => {
        let r = d.rels.find((x) => x.type === rel.type) ?? rel;
        return d.loadRelationshipPart(r.target, r.type);
      })), officeRel && (await d.preloadThemeForDocumentPart(officeRel.target), await d.loadRelationshipPart(officeRel.target, officeRel.type)), d;
    }
    async getPackageStreamStatus() {
      return await this._package.getStreamStatus();
    }
    dispose() {
      if (!this._disposed) {
        this._disposed = !0;
        for (let url of this._objectUrls)
          try {
            URL.revokeObjectURL(url);
          } catch {
          }
        this._objectUrls.clear(), this._assetUrlPromises.clear(), this._package?.dispose();
      }
    }
    restoreSnapshotPart(snapshot) {
      let part = {
        path: snapshot.path,
        rels: snapshot.rels ?? []
      };
      switch (Object.assign(part, snapshot.data ?? {}), snapshot.kind) {
        case "document":
          this.documentPart = part;
          break;
        case "fontTable":
          this.fontTablePart = part;
          break;
        case "numbering":
          this.numberingPart = part;
          break;
        case "styles":
          this.stylesPart = part;
          break;
        case "theme":
          this.themePart = part;
          break;
        case "footnotes":
          this.footnotesPart = part;
          break;
        case "endnotes":
          this.endnotesPart = part;
          break;
        case "coreProps":
          this.corePropsPart = part;
          break;
        case "extendedProps":
          this.extendedPropsPart = part;
          break;
        case "settings":
          this.settingsPart = part;
          break;
        case "comments":
          part.commentMap = keyBy(part.comments ?? [], (x) => x.id), this.commentsPart = part;
          break;
        case "commentsExtended":
          part.commentMap = keyBy(part.comments ?? [], (x) => x.paraId), this.commentsExtendedPart = part;
          break;
      }
      return part;
    }
    createSnapshot() {
      return {
        rels: this.rels ?? [],
        contentTypes: this.contentTypes ?? [],
        parts: this.parts.map((p) => this.snapshotPart(p)).filter(Boolean)
      };
    }
    snapshotPart(part) {
      let anyPart = part, kind = "part", data = {};
      if (part === this.documentPart)
        kind = "document", data = { body: anyPart.body };
      else if (part === this.fontTablePart)
        kind = "fontTable", data = { fonts: anyPart.fonts };
      else if (part === this.numberingPart)
        kind = "numbering", data = { numberings: anyPart.numberings, abstractNumberings: anyPart.abstractNumberings, bulletPictures: anyPart.bulletPictures, domNumberings: anyPart.domNumberings };
      else if (part === this.stylesPart)
        kind = "styles", data = { styles: anyPart.styles };
      else if (part === this.themePart)
        kind = "theme", data = { theme: anyPart.theme };
      else if (part === this.footnotesPart)
        kind = "footnotes", data = { notes: anyPart.notes };
      else if (part === this.endnotesPart)
        kind = "endnotes", data = { notes: anyPart.notes };
      else if (part === this.corePropsPart)
        kind = "coreProps", data = { props: anyPart.props };
      else if (part === this.extendedPropsPart)
        kind = "extendedProps", data = { props: anyPart.props };
      else if (part === this.settingsPart)
        kind = "settings", data = { settings: anyPart.settings };
      else if (part === this.commentsPart)
        kind = "comments", data = { comments: anyPart.comments };
      else if (part === this.commentsExtendedPart)
        kind = "commentsExtended", data = { comments: anyPart.comments };
      else if (anyPart.rootElement)
        kind = anyPart.rootElement.type === "header" ? "header" : "footer", data = { rootElement: anyPart.rootElement };
      else return null;
      return { kind, path: part.path, rels: part.rels ?? [], data };
    }
    blobWithContentType(blob, path) {
      if (!blob)
        return null;
      if (path) {
        let ct = this.contentTypes.find((x) => x.partName === path || x.extension && path.endsWith(`.${x.extension}`));
        return ct ? new Blob([blob], { type: ct.contentType }) : blob;
      }
      return blob;
    }
    save(type = "blob") {
      return this._package.save(type);
    }
    async loadRelationshipPart(path, type) {
      let pending = this._partLoadPromises[path];
      if (pending)
        return pending;
      if (this.partsMap[path])
        return this.partsMap[path];
      let promise = this.loadRelationshipPartOnce(path, type);
      this._partLoadPromises[path] = promise;
      try {
        return await promise;
      } finally {
        delete this._partLoadPromises[path];
      }
    }
    async preloadThemeForDocumentPart(path) {
      if (!path || !this._package.get(path))
        return;
      let themeRel = (await this._package.loadRelationships(path) ?? []).find((rel) => rel.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" /* Theme */ && rel.targetMode !== "External");
      if (!themeRel)
        return;
      let [folder] = splitPath(path);
      await this.loadRelationshipPart(resolvePath(themeRel.target, folder), themeRel.type);
    }
    async loadRelationshipPartOnce(path, type) {
      if (!this._package.get(path))
        return null;
      let part = null;
      switch (type) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */:
          this.documentPart = part = new DocumentPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable" /* FontTable */:
          this.fontTablePart = part = new FontTablePart(this._package, path);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" /* Numbering */:
          this.numberingPart = part = new NumberingPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" /* Styles */:
          this.stylesPart = part = new StylesPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" /* Theme */:
          this.themePart = part = new ThemePart(this._package, path);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes" /* Footnotes */:
          this.footnotesPart = part = new FootnotesPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes" /* Endnotes */:
          this.endnotesPart = part = new EndnotesPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" /* Footer */:
          part = new FooterPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" /* Header */:
          part = new HeaderPart(this._package, path, this._parser);
          break;
        case "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" /* CoreProperties */:
          this.corePropsPart = part = new CorePropsPart(this._package, path);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" /* ExtendedProperties */:
          this.extendedPropsPart = part = new ExtendedPropsPart(this._package, path);
          break;
        case "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties" /* CustomProperties */:
          part = new CustomPropsPart(this._package, path);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" /* Settings */:
          this.settingsPart = part = new SettingsPart(this._package, path);
          break;
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments" /* Comments */:
          this.commentsPart = part = new CommentsPart(this._package, path, this._parser);
          break;
        case "http://schemas.microsoft.com/office/2011/relationships/commentsExtended" /* CommentsExtended */:
          this.commentsExtendedPart = part = new CommentsExtendedPart(this._package, path);
          break;
      }
      if (part == null)
        return Promise.resolve(null);
      if (this.partsMap[path] = part, this.parts.push(part), await part.load(), part === this.themePart && this._parser?.setTheme?.(part.theme), part.rels?.length > 0) {
        let [folder] = splitPath(part.path);
        await Promise.all(part.rels.filter((rel) => rel.targetMode !== "External").map((rel) => this.loadRelationshipPart(resolvePath(rel.target, folder), rel.type)));
      }
      return part;
    }
    async loadRelationshipXml(id, part) {
      let sourcePart = part ?? this.documentPart, rel = this.getRelById(sourcePart, id);
      if (!rel || rel.targetMode === "External")
        return null;
      let path = this.resolveRelationshipTarget(sourcePart, rel), normalizedPath = normalizeSnapshotPath(path), xmlText = normalizedPath ? await this._package.load(normalizedPath, "string") : null;
      return xmlText ? this._package.parseXmlDocument(xmlText) : null;
    }
    async loadRelationshipText(id, part) {
      let sourcePart = part ?? this.documentPart, rel = this.getRelById(sourcePart, id);
      if (!rel || rel.targetMode === "External")
        return null;
      let path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? this._package.load(path, "string") : null;
    }
    async loadRelationshipBlobUrl(id, part, resourcePolicy = "block") {
      let sourcePart = part ?? this.documentPart, rel = this.getRelById(sourcePart, id);
      if (!rel)
        return null;
      if (rel.targetMode === "External")
        return sanitizeExternalResourceHref(rel.target, resourcePolicy) ?? null;
      let path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? this.loadPackageAssetUrl(path) : null;
    }
    async loadDocumentImage(id, part, resourcePolicy = "block") {
      let sourcePart = part ?? this.documentPart, rel = this.getRelById(sourcePart, id);
      if (!rel)
        return null;
      if (rel.targetMode === "External")
        return sanitizeExternalResourceHref(rel.target, resourcePolicy) ?? null;
      let path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? this.loadPackageAssetUrl(path) : null;
    }
    async loadNumberingImage(id) {
      let path = normalizeSnapshotPath(this.getPathById(this.numberingPart, id));
      return path ? this.loadPackageAssetUrl(path) : null;
    }
    async loadFont(id, key) {
      let path = normalizeSnapshotPath(this.getPathById(this.fontTablePart, id));
      if (!path) return null;
      let x = await this._package.load(path, "uint8array");
      return x && this.blobToURL(new Blob([deobfuscate(x, key)]), path);
    }
    async loadAltChunk(id, part) {
      let sourcePart = part ?? this.documentPart, rel = this.getRelById(sourcePart, id);
      if (!rel || rel.targetMode === "External")
        return Promise.resolve(null);
      let path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? this._package.load(path, "string") : null;
    }
    blobToURL(blob, path) {
      if (!blob)
        return null;
      if (blob = this.blobWithContentType(blob, path), this._options.useBase64URL)
        return blobToBase64(blob);
      let url = URL.createObjectURL(blob);
      return this._objectUrls.add(url), url;
    }
    async loadPackageAssetUrl(path) {
      let normalizedPath = normalizeSnapshotPath(path);
      if (!normalizedPath)
        return null;
      let pending = this._assetUrlPromises.get(normalizedPath);
      return pending || (pending = this.loadPackageAssetUrlOnce(normalizedPath), this._assetUrlPromises.set(normalizedPath, pending), pending.catch(() => this._assetUrlPromises.delete(normalizedPath))), pending;
    }
    async loadPackageAssetUrlOnce(normalizedPath) {
      if (this.isEmfAsset(normalizedPath)) {
        let data = await this._package.load(normalizedPath, "uint8array");
        if (!data)
          return null;
        let converted = this.convertEmfAsset(data, normalizedPath, "blobUrl");
        return converted || this.blobToURL(new Blob([data], { type: this.contentTypeForPath(normalizedPath) || "image/x-emf" }), normalizedPath);
      }
      if (this.isTiffAsset(normalizedPath)) {
        let data = await this._package.load(normalizedPath, "uint8array");
        if (!data)
          return null;
        let converted = await this.convertTiffAsset(data, normalizedPath);
        return converted || this.blobToURL(new Blob([data], { type: this.contentTypeForPath(normalizedPath) || "image/tiff" }), normalizedPath);
      }
      return this.blobToURL(await this._package.load(normalizedPath, "blob"), normalizedPath);
    }
    convertEmfAsset(data, path, mode = "dataUrl") {
      if (!data)
        return null;
      if (!isEmfBinary(data)) {
        let embeddedEmf = extractEmbeddedEmfBinary(data);
        if (embeddedEmf) {
          let converted = this.convertEmfBinaryAsset(embeddedEmf, path, EMF_EMBEDDED_VECTOR_INPUT_LIMIT, mode);
          if (converted)
            return converted;
        }
        if (isWmfBinary(data)) {
          let converted = this.convertWmfBinaryAsset(data, path, EMF_FULL_VECTOR_INPUT_LIMIT, mode);
          if (converted)
            return converted;
        }
        let largeRasterPreview = data.byteLength > EMF_FULL_VECTOR_INPUT_LIMIT ? extractEmbeddedRasterDataUrl(data, { minArea: EMF_LARGE_RASTER_PREVIEW_MIN_AREA }) : null;
        return largeRasterPreview || (extractEmbeddedRasterDataUrl(data) ?? (data.byteLength > EMF_FULL_VECTOR_INPUT_LIMIT ? this.genericEmfPlaceholder() : null));
      }
      return this.convertEmfBinaryAsset(data, path, EMF_FULL_VECTOR_INPUT_LIMIT, mode);
    }
    convertWmfBinaryAsset(data, path, inputLimit, mode) {
      try {
        if (data.byteLength > inputLimit)
          return this.lightweightEmfPlaceholder(data);
        let svg = convertWmfToSvg(data);
        if (!svg)
          return null;
        if (mode == "blobUrl" && svg.length > EMF_FULL_VECTOR_DATA_URL_LIMIT)
          return svg.length <= EMF_FULL_VECTOR_BLOB_URL_LIMIT ? this.svgToBlobUrl(svg) : this.lightweightEmfPlaceholder(data);
        let converted = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        return converted.length > EMF_FULL_VECTOR_DATA_URL_LIMIT ? this.lightweightEmfPlaceholder(data) : converted;
      } catch (e) {
        return this._options?.debug && console.warn(`docx-viewer: unable to convert WMF asset ${path}`, e), null;
      }
    }
    convertEmfBinaryAsset(data, path, inputLimit, mode) {
      try {
        if (data.byteLength > inputLimit)
          return this.lightweightEmfPlaceholder(data);
        let svg = convertEmfToSvg(data);
        if (!svg)
          return null;
        if (mode == "blobUrl" && svg.length > EMF_FULL_VECTOR_DATA_URL_LIMIT)
          return svg.length <= EMF_FULL_VECTOR_BLOB_URL_LIMIT ? this.svgToBlobUrl(svg) : this.lightweightEmfPlaceholder(data);
        let converted = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        return converted.length > EMF_FULL_VECTOR_DATA_URL_LIMIT ? this.lightweightEmfPlaceholder(data) : converted;
      } catch (e) {
        return this._options?.debug && console.warn(`docx-viewer: unable to convert EMF asset ${path}`, e), null;
      }
    }
    lightweightEmfPlaceholder(data) {
      return (isWmfBinary(data) ? convertWmfToSvgDataUrl(data, { maxRecords: 1, maxShapes: 0 }) : null) ?? convertEmfToSvgDataUrl(data, { maxRecords: 1, maxShapes: 0 }) ?? this.genericEmfPlaceholder();
    }
    svgToBlobUrl(svg) {
      if (typeof Blob > "u" || typeof URL > "u" || typeof URL.createObjectURL != "function")
        return null;
      let url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
      return this._objectUrls.add(url), url;
    }
    genericEmfPlaceholder() {
      return "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%20viewBox%3D%220%200%201%201%22%20data-docx-metafile%3D%22emf%22%2F%3E";
    }
    isEmfAsset(path) {
      let contentType = this.contentTypeForPath(path).toLowerCase();
      return /\.(emf|wmf)$/i.test(path ?? "") || contentType == "image/x-emf" || contentType == "image/emf" || contentType == "image/x-wmf" || contentType == "image/wmf";
    }
    async convertTiffAsset(data, path) {
      try {
        let buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength), ifds = UTIF.decode(buffer), ifd = ifds?.[0];
        if (!ifd)
          return null;
        UTIF.decodeImage(buffer, ifd, ifds);
        let width = Number(ifd.width), height = Number(ifd.height);
        if (!(width > 0 && height > 0))
          return null;
        let rgba = UTIF.toRGBA8(ifd), native = await this.encodeRgbaPngWithNativeCanvas(rgba, width, height);
        return native || this.encodeRgbaPngWithUpng(rgba, width, height);
      } catch (e) {
        return this._options?.debug && console.warn(`docx-viewer: unable to convert TIFF asset ${path}`, e), null;
      }
    }
    async encodeRgbaPngWithNativeCanvas(rgba, width, height) {
      let g = globalThis, imageDataCtor = g.ImageData;
      if (!imageDataCtor)
        return null;
      let pixels = new Uint8ClampedArray(rgba.buffer.slice(rgba.byteOffset, rgba.byteOffset + rgba.byteLength)), imageData = new imageDataCtor(pixels, width, height);
      if (g.OffscreenCanvas) {
        let canvas = new g.OffscreenCanvas(width, height), ctx2 = canvas.getContext("2d");
        if (ctx2 && canvas.convertToBlob) {
          ctx2.putImageData(imageData, 0, 0);
          let blob = await canvas.convertToBlob({ type: "image/png" });
          return blob ? this.dataUrlFromBytes(new Uint8Array(await blob.arrayBuffer()), "image/png") : null;
        }
      }
      let documentRef = g.document;
      if (documentRef?.createElement) {
        let canvas = documentRef.createElement("canvas");
        canvas.width = width, canvas.height = height;
        let ctx2 = canvas.getContext("2d");
        if (ctx2 && canvas.toDataURL)
          return ctx2.putImageData(imageData, 0, 0), canvas.toDataURL("image/png");
      }
      return null;
    }
    encodeRgbaPngWithUpng(rgba, width, height) {
      let buffer = rgba.buffer.slice(rgba.byteOffset, rgba.byteOffset + rgba.byteLength), png = new Uint8Array(UPNG2.encode([buffer], width, height, 0));
      return this.dataUrlFromBytes(png, "image/png");
    }
    dataUrlFromBytes(bytes, mime) {
      return `data:${mime};base64,${uint8ArrayToBase64(bytes)}`;
    }
    isTiffAsset(path) {
      let contentType = this.contentTypeForPath(path).toLowerCase();
      return /\.tiff?$/i.test(path ?? "") || contentType == "image/tiff" || contentType == "image/tif";
    }
    contentTypeForPath(path) {
      let lowerPath = normalizeSnapshotPath(path ?? "").toLowerCase();
      for (let ct of this.contentTypes ?? [])
        if (ct.partName && normalizeSnapshotPath(ct.partName).toLowerCase() == lowerPath)
          return ct.contentType ?? "";
      let extension = /\.([^.\/]+)$/.exec(lowerPath)?.[1] ?? "";
      return extension ? (this.contentTypes ?? []).find((ct) => ct.extension?.toLowerCase() == extension)?.contentType ?? "" : "";
    }
    findPartByRelId(id, basePart = null) {
      var rel = this.getRelById(basePart, id);
      let path = rel && rel.targetMode !== "External" ? this.resolveRelationshipTarget(basePart, rel) : null;
      return path ? this.partsMap[path] : null;
    }
    getRelById(part, id) {
      return (part?.rels ?? this.rels ?? []).find((x) => x.id == id);
    }
    getPathById(part, id) {
      let rel = this.getRelById(part, id);
      return rel && rel.targetMode !== "External" ? this.resolveRelationshipTarget(part, rel) : null;
    }
    resolveRelationshipTarget(part, rel) {
      let [folder] = part ? splitPath(part.path) : [""];
      return normalizeSnapshotPath(resolvePath(rel.target, folder));
    }
  };
  function normalizeSnapshotPath(path) {
    return path && (path.startsWith("/") ? path.substring(1) : path);
  }
  function uint8ArrayToBase64(bytes) {
    let g = globalThis;
    if (g.Buffer)
      return g.Buffer.from(bytes).toString("base64");
    let binary = "", chunkSize = 32768;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      let chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    return g.btoa(binary);
  }
  function deobfuscate(data, guidKey) {
    let trimmed = guidKey.replace(/{|}|-/g, ""), numbers = new Array(16);
    for (let i = 0; i < 16; i++)
      numbers[16 - i - 1] = parseInt(trimmed.substring(i * 2, i * 2 + 2), 16);
    for (let i = 0; i < 32; i++)
      data[i] = data[i] ^ numbers[i % 16];
    return data;
  }

  // src/document/bookmarks.ts
  function parseBookmarkStart(elem, xml) {
    return {
      type: "bookmarkStart" /* BookmarkStart */,
      id: xml.attr(elem, "id"),
      name: xml.attr(elem, "name"),
      colFirst: xml.intAttr(elem, "colFirst"),
      colLast: xml.intAttr(elem, "colLast")
    };
  }
  function parseBookmarkEnd(elem, xml) {
    return {
      type: "bookmarkEnd" /* BookmarkEnd */,
      id: xml.attr(elem, "id")
    };
  }

  // src/vml/vml.ts
  var VmlElement = class extends OpenXmlElementBase {
    constructor() {
      super(...arguments);
      this.type = "vmlElement" /* VmlElement */;
      this.attrs = {};
    }
  };
  function parseVmlElement(elem, parser) {
    var result = new VmlElement();
    switch (elem.localName) {
      case "group":
        result.tagName = "g";
        break;
      case "rect":
        result.tagName = "rect", Object.assign(result.attrs, { width: "100%", height: "100%" });
        break;
      case "oval":
        result.tagName = "ellipse", Object.assign(result.attrs, { cx: "50%", cy: "50%", rx: "50%", ry: "50%" });
        break;
      case "line":
        result.tagName = "line";
        break;
      case "shape":
        result.tagName = "g";
        break;
      case "textbox":
        result.tagName = "foreignObject", Object.assign(result.attrs, { width: "100%", height: "100%" });
        break;
      default:
        return null;
    }
    for (let at of xml_parser_default.attrs(elem))
      switch (at.localName) {
        case "coordorigin":
          result.attrs["data-vml-coordorigin"] = at.value;
          break;
        case "coordsize":
          result.attrs["data-vml-coordsize"] = at.value;
          break;
        case "inset":
          result.attrs["data-vml-inset"] = at.value;
          break;
        case "style":
          result.cssStyleText = sanitizeDocumentStyleText(at.value);
          break;
        case "fillcolor":
          let fill = sanitizeSvgPaint(at.value);
          fill && (result.attrs.fill = fill);
          break;
        case "strokecolor":
          let stroke = sanitizeSvgPaint(at.value);
          stroke && (result.attrs.stroke = stroke);
          break;
        case "strokeweight":
          let strokeWidth = convertLength(at.value, LengthUsage.Point);
          strokeWidth && (result.attrs["stroke-width"] = strokeWidth);
          break;
        case "filled":
          (at.value == "f" || at.value == "false") && (result.attrs.fill = "none");
          break;
        case "stroked":
          (at.value == "f" || at.value == "false") && (result.attrs.stroke = "none");
          break;
        case "path":
          result.tagName = "path", result.attrs.d = convertPath(at.value);
          break;
        case "from":
          let [x1, y1] = parsePoint(at.value);
          Object.assign(result.attrs, { x1, y1 });
          break;
        case "to":
          let [x2, y2] = parsePoint(at.value);
          Object.assign(result.attrs, { x2, y2 });
          break;
      }
    for (let el of xml_parser_default.elements(elem))
      switch (el.localName) {
        case "stroke":
          Object.assign(result.attrs, parseStroke(el));
          break;
        case "fill":
          Object.assign(result.attrs, parseFill(el));
          break;
        case "imagedata":
          result.tagName = "image", Object.assign(result.attrs, vmlImageAttrs(el)), result.imageHref = {
            id: xml_parser_default.attr(el, "id") ?? xml_parser_default.attr(el, "relid") ?? xml_parser_default.attr(el, "pict"),
            title: xml_parser_default.attr(el, "title")
          };
          break;
        case "txbxContent":
          result.children.push(...parser.parseBodyElements(el));
          break;
        default:
          let child = parseVmlElement(el, parser);
          child && result.children.push(child);
          break;
      }
    return result;
  }
  function vmlImageAttrs(el) {
    let cropLeft = parseVmlFraction(xml_parser_default.attr(el, "cropleft")), cropTop = parseVmlFraction(xml_parser_default.attr(el, "croptop")), cropRight = parseVmlFraction(xml_parser_default.attr(el, "cropright")), cropBottom = parseVmlFraction(xml_parser_default.attr(el, "cropbottom")), cropWidth = Math.max(1e-4, 1 - cropLeft - cropRight), cropHeight = Math.max(1e-4, 1 - cropTop - cropBottom), attrs = {
      x: percent(-cropLeft / cropWidth),
      y: percent(-cropTop / cropHeight),
      width: percent(1 / cropWidth),
      height: percent(1 / cropHeight)
    };
    (cropLeft || cropTop || cropRight || cropBottom) && (attrs.preserveAspectRatio = "none");
    let gain = parseVmlNumber(xml_parser_default.attr(el, "gain")), blackLevel = parseVmlNumber(xml_parser_default.attr(el, "blacklevel"));
    return Number.isFinite(gain) && (attrs["data-vml-gain"] = String(gain)), Number.isFinite(blackLevel) && (attrs["data-vml-blacklevel"] = String(blackLevel)), attrs;
  }
  function parseVmlNumber(value) {
    if (value == null)
      return Number.NaN;
    let raw = String(value).trim();
    return raw ? /^-?\d+(?:\.\d+)?f$/i.test(raw) ? parseFloat(raw.slice(0, -1)) / 65536 : raw.endsWith("%") ? parseFloat(raw) / 100 : Number(raw) : Number.NaN;
  }
  function parseVmlFraction(value) {
    if (!value)
      return 0;
    let raw = String(value).trim();
    if (!raw)
      return 0;
    let result;
    return /^-?\d+(\.\d+)?f$/i.test(raw) ? result = parseFloat(raw.slice(0, -1)) / 65536 : raw.endsWith("%") ? result = parseFloat(raw) / 100 : result = parseFloat(raw), Number.isFinite(result) ? Math.max(0, Math.min(0.9999, result)) : 0;
  }
  function percent(value) {
    return `${Math.round(value * 1e5) / 1e3}%`;
  }
  function parseStroke(el) {
    let result = {}, color = xml_parser_default.attr(el, "color"), weight = xml_parser_default.attr(el, "weight"), on = xml_parser_default.attr(el, "on");
    if (on == "f" || on == "false")
      result.stroke = "none";
    else if (color) {
      let safeColor = sanitizeSvgPaint(color);
      safeColor && (result.stroke = safeColor);
    }
    if (weight) {
      let safeWeight = convertLength(weight, LengthUsage.Point);
      safeWeight && (result["stroke-width"] = safeWeight);
    } else
      result["stroke-width"] = "1px";
    return result;
  }
  function parseFill(el) {
    let result = {}, color = xml_parser_default.attr(el, "color") ?? xml_parser_default.attr(el, "color2"), on = xml_parser_default.attr(el, "on"), opacity = xml_parser_default.attr(el, "opacity");
    if (on == "f" || on == "false")
      result.fill = "none";
    else if (color) {
      let safeColor = sanitizeSvgPaint(color);
      safeColor && (result.fill = safeColor);
    }
    if (opacity) {
      let normalizedOpacity = opacity.endsWith("%") ? parseFloat(opacity) / 100 : Number(opacity);
      Number.isFinite(normalizedOpacity) && (result["fill-opacity"] = String(Math.max(0, Math.min(1, normalizedOpacity))));
    }
    return result;
  }
  function parsePoint(val) {
    return val.split(",");
  }
  function convertPath(path) {
    return path.replace(/([mlxe])|([-\d]+)|([,])/g, (m) => /[-\d]/.test(m) ? convertLength(m, LengthUsage.VmlEmu) : /[ml,]/.test(m) ? m : "");
  }

  // src/comments/elements.ts
  var WmlComment = class extends OpenXmlElementBase {
    constructor() {
      super(...arguments);
      this.type = "comment" /* Comment */;
    }
  }, WmlCommentReference = class extends OpenXmlElementBase {
    constructor(id) {
      super();
      this.id = id;
      this.type = "commentReference" /* CommentReference */;
    }
  }, WmlCommentRangeStart = class extends OpenXmlElementBase {
    constructor(id) {
      super();
      this.id = id;
      this.type = "commentRangeStart" /* CommentRangeStart */;
    }
  }, WmlCommentRangeEnd = class extends OpenXmlElementBase {
    constructor(id) {
      super();
      this.id = id;
      this.type = "commentRangeEnd" /* CommentRangeEnd */;
    }
  };

  // src/parser/style-values.ts
  var autos = {
    shd: "inherit",
    color: "black",
    borderColor: "black",
    highlight: "transparent"
  }, supportedNamespaceURIs = [
    ns.wordprocessingShape,
    ns.wordprocessingCanvas,
    ns.wordprocessingGroup,
    ns.drawingml,
    ns.picture
  ], mmlTagMap = {
    oMath: "mmlMath" /* MmlMath */,
    oMathPara: "mmlMathParagraph" /* MmlMathParagraph */,
    f: "mmlFraction" /* MmlFraction */,
    func: "mmlFunction" /* MmlFunction */,
    fName: "mmlFunctionName" /* MmlFunctionName */,
    num: "mmlNumerator" /* MmlNumerator */,
    den: "mmlDenominator" /* MmlDenominator */,
    rad: "mmlRadical" /* MmlRadical */,
    deg: "mmlDegree" /* MmlDegree */,
    e: "mmlBase" /* MmlBase */,
    sSup: "mmlSuperscript" /* MmlSuperscript */,
    sSub: "mmlSubscript" /* MmlSubscript */,
    sPre: "mmlPreSubSuper" /* MmlPreSubSuper */,
    sup: "mmlSuperArgument" /* MmlSuperArgument */,
    sub: "mmlSubArgument" /* MmlSubArgument */,
    d: "mmlDelimiter" /* MmlDelimiter */,
    nary: "mmlNary" /* MmlNary */,
    eqArr: "mmlEquationArray" /* MmlEquationArray */,
    lim: "mmlLimit" /* MmlLimit */,
    limLow: "mmlLimitLower" /* MmlLimitLower */,
    limUpp: "mmlLimitUpper" /* MmlLimitUpper */,
    sSubSup: "mmlSubSuperscript" /* MmlSubSuperscript */,
    phant: "mmlPhantom" /* MmlPhantom */,
    borderBox: "mmlBorderBox" /* MmlBorderBox */,
    acc: "mmlAccent" /* MmlAccent */,
    m: "mmlMatrix" /* MmlMatrix */,
    mr: "mmlMatrixRow" /* MmlMatrixRow */,
    box: "mmlBox" /* MmlBox */,
    bar: "mmlBar" /* MmlBar */,
    groupChr: "mmlGroupChar" /* MmlGroupChar */
  }, knownColors = ["black", "blue", "cyan", "darkBlue", "darkCyan", "darkGray", "darkGreen", "darkMagenta", "darkRed", "darkYellow", "green", "lightGray", "magenta", "none", "red", "white", "yellow"], xmlUtil = class {
    static colorAttr(node, attrName, defValue = null, autoColor = "black") {
      var v = xml_parser_default.attr(node, attrName);
      if (v)
        return v == "auto" ? autoColor : knownColors.includes(v) ? v : `#${v}`;
      var themeColor = xml_parser_default.attr(node, "themeColor");
      return themeColor ? `var(--docx-${themeColor}-color)` : defValue;
    }
  }, values = class _values {
    static themeValue(c, attr) {
      var val = xml_parser_default.attr(c, attr);
      return val ? `var(--docx-${val}-font)` : null;
    }
    static valueOfSize(c, attr) {
      var type = LengthUsage.Dxa;
      switch (xml_parser_default.attr(c, "type")) {
        case "dxa":
          break;
        case "pct":
          type = LengthUsage.Percent;
          break;
        case "auto":
          return "auto";
      }
      return xml_parser_default.lengthAttr(c, attr, type);
    }
    static valueOfMargin(c) {
      return xml_parser_default.lengthAttr(c, "w");
    }
    static valueOfBorder(c) {
      var type = _values.parseBorderType(xml_parser_default.attr(c, "val"));
      if (type == "none")
        return "none";
      var color = xmlUtil.colorAttr(c, "color", autos.borderColor, autos.borderColor), size = xml_parser_default.lengthAttr(c, "sz", LengthUsage.Border) ?? "1pt";
      return `${size} ${type} ${color == "auto" ? autos.borderColor : color}`;
    }
    static parseBorderType(type) {
      switch (type) {
        case "single":
          return "solid";
        case "dashDotStroked":
          return "solid";
        case "dashed":
          return "dashed";
        case "dashSmallGap":
          return "dashed";
        case "dotDash":
          return "dotted";
        case "dotDotDash":
          return "dotted";
        case "dotted":
          return "dotted";
        case "double":
          return "double";
        case "doubleWave":
          return "double";
        case "inset":
          return "inset";
        case "nil":
          return "none";
        case "none":
          return "none";
        case "outset":
          return "outset";
        case "thick":
          return "solid";
        case "thickThinLargeGap":
          return "solid";
        case "thickThinMediumGap":
          return "solid";
        case "thickThinSmallGap":
          return "solid";
        case "thinThickLargeGap":
          return "solid";
        case "thinThickMediumGap":
          return "solid";
        case "thinThickSmallGap":
          return "solid";
        case "thinThickThinLargeGap":
          return "solid";
        case "thinThickThinMediumGap":
          return "solid";
        case "thinThickThinSmallGap":
          return "solid";
        case "threeDEmboss":
          return "solid";
        case "threeDEngrave":
          return "solid";
        case "triple":
          return "double";
        case "wave":
          return "solid";
      }
      return "solid";
    }
    static valueOfTblLayout(c) {
      var type = xml_parser_default.attr(c, "type") ?? xml_parser_default.attr(c, "val");
      return type == "fixed" ? "fixed" : "auto";
    }
    static tableConditionalFormatOfCnfStyle(c) {
      let val = xml_parser_default.attr(c, "val") ?? "", attrFlag = (names, fallback) => {
        let name = names.find((n) => xml_parser_default.attr(c, n) != null);
        return name ? xml_parser_default.boolAttr(c, name, !1) : fallback;
      }, flags = [
        ["firstRow", "first-row", ["firstRow"]],
        ["lastRow", "last-row", ["lastRow"]],
        ["firstColumn", "first-col", ["firstColumn", "firstCol"]],
        ["lastColumn", "last-col", ["lastColumn", "lastCol"]],
        ["oddVBand", "odd-col", ["oddVBand"]],
        ["evenVBand", "even-col", ["evenVBand"]],
        ["oddHBand", "odd-row", ["oddHBand"]],
        ["evenHBand", "even-row", ["evenHBand"]],
        ["firstRowLastColumn", "ne-cell", ["firstRowLastColumn"]],
        ["firstRowFirstColumn", "nw-cell", ["firstRowFirstColumn"]],
        ["lastRowLastColumn", "se-cell", ["lastRowLastColumn"]],
        ["lastRowFirstColumn", "sw-cell", ["lastRowFirstColumn"]]
      ], result = {};
      return flags.forEach(([key, , names], i) => {
        attrFlag(names, val[i] == "1") && (result[key] = !0);
      }), result;
    }
    static classNameOfCnfStyle(c) {
      let format = _values.tableConditionalFormatOfCnfStyle(c);
      return [
        ["firstRow", "first-row"],
        ["lastRow", "last-row"],
        ["firstColumn", "first-col"],
        ["lastColumn", "last-col"],
        ["oddVBand", "odd-col"],
        ["evenVBand", "even-col"],
        ["oddHBand", "odd-row"],
        ["evenHBand", "even-row"],
        ["firstRowLastColumn", "ne-cell"],
        ["firstRowFirstColumn", "nw-cell"],
        ["lastRowLastColumn", "se-cell"],
        ["lastRowFirstColumn", "sw-cell"]
      ].filter(([key]) => format[key]).map(([, className]) => className).join(" ");
    }
    static valueOfJc(c) {
      var type = xml_parser_default.attr(c, "val");
      switch (type) {
        case "start":
        case "left":
          return "left";
        case "center":
          return "center";
        case "end":
        case "right":
          return "right";
        case "both":
          return "justify";
      }
      return type;
    }
    static valueOfVertAlign(c, asTagName = !1) {
      var type = xml_parser_default.attr(c, "val");
      switch (type) {
        case "subscript":
          return "sub";
        case "superscript":
          return asTagName ? "sup" : "super";
      }
      return asTagName ? null : type;
    }
    static valueOfEmphasisMark(c) {
      var type = xml_parser_default.attr(c, "val");
      switch (type) {
        case "none":
          return "none";
        case "comma":
          return '"﹐"';
        case "circle":
          return "circle";
        default:
          return "dot";
      }
    }
    static valueOfTextAlignment(c) {
      var type = xml_parser_default.attr(c, "val");
      switch (type) {
        case "auto":
        case "baseline":
          return "baseline";
        case "top":
          return "top";
        case "center":
          return "middle";
        case "bottom":
          return "bottom";
      }
      return type;
    }
    static addSize(a, b) {
      return a == null ? b : b == null ? a : `calc(${a} + ${b})`;
    }
    static classNameOftblLook(c) {
      let look = _values.tableLookOfTblLook(c), className = "";
      return look.firstRow && (className += " first-row"), look.lastRow && (className += " last-row"), look.firstColumn && (className += " first-col"), look.lastColumn && (className += " last-col"), look.horizontalBanding || (className += " no-hband"), look.verticalBanding || (className += " no-vband"), className.trim();
    }
    static tableLookOfTblLook(c) {
      let hasVal = xml_parser_default.attr(c, "val") != null, val = xml_parser_default.hexAttr(c, "val", 0), enabled = (attr, mask, defaultValue) => xml_parser_default.attr(c, attr) != null ? xml_parser_default.boolAttr(c, attr, defaultValue) : hasVal ? !!(val & mask) : defaultValue;
      return {
        firstRow: enabled("firstRow", 32, !1),
        lastRow: enabled("lastRow", 64, !1),
        firstColumn: enabled("firstColumn", 128, !1),
        lastColumn: enabled("lastColumn", 256, !1),
        horizontalBanding: !enabled("noHBand", 512, !1),
        verticalBanding: !enabled("noVBand", 1024, !1)
      };
    }
  };

  // src/parser/document-parser.ts
  var namedShadingColors = {
    black: "#000000",
    blue: "#0000ff",
    cyan: "#00ffff",
    darkBlue: "#000080",
    darkCyan: "#008080",
    darkGray: "#808080",
    darkGreen: "#008000",
    darkMagenta: "#800080",
    darkRed: "#800000",
    darkYellow: "#808000",
    green: "#008000",
    lightGray: "#c0c0c0",
    magenta: "#ff00ff",
    red: "#ff0000",
    white: "#ffffff",
    yellow: "#ffff00"
  }, defaultDmlThemeLineStyles = [
    { width: 9525, cap: "flat", dash: "solid" },
    { width: 25400, cap: "flat", dash: "solid" },
    { width: 38100, cap: "flat", dash: "solid" }
  ];
  function normalizeShadingHexColor(value) {
    if (!value)
      return null;
    let named = namedShadingColors[value];
    if (named)
      return named;
    let hex = String(value).replace(/^#/, "");
    return /^[0-9a-f]{6}$/i.test(hex) ? `#${hex.toLowerCase()}` : null;
  }
  function mixShadingChannel(background, foreground, opacity) {
    return Math.max(0, Math.min(255, Math.floor(background * (1 - opacity) + foreground * opacity)));
  }
  function mixShadingColors(background, foreground, opacity) {
    let bg = normalizeShadingHexColor(background), fg = normalizeShadingHexColor(foreground);
    if (!bg || !fg)
      return null;
    let rb = parseInt(bg.slice(1, 3), 16), gb = parseInt(bg.slice(3, 5), 16), bb = parseInt(bg.slice(5, 7), 16), rf = parseInt(fg.slice(1, 3), 16), gf = parseInt(fg.slice(3, 5), 16), bf = parseInt(fg.slice(5, 7), 16), r = mixShadingChannel(rb, rf, opacity).toString(16).padStart(2, "0"), g = mixShadingChannel(gb, gf, opacity).toString(16).padStart(2, "0"), b = mixShadingChannel(bb, bf, opacity).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  function resolveShadingBackground(c) {
    let val = xml_parser_default.attr(c, "val") || "clear";
    if (val === "nil")
      return null;
    let fillAttr = xml_parser_default.attr(c, "fill"), colorAttr = xml_parser_default.attr(c, "color"), background = fillAttr && fillAttr !== "auto" ? xmlUtil.colorAttr(c, "fill", null, autos.shd) : "white", foreground = colorAttr && colorAttr !== "auto" ? xmlUtil.colorAttr(c, "color", null, autos.color) : autos.color;
    if (/^pct/i.test(val)) {
      let pct = Math.max(0, Math.min(100, parseFloat(val.replace(/[^0-9.]/g, "")) || 0)) / 100;
      return mixShadingColors(background, foreground, pct) || xmlUtil.colorAttr(c, "fill", null, autos.shd);
    }
    return val === "solid" ? foreground || xmlUtil.colorAttr(c, "fill", null, autos.shd) : xmlUtil.colorAttr(c, "fill", null, autos.shd);
  }
  var DocumentParser = class {
    constructor(options) {
      this.options = {
        ignoreWidth: !1,
        debug: !1,
        hideWebHiddenContent: !1,
        ...options
      };
    }
    setTheme(theme) {
      this.theme = theme;
    }
    parseNotes(xmlDoc, elemName, elemClass) {
      var result = [];
      for (let el of xml_parser_default.elements(xmlDoc, elemName)) {
        let node = new elemClass();
        node.id = xml_parser_default.attr(el, "id"), node.noteType = xml_parser_default.attr(el, "type"), node.children = this.parseBodyElements(el), result.push(node);
      }
      return result;
    }
    parseComments(xmlDoc) {
      var result = [];
      for (let el of xml_parser_default.elements(xmlDoc, "comment")) {
        let item = new WmlComment();
        item.id = xml_parser_default.attr(el, "id"), item.author = xml_parser_default.attr(el, "author"), item.initials = xml_parser_default.attr(el, "initials"), item.date = xml_parser_default.attr(el, "date"), item.children = this.parseBodyElements(el), result.push(item);
      }
      return result;
    }
    parseDocumentFile(xmlDoc) {
      var xbody = xml_parser_default.element(xmlDoc, "body"), background = xml_parser_default.element(xmlDoc, "background"), sectPr = xml_parser_default.element(xbody, "sectPr");
      return {
        type: "document" /* Document */,
        children: this.parseBodyElements(xbody, { trackBodySource: !0 }),
        props: sectPr ? parseSectionProperties(sectPr, xml_parser_default) : {},
        cssStyle: background ? this.parseBackground(background) : {}
      };
    }
    parseBackground(elem) {
      var result = {}, color = xmlUtil.colorAttr(elem, "color");
      return color && (result["background-color"] = color), result;
    }
    parseBodyElements(element, context = {}) {
      var children = [];
      let bodyIndex = 0, paragraphIndex = 0, tableIndex = 0, sourceBase = () => context.trackBodySource ? { bodyIndex } : void 0;
      for (let elem of xml_parser_default.elements(element))
        switch (elem.localName) {
          case "p": {
            let source = sourceBase();
            children.push(this.parseParagraph(elem, source ? { ...source, paragraphIndex: paragraphIndex++ } : void 0)), context.trackBodySource && bodyIndex++;
            break;
          }
          case "altChunk":
            children.push(this.parseAltChunk(elem)), context.trackBodySource && bodyIndex++;
            break;
          case "tbl": {
            let source = sourceBase();
            children.push(this.parseTable(elem, source ? { ...source, tableIndex: tableIndex++ } : void 0)), context.trackBodySource && bodyIndex++;
            break;
          }
          case "sdt":
            children.push(...this.parseSdt(elem, (e) => this.parseBodyElements(e))), context.trackBodySource && bodyIndex++;
            break;
        }
      return children;
    }
    parseStylesFile(xstyles) {
      var result = [];
      for (let n of xml_parser_default.elements(xstyles))
        switch (n.localName) {
          case "style":
            result.push(this.parseStyle(n));
            break;
          case "docDefaults":
            result.push(this.parseDefaultStyles(n));
            break;
        }
      return result;
    }
    parseDefaultStyles(node) {
      var result = {
        id: null,
        name: null,
        target: null,
        basedOn: null,
        styles: [],
        hasParagraphDefaults: !1
      };
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "rPrDefault":
            var rPr = xml_parser_default.element(c, "rPr");
            rPr && (result.styles.push({
              target: "span",
              values: this.parseDefaultProperties(rPr, {})
            }), result.runProps = parseRunProperties(rPr, xml_parser_default));
            break;
          case "pPrDefault":
            result.hasParagraphDefaults = !0;
            var pPr = xml_parser_default.element(c, "pPr");
            pPr && (result.styles.push({
              target: "p",
              values: this.parseDefaultProperties(pPr, {})
            }), result.paragraphProps = parseParagraphProperties(pPr, xml_parser_default));
            break;
        }
      return result;
    }
    parseStyle(node) {
      var result = {
        id: xml_parser_default.attr(node, "styleId"),
        isDefault: xml_parser_default.boolAttr(node, "default"),
        name: null,
        target: null,
        basedOn: null,
        styles: [],
        linked: null,
        hasParagraphProperties: !1
      };
      switch (xml_parser_default.attr(node, "type")) {
        case "paragraph":
          result.target = "p";
          break;
        case "table":
          result.target = "table";
          break;
        case "character":
          result.target = "span";
          break;
      }
      for (let n of xml_parser_default.elements(node))
        switch (n.localName) {
          case "basedOn":
            result.basedOn = xml_parser_default.attr(n, "val");
            break;
          case "name":
            result.name = xml_parser_default.attr(n, "val");
            break;
          case "link":
            result.linked = xml_parser_default.attr(n, "val");
            break;
          case "next":
            result.next = xml_parser_default.attr(n, "val");
            break;
          case "aliases":
            result.aliases = xml_parser_default.attr(n, "val").split(",");
            break;
          case "pPr":
            result.hasParagraphProperties = !0, result.styles.push({
              target: "p",
              values: this.parseDefaultProperties(n, {})
            }), result.paragraphProps = parseParagraphProperties(n, xml_parser_default);
            break;
          case "rPr":
            result.styles.push({
              target: "span",
              values: this.parseDefaultProperties(n, {})
            }), result.runProps = parseRunProperties(n, xml_parser_default);
            break;
          case "tblPr":
            result.tableProps = {
              ...result.tableProps ?? {},
              ...this.parseTableStyleProperties(n)
            }, this.appendTableStyleDefaultProperties(result, n);
            break;
          case "tcPr":
            result.styles.push({
              target: "td",
              //TODO: maybe move to processor
              values: this.parseDefaultProperties(n, {})
            });
            break;
          case "tblStylePr":
            for (let s of this.parseTableStyle(n))
              result.styles.push(s);
            break;
          case "rsid":
          case "qFormat":
          case "hidden":
          case "semiHidden":
          case "unhideWhenUsed":
          case "autoRedefine":
          case "uiPriority":
            break;
          default:
            this.options.debug && console.warn(`DOCX: Unknown style element: ${n.localName}`);
        }
      return result;
    }
    parseTableStyleProperties(node) {
      let result = {};
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "tblStyleColBandSize": {
            let value = xml_parser_default.intAttr(c, "val");
            value != null && (result.colBandSize = value);
            break;
          }
          case "tblStyleRowBandSize": {
            let value = xml_parser_default.intAttr(c, "val");
            value != null && (result.rowBandSize = value);
            break;
          }
        }
      return result;
    }
    appendTableStyleDefaultProperties(style, node) {
      let tableValues = {}, cellValues = {};
      this.parseDefaultProperties(node, tableValues, cellValues), Object.keys(tableValues).length && style.styles.push({
        target: "table",
        values: tableValues
      }), Object.keys(cellValues).length && style.styles.push({
        target: "td",
        values: cellValues
      });
    }
    parseTableStyle(node) {
      var result = [], type = xml_parser_default.attr(node, "type"), selector = "", modificator = "";
      switch (type) {
        case "firstRow":
          modificator = ".first-row", selector = "tr.first-row td";
          break;
        case "lastRow":
          modificator = ".last-row", selector = "tr.last-row td";
          break;
        case "firstCol":
          modificator = ".first-col", selector = "td.first-col";
          break;
        case "lastCol":
          modificator = ".last-col", selector = "td.last-col";
          break;
        case "band1Vert":
          modificator = ":not(.no-vband)", selector = "td.odd-col";
          break;
        case "band2Vert":
          modificator = ":not(.no-vband)", selector = "td.even-col";
          break;
        case "band1Horz":
          modificator = ":not(.no-hband)", selector = "tr.odd-row";
          break;
        case "band2Horz":
          modificator = ":not(.no-hband)", selector = "tr.even-row";
          break;
        case "neCell":
          modificator = ".ne-cell", selector = "td.ne-cell";
          break;
        case "nwCell":
          modificator = ".nw-cell", selector = "td.nw-cell";
          break;
        case "seCell":
          modificator = ".se-cell", selector = "td.se-cell";
          break;
        case "swCell":
          modificator = ".sw-cell", selector = "td.sw-cell";
          break;
        default:
          return [];
      }
      for (let n of xml_parser_default.elements(node))
        switch (n.localName) {
          case "pPr":
            result.push({
              target: `${selector} p`,
              mod: modificator,
              values: this.parseDefaultProperties(n, {})
            });
            break;
          case "rPr":
            result.push({
              target: `${selector} span`,
              mod: modificator,
              values: this.parseDefaultProperties(n, {})
            });
            break;
          case "tblPr":
          case "tcPr":
            result.push({
              target: selector,
              //TODO: maybe move to processor
              mod: modificator,
              values: this.parseDefaultProperties(n, {})
            });
            break;
        }
      return result;
    }
    parseNumberingFile(node) {
      let result = [], bullets = [], abstractLevels = {}, abstractNodes = [], numberNodes = [];
      for (let n of xml_parser_default.elements(node))
        switch (n.localName) {
          case "numPicBullet":
            bullets.push(this.parseNumberingPicBullet(n));
            break;
          case "abstractNum":
            abstractNodes.push(n);
            break;
          case "num":
            numberNodes.push(n);
            break;
        }
      for (let n of abstractNodes)
        abstractLevels[xml_parser_default.attr(n, "abstractNumId")] = this.parseAbstractNumbering(n, bullets);
      for (let n of numberNodes) {
        let numId = xml_parser_default.attr(n, "numId"), abstractNumId = xml_parser_default.elementAttr(n, "abstractNumId", "val"), levels = (abstractLevels[abstractNumId] ?? []).map((x) => this.cloneNumberingLevel(x, numId));
        for (let override of xml_parser_default.elements(n, "lvlOverride")) {
          let level = xml_parser_default.intAttr(override, "ilvl"), levelNode = xml_parser_default.element(override, "lvl"), startOverride = xml_parser_default.element(override, "startOverride"), target = levels.find((x) => x.level == level);
          if (levelNode) {
            target = this.parseNumberingLevel(numId, levelNode, bullets);
            let index = levels.findIndex((x) => x.level == level);
            index >= 0 ? levels[index] = target : levels.push(target);
          }
          startOverride && target && (target.start = xml_parser_default.intAttr(startOverride, "val", target.start));
        }
        result.push(...levels);
      }
      return result;
    }
    cloneNumberingLevel(level, id) {
      return {
        ...level,
        id,
        pStyle: { ...level.pStyle },
        rStyle: { ...level.rStyle },
        tabs: level.tabs ? [...level.tabs] : void 0,
        bullet: level.bullet ? { ...level.bullet } : null
      };
    }
    parseNumberingPicBullet(elem) {
      let id = xml_parser_default.intAttr(elem, "numPicBulletId"), pict = xml_parser_default.element(elem, "pict"), shape = pict && xml_parser_default.element(pict, "shape"), imagedata = shape && xml_parser_default.element(shape, "imagedata");
      if (imagedata)
        return {
          id,
          src: xml_parser_default.attr(imagedata, "id"),
          style: xml_parser_default.attr(shape, "style")
        };
      let drawing = xml_parser_default.element(elem, "drawing"), blip = drawing ? this.findDescendant(drawing, "blip") : null;
      if (blip) {
        let extent = drawing ? this.findDescendant(drawing, "extent") : null, style = [];
        if (extent) {
          let width = xml_parser_default.lengthAttr(extent, "cx", LengthUsage.Emu), height = xml_parser_default.lengthAttr(extent, "cy", LengthUsage.Emu);
          width && style.push(`width:${width};`), height && style.push(`height:${height};`);
        }
        return {
          id,
          src: xml_parser_default.attr(blip, "embed") ?? xml_parser_default.attr(blip, "link"),
          style: style.join("") || void 0
        };
      }
      return null;
    }
    parseAbstractNumbering(node, bullets) {
      var result = [], id = xml_parser_default.attr(node, "abstractNumId");
      for (let n of xml_parser_default.elements(node))
        n.localName === "lvl" && result.push(this.parseNumberingLevel(id, n, bullets));
      return result;
    }
    parseNumberingLevel(id, node, bullets) {
      var result = {
        id,
        level: xml_parser_default.intAttr(node, "ilvl"),
        start: 1,
        pStyleName: void 0,
        pStyle: {},
        rStyle: {},
        suff: "tab"
      };
      for (let n of xml_parser_default.elements(node))
        switch (n.localName) {
          case "start":
            result.start = xml_parser_default.intAttr(n, "val");
            break;
          case "pPr":
            this.parseDefaultProperties(n, result.pStyle), result.tabs = parseParagraphProperties(n, xml_parser_default).tabs ?? result.tabs;
            break;
          case "rPr":
            this.parseDefaultProperties(n, result.rStyle);
            break;
          case "lvlPicBulletId":
            var bulletId = xml_parser_default.intAttr(n, "val");
            result.bullet = bullets.find((x) => x?.id == bulletId);
            break;
          case "lvlText":
            result.levelText = xml_parser_default.attr(n, "val");
            break;
          case "pStyle":
            result.pStyleName = xml_parser_default.attr(n, "val");
            break;
          case "numFmt":
            result.format = xml_parser_default.attr(n, "val");
            break;
          case "lvlRestart":
            result.restart = xml_parser_default.intAttr(n, "val");
            break;
          case "suff":
            result.suff = xml_parser_default.attr(n, "val");
            break;
        }
      return result;
    }
    parseSdt(node, parser) {
      let sdtContent = xml_parser_default.element(node, "sdtContent");
      return sdtContent ? parser(sdtContent) : [];
    }
    parseInserted(node, parentParser) {
      return {
        type: "inserted" /* Inserted */,
        children: parentParser(node)?.children ?? []
      };
    }
    parseDeleted(node, parentParser) {
      return {
        type: "deleted" /* Deleted */,
        children: parentParser(node)?.children ?? []
      };
    }
    parseAltChunk(node) {
      return { type: "altChunk" /* AltChunk */, children: [], id: xml_parser_default.attr(node, "id") };
    }
    parseParagraph(node, source) {
      var result = { type: "paragraph" /* Paragraph */, children: [], ...source ? { source } : {} };
      for (let el of xml_parser_default.elements(node))
        switch (el.localName) {
          case "pPr":
            this.parseParagraphProperties(el, result);
            break;
          case "r":
            result.children.push(this.parseRun(el, result));
            break;
          case "fldSimple":
            result.children.push(this.parseSimpleField(el, result));
            break;
          case "hyperlink":
            result.children.push(this.parseHyperlink(el, result));
            break;
          case "smartTag":
            result.children.push(this.parseSmartTag(el, result));
            break;
          case "bookmarkStart":
            result.children.push(parseBookmarkStart(el, xml_parser_default));
            break;
          case "bookmarkEnd":
            result.children.push(parseBookmarkEnd(el, xml_parser_default));
            break;
          case "commentRangeStart":
            result.children.push(new WmlCommentRangeStart(xml_parser_default.attr(el, "id")));
            break;
          case "commentRangeEnd":
            result.children.push(new WmlCommentRangeEnd(xml_parser_default.attr(el, "id")));
            break;
          case "oMath":
          case "oMathPara": {
            let math = this.parseMathElement(el);
            math && result.children.push(math);
            break;
          }
          case "sdt":
            result.children.push(...this.parseSdt(el, (e) => this.parseParagraph(e).children));
            break;
          case "ins":
            result.children.push(this.parseInserted(el, (e) => this.parseParagraph(e)));
            break;
          case "del":
            result.children.push(this.parseDeleted(el, (e) => this.parseParagraph(e)));
            break;
        }
      return source && this.assignParagraphImageLocators(result, source), result;
    }
    /**
     * 为段落内的真实图片生成与后端 Open XML 解析一致的稳定对象键。
     * 这里只记录文档结构位置，不参与排版，也不会引入文本匹配开销。
     */
    assignParagraphImageLocators(paragraph, source) {
      let sourceKey = this.sourceKeyFromOpenXmlSource(source);
      if (!sourceKey)
        return;
      let objectIndex = 0, visit = (element) => {
        if (element.type === "drawing" /* Drawing */ || element.type === "vmlPicture" /* VmlPicture */) {
          let resourceKey = this.findImageResourceKey(element);
          resourceKey && (element.props = {
            ...element.props ?? {},
            objectLocator: {
              objectKey: `${sourceKey}:image:${objectIndex++}`,
              resourceKey,
              objectKind: "image"
            }
          });
          return;
        }
        for (let child of element.children ?? [])
          visit(child);
      };
      for (let child of paragraph.children ?? [])
        visit(child);
    }
    findImageResourceKey(element) {
      let candidate = element;
      if (element.type === "image" /* Image */ && candidate.src)
        return String(candidate.src);
      if (candidate.imageHref?.id)
        return String(candidate.imageHref.id);
      for (let child of element.children ?? []) {
        let resourceKey = this.findImageResourceKey(child);
        if (resourceKey)
          return resourceKey;
      }
      return "";
    }
    sourceKeyFromOpenXmlSource(source) {
      if (source.paragraphIndex != null)
        return `docx:body:${source.bodyIndex}:p:${source.paragraphIndex}`;
      if (source.tableIndex != null && source.cellParagraphIndex != null) {
        let nested = source.nestedTableIndex == null ? "" : `:nt:${source.nestedTableIndex}`;
        return `docx:body:${source.bodyIndex}:tbl:${source.tableIndex}${nested}:r:${source.rowIndex}:c:${source.cellIndex}:p:${source.cellParagraphIndex}`;
      }
      return "";
    }
    parseParagraphProperties(elem, paragraph) {
      this.parseDefaultProperties(elem, paragraph.cssStyle = {}, null, (c) => {
        if (c.localName == "rPr") {
          xml_parser_default.element(c, "del") && (paragraph.props = { ...paragraph.props ?? {}, deletedParagraphMark: !0 });
          let markStyle = {};
          return this.parseDefaultProperties(c, markStyle), paragraph.props = { ...paragraph.props ?? {}, paragraphMarkCssStyle: markStyle }, parseParagraphProperty(c, paragraph, xml_parser_default), !0;
        }
        if (parseParagraphProperty(c, paragraph, xml_parser_default))
          return !0;
        switch (c.localName) {
          case "pStyle":
            paragraph.styleName = xml_parser_default.attr(c, "val");
            break;
          case "cnfStyle":
            paragraph.conditionalStyle = values.tableConditionalFormatOfCnfStyle(c), paragraph.className = values.classNameOfCnfStyle(c);
            break;
          case "framePr":
            this.parseFrame(c, paragraph);
            break;
          default:
            return !1;
        }
        return !0;
      });
    }
    parseFrame(node, paragraph) {
      let dropCap = xml_parser_default.attr(node, "dropCap");
      paragraph.frame = {
        width: xml_parser_default.lengthAttr(node, "w"),
        height: xml_parser_default.lengthAttr(node, "h"),
        x: xml_parser_default.lengthAttr(node, "x", LengthUsage.SignedDxa),
        y: xml_parser_default.lengthAttr(node, "y", LengthUsage.SignedDxa),
        hSpace: xml_parser_default.lengthAttr(node, "hSpace"),
        vSpace: xml_parser_default.lengthAttr(node, "vSpace"),
        horizontalAnchor: xml_parser_default.attr(node, "hAnchor"),
        verticalAnchor: xml_parser_default.attr(node, "vAnchor"),
        horizontalAlign: xml_parser_default.attr(node, "xAlign"),
        verticalAlign: xml_parser_default.attr(node, "yAlign"),
        wrap: xml_parser_default.attr(node, "wrap"),
        heightRule: xml_parser_default.attr(node, "hRule"),
        dropCap,
        lines: xml_parser_default.intAttr(node, "lines")
      }, dropCap == "drop" && (paragraph.cssStyle.float = "left");
    }
    parseHyperlink(node, parent) {
      var result = { type: "hyperlink" /* Hyperlink */, parent, children: [] };
      result.anchor = xml_parser_default.attr(node, "anchor"), result.id = xml_parser_default.attr(node, "id");
      for (let c of xml_parser_default.elements(node))
        c.localName === "r" && result.children.push(this.parseRun(c, result));
      return result;
    }
    parseSmartTag(node, parent) {
      var result = { type: "smartTag" /* SmartTag */, parent, children: [] }, uri = xml_parser_default.attr(node, "uri"), element = xml_parser_default.attr(node, "element");
      uri && (result.uri = uri), element && (result.element = element);
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "r":
            result.children.push(this.parseRun(c, result));
            break;
          case "smartTag":
            result.children.push(this.parseSmartTag(c, result));
            break;
        }
      return result;
    }
    parseSimpleField(node, parent) {
      let result = {
        type: "simpleField" /* SimpleField */,
        parent,
        children: [],
        instruction: xml_parser_default.attr(node, "instr"),
        lock: xml_parser_default.boolAttr(node, "lock", !1),
        dirty: xml_parser_default.boolAttr(node, "dirty", !1)
      };
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "r":
            result.children.push(this.parseRun(c, result));
            break;
          case "hyperlink":
            result.children.push(this.parseHyperlink(c, result));
            break;
          case "smartTag":
            result.children.push(this.parseSmartTag(c, result));
            break;
          case "bookmarkStart":
            result.children.push(parseBookmarkStart(c, xml_parser_default));
            break;
          case "bookmarkEnd":
            result.children.push(parseBookmarkEnd(c, xml_parser_default));
            break;
          case "commentRangeStart":
            result.children.push(new WmlCommentRangeStart(xml_parser_default.attr(c, "id")));
            break;
          case "commentRangeEnd":
            result.children.push(new WmlCommentRangeEnd(xml_parser_default.attr(c, "id")));
            break;
          case "sdt":
            result.children.push(...this.parseSdt(c, (e) => this.parseParagraph(e).children));
            break;
          case "ins":
            result.children.push(this.parseInserted(c, (e) => this.parseParagraph(e)));
            break;
          case "del":
            result.children.push(this.parseDeleted(c, (e) => this.parseParagraph(e)));
            break;
        }
      return result;
    }
    parseRun(node, parent) {
      var result = { type: "run" /* Run */, parent, children: [] };
      for (let c of xml_parser_default.elements(node))
        if (c = this.checkAlternateContent(c), !!c)
          switch (c.localName) {
            case "t":
              result.children.push({
                type: "text" /* Text */,
                text: c.textContent
              });
              break;
            case "delText":
              result.children.push({
                type: "deletedText" /* DeletedText */,
                text: c.textContent
              });
              break;
            case "commentReference":
              result.children.push(new WmlCommentReference(xml_parser_default.attr(c, "id")));
              break;
            case "fldSimple":
              result.children.push(this.parseSimpleField(c, result));
              break;
            case "instrText":
              result.fieldRun = !0, result.children.push({
                type: "instruction" /* Instruction */,
                text: c.textContent
              });
              break;
            case "fldChar":
              result.fieldRun = !0, result.children.push({
                type: "complexField" /* ComplexField */,
                charType: xml_parser_default.attr(c, "fldCharType"),
                lock: xml_parser_default.boolAttr(c, "lock", !1),
                dirty: xml_parser_default.boolAttr(c, "dirty", !1)
              });
              break;
            case "noBreakHyphen":
              result.children.push({ type: "noBreakHyphen" /* NoBreakHyphen */ });
              break;
            case "softHyphen":
              result.children.push({ type: "softHyphen" /* SoftHyphen */ });
              break;
            case "cr":
              result.children.push({
                type: "break" /* Break */,
                break: "line"
              });
              break;
            case "ptab":
              result.children.push({
                type: "positionalTab" /* PositionalTab */,
                alignment: xml_parser_default.attr(c, "alignment") || "left",
                relativeTo: xml_parser_default.attr(c, "relativeTo") || "margin",
                leader: xml_parser_default.attr(c, "leader") || "none"
              });
              break;
            case "br":
              result.children.push({
                type: "break" /* Break */,
                break: xml_parser_default.attr(c, "type") || "textWrapping"
              });
              break;
            case "lastRenderedPageBreak":
              result.children.push({
                type: "break" /* Break */,
                break: "lastRenderedPageBreak"
              });
              break;
            case "sym":
              result.children.push({
                type: "symbol" /* Symbol */,
                font: encloseFontFamily(xml_parser_default.attr(c, "font")),
                char: xml_parser_default.hexAttr(c, "char")
              });
              break;
            case "tab":
              result.children.push({ type: "tab" /* Tab */ });
              break;
            case "footnoteReference":
              result.children.push({
                type: "footnoteReference" /* FootnoteReference */,
                id: xml_parser_default.attr(c, "id"),
                customMarkFollows: xml_parser_default.boolAttr(c, "customMarkFollows")
              });
              break;
            case "endnoteReference":
              result.children.push({
                type: "endnoteReference" /* EndnoteReference */,
                id: xml_parser_default.attr(c, "id"),
                customMarkFollows: xml_parser_default.boolAttr(c, "customMarkFollows")
              });
              break;
            case "drawing":
              let d = this.parseDrawing(c, this.findAncestorParagraph(parent));
              d && result.children.push(d);
              break;
            case "pict":
              result.children.push(this.parseVmlPicture(c));
              break;
            case "object":
              result.children.push(this.parseVmlPicture(c));
              break;
            case "ruby":
              result.children.push(this.parseRuby(c));
              break;
            case "rPr":
              this.parseRunProperties(c, result);
              break;
          }
      return result;
    }
    parseRuby(elem) {
      let result = { type: "ruby" /* Ruby */, children: [] };
      for (let child of xml_parser_default.elements(elem))
        switch (child.localName) {
          case "rubyPr":
            for (let prop of xml_parser_default.elements(child))
              prop.localName === "rubyAlign" && (result.align = xml_parser_default.attr(prop, "val"));
            break;
          case "rt":
            result.children.push(this.parseRubyContent(child, "rubyText" /* RubyText */));
            break;
          case "rubyBase":
            result.children.push(this.parseRubyContent(child, "rubyBase" /* RubyBase */));
            break;
        }
      return result;
    }
    parseRubyContent(elem, type) {
      let result = { type, children: [] };
      for (let child of xml_parser_default.elements(elem))
        if (child.localName == "r")
          result.children.push(this.parseRun(child, result));
        else if (type == "rubyText" /* RubyText */ && child.localName == "rPr") {
          let hps = xml_parser_default.element(child, "hps"), hpsVal = hps ? xml_parser_default.intAttr(hps, "val", null) : null;
          hpsVal != null && (result.cssStyle = { ...result.cssStyle ?? {}, fontSize: `${hpsVal / 2}pt` });
        }
      return result;
    }
    parseMathElement(elem) {
      let propsTag = `${elem.localName}Pr`, result = { type: mmlTagMap[elem.localName], children: [] }, hiddenRevision = !1, appendChild = (el) => {
        if (mmlTagMap[el.localName]) {
          let child = this.parseMathElement(el);
          child ? (child.parent = result, result.children.push(child)) : hiddenRevision = !0;
        } else if (el.localName == "r") {
          var run = this.parseRun(el, result);
          run.type = "mmlRun" /* MmlRun */, result.children.push(run);
        } else if (el.localName == propsTag)
          result.props = this.parseMathProperies(el);
        else if (el.localName == "ins")
          for (let child of xml_parser_default.elements(el))
            appendChild(child);
        else if (el.localName == "del")
          if (this.options.renderChanges)
            for (let child of xml_parser_default.elements(el))
              appendChild(child);
          else
            hiddenRevision = !0;
      };
      for (let el of xml_parser_default.elements(elem))
        appendChild(el);
      return hiddenRevision && !this.hasVisibleMathContent(result) ? null : result;
    }
    hasVisibleMathContent(elem) {
      for (let child of elem.children ?? []) {
        switch (child.type) {
          case "text" /* Text */:
            if (child.text?.length)
              return !0;
            break;
          case "deletedText" /* DeletedText */:
            if (this.options.renderChanges && child.text?.length)
              return !0;
            break;
          case "symbol" /* Symbol */:
          case "tab" /* Tab */:
          case "positionalTab" /* PositionalTab */:
          case "noBreakHyphen" /* NoBreakHyphen */:
          case "break" /* Break */:
            return !0;
        }
        if (this.hasVisibleMathContent(child))
          return !0;
      }
      return !1;
    }
    parseMathProperies(elem) {
      let result = {};
      for (let el of xml_parser_default.elements(elem))
        switch (el.localName) {
          case "chr":
            result.char = xml_parser_default.attr(el, "val");
            break;
          case "type":
            result.type = xml_parser_default.attr(el, "val");
            break;
          case "jc":
            result.justification = xml_parser_default.attr(el, "val");
            break;
          case "vertJc":
            result.verticalJustification = xml_parser_default.attr(el, "val");
            break;
          case "pos":
            result.position = xml_parser_default.attr(el, "val");
            break;
          case "degHide":
            result.hideDegree = xml_parser_default.boolAttr(el, "val");
            break;
          case "subHide":
            result.hideSubscript = xml_parser_default.boolAttr(el, "val");
            break;
          case "supHide":
            result.hideSuperscript = xml_parser_default.boolAttr(el, "val");
            break;
          case "begChr":
            result.beginChar = xml_parser_default.attr(el, "val");
            break;
          case "endChr":
            result.endChar = xml_parser_default.attr(el, "val");
            break;
          case "limLoc":
            result.limitLocation = xml_parser_default.attr(el, "val");
            break;
          case "grow":
            result.grow = xml_parser_default.boolAttr(el, "val");
            break;
          case "sepChr":
            result.separatorChar = xml_parser_default.attr(el, "val");
            break;
        }
      return result;
    }
    parseRunProperties(elem, run) {
      this.parseDefaultProperties(elem, run.cssStyle = {}, null, (c) => {
        switch (c.localName) {
          case "rStyle":
            run.styleName = xml_parser_default.attr(c, "val");
            break;
          case "vertAlign":
            run.verticalAlign = values.valueOfVertAlign(c, !0);
            break;
          default:
            return !1;
        }
        return !0;
      });
    }
    parseVmlPicture(elem) {
      let result = { type: "vmlPicture" /* VmlPicture */, children: [] };
      for (let el of xml_parser_default.elements(elem)) {
        let child = parseVmlElement(el, this);
        child && result.children.push(child);
      }
      return result;
    }
    checkAlternateContent(elem) {
      if (elem.localName != "AlternateContent")
        return elem;
      for (let choice of xml_parser_default.elements(elem).filter((x) => x.localName == "Choice")) {
        let requires = (xml_parser_default.attr(choice, "Requires") ?? "").split(/\s+/).filter(Boolean);
        if (requires.length > 0 && requires.every((prefix) => supportedNamespaceURIs.includes(elem.lookupNamespaceURI(prefix)))) {
          let selected = xml_parser_default.elements(choice)[0];
          if (selected)
            return selected;
        }
      }
      let fallback = xml_parser_default.element(elem, "Fallback");
      return fallback ? xml_parser_default.elements(fallback)[0] : null;
    }
    findAncestorParagraph(elem) {
      let current = elem;
      for (; current; ) {
        if (current.type === "paragraph" /* Paragraph */)
          return current;
        current = current.parent;
      }
      return null;
    }
    parseDrawing(node, inheritedParagraph) {
      for (var n of xml_parser_default.elements(node))
        switch (n.localName) {
          case "inline":
          case "anchor":
            return this.parseDrawingWrapper(n, inheritedParagraph);
        }
    }
    parseDrawingWrapper(node, inheritedParagraph) {
      var _a;
      var result = { type: "drawing" /* Drawing */, children: [], cssStyle: {}, props: {} }, isAnchor = node.localName == "anchor";
      let drawingMeta = {
        wrapper: isAnchor ? "wp-anchor" : "wp-inline",
        hasPositiveEffectExtent: !1,
        effectExtentEmu: { l: 0, t: 0, r: 0, b: 0 },
        extentEmu: { cx: 0, cy: 0 },
        relativeHeight: null
      };
      result.props.drawingMeta = drawingMeta;
      let addMargin = (prop, value) => {
        value && (result.cssStyle[prop] = values.addSize(result.cssStyle[prop], value));
      };
      addMargin("margin-left", xml_parser_default.lengthAttr(node, "distL", LengthUsage.Emu)), addMargin("margin-top", xml_parser_default.lengthAttr(node, "distT", LengthUsage.Emu)), addMargin("margin-right", xml_parser_default.lengthAttr(node, "distR", LengthUsage.Emu)), addMargin("margin-bottom", xml_parser_default.lengthAttr(node, "distB", LengthUsage.Emu));
      let wrapType = null, wrapText = null, wrapPolygon = null, simplePos = xml_parser_default.boolAttr(node, "simplePos", !1), behindDoc = xml_parser_default.boolAttr(node, "behindDoc", !1), relativeHeight = xml_parser_default.intAttr(node, "relativeHeight", null);
      relativeHeight != null && (result.cssStyle["z-index"] = `${Math.max(1, Math.round(relativeHeight / 1e3))}`), drawingMeta.relativeHeight = relativeHeight, behindDoc && (result.cssStyle["z-index"] = "0");
      let posX = { relative: "page", align: "left", offset: null }, posY = { relative: "page", align: "top", offset: null };
      for (var n of xml_parser_default.elements(node))
        switch (n.localName) {
          case "simplePos":
            simplePos && (posX.offset = xml_parser_default.lengthAttr(n, "x", LengthUsage.Emu), posY.offset = xml_parser_default.lengthAttr(n, "y", LengthUsage.Emu));
            break;
          case "extent":
            drawingMeta.extentEmu = {
              cx: xml_parser_default.intAttr(n, "cx", 0) ?? 0,
              cy: xml_parser_default.intAttr(n, "cy", 0) ?? 0
            }, result.cssStyle.width = xml_parser_default.lengthAttr(n, "cx", LengthUsage.Emu), result.cssStyle.height = xml_parser_default.lengthAttr(n, "cy", LengthUsage.Emu);
            break;
          case "effectExtent":
            drawingMeta.effectExtentEmu = {
              l: xml_parser_default.intAttr(n, "l", 0) ?? 0,
              t: xml_parser_default.intAttr(n, "t", 0) ?? 0,
              r: xml_parser_default.intAttr(n, "r", 0) ?? 0,
              b: xml_parser_default.intAttr(n, "b", 0) ?? 0
            }, drawingMeta.hasPositiveEffectExtent = Object.values(drawingMeta.effectExtentEmu).some((v) => v > 0), addMargin("margin-left", xml_parser_default.lengthAttr(n, "l", LengthUsage.Emu)), addMargin("margin-top", xml_parser_default.lengthAttr(n, "t", LengthUsage.Emu)), addMargin("margin-right", xml_parser_default.lengthAttr(n, "r", LengthUsage.Emu)), addMargin("margin-bottom", xml_parser_default.lengthAttr(n, "b", LengthUsage.Emu));
            break;
          case "docPr":
            result.props.title = xml_parser_default.attr(n, "title") ?? xml_parser_default.attr(n, "name"), result.props.alt = xml_parser_default.attr(n, "descr") ?? result.props.title;
            break;
          case "positionH":
          case "positionV":
            if (!simplePos) {
              let pos = n.localName == "positionH" ? posX : posY;
              var alignNode = xml_parser_default.element(n, "align"), offsetNode = xml_parser_default.element(n, "posOffset");
              pos.relative = xml_parser_default.attr(n, "relativeFrom") ?? pos.relative, alignNode && (pos.align = alignNode.textContent, offsetNode || (pos.offset = null)), offsetNode && (pos.offset = convertLength(offsetNode.textContent, LengthUsage.Emu));
            }
            break;
          case "wrapTopAndBottom":
            wrapType = "wrapTopAndBottom";
            break;
          case "wrapNone":
            wrapType = "wrapNone";
            break;
          case "wrapSquare":
            wrapType = "wrapSquare", wrapText = xml_parser_default.attr(n, "wrapText");
            break;
          case "wrapTight":
            wrapType = "wrapTight", wrapText = xml_parser_default.attr(n, "wrapText"), wrapPolygon = this.parseWrapPolygon(n);
            break;
          case "wrapThrough":
            wrapType = "wrapThrough", wrapText = xml_parser_default.attr(n, "wrapText"), wrapPolygon = this.parseWrapPolygon(n);
            break;
          case "graphic":
            var g = this.parseGraphic(n);
            g && (this.applyDrawingTextContext(g, inheritedParagraph), (g.type == "image" /* Image */ || g.type == "shape" /* Shape */ || g.type == "chart" /* Chart */ || g.type == "smartArt" /* SmartArt */ || g.type == "ink" /* Ink */) && (g.alt ?? (g.alt = result.props.alt), g.title ?? (g.title = result.props.title)), result.children.push(g));
            break;
        }
      result.props.anchorPosition = {
        horizontal: { ...posX },
        vertical: { ...posY },
        wrapType,
        behindDoc,
        layoutInCell: xml_parser_default.boolAttr(node, "layoutInCell", !0),
        simplePos
      };
      let applyHorizontalAlignment = () => {
        switch (posX.align) {
          case "center":
            result.cssStyle["margin-left"] = "auto", result.cssStyle["margin-right"] = "auto";
            break;
          case "right":
            result.cssStyle["margin-left"] = "auto";
            break;
        }
      };
      return wrapType == "wrapTopAndBottom" ? (result.cssStyle.display = "block", result.cssStyle.clear = "both", applyHorizontalAlignment()) : wrapType == "wrapNone" ? (result.cssStyle.display = "block", result.cssStyle.position = isAnchor ? "absolute" : "relative", posX.offset && (result.cssStyle.left = posX.offset), posY.offset && (result.cssStyle.top = posY.offset)) : wrapType == "wrapSquare" || wrapType == "wrapTight" || wrapType == "wrapThrough" ? (wrapPolygon && (result.cssStyle["shape-outside"] = wrapPolygon, (_a = result.cssStyle)["clip-path"] ?? (_a["clip-path"] = wrapPolygon)), wrapText == "left" ? result.cssStyle.float = "right" : wrapText == "right" ? result.cssStyle.float = "left" : posX.align == "left" || posX.align == "right" ? result.cssStyle.float = posX.align : (result.cssStyle.display = "block", applyHorizontalAlignment())) : isAnchor && (posX.align == "left" || posX.align == "right") ? result.cssStyle.float = posX.align : result.cssStyle["vertical-align"] = "text-bottom", result;
    }
    parseWrapPolygon(elem) {
      let polygon = xml_parser_default.element(elem, "wrapPolygon");
      if (!polygon)
        return null;
      let points = [], addPoint = (pt) => {
        let x = xml_parser_default.lengthAttr(pt, "x", LengthUsage.Emu), y = xml_parser_default.lengthAttr(pt, "y", LengthUsage.Emu);
        x && y && points.push(`${x} ${y}`);
      };
      for (let n of xml_parser_default.elements(polygon))
        (n.localName == "start" || n.localName == "lineTo") && addPoint(n);
      return points.length >= 3 ? `polygon(${points.join(", ")})` : null;
    }
    parseGraphic(elem) {
      var graphicData = xml_parser_default.element(elem, "graphicData");
      if (!graphicData)
        return null;
      for (let n of xml_parser_default.elements(graphicData))
        switch (n.localName) {
          case "pic":
            return this.parsePicture(n);
          case "wpc":
          case "wgp":
          case "grpSp":
            return this.parseDrawingContainer(n);
          case "wsp":
          case "sp":
          case "cxnSp":
            return this.parseDmlPositionedShape(n) ?? this.parseWordprocessingShape(n);
          case "chart":
            return this.parseChartReference(n);
          case "relIds":
            return this.parseSmartArtReference(n);
          case "diagram":
            return this.parseSmartArtReference(n);
          case "contentPart":
          case "ink":
            return this.parseInkReference(n);
        }
      let contentPart = this.findDescendant(graphicData, "contentPart");
      return contentPart ? this.parseInkReference(contentPart) : null;
    }
    parseDrawingContainer(elem, parentTransform) {
      let result = {
        type: "shape" /* Shape */,
        children: [],
        cssStyle: {
          display: "inline-block",
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "visible",
          "box-sizing": "border-box"
        },
        props: { dmlContainer: !0 }
      }, transform = this.parseDmlGroupTransform(elem, parentTransform);
      for (let child of xml_parser_default.elements(elem))
        switch (child.localName) {
          case "pic":
            let image = this.parseDmlPositionedPicture(child, transform);
            image && result.children.push(image);
            break;
          case "wsp":
          case "sp":
          case "cxnSp":
            let shape = this.parseDmlPositionedShape(child, transform);
            shape && result.children.push(shape);
            break;
          case "grpSp":
          case "wgp":
            let group = this.parseDrawingContainer(child, transform);
            group && result.children.push(group);
            break;
        }
      return result;
    }
    applyDrawingTextContext(elem, inheritedParagraph) {
      if (!elem || !inheritedParagraph?.cssStyle)
        return;
      let inheritedAlign = inheritedParagraph.cssStyle["text-align"];
      if (!inheritedAlign)
        return;
      let visit = (node) => {
        if (!node)
          return;
        let props = node?.props ?? {};
        if (props.dmlShape || props.dmlSvg) {
          for (let child of node.children ?? [])
            if (child.type === "paragraph" /* Paragraph */) {
              let css = child.cssStyle ?? {};
              !css["text-align"] && !css.textAlign && (child.cssStyle = { ...css, "text-align": inheritedAlign });
            }
        }
        for (let child of node.children ?? [])
          visit(child);
      };
      visit(elem);
    }
    parseDmlPositionedPicture(elem, transform) {
      let image = this.parsePicture(elem), spPr = xml_parser_default.element(elem, "spPr");
      if (!spPr)
        return image;
      let bounds = this.parseDmlShapeBounds(spPr, transform);
      return image.cssStyle.position = "absolute", image.cssStyle.left = this.pt(bounds.left), image.cssStyle.top = this.pt(bounds.top), image.cssStyle.width = this.pt(bounds.width), image.cssStyle.height = this.pt(bounds.height), image.props = {
        ...image.props ?? {},
        dmlPicture: !0,
        ...this.parseDmlShapeTransform(spPr)
      }, image;
    }
    parseDmlGroupTransform(elem, parentTransform) {
      let groupProps = xml_parser_default.element(elem, "grpSpPr"), xfrm = groupProps ? xml_parser_default.element(groupProps, "xfrm") : xml_parser_default.element(elem, "xfrm"), off = xfrm ? xml_parser_default.element(xfrm, "off") : null, ext = xfrm ? xml_parser_default.element(xfrm, "ext") : null, chOff = xfrm ? xml_parser_default.element(xfrm, "chOff") : null, chExt = xfrm ? xml_parser_default.element(xfrm, "chExt") : null, extCx = ext ? xml_parser_default.floatAttr(ext, "cx", null) : null, extCy = ext ? xml_parser_default.floatAttr(ext, "cy", null) : null, chExtCx = chExt ? xml_parser_default.floatAttr(chExt, "cx", null) : null, chExtCy = chExt ? xml_parser_default.floatAttr(chExt, "cy", null) : null, local = {
        offsetX: chOff ? xml_parser_default.floatAttr(chOff, "x", 0) : 0,
        offsetY: chOff ? xml_parser_default.floatAttr(chOff, "y", 0) : 0,
        left: off ? xml_parser_default.floatAttr(off, "x", 0) : 0,
        top: off ? xml_parser_default.floatAttr(off, "y", 0) : 0,
        scaleX: extCx && chExtCx ? extCx / chExtCx : 1,
        scaleY: extCy && chExtCy ? extCy / chExtCy : 1
      };
      return parentTransform ? {
        offsetX: local.offsetX,
        offsetY: local.offsetY,
        left: parentTransform.left + (local.left - parentTransform.offsetX) * parentTransform.scaleX,
        top: parentTransform.top + (local.top - parentTransform.offsetY) * parentTransform.scaleY,
        scaleX: parentTransform.scaleX * local.scaleX,
        scaleY: parentTransform.scaleY * local.scaleY
      } : local;
    }
    parseDmlPositionedShape(elem, transform) {
      let spPr = xml_parser_default.element(elem, "spPr");
      if (!spPr)
        return null;
      let bounds = this.parseDmlShapeBounds(spPr, transform), textChildren = [], bodyPr = null;
      for (let n of xml_parser_default.elements(elem))
        switch (n.localName) {
          case "txbx":
          case "textBox":
            for (let txbxContent of xml_parser_default.elements(n, "txbxContent"))
              textChildren.push(...this.parseBodyElements(txbxContent));
            break;
          case "bodyPr":
            bodyPr = n;
            break;
        }
      bodyPr ?? (bodyPr = xml_parser_default.element(elem, "bodyPr"));
      let cssStyle = {
        position: "absolute",
        left: this.pt(bounds.left),
        top: this.pt(bounds.top),
        width: this.pt(bounds.width),
        height: this.pt(bounds.height),
        "box-sizing": "border-box",
        overflow: "hidden"
      }, cNvPr = xml_parser_default.element(elem, "cNvPr"), geom = xml_parser_default.element(spPr, "custGeom"), prstGeom = xml_parser_default.element(spPr, "prstGeom"), geometryAdjustments = this.parseDmlPresetGeometryAdjustments(prstGeom), transformProps = this.parseDmlShapeTransform(spPr), explicitFillStyle = this.parseDmlFillStyle(spPr), fillStyle = (explicitFillStyle.explicit ? null : this.parseDmlShapeStyleFill(elem)) ?? explicitFillStyle, explicitLine = xml_parser_default.element(spPr, "ln"), lineStyle = explicitLine ? this.parseDmlLineStyle(explicitLine) : this.parseDmlShapeStyleLine(elem) ?? this.parseDmlLineStyle(null);
      textChildren.length && (cssStyle.display = "flex", cssStyle["flex-direction"] = "column", cssStyle["justify-content"] = this.dmlVerticalAlign(bodyPr), cssStyle["align-items"] = "stretch"), this.applyDmlTextInsets(bodyPr, cssStyle);
      let textAutoFitProps = this.parseDmlTextAutoFit(bodyPr);
      if (geom) {
        let path = this.parseDmlCustomGeometry(geom);
        return {
          type: "shape" /* Shape */,
          children: textChildren,
          cssStyle: { ...cssStyle, overflow: "visible" },
          props: {
            dmlSvg: !0,
            viewBox: path?.viewBox ?? "0 0 1 1",
            pathD: path?.d ?? "",
            geometryAdjustments,
            fill: fillStyle.fill ?? "none",
            stroke: lineStyle.stroke ?? "none",
            strokeWidth: lineStyle.strokeWidth ?? "0",
            strokeLinecap: lineStyle.strokeLinecap,
            strokeDasharray: lineStyle.strokeDasharray,
            markerStart: lineStyle.markerStart,
            markerEnd: lineStyle.markerEnd,
            ...transformProps,
            textWrap: bodyPr ? xml_parser_default.attr(bodyPr, "wrap") : null,
            ...textAutoFitProps
          },
          title: cNvPr ? xml_parser_default.attr(cNvPr, "title") ?? xml_parser_default.attr(cNvPr, "name") : null,
          alt: cNvPr ? xml_parser_default.attr(cNvPr, "descr") : null
        };
      }
      return fillStyle.backgroundColor && (cssStyle["background-color"] = fillStyle.backgroundColor), fillStyle.backgroundImage && (cssStyle["background-image"] = fillStyle.backgroundImage), lineStyle.stroke && lineStyle.stroke != "none" ? cssStyle.border = `${lineStyle.strokeWidth || "0.75pt"} ${lineStyle.borderType || "solid"} ${lineStyle.stroke}` : cssStyle.border = "none", {
        type: "shape" /* Shape */,
        children: textChildren,
        cssStyle,
        props: {
          dmlShape: !0,
          presetGeometry: prstGeom ? xml_parser_default.attr(prstGeom, "prst") : null,
          geometryAdjustments,
          fill: fillStyle.fill ?? "none",
          stroke: lineStyle.stroke ?? "none",
          strokeWidth: lineStyle.strokeWidth ?? "0",
          strokeLinecap: lineStyle.strokeLinecap,
          strokeDasharray: lineStyle.strokeDasharray,
          markerStart: lineStyle.markerStart,
          markerEnd: lineStyle.markerEnd,
          ...transformProps,
          textWrap: bodyPr ? xml_parser_default.attr(bodyPr, "wrap") : null,
          ...textAutoFitProps
        },
        title: cNvPr ? xml_parser_default.attr(cNvPr, "title") ?? xml_parser_default.attr(cNvPr, "name") : null,
        alt: cNvPr ? xml_parser_default.attr(cNvPr, "descr") : null
      };
    }
    parseDmlShapeBounds(spPr, transform) {
      let xfrm = xml_parser_default.element(spPr, "xfrm"), off = xfrm ? xml_parser_default.element(xfrm, "off") : null, ext = xfrm ? xml_parser_default.element(xfrm, "ext") : null, scaleX = transform?.scaleX ?? 1, scaleY = transform?.scaleY ?? 1, baseX = transform?.offsetX ?? 0, baseY = transform?.offsetY ?? 0, parentLeft = transform?.left ?? 0, parentTop = transform?.top ?? 0, x = off ? xml_parser_default.floatAttr(off, "x", 0) : 0, y = off ? xml_parser_default.floatAttr(off, "y", 0) : 0, cx = ext ? xml_parser_default.floatAttr(ext, "cx", 0) : 0, cy = ext ? xml_parser_default.floatAttr(ext, "cy", 0) : 0;
      return {
        left: this.emuToPt(parentLeft + (x - baseX) * scaleX),
        top: this.emuToPt(parentTop + (y - baseY) * scaleY),
        width: Math.max(0, this.emuToPt(cx * scaleX)),
        height: Math.max(0, this.emuToPt(cy * scaleY))
      };
    }
    parseDmlPresetGeometryAdjustments(prstGeom) {
      let result = {};
      if (!prstGeom)
        return result;
      let avLst = xml_parser_default.element(prstGeom, "avLst");
      if (!avLst)
        return result;
      for (let gd of xml_parser_default.elements(avLst, "gd")) {
        let name = xml_parser_default.attr(gd, "name"), match = String(xml_parser_default.attr(gd, "fmla") ?? "").trim().match(/^val\s+(-?\d+(?:\.\d+)?)$/i);
        name && match && (result[name] = parseFloat(match[1]));
      }
      return result;
    }
    parseDmlShapeTransform(spPr) {
      let xfrm = xml_parser_default.element(spPr, "xfrm");
      if (!xfrm)
        return {};
      let rot = xml_parser_default.floatAttr(xfrm, "rot", 0), props = {};
      return rot && (props.rotation = rot / 6e4), xml_parser_default.boolAttr(xfrm, "flipH", !1) && (props.flipH = !0), xml_parser_default.boolAttr(xfrm, "flipV", !1) && (props.flipV = !0), props;
    }
    parseDmlFillStyle(spPr) {
      if (xml_parser_default.element(spPr, "noFill"))
        return { fill: "none", backgroundColor: "transparent", explicit: !0 };
      let solidFill = xml_parser_default.element(spPr, "solidFill");
      if (solidFill) {
        let color = this.parseDmlColor(solidFill) ?? "transparent";
        return { fill: color, backgroundColor: color, explicit: !0 };
      }
      let pattFill = xml_parser_default.element(spPr, "pattFill");
      if (pattFill) {
        let fg = this.parseDmlColor(xml_parser_default.element(pattFill, "fgClr")) ?? "currentColor", bg = this.parseDmlColor(xml_parser_default.element(pattFill, "bgClr")) ?? "transparent", prst = xml_parser_default.attr(pattFill, "prst"), angle = prst && prst.toLowerCase().includes("horz") ? "0deg" : "90deg";
        return {
          fill: bg,
          backgroundColor: bg,
          backgroundImage: `repeating-linear-gradient(${angle}, ${fg} 0, ${fg} 0.75pt, ${bg} 0.75pt, ${bg} 3pt)`,
          explicit: !0
        };
      }
      return { fill: "none", backgroundColor: "transparent", explicit: !1 };
    }
    parseDmlShapeStyleFill(shape) {
      let style = xml_parser_default.element(shape, "style"), fillRef = style ? xml_parser_default.element(style, "fillRef") : null, color = this.parseDmlColor(fillRef);
      return color ? {
        fill: color,
        backgroundColor: color,
        explicit: !1
      } : null;
    }
    parseDmlShapeStyleLine(shape) {
      let style = xml_parser_default.element(shape, "style"), lineRef = style ? xml_parser_default.element(style, "lnRef") : null;
      if (!lineRef)
        return null;
      let themeLine = this.resolveDmlThemeLineStyle(xml_parser_default.intAttr(lineRef, "idx", null)), dash = themeLine?.dash, strokeDasharray = dash && dash != "solid" ? dash == "dot" ? "1 2" : "4 3" : null;
      return {
        stroke: this.parseDmlColor(lineRef) ?? "black",
        strokeWidth: themeLine?.width ? this.pt(this.emuToPt(themeLine.width)) : "0.75pt",
        borderType: strokeDasharray ? "dashed" : "solid",
        strokeDasharray,
        strokeLinecap: this.parseDmlLineCap(themeLine?.cap)
      };
    }
    resolveDmlThemeLineStyle(idx) {
      return idx == null || idx <= 0 ? null : this.theme?.formatScheme?.lineStyles?.[idx - 1] ?? defaultDmlThemeLineStyles[idx - 1] ?? null;
    }
    parseDmlLineStyle(line) {
      if (!line || xml_parser_default.element(line, "noFill"))
        return { stroke: "none", strokeWidth: "0", borderType: "none" };
      let stroke = this.parseDmlColor(xml_parser_default.element(line, "solidFill")) ?? "black", width = xml_parser_default.attr(line, "w") ? this.pt(this.emuToPt(xml_parser_default.floatAttr(line, "w", 0))) : "0.75pt", dash = xml_parser_default.elementAttr(line, "prstDash", "val"), strokeLinecap = this.parseDmlLineCap(xml_parser_default.attr(line, "cap")), strokeDasharray = null, borderType = "solid";
      dash && dash != "solid" && (borderType = "dashed", strokeDasharray = dash == "dot" ? "1 2" : "4 3");
      let markerStart = this.parseDmlLineEndMarker(xml_parser_default.element(line, "tailEnd")), markerEnd = this.parseDmlLineEndMarker(xml_parser_default.element(line, "headEnd"));
      return { stroke, strokeWidth: width, borderType, strokeDasharray, markerStart, markerEnd, strokeLinecap };
    }
    parseDmlLineCap(value) {
      switch (String(value ?? "").toLowerCase()) {
        case "flat":
          return "butt";
        case "rnd":
          return "round";
        case "sq":
          return "square";
        default:
          return null;
      }
    }
    parseDmlLineEndMarker(elem) {
      let type = elem ? xml_parser_default.attr(elem, "type") : null;
      return type && type != "none" ? type : null;
    }
    parseDmlCustomGeometry(geom) {
      let pathList = xml_parser_default.element(geom, "pathLst"), paths = pathList ? xml_parser_default.elements(pathList, "path") : [], d = "", viewWidth = 1, viewHeight = 1;
      for (let path of paths) {
        let width = xml_parser_default.floatAttr(path, "w", viewWidth), height = xml_parser_default.floatAttr(path, "h", viewHeight);
        viewWidth = Math.max(viewWidth, width || 1), viewHeight = Math.max(viewHeight, height || 1), d += this.parseDmlPathData(path, width || 1, height || 1);
      }
      return { d: d.trim(), viewBox: `0 0 ${viewWidth} ${viewHeight}` };
    }
    parseDmlPathData(path, width, height) {
      let parts = [], point = (el) => {
        let pt = xml_parser_default.element(el, "pt");
        return pt ? `${this.dmlCoord(xml_parser_default.attr(pt, "x"), width, height)} ${this.dmlCoord(xml_parser_default.attr(pt, "y"), width, height)}` : "0 0";
      };
      for (let child of xml_parser_default.elements(path))
        switch (child.localName) {
          case "moveTo":
            parts.push(`M ${point(child)}`);
            break;
          case "lnTo":
            parts.push(`L ${point(child)}`);
            break;
          case "cubicBezTo":
            let cubic = xml_parser_default.elements(child, "pt").map((pt) => `${this.dmlCoord(xml_parser_default.attr(pt, "x"), width, height)} ${this.dmlCoord(xml_parser_default.attr(pt, "y"), width, height)}`);
            cubic.length == 3 && parts.push(`C ${cubic.join(" ")}`);
            break;
          case "quadBezTo":
            let quad = xml_parser_default.elements(child, "pt").map((pt) => `${this.dmlCoord(xml_parser_default.attr(pt, "x"), width, height)} ${this.dmlCoord(xml_parser_default.attr(pt, "y"), width, height)}`);
            quad.length == 2 && parts.push(`Q ${quad.join(" ")}`);
            break;
          case "close":
            parts.push("Z");
            break;
        }
      return parts.join(" ") + " ";
    }
    dmlCoord(value, width, height) {
      if (value == "w" || value == "r")
        return width;
      if (value == "h" || value == "b")
        return height;
      if (value == "l" || value == "t")
        return 0;
      let parsed = parseFloat(value);
      return Number.isFinite(parsed) ? parsed : 0;
    }
    dmlVerticalAlign(bodyPr) {
      switch (bodyPr ? xml_parser_default.attr(bodyPr, "anchor") : null) {
        case "ctr":
          return "center";
        case "b":
          return "flex-end";
        default:
          return "flex-start";
      }
    }
    parseDmlTextAutoFit(bodyPr) {
      if (!bodyPr)
        return {};
      if (xml_parser_default.element(bodyPr, "noAutofit"))
        return { textAutoFit: "none" };
      let norm = xml_parser_default.element(bodyPr, "normAutofit");
      if (norm) {
        let fontScale = this.parseDmlPercentage(xml_parser_default.attr(norm, "fontScale"), 1), lineSpaceReduction = this.parseDmlPercentage(xml_parser_default.attr(norm, "lnSpcReduction"), 0);
        return {
          textAutoFit: "normal",
          textAutoFitFontScale: fontScale,
          textAutoFitLineSpaceReduction: lineSpaceReduction
        };
      }
      return xml_parser_default.element(bodyPr, "spAutoFit") ? { textAutoFit: "shape" } : {};
    }
    parseDmlPercentage(value, fallback) {
      if (value == null || value === "")
        return fallback;
      let raw = String(value).trim();
      if (!raw)
        return fallback;
      let parsed = parseFloat(raw);
      if (!Number.isFinite(parsed))
        return fallback;
      let result = raw.endsWith("%") ? parsed / 100 : parsed / 1e5;
      return Number.isFinite(result) ? result : fallback;
    }
    applyDmlTextInsets(bodyPr, cssStyle) {
      if (!bodyPr)
        return;
      let map = { lIns: "padding-left", tIns: "padding-top", rIns: "padding-right", bIns: "padding-bottom" };
      for (let [attr, prop] of Object.entries(map)) {
        let value = xml_parser_default.attr(bodyPr, attr);
        value != null && (cssStyle[prop] = this.pt(this.emuToPt(parseFloat(value))));
      }
    }
    emuToPt(value) {
      return (Number.isFinite(value) ? value : 0) / 12700;
    }
    pt(value) {
      return `${Math.round(value * 100) / 100}pt`;
    }
    parseChartReference(elem) {
      return {
        type: "chart" /* Chart */,
        id: xml_parser_default.attr(elem, "id"),
        cssStyle: {
          width: "100%",
          height: "100%"
        }
      };
    }
    parseSmartArtReference(elem) {
      let relIds = elem.localName == "relIds" ? elem : this.findDescendant(elem, "relIds");
      return {
        type: "smartArt" /* SmartArt */,
        dataId: relIds ? xml_parser_default.attr(relIds, "dm") : xml_parser_default.attr(elem, "dm"),
        layoutId: relIds ? xml_parser_default.attr(relIds, "lo") : xml_parser_default.attr(elem, "lo"),
        styleId: relIds ? xml_parser_default.attr(relIds, "qs") : xml_parser_default.attr(elem, "qs"),
        colorId: relIds ? xml_parser_default.attr(relIds, "cs") : xml_parser_default.attr(elem, "cs"),
        cssStyle: {
          width: "100%",
          height: "100%"
        }
      };
    }
    parseInkReference(elem) {
      return {
        type: "ink" /* Ink */,
        id: xml_parser_default.attr(elem, "id"),
        cssStyle: {
          width: "100%",
          height: "100%"
        }
      };
    }
    parseGraphicPlaceholder(label) {
      return {
        type: "shape" /* Shape */,
        children: [{ type: "text" /* Text */, text: `[${label}]` }],
        cssStyle: {
          display: "inline-flex",
          "align-items": "center",
          "justify-content": "center",
          border: "1px solid #999",
          "background-color": "#f8f8f8",
          color: "#555",
          "min-width": "2in",
          "min-height": "1in"
        }
      };
    }
    parseWordprocessingShape(elem) {
      let result = {
        type: "shape" /* Shape */,
        children: [],
        cssStyle: {
          display: "inline-block",
          position: "relative",
          "box-sizing": "border-box",
          overflow: "hidden"
        }
      }, cNvPr = this.findDescendant(elem, "cNvPr");
      cNvPr && (result.title = xml_parser_default.attr(cNvPr, "title") ?? xml_parser_default.attr(cNvPr, "name"), result.alt = xml_parser_default.attr(cNvPr, "descr") ?? result.title);
      for (let n of xml_parser_default.elements(elem))
        switch (n.localName) {
          case "spPr":
            this.parseDmlShapeProperties(n, result.cssStyle, elem);
            break;
          case "txbx":
          case "textBox":
            for (let txbxContent of xml_parser_default.elements(n, "txbxContent"))
              result.children.push(...this.parseBodyElements(txbxContent));
            break;
        }
      return result;
    }
    parseDmlShapeProperties(elem, style, owner) {
      let xfrm = xml_parser_default.element(elem, "xfrm");
      if (xfrm)
        for (let n of xml_parser_default.elements(xfrm))
          switch (n.localName) {
            case "ext":
              style.width = xml_parser_default.lengthAttr(n, "cx", LengthUsage.Emu), style.height = xml_parser_default.lengthAttr(n, "cy", LengthUsage.Emu);
              break;
            case "off":
              style.left = xml_parser_default.lengthAttr(n, "x", LengthUsage.Emu), style.top = xml_parser_default.lengthAttr(n, "y", LengthUsage.Emu);
              break;
          }
      let explicitFillStyle = this.parseDmlFillStyle(elem), fillStyle = (!explicitFillStyle.explicit && owner ? this.parseDmlShapeStyleFill(owner) : null) ?? explicitFillStyle, line = xml_parser_default.element(elem, "ln"), lineStyle = line ? this.parseDmlLineStyle(line) : owner ? this.parseDmlShapeStyleLine(owner) : null;
      fillStyle.backgroundColor && (style["background-color"] = fillStyle.backgroundColor), fillStyle.backgroundImage && (style["background-image"] = fillStyle.backgroundImage), lineStyle?.stroke && lineStyle.stroke != "none" && (style.border = `${lineStyle.strokeWidth || "0.75pt"} ${lineStyle.borderType || "solid"} ${lineStyle.stroke}`);
    }
    parseDmlColor(elem) {
      if (!elem)
        return null;
      let srgbClr = xml_parser_default.element(elem, "srgbClr"), schemeClr = xml_parser_default.element(elem, "schemeClr"), prstClr = xml_parser_default.element(elem, "prstClr"), sysClr = xml_parser_default.element(elem, "sysClr");
      if (srgbClr)
        return this.applyDmlColorTransforms(srgbClr, `#${xml_parser_default.attr(srgbClr, "val")}`);
      if (schemeClr) {
        let scheme = this.resolveDmlSchemeColor(xml_parser_default.attr(schemeClr, "val")), fallback = this.dmlSchemeColorFallback(scheme);
        return this.applyDmlColorTransforms(schemeClr, `var(--docx-${scheme}-color${fallback ? `, ${fallback}` : ""})`);
      }
      return sysClr ? this.applyDmlColorTransforms(sysClr, `#${xml_parser_default.attr(sysClr, "lastClr") ?? xml_parser_default.attr(sysClr, "val")}`) : prstClr ? this.applyDmlColorTransforms(prstClr, xml_parser_default.attr(prstClr, "val")) : null;
    }
    resolveDmlSchemeColor(value) {
      switch (value) {
        case "bg1":
          return "lt1";
        case "tx1":
          return "dk1";
        case "bg2":
          return "lt2";
        case "tx2":
          return "dk2";
        default:
          return value;
      }
    }
    dmlSchemeColorFallback(value) {
      switch (value) {
        case "dk1":
          return "#000000";
        case "lt1":
          return "#FFFFFF";
        case "dk2":
          return "#44546A";
        case "lt2":
          return "#E7E6E6";
        case "accent1":
          return "#4472C4";
        case "accent2":
          return "#ED7D31";
        case "accent3":
          return "#A5A5A5";
        case "accent4":
          return "#FFC000";
        case "accent5":
          return "#5B9BD5";
        case "accent6":
          return "#70AD47";
        case "hlink":
          return "#0563C1";
        case "folHlink":
          return "#954F72";
        default:
          return null;
      }
    }
    applyDmlColorTransforms(elem, color) {
      let shade = xml_parser_default.elementAttr(elem, "shade", "val"), tint = xml_parser_default.elementAttr(elem, "tint", "val"), lumMod = xml_parser_default.elementAttr(elem, "lumMod", "val"), lumOff = xml_parser_default.elementAttr(elem, "lumOff", "val");
      if (shade != null) {
        let percent2 = Math.max(0, Math.min(100, parseFloat(shade) / 1e3));
        Number.isFinite(percent2) && percent2 < 100 && (color = `color-mix(in srgb, ${color} ${percent2}%, black)`);
      }
      if (tint != null) {
        let percent2 = Math.max(0, Math.min(100, parseFloat(tint) / 1e3));
        Number.isFinite(percent2) && percent2 < 100 && (color = `color-mix(in srgb, ${color} ${percent2}%, white)`);
      }
      if (lumMod != null) {
        let percent2 = Math.max(0, Math.min(100, parseFloat(lumMod) / 1e3));
        Number.isFinite(percent2) && percent2 < 100 && (color = `color-mix(in srgb, ${color} ${percent2}%, black)`);
      }
      if (lumOff != null) {
        let percent2 = Math.max(0, Math.min(100, parseFloat(lumOff) / 1e3));
        Number.isFinite(percent2) && percent2 > 0 && (color = `color-mix(in srgb, ${color} ${100 - percent2}%, white)`);
      }
      return color;
    }
    findDescendant(elem, localName) {
      for (let child of xml_parser_default.elements(elem)) {
        if (child.localName == localName)
          return child;
        let nested = this.findDescendant(child, localName);
        if (nested)
          return nested;
      }
      return null;
    }
    parsePicture(elem) {
      var result = { type: "image" /* Image */, src: "", cssStyle: {} }, blipFill = xml_parser_default.element(elem, "blipFill"), blip = blipFill ? xml_parser_default.element(blipFill, "blip") : null, srcRect = blipFill ? xml_parser_default.element(blipFill, "srcRect") : null, spPr = xml_parser_default.element(elem, "spPr"), prstGeom = spPr ? xml_parser_default.element(spPr, "prstGeom") : null;
      result.src = blip ? xml_parser_default.attr(blip, "embed") ?? xml_parser_default.attr(blip, "link") : "", result.props = {
        ...result.props ?? {},
        presetGeometry: prstGeom ? xml_parser_default.attr(prstGeom, "prst") : null,
        geometryAdjustments: this.parseDmlPresetGeometryAdjustments(prstGeom)
      };
      let cNvPr = this.findDescendant(elem, "cNvPr");
      cNvPr && (result.title = xml_parser_default.attr(cNvPr, "title") ?? xml_parser_default.attr(cNvPr, "name"), result.alt = xml_parser_default.attr(cNvPr, "descr") ?? result.title), srcRect && (result.srcRect = [
        xml_parser_default.intAttr(srcRect, "l", 0) / 1e5,
        xml_parser_default.intAttr(srcRect, "t", 0) / 1e5,
        xml_parser_default.intAttr(srcRect, "r", 0) / 1e5,
        xml_parser_default.intAttr(srcRect, "b", 0) / 1e5
      ]);
      var xfrm = spPr ? xml_parser_default.element(spPr, "xfrm") : null, transforms = [];
      if (result.cssStyle.display = "block", result.cssStyle.position = "relative", result.cssStyle["object-fit"] = "contain", xfrm) {
        result.rotation = xml_parser_default.intAttr(xfrm, "rot", 0) / 6e4, xml_parser_default.boolAttr(xfrm, "flipH", !1) && transforms.push("scaleX(-1)"), xml_parser_default.boolAttr(xfrm, "flipV", !1) && transforms.push("scaleY(-1)");
        for (var n of xml_parser_default.elements(xfrm))
          switch (n.localName) {
            case "ext":
              result.cssStyle.width = xml_parser_default.lengthAttr(n, "cx", LengthUsage.Emu), result.cssStyle.height = xml_parser_default.lengthAttr(n, "cy", LengthUsage.Emu);
              break;
            case "off":
              result.cssStyle.left = xml_parser_default.lengthAttr(n, "x", LengthUsage.Emu), result.cssStyle.top = xml_parser_default.lengthAttr(n, "y", LengthUsage.Emu);
              break;
          }
      }
      return transforms.length > 0 && (result.cssStyle.transform = transforms.join(" ")), result.cssStyle.width || (result.cssStyle.width = "100%"), result.cssStyle.height || (result.cssStyle.height = "100%"), result;
    }
    parseTable(node, source) {
      var result = { type: "table" /* Table */, children: [], ...source ? { source } : {} };
      let rowIndex = 0;
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "tr":
            result.children.push(this.parseTableRow(c, source ? { ...source, rowIndex: rowIndex++ } : void 0));
            break;
          case "tblGrid":
            result.columns = this.parseTableColumns(c);
            break;
          case "tblPr":
            this.parseTableProperties(c, result);
            break;
        }
      return result;
    }
    parseTableColumns(node) {
      var result = [];
      for (let n of xml_parser_default.elements(node))
        n.localName === "gridCol" && result.push({ width: xml_parser_default.lengthAttr(n, "w") });
      return result;
    }
    parseTableProperties(elem, table) {
      switch (table.cssStyle = {}, table.cellStyle = {}, this.parseDefaultProperties(elem, table.cssStyle, table.cellStyle, (c) => {
        switch (c.localName) {
          case "tblStyle":
            table.styleName = xml_parser_default.attr(c, "val");
            break;
          case "tblLook":
            table.look = values.tableLookOfTblLook(c), table.className = values.classNameOftblLook(c);
            break;
          case "tblpPr":
            this.parseTablePosition(c, table);
            break;
          case "tblStyleColBandSize":
            table.colBandSize = xml_parser_default.intAttr(c, "val");
            break;
          case "tblStyleRowBandSize":
            table.rowBandSize = xml_parser_default.intAttr(c, "val");
            break;
          case "hidden":
            table.cssStyle.display = "none";
            break;
          default:
            return !1;
        }
        return !0;
      }), table.cssStyle["text-align"]) {
        case "center":
          delete table.cssStyle["text-align"], table.cssStyle["margin-left"] = "auto", table.cssStyle["margin-right"] = "auto";
          break;
        case "right":
          delete table.cssStyle["text-align"], table.cssStyle["margin-left"] = "auto";
          break;
      }
    }
    parseTablePosition(node, table) {
      var topFromText = xml_parser_default.lengthAttr(node, "topFromText"), bottomFromText = xml_parser_default.lengthAttr(node, "bottomFromText"), rightFromText = xml_parser_default.lengthAttr(node, "rightFromText"), leftFromText = xml_parser_default.lengthAttr(node, "leftFromText"), tblpX = xml_parser_default.lengthAttr(node, "tblpX"), tblpY = xml_parser_default.lengthAttr(node, "tblpY"), tblpXSpec = xml_parser_default.attr(node, "tblpXSpec"), tblpYSpec = xml_parser_default.attr(node, "tblpYSpec"), horzAnchor = xml_parser_default.attr(node, "horzAnchor"), vertAnchor = xml_parser_default.attr(node, "vertAnchor");
      table.cssStyle.float = "left", table.cssStyle["--docx-table-positioned"] = "1", topFromText != null && (table.cssStyle["--docx-tblp-top-from-text"] = topFromText), bottomFromText != null && (table.cssStyle["--docx-tblp-bottom-from-text"] = bottomFromText), leftFromText != null && (table.cssStyle["--docx-tblp-left-from-text"] = leftFromText), rightFromText != null && (table.cssStyle["--docx-tblp-right-from-text"] = rightFromText), tblpX != null && (table.cssStyle["--docx-tblp-x"] = tblpX), tblpY != null && (table.cssStyle["--docx-tblp-y"] = tblpY), tblpXSpec && (table.cssStyle["--docx-tblp-x-spec"] = tblpXSpec), tblpYSpec && (table.cssStyle["--docx-tblp-y-spec"] = tblpYSpec), horzAnchor && (table.cssStyle["--docx-tblp-horz-anchor"] = horzAnchor), vertAnchor && (table.cssStyle["--docx-tblp-vert-anchor"] = vertAnchor), table.cssStyle["margin-bottom"] = values.addSize(table.cssStyle["margin-bottom"], bottomFromText), table.cssStyle["margin-left"] = values.addSize(table.cssStyle["margin-left"], leftFromText), table.cssStyle["margin-right"] = values.addSize(table.cssStyle["margin-right"], rightFromText), table.cssStyle["margin-top"] = values.addSize(table.cssStyle["margin-top"], topFromText);
    }
    parseTableRow(node, source) {
      var result = { type: "row" /* Row */, children: [], ...source ? { source } : {} };
      let cellIndex = 0;
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "tc":
            result.children.push(this.parseTableCell(c, source ? { ...source, cellIndex: cellIndex++ } : void 0));
            break;
          case "trPr":
          case "tblPrEx":
            this.parseTableRowProperties(c, result);
            break;
        }
      return result;
    }
    parseTableRowProperties(elem, row) {
      let rowStyle = {};
      row.cssStyle = this.parseDefaultProperties(elem, rowStyle, null, (c) => {
        switch (c.localName) {
          case "cnfStyle":
            row.conditionalStyle = values.tableConditionalFormatOfCnfStyle(c), row.className = values.classNameOfCnfStyle(c);
            break;
          case "tblHeader":
            row.isHeader = xml_parser_default.boolAttr(c, "val", !0);
            break;
          case "gridBefore":
            row.gridBefore = xml_parser_default.intAttr(c, "val");
            break;
          case "gridAfter":
            row.gridAfter = xml_parser_default.intAttr(c, "val");
            break;
          case "cantSplit":
            xml_parser_default.boolAttr(c, "val", !0) && (rowStyle["break-inside"] = "avoid");
            break;
          default:
            return !1;
        }
        return !0;
      });
    }
    parseTableCell(node, source) {
      var result = { type: "cell" /* Cell */, children: [], ...source ? { source } : {} };
      let nestedTableIndex = 0, cellParagraphIndex = 0;
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "tbl":
            result.children.push(this.parseTable(c, source ? { ...source, nestedTableIndex: nestedTableIndex++ } : void 0));
            break;
          case "p":
            result.children.push(this.parseParagraph(c, source ? { ...source, cellParagraphIndex: cellParagraphIndex++ } : void 0));
            break;
          case "tcPr":
            this.parseTableCellProperties(c, result);
            break;
        }
      return result;
    }
    parseTableCellProperties(elem, cell) {
      cell.cssStyle = this.parseDefaultProperties(elem, {}, null, (c) => {
        switch (c.localName) {
          case "gridSpan":
            cell.span = xml_parser_default.intAttr(c, "val", null);
            break;
          case "vMerge":
            cell.verticalMerge = xml_parser_default.attr(c, "val") ?? "continue";
            break;
          case "hideMark":
            cell.hideMark = xml_parser_default.boolAttr(c, "val", !0);
            break;
          case "cnfStyle":
            cell.conditionalStyle = values.tableConditionalFormatOfCnfStyle(c), cell.className = values.classNameOfCnfStyle(c);
            break;
          default:
            return !1;
        }
        return !0;
      }), this.parseTableCellVerticalText(elem, cell);
    }
    parseTableCellVerticalText(elem, cell) {
      let directionMap = {
        btLr: {
          writingMode: "vertical-rl",
          transform: "rotate(180deg)"
        },
        lrTb: {
          writingMode: "vertical-lr",
          transform: "none"
        },
        tbRl: {
          writingMode: "vertical-rl",
          transform: "none"
        }
      };
      for (let c of xml_parser_default.elements(elem))
        if (c.localName === "textDirection") {
          let direction = xml_parser_default.attr(c, "val"), style = directionMap[direction] || { writingMode: "horizontal-tb" };
          cell.cssStyle["writing-mode"] = style.writingMode, cell.cssStyle.transform = style.transform;
        }
    }
    parseDefaultProperties(elem, style = null, childStyle = null, handler = null) {
      style = style || {};
      for (let c of xml_parser_default.elements(elem))
        if (!handler?.(c))
          switch (c.localName) {
            case "jc":
              style["--docx-jc"] = xml_parser_default.attr(c, "val"), style["text-align"] = values.valueOfJc(c);
              break;
            case "textAlignment":
              style["vertical-align"] = values.valueOfTextAlignment(c);
              break;
            case "color":
              style.color = xmlUtil.colorAttr(c, "val", null, autos.color);
              break;
            case "sz":
              style["font-size"] = style["min-height"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.FontSize);
              break;
            case "szCs":
              style["--docx-cs-font-size"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.FontSize);
              break;
            case "shd": {
              let shading = resolveShadingBackground(c);
              shading && (style["background-color"] = shading);
              break;
            }
            case "highlight":
              style["background-color"] = xml_parser_default.attr(c, "val") === "none" ? "transparent" : xmlUtil.colorAttr(c, "val", null, autos.highlight);
              break;
            case "vertAlign":
              style["vertical-align"] = values.valueOfVertAlign(c);
              break;
            case "position":
              style["vertical-align"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.SignedHalfPoint);
              break;
            case "scale":
            case "w":
              style["font-stretch"] = `${xml_parser_default.intAttr(c, "val", 100)}%`;
              break;
            case "tcW":
              if (this.options.ignoreWidth)
                break;
            case "tblW":
              style.width = values.valueOfSize(c, "w");
              break;
            case "trHeight":
              this.parseTrHeight(c, style);
              break;
            case "strike":
              style["text-decoration"] = xml_parser_default.boolAttr(c, "val", !0) ? "line-through" : "none";
              break;
            case "dstrike":
              xml_parser_default.boolAttr(c, "val", !0) ? (style["text-decoration-line"] = "line-through", style["text-decoration-style"] = "double") : style["text-decoration"] = "none";
              break;
            case "b":
              style["font-weight"] = xml_parser_default.boolAttr(c, "val", !0) ? "bold" : "normal";
              break;
            case "i":
              style["font-style"] = xml_parser_default.boolAttr(c, "val", !0) ? "italic" : "normal";
              break;
            case "bCs":
              style["--docx-bidi-font-weight"] = xml_parser_default.boolAttr(c, "val", !0) ? "bold" : "normal", style.direction == "rtl" && (style["font-weight"] = style["--docx-bidi-font-weight"]);
              break;
            case "iCs":
              style["--docx-bidi-font-style"] = xml_parser_default.boolAttr(c, "val", !0) ? "italic" : "normal", style.direction == "rtl" && (style["font-style"] = style["--docx-bidi-font-style"]);
              break;
            case "caps":
              style["text-transform"] = xml_parser_default.boolAttr(c, "val", !0) ? "uppercase" : "none";
              break;
            case "smallCaps":
              style["font-variant"] = xml_parser_default.boolAttr(c, "val", !0) ? "small-caps" : "none";
              break;
            case "rtl":
              xml_parser_default.boolAttr(c, "val", !0) && (style.direction = "rtl", style["unicode-bidi"] = "embed", style["--docx-bidi-font-weight"] && (style["font-weight"] = style["--docx-bidi-font-weight"]), style["--docx-bidi-font-style"] && (style["font-style"] = style["--docx-bidi-font-style"]));
              break;
            case "outline":
              xml_parser_default.boolAttr(c, "val", !0) && (style["-webkit-text-stroke"] = "0.5px currentColor");
              break;
            case "shadow":
              xml_parser_default.boolAttr(c, "val", !0) && (style["text-shadow"] = "1px 1px 0 currentColor");
              break;
            case "emboss":
              xml_parser_default.boolAttr(c, "val", !0) && (style["text-shadow"] = "-1px -1px 0 rgba(255,255,255,.75), 1px 1px 0 rgba(0,0,0,.35)");
              break;
            case "imprint":
              xml_parser_default.boolAttr(c, "val", !0) && (style["text-shadow"] = "1px 1px 0 rgba(255,255,255,.75), -1px -1px 0 rgba(0,0,0,.35)");
              break;
            case "em":
              style["text-emphasis-style"] = values.valueOfEmphasisMark(c);
              break;
            case "u":
              this.parseUnderline(c, style);
              break;
            case "ind":
            case "tblInd":
              this.parseIndentation(c, style);
              break;
            case "rFonts":
              this.parseFont(c, style);
              break;
            case "tblBorders":
              childStyle ? this.parseTableBorderProperties(c, style) : this.parseBorderProperties(c, style);
              break;
            case "tblCellSpacing":
              style["border-spacing"] = values.valueOfMargin(c), style["border-collapse"] = "separate";
              break;
            case "pBdr":
              this.parseBorderProperties(c, style);
              break;
            case "bdr":
              style.border = values.valueOfBorder(c);
              break;
            case "tcBorders":
              this.parseBorderProperties(c, style);
              break;
            case "vanish":
              xml_parser_default.boolAttr(c, "val", !0) && (style.display = "none");
              break;
            case "kern":
              style["font-kerning"] = xml_parser_default.intAttr(c, "val", 0) > 0 ? "normal" : "none";
              break;
            case "noWrap":
              style["white-space"] = xml_parser_default.boolAttr(c, "val", !0) ? "nowrap" : "normal";
              break;
            case "snapToGrid":
              style["--docx-snap-to-grid"] = xml_parser_default.boolAttr(c, "val", !0) ? "1" : "0";
              break;
            case "autoSpaceDE":
              style["--docx-auto-space-de"] = xml_parser_default.boolAttr(c, "val", !0) ? "1" : "0";
              break;
            case "autoSpaceDN":
              style["--docx-auto-space-dn"] = xml_parser_default.boolAttr(c, "val", !0) ? "1" : "0";
              break;
            case "contextualSpacing":
              style["--docx-contextual-spacing"] = xml_parser_default.boolAttr(c, "val", !0) ? "1" : "0";
              break;
            case "fitText":
              this.parseFitText(c, style);
              break;
            case "eastAsianLayout":
              this.parseEastAsianLayout(c, style);
              break;
            case "tblCellMar": {
              let target = childStyle || style;
              this.parseMarginProperties(c, target), this.markMarginProperties(c, target, "--docx-table-cell-margin");
              break;
            }
            case "tcMar": {
              let target = childStyle || style;
              this.parseMarginProperties(c, target), this.markMarginProperties(c, target, "--docx-tc-margin");
              break;
            }
            case "tblLayout":
              style["table-layout"] = values.valueOfTblLayout(c);
              break;
            case "vAlign":
              style["vertical-align"] = values.valueOfTextAlignment(c);
              break;
            case "spacing":
              elem.localName == "pPr" ? this.parseSpacing(c, style) : elem.localName == "rPr" && (style["letter-spacing"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.SignedDxa));
              break;
            case "wordWrap":
              xml_parser_default.boolAttr(c, "val", !0) || (style["overflow-wrap"] = "break-word");
              break;
            case "suppressAutoHyphens":
              style.hyphens = xml_parser_default.boolAttr(c, "val", !0) ? "none" : "auto";
              break;
            case "lang":
              style.$lang = xml_parser_default.attr(c, "val"), style.$eastAsiaLang = xml_parser_default.attr(c, "eastAsia");
              break;
            case "bidi":
              xml_parser_default.boolAttr(c, "val", !0) && (style.direction = "rtl");
              break;
            case "pageBreakBefore":
              xml_parser_default.boolAttr(c, "val", !0) && (style["break-before"] = "page");
              break;
            case "keepLines":
              xml_parser_default.boolAttr(c, "val", !0) && (style["break-inside"] = "avoid");
              break;
            case "keepNext":
              xml_parser_default.boolAttr(c, "val", !0) && (style["break-after"] = "avoid");
              break;
            case "widowControl":
              xml_parser_default.boolAttr(c, "val", !0) && (style.orphans = "2", style.widows = "2");
              break;
            case "webHidden":
              this.options.hideWebHiddenContent && xml_parser_default.boolAttr(c, "val", !0) && (style.display = "none");
              break;
            case "specVanish":
              xml_parser_default.boolAttr(c, "val", !0) && (style.display = "none");
              break;
            case "tabs":
            //ignore - tabs is parsed by other parser
            case "outlineLvl": {
              let outlineLevel = xml_parser_default.intAttr(c, "val");
              outlineLevel != null && (style["--docx-outline-level"] = `${outlineLevel}`);
              break;
            }
            case "tblStyleColBandSize":
            //TODO
            case "tblStyleRowBandSize":
            //TODO
            case "suppressLineNumbers":
            //TODO - maybe ignore
            case "noProof":
              break;
            default:
              this.options.debug && console.warn(`DOCX: Unknown document element: ${elem.localName}.${c.localName}`);
              break;
          }
      return style;
    }
    parseFitText(node, style) {
      let width = xml_parser_default.lengthAttr(node, "val");
      width && (style.display = "inline-block", style.width = width, style["text-align"] = "justify", style["text-align-last"] = "justify");
    }
    parseEastAsianLayout(node, style) {
      xml_parser_default.boolAttr(node, "combine", !1) && (style["text-combine-upright"] = "all"), xml_parser_default.boolAttr(node, "vert", !1) && (style["writing-mode"] = "vertical-rl"), xml_parser_default.boolAttr(node, "vertCompress", !1) && (style["font-stretch"] = "condensed");
    }
    parseUnderline(node, style) {
      var val = xml_parser_default.attr(node, "val");
      if (val != null) {
        switch (val) {
          case "dash":
          case "dashDotDotHeavy":
          case "dashDotHeavy":
          case "dashedHeavy":
          case "dashLong":
          case "dashLongHeavy":
          case "dotDash":
          case "dotDotDash":
            style["text-decoration"] = "underline dashed";
            break;
          case "dotted":
          case "dottedHeavy":
            style["text-decoration"] = "underline dotted";
            break;
          case "double":
            style["text-decoration"] = "underline double";
            break;
          case "single":
          case "thick":
            style["text-decoration"] = "underline";
            break;
          case "wave":
          case "wavyDouble":
          case "wavyHeavy":
            style["text-decoration"] = "underline wavy";
            break;
          case "words":
            style["text-decoration"] = "underline";
            break;
          case "none":
            style["text-decoration"] = "none";
            break;
        }
        var col = xmlUtil.colorAttr(node, "color");
        col && (style["text-decoration-color"] = col);
      }
    }
    parseFont(node, style) {
      var ascii = xml_parser_default.attr(node, "ascii"), hAnsi = xml_parser_default.attr(node, "hAnsi"), eastAsia = xml_parser_default.attr(node, "eastAsia"), cs = xml_parser_default.attr(node, "cs"), hint = xml_parser_default.attr(node, "hint"), asciiTheme = values.themeValue(node, "asciiTheme"), hAnsiTheme = values.themeValue(node, "hAnsiTheme"), eastAsiaTheme = values.themeValue(node, "eastAsiaTheme");
      let csThemeAttr = xml_parser_default.attr(node, "cstheme") ?? xml_parser_default.attr(node, "csTheme");
      var csTheme = csThemeAttr ? `var(--docx-${csThemeAttr}-font)` : null;
      csTheme && /HAnsi$/i.test(csThemeAttr) ? (asciiTheme ?? (asciiTheme = csTheme), hAnsiTheme ?? (hAnsiTheme = csTheme)) : csTheme && /EastAsia$/i.test(csThemeAttr) && (eastAsiaTheme ?? (eastAsiaTheme = csTheme));
      let explicitSlots = [
        ascii || asciiTheme ? "ascii" : "",
        hAnsi || hAnsiTheme ? "hAnsi" : "",
        eastAsia || eastAsiaTheme ? "eastAsia" : "",
        cs || csTheme ? "cs" : ""
      ].filter((x) => x);
      explicitSlots.length && (style["--docx-rfonts-explicit-slots"] = explicitSlots.join(",")), hint && (style["--docx-font-hint"] = hint);
      var fonts = [ascii, hAnsi, asciiTheme, hAnsiTheme, eastAsia, eastAsiaTheme, cs, csTheme].filter((x) => x).flatMap((x) => this.wordCompatibleFontStack(x));
      let setFontSlot = (name, value) => {
        if (!value)
          return;
        let stack = this.wordCompatibleFontStack(value);
        stack.length && (style[name] = stack.join(", "));
      };
      setFontSlot("--docx-ascii-font-family", ascii || asciiTheme), setFontSlot("--docx-hansi-font-family", hAnsi || hAnsiTheme || ascii || asciiTheme), setFontSlot("--docx-eastasia-font-family", eastAsia || eastAsiaTheme), setFontSlot("--docx-cs-font-family", cs || csTheme);
      let hasEastAsiaSlot = !!(eastAsia || eastAsiaTheme);
      if (fonts.length > 0 && hasEastAsiaSlot) {
        let currentFonts = (style["font-family"] ?? "").split(",").map((x) => x.trim()).filter((x) => x);
        style["font-family"] = [.../* @__PURE__ */ new Set([...currentFonts, ...fonts])].join(", ");
      }
    }
    wordCompatibleFontStack(fontFamily) {
      let raw = `${fontFamily ?? ""}`.trim();
      if (!raw)
        return [];
      if (/^var\(/i.test(raw))
        return [raw];
      let normalized = raw.replace(/^['"]|['"]$/g, "").toLowerCase(), baseCompact = normalized.replace(/[－—–]/g, "-").replace(/\s+/g, "").replace(/(?:[_-]?(?:gb2312|gbk|gb18030|gb0))$/i, ""), emit = (items) => items.map((x) => /^(serif|sans-serif|monospace)$/i.test(x) ? x : encloseFontFamily(x)), emitUnique = (items) => emit([...new Set(items.filter(Boolean))]), founderSong = /^fz(?:xiao|da)?biaosong|^fzshusong|^fzsongyi|^fzcusong|^fangzheng(?:xiao|da)?biaosong|^fangzhengshusong|方正(?:小标宋|大标宋|书宋|宋一|粗宋)/.test(baseCompact), cesiFangSong = /^cesi.*仿宋|^cesifangsong/.test(baseCompact);
      return normalized == "microsoft yahei" || normalized == "微软雅黑" || normalized == "ms yahei" ? emit(["Microsoft YaHei", "微软雅黑", "Microsoft YaHei UI", "Noto Sans CJK SC", "Noto Sans SC", "SimHei", "sans-serif"]) : normalized == "times new roman" || normalized == "timesnewroman" ? emit(["Times New Roman", "Tinos", "Liberation Serif", "Nimbus Roman", "Noto Serif", "serif"]) : normalized == "nsimsun" || normalized == "新宋体" ? emit(["NSimSun", "新宋体", "SimSun", "宋体", "Songti SC", "serif"]) : normalized == "simsun" || normalized == "宋体" ? emit(["SimSun", "宋体", "Songti SC", "Noto Serif CJK SC", "AR PL SungtiL GB", "serif"]) : /^(songti sc|songtisc|stsongti-sc|stsongtisc|宋体-简|宋體-簡)$/i.test(normalized) ? emit(["Songti SC", "STSong", "SimSun", "宋体", "serif"]) : /^fzhei|^fangzhenghei|方正黑体/.test(baseCompact) ? emitUnique([raw, "FZHei-B01S", "FZHei-B01", "SimHei", "黑体", "Noto Sans CJK SC", "Noto Sans SC", "Microsoft YaHei", "sans-serif"]) : normalized == "simhei" || normalized == "黑体" ? emit(["SimHei", "黑体", "Noto Sans CJK SC", "Noto Sans SC", "Microsoft YaHei", "sans-serif"]) : /^fzkai|^fangzhengkai|方正楷体/.test(baseCompact) ? emitUnique([raw, "FZKai-Z03S", "FZKai-Z03", "STKaiti", "华文楷体", "Kaiti SC", "KaiTi", "楷体", "serif"]) : /^(stkaiti|kaiti|kaiti[-_]?sc|kaiti[-_]?tc|楷[体體]|楷[体體][-－]?简|楷[体體][-－]?繁|华文楷体|華文楷體)/.test(baseCompact) ? emitUnique([raw, "STKaiti", "华文楷体", "Kaiti SC", "KaiTi", "楷体", "serif"]) : /^fzfangsong|^fangzhengfangsong|方正仿宋/.test(baseCompact) ? emitUnique([raw, "FZFangSong-Z02S", "FZFangSong-Z02", "FangSong", "仿宋", "STFangsong", "华文仿宋", "Songti SC", "serif"]) : cesiFangSong ? emitUnique([raw, "CESI仿宋-GB2312", "CESI仿宋", "FangSong", "仿宋", "FangSong_GB2312", "仿宋_GB2312", "STFangsong", "华文仿宋", "Songti SC", "serif"]) : baseCompact == "fangsong" || baseCompact == "仿宋" || baseCompact == "stfangsong" || baseCompact == "华文仿宋" || baseCompact == "華文仿宋" ? emitUnique([raw, "FangSong", "仿宋", "FangSong_GB2312", "仿宋_GB2312", "STFangsong", "华文仿宋", "Songti SC", "serif"]) : /^fzxiaobiaosong|^fangzhengxiaobiaosong|方正小标宋/.test(baseCompact) ? emitUnique([raw, "FZXiaoBiaoSong-B05S", "方正小标宋简体", "FZXiaoBiaoSong-B05", "方正小标宋_GBK", "SimSun", "宋体", "Songti SC", "STSong", "Noto Serif CJK SC", "serif"]) : /^fzdabiaosong|^fangzhengdabiaosong|方正大标宋/.test(baseCompact) ? emitUnique([raw, "FZDaBiaoSong-B06S", "方正大标宋简体", "FZDaBiaoSong-B06", "方正大标宋_GBK", "SimSun", "宋体", "Songti SC", "STSong", "Noto Serif CJK SC", "serif"]) : founderSong ? emitUnique([raw, "FZShuSong-Z01S", "FZShuSong-Z01", "方正书宋简体", "方正书宋_GBK", "SimSun", "宋体", "Songti SC", "STSong", "Noto Serif CJK SC", "serif"]) : normalized == "arial" ? emit(["Arial", "Arimo", "Liberation Sans", "Noto Sans", "sans-serif"]) : [encloseFontFamily(raw)];
    }
    parseIndentation(node, style) {
      var firstLine = xml_parser_default.lengthAttr(node, "firstLine"), hanging = xml_parser_default.lengthAttr(node, "hanging"), left = xml_parser_default.lengthAttr(node, "left"), start = xml_parser_default.lengthAttr(node, "start"), tableIndent = node.localName == "tblInd" ? values.valueOfMargin(node) : null, right = xml_parser_default.lengthAttr(node, "right"), end = xml_parser_default.lengthAttr(node, "end");
      firstLine && (style["text-indent"] = firstLine, style["--docx-text-indent"] = firstLine), hanging && (style["text-indent"] = `-${hanging}`, style["--docx-text-indent"] = `-${hanging}`, style["--docx-hanging-indent"] = hanging), (left || start || tableIndent) && (style["margin-inline-start"] = left || start || tableIndent, style["--docx-margin-inline-start"] = left || start || tableIndent), (right || end) && (style["margin-inline-end"] = right || end, style["--docx-margin-inline-end"] = right || end);
    }
    parseSpacing(node, style) {
      var before = xml_parser_default.lengthAttr(node, "before"), after = xml_parser_default.lengthAttr(node, "after"), beforeLines = xml_parser_default.intAttr(node, "beforeLines", null), afterLines = xml_parser_default.intAttr(node, "afterLines", null), beforeAuto = xml_parser_default.boolAttr(node, "beforeAutospacing", !1), afterAuto = xml_parser_default.boolAttr(node, "afterAutospacing", !1), line = xml_parser_default.intAttr(node, "line", null), lineRule = xml_parser_default.attr(node, "lineRule");
      if (beforeAuto ? style["margin-top"] = "auto" : beforeLines != null ? style["margin-top"] = `${(beforeLines / 100).toFixed(2)}em` : before && (style["margin-top"] = before), afterAuto ? style["margin-bottom"] = "auto" : afterLines != null ? style["margin-bottom"] = `${(afterLines / 100).toFixed(2)}em` : after && (style["margin-bottom"] = after), line !== null)
        switch (lineRule ?? "auto") {
          case "auto":
            style["line-height"] = `${(line / 240).toFixed(2)}`;
            break;
          case "atLeast":
            style["line-height"] = `max(1em, ${(line / 20).toFixed(2)}pt)`, style["min-height"] = `${(line / 20).toFixed(2)}pt`;
            break;
          case "exact":
          case "exactly":
            style["line-height"] = style["min-height"] = `${(line / 20).toFixed(2)}pt`;
            break;
          default:
            style["line-height"] = `${(line / 240).toFixed(2)}`;
            break;
        }
    }
    parseMarginProperties(node, output) {
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "left":
          case "start":
            output["padding-left"] = values.valueOfMargin(c);
            break;
          case "right":
          case "end":
            output["padding-right"] = values.valueOfMargin(c);
            break;
          case "top":
            output["padding-top"] = values.valueOfMargin(c);
            break;
          case "bottom":
            output["padding-bottom"] = values.valueOfMargin(c);
            break;
        }
    }
    markMarginProperties(node, output, prefix) {
      output[prefix] = "1";
      for (let c of xml_parser_default.elements(node))
        switch (c.localName) {
          case "left":
          case "start":
            output[`${prefix}-left`] = "1";
            break;
          case "right":
          case "end":
            output[`${prefix}-right`] = "1";
            break;
          case "top":
            output[`${prefix}-top`] = "1";
            break;
          case "bottom":
            output[`${prefix}-bottom`] = "1";
            break;
        }
    }
    parseTrHeight(node, output) {
      let rule = xml_parser_default.attr(node, "hRule") ?? "atLeast";
      switch (output["--docx-tr-height-rule"] = rule == "exact" ? "exact" : rule == "auto" ? "auto" : "atLeast", rule) {
        case "exact":
          output.height = xml_parser_default.lengthAttr(node, "val");
          break;
        case "auto":
          break;
        default:
          output.height = xml_parser_default.lengthAttr(node, "val");
          break;
      }
    }
    parseBorderProperties(node, output) {
      for (let c of xml_parser_default.elements(node)) {
        let border = values.valueOfBorder(c), space = xml_parser_default.lengthAttr(c, "space", LengthUsage.Point), setBorder = (side) => {
          output[`border-${side}`] = border, space && (output[`--docx-border-${side}-space`] = space);
        };
        switch (c.localName) {
          case "start":
          case "left":
            setBorder("left");
            break;
          case "end":
          case "right":
            setBorder("right");
            break;
          case "top":
            setBorder("top");
            break;
          case "bottom":
            setBorder("bottom");
            break;
          case "insideH":
            output["border-top"] ?? (output["border-top"] = border), output["border-bottom"] ?? (output["border-bottom"] = border), space && (output["--docx-border-top-space"] ?? (output["--docx-border-top-space"] = space), output["--docx-border-bottom-space"] ?? (output["--docx-border-bottom-space"] = space));
            break;
          case "insideV":
            output["border-left"] ?? (output["border-left"] = border), output["border-right"] ?? (output["border-right"] = border), space && (output["--docx-border-left-space"] ?? (output["--docx-border-left-space"] = space), output["--docx-border-right-space"] ?? (output["--docx-border-right-space"] = space));
            break;
        }
      }
    }
    parseTableBorderProperties(node, output) {
      for (let c of xml_parser_default.elements(node)) {
        let border = values.valueOfBorder(c), space = xml_parser_default.lengthAttr(c, "space", LengthUsage.Point), setBorder = (name) => {
          output[`--docx-table-border-${name}`] = border, space && (output[`--docx-table-border-${name}-space`] = space);
        };
        switch (c.localName) {
          case "start":
          case "left":
            setBorder("left");
            break;
          case "end":
          case "right":
            setBorder("right");
            break;
          case "top":
            setBorder("top");
            break;
          case "bottom":
            setBorder("bottom");
            break;
          case "insideH":
            setBorder("inside-h");
            break;
          case "insideV":
            setBorder("inside-v");
            break;
        }
      }
    }
  };

  // src/worker/docx-viewer-worker.ts
  var import_xmldom = __toESM(require_lib()), ctx = self, packages = /* @__PURE__ */ new Map();
  typeof globalThis.DOMParser > "u" && (globalThis.DOMParser = import_xmldom.DOMParser);
  typeof globalThis.XMLSerializer > "u" && (globalThis.XMLSerializer = import_xmldom.XMLSerializer);
  function post(id, type, payload = {}, transfer = []) {
    ctx.postMessage({ id, type, ...payload }, transfer);
  }
  ctx.onmessage = async (ev) => {
    let msg = ev.data;
    if (!msg)
      return;
    if (msg.type === "dispose") {
      packages.get(msg.id)?.dispose(), packages.delete(msg.id);
      return;
    }
    if (msg.type === "package") {
      await handlePackageMessage(msg);
      return;
    }
    if (msg.type !== "parse")
      return;
    let id = msg.id, sourcePackage = null;
    try {
      let options = { ...msg.options, useWorker: !1, h: void 0, progress: void 0 };
      post(id, "progress", { current: 0, total: 3, message: "Loading package relationships" }), sourcePackage = await OpenXmlPackage.load(msg.data, options);
      let document2 = await WordDocument.loadPackage(sourcePackage, new DocumentParser(options), options);
      post(id, "progress", { current: 2, total: 3, message: "Serializing parsed document model" });
      let snapshot = document2.createSnapshot();
      packages.set(id, sourcePackage), post(id, "progress", { current: 3, total: 3, message: "Document model ready" }), post(id, "parsed", {
        snapshot,
        packageEntries: sourcePackage.listEntries(),
        packageStatus: sourcePackage.getStreamStatus()
      });
    } catch (error) {
      packages.delete(id), sourcePackage?.dispose(), post(id, "error", {
        error: {
          message: error?.message ?? `${error}`,
          stack: error?.stack
        }
      });
    }
  };
  async function handlePackageMessage(msg) {
    let sourcePackage = packages.get(msg.id);
    if (!sourcePackage) {
      post(msg.id, "package-error", {
        requestId: msg.requestId,
        error: { message: "DOCX worker package session is not available" }
      });
      return;
    }
    try {
      switch (msg.operation) {
        case "status":
          post(msg.id, "package-result", {
            requestId: msg.requestId,
            value: sourcePackage.getStreamStatus()
          });
          return;
        case "save": {
          for (let update of msg.updates ?? [])
            sourcePackage.update(update.path, update.content);
          let bytes = await sourcePackage.save("uint8array");
          postBinaryResult(msg, bytes);
          return;
        }
        case "load": {
          if (isBinaryOutput(msg.outputType)) {
            let bytes = await sourcePackage.load(msg.path, "uint8array");
            bytes == null ? post(msg.id, "package-result", { requestId: msg.requestId, value: null }) : postBinaryResult(msg, bytes);
          } else {
            let value = await sourcePackage.load(msg.path, msg.outputType ?? "string");
            post(msg.id, "package-result", { requestId: msg.requestId, value });
          }
          return;
        }
      }
    } catch (error) {
      post(msg.id, "package-error", {
        requestId: msg.requestId,
        error: {
          message: error?.message ?? `${error}`,
          stack: error?.stack
        }
      });
    }
  }
  function postBinaryResult(msg, bytes) {
    let value = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    post(msg.id, "package-result", { requestId: msg.requestId, value }, [value]);
  }
  function isBinaryOutput(type) {
    return type === "blob" || type === "array" || type === "uint8array" || type === "arraybuffer" || type === "nodebuffer";
  }
})();
