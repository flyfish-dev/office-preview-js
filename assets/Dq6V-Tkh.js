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
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/utils/common.js
  var require_common = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/utils/common.js"(exports) {
      "use strict";
      var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
      function _has(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
      }
      exports.assign = function(obj) {
        var sources = Array.prototype.slice.call(arguments, 1);
        while (sources.length) {
          var source = sources.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== "object") {
            throw new TypeError(source + "must be non-object");
          }
          for (var p in source) {
            if (_has(source, p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      };
      exports.shrinkBuf = function(buf, size) {
        if (buf.length === size) {
          return buf;
        }
        if (buf.subarray) {
          return buf.subarray(0, size);
        }
        buf.length = size;
        return buf;
      };
      var fnTyped = {
        arraySet: function(dest, src, src_offs, len, dest_offs) {
          if (src.subarray && dest.subarray) {
            dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
            return;
          }
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        // Join array of chunks to single array.
        flattenChunks: function(chunks) {
          var i, l, len, pos, chunk, result;
          len = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            len += chunks[i].length;
          }
          result = new Uint8Array(len);
          pos = 0;
          for (i = 0, l = chunks.length; i < l; i++) {
            chunk = chunks[i];
            result.set(chunk, pos);
            pos += chunk.length;
          }
          return result;
        }
      };
      var fnUntyped = {
        arraySet: function(dest, src, src_offs, len, dest_offs) {
          for (var i = 0; i < len; i++) {
            dest[dest_offs + i] = src[src_offs + i];
          }
        },
        // Join array of chunks to single array.
        flattenChunks: function(chunks) {
          return [].concat.apply([], chunks);
        }
      };
      exports.setTyped = function(on) {
        if (on) {
          exports.Buf8 = Uint8Array;
          exports.Buf16 = Uint16Array;
          exports.Buf32 = Int32Array;
          exports.assign(exports, fnTyped);
        } else {
          exports.Buf8 = Array;
          exports.Buf16 = Array;
          exports.Buf32 = Array;
          exports.assign(exports, fnUntyped);
        }
      };
      exports.setTyped(TYPED_OK);
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/trees.js
  var require_trees = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/trees.js"(exports) {
      "use strict";
      var utils = require_common();
      var Z_FIXED = 4;
      var Z_BINARY = 0;
      var Z_TEXT = 1;
      var Z_UNKNOWN = 2;
      function zero(buf) {
        var len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      }
      var STORED_BLOCK = 0;
      var STATIC_TREES = 1;
      var DYN_TREES = 2;
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var LENGTH_CODES = 29;
      var LITERALS = 256;
      var L_CODES = LITERALS + 1 + LENGTH_CODES;
      var D_CODES = 30;
      var BL_CODES = 19;
      var HEAP_SIZE = 2 * L_CODES + 1;
      var MAX_BITS = 15;
      var Buf_size = 16;
      var MAX_BL_BITS = 7;
      var END_BLOCK = 256;
      var REP_3_6 = 16;
      var REPZ_3_10 = 17;
      var REPZ_11_138 = 18;
      var extra_lbits = (
        /* extra bits for each length code */
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
      );
      var extra_dbits = (
        /* extra bits for each distance code */
        [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
      );
      var extra_blbits = (
        /* extra bits for each bit length code */
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
      );
      var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      var DIST_CODE_LEN = 512;
      var static_ltree = new Array((L_CODES + 2) * 2);
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
        this.static_tree = static_tree;
        this.extra_bits = extra_bits;
        this.extra_base = extra_base;
        this.elems = elems;
        this.max_length = max_length;
        this.has_stree = static_tree && static_tree.length;
      }
      var static_l_desc;
      var static_d_desc;
      var static_bl_desc;
      function TreeDesc(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree;
        this.max_code = 0;
        this.stat_desc = stat_desc;
      }
      function d_code(dist) {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
      }
      function put_short(s, w) {
        s.pending_buf[s.pending++] = w & 255;
        s.pending_buf[s.pending++] = w >>> 8 & 255;
      }
      function send_bits(s, value, length) {
        if (s.bi_valid > Buf_size - length) {
          s.bi_buf |= value << s.bi_valid & 65535;
          put_short(s, s.bi_buf);
          s.bi_buf = value >> Buf_size - s.bi_valid;
          s.bi_valid += length - Buf_size;
        } else {
          s.bi_buf |= value << s.bi_valid & 65535;
          s.bi_valid += length;
        }
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
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      }
      function bi_flush(s) {
        if (s.bi_valid === 16) {
          put_short(s, s.bi_buf);
          s.bi_buf = 0;
          s.bi_valid = 0;
        } else if (s.bi_valid >= 8) {
          s.pending_buf[s.pending++] = s.bi_buf & 255;
          s.bi_buf >>= 8;
          s.bi_valid -= 8;
        }
      }
      function gen_bitlen(s, desc) {
        var tree = desc.dyn_tree;
        var max_code = desc.max_code;
        var stree = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var extra = desc.stat_desc.extra_bits;
        var base = desc.stat_desc.extra_base;
        var max_length = desc.stat_desc.max_length;
        var h;
        var n, m;
        var bits;
        var xbits;
        var f;
        var overflow = 0;
        for (bits = 0; bits <= MAX_BITS; bits++) {
          s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1] = bits;
          if (n > max_code) {
            continue;
          }
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) {
            xbits = extra[n - base];
          }
          f = tree[n * 2];
          s.opt_len += f * (bits + xbits);
          if (has_stree) {
            s.static_len += f * (stree[n * 2 + 1] + xbits);
          }
        }
        if (overflow === 0) {
          return;
        }
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) {
            bits--;
          }
          s.bl_count[bits]--;
          s.bl_count[bits + 1] += 2;
          s.bl_count[max_length]--;
          overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > max_code) {
              continue;
            }
            if (tree[m * 2 + 1] !== bits) {
              s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
              tree[m * 2 + 1] = bits;
            }
            n--;
          }
        }
      }
      function gen_codes(tree, max_code, bl_count) {
        var next_code = new Array(MAX_BITS + 1);
        var code = 0;
        var bits;
        var n;
        for (bits = 1; bits <= MAX_BITS; bits++) {
          next_code[bits] = code = code + bl_count[bits - 1] << 1;
        }
        for (n = 0; n <= max_code; n++) {
          var len = tree[n * 2 + 1];
          if (len === 0) {
            continue;
          }
          tree[n * 2] = bi_reverse(next_code[len]++, len);
        }
      }
      function tr_static_init() {
        var n;
        var bits;
        var length;
        var code;
        var dist;
        var bl_count = new Array(MAX_BITS + 1);
        length = 0;
        for (code = 0; code < LENGTH_CODES - 1; code++) {
          base_length[code] = length;
          for (n = 0; n < 1 << extra_lbits[code]; n++) {
            _length_code[length++] = code;
          }
        }
        _length_code[length - 1] = code;
        dist = 0;
        for (code = 0; code < 16; code++) {
          base_dist[code] = dist;
          for (n = 0; n < 1 << extra_dbits[code]; n++) {
            _dist_code[dist++] = code;
          }
        }
        dist >>= 7;
        for (; code < D_CODES; code++) {
          base_dist[code] = dist << 7;
          for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
            _dist_code[256 + dist++] = code;
          }
        }
        for (bits = 0; bits <= MAX_BITS; bits++) {
          bl_count[bits] = 0;
        }
        n = 0;
        while (n <= 143) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        while (n <= 255) {
          static_ltree[n * 2 + 1] = 9;
          n++;
          bl_count[9]++;
        }
        while (n <= 279) {
          static_ltree[n * 2 + 1] = 7;
          n++;
          bl_count[7]++;
        }
        while (n <= 287) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        gen_codes(static_ltree, L_CODES + 1, bl_count);
        for (n = 0; n < D_CODES; n++) {
          static_dtree[n * 2 + 1] = 5;
          static_dtree[n * 2] = bi_reverse(n, 5);
        }
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
        static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
        static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
      }
      function init_block(s) {
        var n;
        for (n = 0; n < L_CODES; n++) {
          s.dyn_ltree[n * 2] = 0;
        }
        for (n = 0; n < D_CODES; n++) {
          s.dyn_dtree[n * 2] = 0;
        }
        for (n = 0; n < BL_CODES; n++) {
          s.bl_tree[n * 2] = 0;
        }
        s.dyn_ltree[END_BLOCK * 2] = 1;
        s.opt_len = s.static_len = 0;
        s.last_lit = s.matches = 0;
      }
      function bi_windup(s) {
        if (s.bi_valid > 8) {
          put_short(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
          s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
      }
      function copy_block(s, buf, len, header) {
        bi_windup(s);
        if (header) {
          put_short(s, len);
          put_short(s, ~len);
        }
        utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
        s.pending += len;
      }
      function smaller(tree, n, m, depth) {
        var _n2 = n * 2;
        var _m2 = m * 2;
        return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
      }
      function pqdownheap(s, tree, k) {
        var v = s.heap[k];
        var j = k << 1;
        while (j <= s.heap_len) {
          if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
            j++;
          }
          if (smaller(tree, v, s.heap[j], s.depth)) {
            break;
          }
          s.heap[k] = s.heap[j];
          k = j;
          j <<= 1;
        }
        s.heap[k] = v;
      }
      function compress_block(s, ltree, dtree) {
        var dist;
        var lc;
        var lx = 0;
        var code;
        var extra;
        if (s.last_lit !== 0) {
          do {
            dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
            lc = s.pending_buf[s.l_buf + lx];
            lx++;
            if (dist === 0) {
              send_code(s, lc, ltree);
            } else {
              code = _length_code[lc];
              send_code(s, code + LITERALS + 1, ltree);
              extra = extra_lbits[code];
              if (extra !== 0) {
                lc -= base_length[code];
                send_bits(s, lc, extra);
              }
              dist--;
              code = d_code(dist);
              send_code(s, code, dtree);
              extra = extra_dbits[code];
              if (extra !== 0) {
                dist -= base_dist[code];
                send_bits(s, dist, extra);
              }
            }
          } while (lx < s.last_lit);
        }
        send_code(s, END_BLOCK, ltree);
      }
      function build_tree(s, desc) {
        var tree = desc.dyn_tree;
        var stree = desc.stat_desc.static_tree;
        var has_stree = desc.stat_desc.has_stree;
        var elems = desc.stat_desc.elems;
        var n, m;
        var max_code = -1;
        var node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE;
        for (n = 0; n < elems; n++) {
          if (tree[n * 2] !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
          } else {
            tree[n * 2 + 1] = 0;
          }
        }
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
          tree[node * 2] = 1;
          s.depth[node] = 0;
          s.opt_len--;
          if (has_stree) {
            s.static_len -= stree[node * 2 + 1];
          }
        }
        desc.max_code = max_code;
        for (n = s.heap_len >> 1; n >= 1; n--) {
          pqdownheap(s, tree, n);
        }
        node = elems;
        do {
          n = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[
            1
            /*SMALLEST*/
          ] = s.heap[s.heap_len--];
          pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
          m = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[--s.heap_max] = n;
          s.heap[--s.heap_max] = m;
          tree[node * 2] = tree[n * 2] + tree[m * 2];
          s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
          tree[n * 2 + 1] = tree[m * 2 + 1] = node;
          s.heap[
            1
            /*SMALLEST*/
          ] = node++;
          pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[
          1
          /*SMALLEST*/
        ];
        gen_bitlen(s, desc);
        gen_codes(tree, max_code, s.bl_count);
      }
      function scan_tree(s, tree, max_code) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 65535;
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            s.bl_tree[curlen * 2] += count;
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              s.bl_tree[curlen * 2]++;
            }
            s.bl_tree[REP_3_6 * 2]++;
          } else if (count <= 10) {
            s.bl_tree[REPZ_3_10 * 2]++;
          } else {
            s.bl_tree[REPZ_11_138 * 2]++;
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      function send_tree(s, tree, max_code) {
        var n;
        var prevlen = -1;
        var curlen;
        var nextlen = tree[0 * 2 + 1];
        var count = 0;
        var max_count = 7;
        var min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              send_code(s, curlen, s.bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              send_code(s, curlen, s.bl_tree);
              count--;
            }
            send_code(s, REP_3_6, s.bl_tree);
            send_bits(s, count - 3, 2);
          } else if (count <= 10) {
            send_code(s, REPZ_3_10, s.bl_tree);
            send_bits(s, count - 3, 3);
          } else {
            send_code(s, REPZ_11_138, s.bl_tree);
            send_bits(s, count - 11, 7);
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      }
      function build_bl_tree(s) {
        var max_blindex;
        scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
        build_tree(s, s.bl_desc);
        for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
          if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
            break;
          }
        }
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
      }
      function send_all_trees(s, lcodes, dcodes, blcodes) {
        var rank;
        send_bits(s, lcodes - 257, 5);
        send_bits(s, dcodes - 1, 5);
        send_bits(s, blcodes - 4, 4);
        for (rank = 0; rank < blcodes; rank++) {
          send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
        }
        send_tree(s, s.dyn_ltree, lcodes - 1);
        send_tree(s, s.dyn_dtree, dcodes - 1);
      }
      function detect_data_type(s) {
        var black_mask = 4093624447;
        var n;
        for (n = 0; n <= 31; n++, black_mask >>>= 1) {
          if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
            return Z_BINARY;
          }
        }
        if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
          return Z_TEXT;
        }
        for (n = 32; n < LITERALS; n++) {
          if (s.dyn_ltree[n * 2] !== 0) {
            return Z_TEXT;
          }
        }
        return Z_BINARY;
      }
      var static_init_done = false;
      function _tr_init(s) {
        if (!static_init_done) {
          tr_static_init();
          static_init_done = true;
        }
        s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
        s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
        s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
        s.bi_buf = 0;
        s.bi_valid = 0;
        init_block(s);
      }
      function _tr_stored_block(s, buf, stored_len, last) {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
        copy_block(s, buf, stored_len, true);
      }
      function _tr_align(s) {
        send_bits(s, STATIC_TREES << 1, 3);
        send_code(s, END_BLOCK, static_ltree);
        bi_flush(s);
      }
      function _tr_flush_block(s, buf, stored_len, last) {
        var opt_lenb, static_lenb;
        var max_blindex = 0;
        if (s.level > 0) {
          if (s.strm.data_type === Z_UNKNOWN) {
            s.strm.data_type = detect_data_type(s);
          }
          build_tree(s, s.l_desc);
          build_tree(s, s.d_desc);
          max_blindex = build_bl_tree(s);
          opt_lenb = s.opt_len + 3 + 7 >>> 3;
          static_lenb = s.static_len + 3 + 7 >>> 3;
          if (static_lenb <= opt_lenb) {
            opt_lenb = static_lenb;
          }
        } else {
          opt_lenb = static_lenb = stored_len + 5;
        }
        if (stored_len + 4 <= opt_lenb && buf !== -1) {
          _tr_stored_block(s, buf, stored_len, last);
        } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
          send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
          compress_block(s, static_ltree, static_dtree);
        } else {
          send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
          send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
          compress_block(s, s.dyn_ltree, s.dyn_dtree);
        }
        init_block(s);
        if (last) {
          bi_windup(s);
        }
      }
      function _tr_tally(s, dist, lc) {
        s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
        s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
        s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
        s.last_lit++;
        if (dist === 0) {
          s.dyn_ltree[lc * 2]++;
        } else {
          s.matches++;
          dist--;
          s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
          s.dyn_dtree[d_code(dist) * 2]++;
        }
        return s.last_lit === s.lit_bufsize - 1;
      }
      exports._tr_init = _tr_init;
      exports._tr_stored_block = _tr_stored_block;
      exports._tr_flush_block = _tr_flush_block;
      exports._tr_tally = _tr_tally;
      exports._tr_align = _tr_align;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/adler32.js
  var require_adler32 = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/adler32.js"(exports, module) {
      "use strict";
      function adler32(adler, buf, len, pos) {
        var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
        while (len !== 0) {
          n = len > 2e3 ? 2e3 : len;
          len -= n;
          do {
            s1 = s1 + buf[pos++] | 0;
            s2 = s2 + s1 | 0;
          } while (--n);
          s1 %= 65521;
          s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
      }
      module.exports = adler32;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/crc32.js
  var require_crc32 = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/crc32.js"(exports, module) {
      "use strict";
      function makeTable() {
        var c, table = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          }
          table[n] = c;
        }
        return table;
      }
      var crcTable2 = makeTable();
      function crc322(crc, buf, len, pos) {
        var t = crcTable2, end = pos + len;
        crc ^= -1;
        for (var i = pos; i < end; i++) {
          crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
        }
        return crc ^ -1;
      }
      module.exports = crc322;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/messages.js
  var require_messages = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/messages.js"(exports, module) {
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

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/deflate.js
  var require_deflate = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/deflate.js"(exports) {
      "use strict";
      var utils = require_common();
      var trees = require_trees();
      var adler32 = require_adler32();
      var crc322 = require_crc32();
      var msg = require_messages();
      var Z_NO_FLUSH = 0;
      var Z_PARTIAL_FLUSH = 1;
      var Z_FULL_FLUSH = 3;
      var Z_FINISH = 4;
      var Z_BLOCK = 5;
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_STREAM_ERROR = -2;
      var Z_DATA_ERROR = -3;
      var Z_BUF_ERROR = -5;
      var Z_DEFAULT_COMPRESSION = -1;
      var Z_FILTERED = 1;
      var Z_HUFFMAN_ONLY = 2;
      var Z_RLE = 3;
      var Z_FIXED = 4;
      var Z_DEFAULT_STRATEGY = 0;
      var Z_UNKNOWN = 2;
      var Z_DEFLATED = 8;
      var MAX_MEM_LEVEL = 9;
      var MAX_WBITS = 15;
      var DEF_MEM_LEVEL = 8;
      var LENGTH_CODES = 29;
      var LITERALS = 256;
      var L_CODES = LITERALS + 1 + LENGTH_CODES;
      var D_CODES = 30;
      var BL_CODES = 19;
      var HEAP_SIZE = 2 * L_CODES + 1;
      var MAX_BITS = 15;
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
      var PRESET_DICT = 32;
      var INIT_STATE = 42;
      var EXTRA_STATE = 69;
      var NAME_STATE = 73;
      var COMMENT_STATE = 91;
      var HCRC_STATE = 103;
      var BUSY_STATE = 113;
      var FINISH_STATE = 666;
      var BS_NEED_MORE = 1;
      var BS_BLOCK_DONE = 2;
      var BS_FINISH_STARTED = 3;
      var BS_FINISH_DONE = 4;
      var OS_CODE = 3;
      function err(strm, errorCode) {
        strm.msg = msg[errorCode];
        return errorCode;
      }
      function rank(f) {
        return (f << 1) - (f > 4 ? 9 : 0);
      }
      function zero(buf) {
        var len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      }
      function flush_pending(strm) {
        var s = strm.state;
        var len = s.pending;
        if (len > strm.avail_out) {
          len = strm.avail_out;
        }
        if (len === 0) {
          return;
        }
        utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
          s.pending_out = 0;
        }
      }
      function flush_block_only(s, last) {
        trees._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending(s.strm);
      }
      function put_byte(s, b) {
        s.pending_buf[s.pending++] = b;
      }
      function putShortMSB(s, b) {
        s.pending_buf[s.pending++] = b >>> 8 & 255;
        s.pending_buf[s.pending++] = b & 255;
      }
      function read_buf(strm, buf, start, size) {
        var len = strm.avail_in;
        if (len > size) {
          len = size;
        }
        if (len === 0) {
          return 0;
        }
        strm.avail_in -= len;
        utils.arraySet(buf, strm.input, strm.next_in, len, start);
        if (strm.state.wrap === 1) {
          strm.adler = adler32(strm.adler, buf, len, start);
        } else if (strm.state.wrap === 2) {
          strm.adler = crc322(strm.adler, buf, len, start);
        }
        strm.next_in += len;
        strm.total_in += len;
        return len;
      }
      function longest_match(s, cur_match) {
        var chain_length = s.max_chain_length;
        var scan = s.strstart;
        var match;
        var len;
        var best_len = s.prev_length;
        var nice_match = s.nice_match;
        var limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
        var _win = s.window;
        var wmask = s.w_mask;
        var prev = s.prev;
        var strend = s.strstart + MAX_MATCH;
        var scan_end1 = _win[scan + best_len - 1];
        var scan_end = _win[scan + best_len];
        if (s.prev_length >= s.good_match) {
          chain_length >>= 2;
        }
        if (nice_match > s.lookahead) {
          nice_match = s.lookahead;
        }
        do {
          match = cur_match;
          if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
            continue;
          }
          scan += 2;
          match++;
          do {
          } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
          len = MAX_MATCH - (strend - scan);
          scan = strend - MAX_MATCH;
          if (len > best_len) {
            s.match_start = cur_match;
            best_len = len;
            if (len >= nice_match) {
              break;
            }
            scan_end1 = _win[scan + best_len - 1];
            scan_end = _win[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        if (best_len <= s.lookahead) {
          return best_len;
        }
        return s.lookahead;
      }
      function fill_window(s) {
        var _w_size = s.w_size;
        var p, n, m, more, str;
        do {
          more = s.window_size - s.lookahead - s.strstart;
          if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
            utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
            s.match_start -= _w_size;
            s.strstart -= _w_size;
            s.block_start -= _w_size;
            n = s.hash_size;
            p = n;
            do {
              m = s.head[--p];
              s.head[p] = m >= _w_size ? m - _w_size : 0;
            } while (--n);
            n = _w_size;
            p = n;
            do {
              m = s.prev[--p];
              s.prev[p] = m >= _w_size ? m - _w_size : 0;
            } while (--n);
            more += _w_size;
          }
          if (s.strm.avail_in === 0) {
            break;
          }
          n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
          s.lookahead += n;
          if (s.lookahead + s.insert >= MIN_MATCH) {
            str = s.strstart - s.insert;
            s.ins_h = s.window[str];
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
            while (s.insert) {
              s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
              s.prev[str & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = str;
              str++;
              s.insert--;
              if (s.lookahead + s.insert < MIN_MATCH) {
                break;
              }
            }
          }
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
      }
      function deflate_stored(s, flush) {
        var max_block_size = 65535;
        if (max_block_size > s.pending_buf_size - 5) {
          max_block_size = s.pending_buf_size - 5;
        }
        for (; ; ) {
          if (s.lookahead <= 1) {
            fill_window(s);
            if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.strstart += s.lookahead;
          s.lookahead = 0;
          var max_start = s.block_start + max_block_size;
          if (s.strstart === 0 || s.strstart >= max_start) {
            s.lookahead = s.strstart - max_start;
            s.strstart = max_start;
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
          if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.strstart > s.block_start) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_NEED_MORE;
      }
      function deflate_fast(s, flush) {
        var hash_head;
        var bflush;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
            s.match_length = longest_match(s, hash_head);
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
              s.match_length--;
              do {
                s.strstart++;
                s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              } while (--s.match_length !== 0);
              s.strstart++;
            } else {
              s.strstart += s.match_length;
              s.match_length = 0;
              s.ins_h = s.window[s.strstart];
              s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
            }
          } else {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function deflate_slow(s, flush) {
        var hash_head;
        var bflush;
        var max_insert;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          s.prev_length = s.match_length;
          s.prev_match = s.match_start;
          s.match_length = MIN_MATCH - 1;
          if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
            s.match_length = longest_match(s, hash_head);
            if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
              s.match_length = MIN_MATCH - 1;
            }
          }
          if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH;
            bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
            s.lookahead -= s.prev_length - 1;
            s.prev_length -= 2;
            do {
              if (++s.strstart <= max_insert) {
                s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
            } while (--s.prev_length !== 0);
            s.match_available = 0;
            s.match_length = MIN_MATCH - 1;
            s.strstart++;
            if (bflush) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
              }
            }
          } else if (s.match_available) {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
            if (bflush) {
              flush_block_only(s, false);
            }
            s.strstart++;
            s.lookahead--;
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          } else {
            s.match_available = 1;
            s.strstart++;
            s.lookahead--;
          }
        }
        if (s.match_available) {
          bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);
          s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function deflate_rle(s, flush) {
        var bflush;
        var prev;
        var scan, strend;
        var _win = s.window;
        for (; ; ) {
          if (s.lookahead <= MAX_MATCH) {
            fill_window(s);
            if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.match_length = 0;
          if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
            scan = s.strstart - 1;
            prev = _win[scan];
            if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
              strend = s.strstart + MAX_MATCH;
              do {
              } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
              s.match_length = MAX_MATCH - (strend - scan);
              if (s.match_length > s.lookahead) {
                s.match_length = s.lookahead;
              }
            }
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            s.strstart += s.match_length;
            s.match_length = 0;
          } else {
            bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function deflate_huff(s, flush) {
        var bflush;
        for (; ; ) {
          if (s.lookahead === 0) {
            fill_window(s);
            if (s.lookahead === 0) {
              if (flush === Z_NO_FLUSH) {
                return BS_NEED_MORE;
              }
              break;
            }
          }
          s.match_length = 0;
          bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.last_lit) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      }
      function Config(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length;
        this.max_lazy = max_lazy;
        this.nice_length = nice_length;
        this.max_chain = max_chain;
        this.func = func;
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
        s.window_size = 2 * s.w_size;
        zero(s.head);
        s.max_lazy_match = configuration_table[s.level].max_lazy;
        s.good_match = configuration_table[s.level].good_length;
        s.nice_match = configuration_table[s.level].nice_length;
        s.max_chain_length = configuration_table[s.level].max_chain;
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        s.ins_h = 0;
      }
      function DeflateState() {
        this.strm = null;
        this.status = 0;
        this.pending_buf = null;
        this.pending_buf_size = 0;
        this.pending_out = 0;
        this.pending = 0;
        this.wrap = 0;
        this.gzhead = null;
        this.gzindex = 0;
        this.method = Z_DEFLATED;
        this.last_flush = -1;
        this.w_size = 0;
        this.w_bits = 0;
        this.w_mask = 0;
        this.window = null;
        this.window_size = 0;
        this.prev = null;
        this.head = null;
        this.ins_h = 0;
        this.hash_size = 0;
        this.hash_bits = 0;
        this.hash_mask = 0;
        this.hash_shift = 0;
        this.block_start = 0;
        this.match_length = 0;
        this.prev_match = 0;
        this.match_available = 0;
        this.strstart = 0;
        this.match_start = 0;
        this.lookahead = 0;
        this.prev_length = 0;
        this.max_chain_length = 0;
        this.max_lazy_match = 0;
        this.level = 0;
        this.strategy = 0;
        this.good_match = 0;
        this.nice_match = 0;
        this.dyn_ltree = new utils.Buf16(HEAP_SIZE * 2);
        this.dyn_dtree = new utils.Buf16((2 * D_CODES + 1) * 2);
        this.bl_tree = new utils.Buf16((2 * BL_CODES + 1) * 2);
        zero(this.dyn_ltree);
        zero(this.dyn_dtree);
        zero(this.bl_tree);
        this.l_desc = null;
        this.d_desc = null;
        this.bl_desc = null;
        this.bl_count = new utils.Buf16(MAX_BITS + 1);
        this.heap = new utils.Buf16(2 * L_CODES + 1);
        zero(this.heap);
        this.heap_len = 0;
        this.heap_max = 0;
        this.depth = new utils.Buf16(2 * L_CODES + 1);
        zero(this.depth);
        this.l_buf = 0;
        this.lit_bufsize = 0;
        this.last_lit = 0;
        this.d_buf = 0;
        this.opt_len = 0;
        this.static_len = 0;
        this.matches = 0;
        this.insert = 0;
        this.bi_buf = 0;
        this.bi_valid = 0;
      }
      function deflateResetKeep(strm) {
        var s;
        if (!strm || !strm.state) {
          return err(strm, Z_STREAM_ERROR);
        }
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN;
        s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
        if (s.wrap < 0) {
          s.wrap = -s.wrap;
        }
        s.status = s.wrap ? INIT_STATE : BUSY_STATE;
        strm.adler = s.wrap === 2 ? 0 : 1;
        s.last_flush = Z_NO_FLUSH;
        trees._tr_init(s);
        return Z_OK;
      }
      function deflateReset(strm) {
        var ret = deflateResetKeep(strm);
        if (ret === Z_OK) {
          lm_init(strm.state);
        }
        return ret;
      }
      function deflateSetHeader(strm, head) {
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        if (strm.state.wrap !== 2) {
          return Z_STREAM_ERROR;
        }
        strm.state.gzhead = head;
        return Z_OK;
      }
      function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        var wrap = 1;
        if (level === Z_DEFAULT_COMPRESSION) {
          level = 6;
        }
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else if (windowBits > 15) {
          wrap = 2;
          windowBits -= 16;
        }
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED) {
          return err(strm, Z_STREAM_ERROR);
        }
        if (windowBits === 8) {
          windowBits = 9;
        }
        var s = new DeflateState();
        strm.state = s;
        s.strm = strm;
        s.wrap = wrap;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
        s.window = new utils.Buf8(s.w_size * 2);
        s.head = new utils.Buf16(s.hash_size);
        s.prev = new utils.Buf16(s.w_size);
        s.lit_bufsize = 1 << memLevel + 6;
        s.pending_buf_size = s.lit_bufsize * 4;
        s.pending_buf = new utils.Buf8(s.pending_buf_size);
        s.d_buf = 1 * s.lit_bufsize;
        s.l_buf = (1 + 2) * s.lit_bufsize;
        s.level = level;
        s.strategy = strategy;
        s.method = method;
        return deflateReset(strm);
      }
      function deflateInit(strm, level) {
        return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
      }
      function deflate(strm, flush) {
        var old_flush, s;
        var beg, val;
        if (!strm || !strm.state || flush > Z_BLOCK || flush < 0) {
          return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
        }
        s = strm.state;
        if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE && flush !== Z_FINISH) {
          return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
        }
        s.strm = strm;
        old_flush = s.last_flush;
        s.last_flush = flush;
        if (s.status === INIT_STATE) {
          if (s.wrap === 2) {
            strm.adler = 0;
            put_byte(s, 31);
            put_byte(s, 139);
            put_byte(s, 8);
            if (!s.gzhead) {
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, 0);
              put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
              put_byte(s, OS_CODE);
              s.status = BUSY_STATE;
            } else {
              put_byte(
                s,
                (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
              );
              put_byte(s, s.gzhead.time & 255);
              put_byte(s, s.gzhead.time >> 8 & 255);
              put_byte(s, s.gzhead.time >> 16 & 255);
              put_byte(s, s.gzhead.time >> 24 & 255);
              put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
              put_byte(s, s.gzhead.os & 255);
              if (s.gzhead.extra && s.gzhead.extra.length) {
                put_byte(s, s.gzhead.extra.length & 255);
                put_byte(s, s.gzhead.extra.length >> 8 & 255);
              }
              if (s.gzhead.hcrc) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending, 0);
              }
              s.gzindex = 0;
              s.status = EXTRA_STATE;
            }
          } else {
            var header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
            var level_flags = -1;
            if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
              level_flags = 0;
            } else if (s.level < 6) {
              level_flags = 1;
            } else if (s.level === 6) {
              level_flags = 2;
            } else {
              level_flags = 3;
            }
            header |= level_flags << 6;
            if (s.strstart !== 0) {
              header |= PRESET_DICT;
            }
            header += 31 - header % 31;
            s.status = BUSY_STATE;
            putShortMSB(s, header);
            if (s.strstart !== 0) {
              putShortMSB(s, strm.adler >>> 16);
              putShortMSB(s, strm.adler & 65535);
            }
            strm.adler = 1;
          }
        }
        if (s.status === EXTRA_STATE) {
          if (s.gzhead.extra) {
            beg = s.pending;
            while (s.gzindex < (s.gzhead.extra.length & 65535)) {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  break;
                }
              }
              put_byte(s, s.gzhead.extra[s.gzindex] & 255);
              s.gzindex++;
            }
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (s.gzindex === s.gzhead.extra.length) {
              s.gzindex = 0;
              s.status = NAME_STATE;
            }
          } else {
            s.status = NAME_STATE;
          }
        }
        if (s.status === NAME_STATE) {
          if (s.gzhead.name) {
            beg = s.pending;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  val = 1;
                  break;
                }
              }
              if (s.gzindex < s.gzhead.name.length) {
                val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (val === 0) {
              s.gzindex = 0;
              s.status = COMMENT_STATE;
            }
          } else {
            s.status = COMMENT_STATE;
          }
        }
        if (s.status === COMMENT_STATE) {
          if (s.gzhead.comment) {
            beg = s.pending;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                beg = s.pending;
                if (s.pending === s.pending_buf_size) {
                  val = 1;
                  break;
                }
              }
              if (s.gzindex < s.gzhead.comment.length) {
                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            if (val === 0) {
              s.status = HCRC_STATE;
            }
          } else {
            s.status = HCRC_STATE;
          }
        }
        if (s.status === HCRC_STATE) {
          if (s.gzhead.hcrc) {
            if (s.pending + 2 > s.pending_buf_size) {
              flush_pending(strm);
            }
            if (s.pending + 2 <= s.pending_buf_size) {
              put_byte(s, strm.adler & 255);
              put_byte(s, strm.adler >> 8 & 255);
              strm.adler = 0;
              s.status = BUSY_STATE;
            }
          } else {
            s.status = BUSY_STATE;
          }
        }
        if (s.pending !== 0) {
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
          return err(strm, Z_BUF_ERROR);
        }
        if (s.status === FINISH_STATE && strm.avail_in !== 0) {
          return err(strm, Z_BUF_ERROR);
        }
        if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
          var bstate = s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
          if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
            s.status = FINISH_STATE;
          }
          if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
            if (strm.avail_out === 0) {
              s.last_flush = -1;
            }
            return Z_OK;
          }
          if (bstate === BS_BLOCK_DONE) {
            if (flush === Z_PARTIAL_FLUSH) {
              trees._tr_align(s);
            } else if (flush !== Z_BLOCK) {
              trees._tr_stored_block(s, 0, 0, false);
              if (flush === Z_FULL_FLUSH) {
                zero(s.head);
                if (s.lookahead === 0) {
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
              }
            }
            flush_pending(strm);
            if (strm.avail_out === 0) {
              s.last_flush = -1;
              return Z_OK;
            }
          }
        }
        if (flush !== Z_FINISH) {
          return Z_OK;
        }
        if (s.wrap <= 0) {
          return Z_STREAM_END;
        }
        if (s.wrap === 2) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          put_byte(s, strm.adler >> 16 & 255);
          put_byte(s, strm.adler >> 24 & 255);
          put_byte(s, strm.total_in & 255);
          put_byte(s, strm.total_in >> 8 & 255);
          put_byte(s, strm.total_in >> 16 & 255);
          put_byte(s, strm.total_in >> 24 & 255);
        } else {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        flush_pending(strm);
        if (s.wrap > 0) {
          s.wrap = -s.wrap;
        }
        return s.pending !== 0 ? Z_OK : Z_STREAM_END;
      }
      function deflateEnd(strm) {
        var status;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        status = strm.state.status;
        if (status !== INIT_STATE && status !== EXTRA_STATE && status !== NAME_STATE && status !== COMMENT_STATE && status !== HCRC_STATE && status !== BUSY_STATE && status !== FINISH_STATE) {
          return err(strm, Z_STREAM_ERROR);
        }
        strm.state = null;
        return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
      }
      function deflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var s;
        var str, n;
        var wrap;
        var avail;
        var next;
        var input;
        var tmpDict;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        s = strm.state;
        wrap = s.wrap;
        if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
          return Z_STREAM_ERROR;
        }
        if (wrap === 1) {
          strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
        }
        s.wrap = 0;
        if (dictLength >= s.w_size) {
          if (wrap === 0) {
            zero(s.head);
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
          tmpDict = new utils.Buf8(s.w_size);
          utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
          dictionary = tmpDict;
          dictLength = s.w_size;
        }
        avail = strm.avail_in;
        next = strm.next_in;
        input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window(s);
        while (s.lookahead >= MIN_MATCH) {
          str = s.strstart;
          n = s.lookahead - (MIN_MATCH - 1);
          do {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
          } while (--n);
          s.strstart = str;
          s.lookahead = MIN_MATCH - 1;
          fill_window(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap;
        return Z_OK;
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

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/utils/strings.js
  var require_strings = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/utils/strings.js"(exports) {
      "use strict";
      var utils = require_common();
      var STR_APPLY_OK = true;
      var STR_APPLY_UIA_OK = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (__) {
        STR_APPLY_OK = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (__) {
        STR_APPLY_UIA_OK = false;
      }
      var _utf8len = new utils.Buf8(256);
      for (q = 0; q < 256; q++) {
        _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
      }
      var q;
      _utf8len[254] = _utf8len[254] = 1;
      exports.string2buf = function(str) {
        var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        }
        buf = new utils.Buf8(buf_len);
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          if (c < 128) {
            buf[i++] = c;
          } else if (c < 2048) {
            buf[i++] = 192 | c >>> 6;
            buf[i++] = 128 | c & 63;
          } else if (c < 65536) {
            buf[i++] = 224 | c >>> 12;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          } else {
            buf[i++] = 240 | c >>> 18;
            buf[i++] = 128 | c >>> 12 & 63;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          }
        }
        return buf;
      };
      function buf2binstring(buf, len) {
        if (len < 65534) {
          if (buf.subarray && STR_APPLY_UIA_OK || !buf.subarray && STR_APPLY_OK) {
            return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
          }
        }
        var result = "";
        for (var i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      }
      exports.buf2binstring = function(buf) {
        return buf2binstring(buf, buf.length);
      };
      exports.binstring2buf = function(str) {
        var buf = new utils.Buf8(str.length);
        for (var i = 0, len = buf.length; i < len; i++) {
          buf[i] = str.charCodeAt(i);
        }
        return buf;
      };
      exports.buf2string = function(buf, max) {
        var i, out, c, c_len;
        var len = max || buf.length;
        var utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          c = buf[i++];
          if (c < 128) {
            utf16buf[out++] = c;
            continue;
          }
          c_len = _utf8len[c];
          if (c_len > 4) {
            utf16buf[out++] = 65533;
            i += c_len - 1;
            continue;
          }
          c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
          while (c_len > 1 && i < len) {
            c = c << 6 | buf[i++] & 63;
            c_len--;
          }
          if (c_len > 1) {
            utf16buf[out++] = 65533;
            continue;
          }
          if (c < 65536) {
            utf16buf[out++] = c;
          } else {
            c -= 65536;
            utf16buf[out++] = 55296 | c >> 10 & 1023;
            utf16buf[out++] = 56320 | c & 1023;
          }
        }
        return buf2binstring(utf16buf, out);
      };
      exports.utf8border = function(buf, max) {
        var pos;
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }
        pos = max - 1;
        while (pos >= 0 && (buf[pos] & 192) === 128) {
          pos--;
        }
        if (pos < 0) {
          return max;
        }
        if (pos === 0) {
          return max;
        }
        return pos + _utf8len[buf[pos]] > max ? pos : max;
      };
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/zstream.js
  var require_zstream = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/zstream.js"(exports, module) {
      "use strict";
      function ZStream() {
        this.input = null;
        this.next_in = 0;
        this.avail_in = 0;
        this.total_in = 0;
        this.output = null;
        this.next_out = 0;
        this.avail_out = 0;
        this.total_out = 0;
        this.msg = "";
        this.state = null;
        this.data_type = 2;
        this.adler = 0;
      }
      module.exports = ZStream;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/deflate.js
  var require_deflate2 = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/deflate.js"(exports) {
      "use strict";
      var zlib_deflate = require_deflate();
      var utils = require_common();
      var strings = require_strings();
      var msg = require_messages();
      var ZStream = require_zstream();
      var toString = Object.prototype.toString;
      var Z_NO_FLUSH = 0;
      var Z_FINISH = 4;
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_SYNC_FLUSH = 2;
      var Z_DEFAULT_COMPRESSION = -1;
      var Z_DEFAULT_STRATEGY = 0;
      var Z_DEFLATED = 8;
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
        if (opt.raw && opt.windowBits > 0) {
          opt.windowBits = -opt.windowBits;
        } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
          opt.windowBits += 16;
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        var status = zlib_deflate.deflateInit2(
          this.strm,
          opt.level,
          opt.method,
          opt.windowBits,
          opt.memLevel,
          opt.strategy
        );
        if (status !== Z_OK) {
          throw new Error(msg[status]);
        }
        if (opt.header) {
          zlib_deflate.deflateSetHeader(this.strm, opt.header);
        }
        if (opt.dictionary) {
          var dict;
          if (typeof opt.dictionary === "string") {
            dict = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
            dict = new Uint8Array(opt.dictionary);
          } else {
            dict = opt.dictionary;
          }
          status = zlib_deflate.deflateSetDictionary(this.strm, dict);
          if (status !== Z_OK) {
            throw new Error(msg[status]);
          }
          this._dict_set = true;
        }
      }
      Deflate.prototype.push = function(data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var status, _mode;
        if (this.ended) {
          return false;
        }
        _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH : Z_NO_FLUSH;
        if (typeof data === "string") {
          strm.input = strings.string2buf(data);
        } else if (toString.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_deflate.deflate(strm, _mode);
          if (status !== Z_STREAM_END && status !== Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
          if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH)) {
            if (this.options.to === "string") {
              this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
            } else {
              this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            }
          }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);
        if (_mode === Z_FINISH) {
          status = zlib_deflate.deflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === Z_OK;
        }
        if (_mode === Z_SYNC_FLUSH) {
          this.onEnd(Z_OK);
          strm.avail_out = 0;
          return true;
        }
        return true;
      };
      Deflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Deflate.prototype.onEnd = function(status) {
        if (status === Z_OK) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("");
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function deflate(input, options) {
        var deflator = new Deflate(options);
        deflator.push(input, true);
        if (deflator.err) {
          throw deflator.msg || msg[deflator.err];
        }
        return deflator.result;
      }
      function deflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return deflate(input, options);
      }
      function gzip(input, options) {
        options = options || {};
        options.gzip = true;
        return deflate(input, options);
      }
      exports.Deflate = Deflate;
      exports.deflate = deflate;
      exports.deflateRaw = deflateRaw;
      exports.gzip = gzip;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/inffast.js
  var require_inffast = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/inffast.js"(exports, module) {
      "use strict";
      var BAD = 30;
      var TYPE = 12;
      module.exports = function inflate_fast(strm, start) {
        var state;
        var _in;
        var last;
        var _out;
        var beg;
        var end;
        var dmax;
        var wsize;
        var whave;
        var wnext;
        var s_window;
        var hold;
        var bits;
        var lcode;
        var dcode;
        var lmask;
        var dmask;
        var here;
        var op;
        var len;
        var dist;
        var from;
        var from_source;
        var input, output;
        state = strm.state;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        dmax = state.dmax;
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
        top:
          do {
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = lcode[hold & lmask];
            dolen:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op === 0) {
                  output[_out++] = here & 65535;
                } else if (op & 16) {
                  len = here & 65535;
                  op &= 15;
                  if (op) {
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                    len += hold & (1 << op) - 1;
                    hold >>>= op;
                    bits -= op;
                  }
                  if (bits < 15) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  here = dcode[hold & dmask];
                  dodist:
                    for (; ; ) {
                      op = here >>> 24;
                      hold >>>= op;
                      bits -= op;
                      op = here >>> 16 & 255;
                      if (op & 16) {
                        dist = here & 65535;
                        op &= 15;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                          if (bits < op) {
                            hold += input[_in++] << bits;
                            bits += 8;
                          }
                        }
                        dist += hold & (1 << op) - 1;
                        if (dist > dmax) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD;
                          break top;
                        }
                        hold >>>= op;
                        bits -= op;
                        op = _out - beg;
                        if (dist > op) {
                          op = dist - op;
                          if (op > whave) {
                            if (state.sane) {
                              strm.msg = "invalid distance too far back";
                              state.mode = BAD;
                              break top;
                            }
                          }
                          from = 0;
                          from_source = s_window;
                          if (wnext === 0) {
                            from += wsize - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          } else if (wnext < op) {
                            from += wsize + wnext - op;
                            op -= wnext;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = 0;
                              if (wnext < len) {
                                op = wnext;
                                len -= op;
                                do {
                                  output[_out++] = s_window[from++];
                                } while (--op);
                                from = _out - dist;
                                from_source = output;
                              }
                            }
                          } else {
                            from += wnext - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                          while (len > 2) {
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            len -= 3;
                          }
                          if (len) {
                            output[_out++] = from_source[from++];
                            if (len > 1) {
                              output[_out++] = from_source[from++];
                            }
                          }
                        } else {
                          from = _out - dist;
                          do {
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            len -= 3;
                          } while (len > 2);
                          if (len) {
                            output[_out++] = output[from++];
                            if (len > 1) {
                              output[_out++] = output[from++];
                            }
                          }
                        }
                      } else if ((op & 64) === 0) {
                        here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                        continue dodist;
                      } else {
                        strm.msg = "invalid distance code";
                        state.mode = BAD;
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
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break top;
                }
                break;
              }
          } while (_in < last && _out < end);
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
        strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
        state.hold = hold;
        state.bits = bits;
        return;
      };
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/inftrees.js
  var require_inftrees = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/inftrees.js"(exports, module) {
      "use strict";
      var utils = require_common();
      var MAXBITS = 15;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var lbase = [
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
      ];
      var lext = [
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
      ];
      var dbase = [
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
      ];
      var dext = [
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
      module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
        var bits = opts.bits;
        var len = 0;
        var sym = 0;
        var min = 0, max = 0;
        var root = 0;
        var curr = 0;
        var drop = 0;
        var left = 0;
        var used = 0;
        var huff = 0;
        var incr;
        var fill;
        var low;
        var mask;
        var next;
        var base = null;
        var base_index = 0;
        var end;
        var count = new utils.Buf16(MAXBITS + 1);
        var offs = new utils.Buf16(MAXBITS + 1);
        var extra = null;
        var extra_index = 0;
        var here_bits, here_op, here_val;
        for (len = 0; len <= MAXBITS; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
          if (count[max] !== 0) {
            break;
          }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          opts.bits = 1;
          return 0;
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) {
            break;
          }
        }
        if (root < min) {
          root = min;
        }
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          }
        }
        if (left > 0 && (type === CODES || max !== 1)) {
          return -1;
        }
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
          offs[len + 1] = offs[len] + count[len];
        }
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }
        if (type === CODES) {
          base = extra = work;
          end = 19;
        } else if (type === LENS) {
          base = lbase;
          base_index -= 257;
          extra = lext;
          extra_index -= 257;
          end = 256;
        } else {
          base = dbase;
          extra = dext;
          end = -1;
        }
        huff = 0;
        sym = 0;
        len = min;
        next = table_index;
        curr = root;
        drop = 0;
        low = -1;
        used = 1 << root;
        mask = used - 1;
        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
          return 1;
        }
        for (; ; ) {
          here_bits = len - drop;
          if (work[sym] < end) {
            here_op = 0;
            here_val = work[sym];
          } else if (work[sym] > end) {
            here_op = extra[extra_index + work[sym]];
            here_val = base[base_index + work[sym]];
          } else {
            here_op = 32 + 64;
            here_val = 0;
          }
          incr = 1 << len - drop;
          fill = 1 << curr;
          min = fill;
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
          } while (fill !== 0);
          incr = 1 << len - 1;
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }
          sym++;
          if (--count[len] === 0) {
            if (len === max) {
              break;
            }
            len = lens[lens_index + work[sym]];
          }
          if (len > root && (huff & mask) !== low) {
            if (drop === 0) {
              drop = root;
            }
            next += min;
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) {
                break;
              }
              curr++;
              left <<= 1;
            }
            used += 1 << curr;
            if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
              return 1;
            }
            low = huff & mask;
            table[low] = root << 24 | curr << 16 | next - table_index | 0;
          }
        }
        if (huff !== 0) {
          table[next + huff] = len - drop << 24 | 64 << 16 | 0;
        }
        opts.bits = root;
        return 0;
      };
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/inflate.js
  var require_inflate = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/inflate.js"(exports) {
      "use strict";
      var utils = require_common();
      var adler32 = require_adler32();
      var crc322 = require_crc32();
      var inflate_fast = require_inffast();
      var inflate_table = require_inftrees();
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var Z_FINISH = 4;
      var Z_BLOCK = 5;
      var Z_TREES = 6;
      var Z_OK = 0;
      var Z_STREAM_END = 1;
      var Z_NEED_DICT = 2;
      var Z_STREAM_ERROR = -2;
      var Z_DATA_ERROR = -3;
      var Z_MEM_ERROR = -4;
      var Z_BUF_ERROR = -5;
      var Z_DEFLATED = 8;
      var HEAD = 1;
      var FLAGS = 2;
      var TIME = 3;
      var OS = 4;
      var EXLEN = 5;
      var EXTRA = 6;
      var NAME = 7;
      var COMMENT = 8;
      var HCRC = 9;
      var DICTID = 10;
      var DICT = 11;
      var TYPE = 12;
      var TYPEDO = 13;
      var STORED = 14;
      var COPY_ = 15;
      var COPY = 16;
      var TABLE = 17;
      var LENLENS = 18;
      var CODELENS = 19;
      var LEN_ = 20;
      var LEN = 21;
      var LENEXT = 22;
      var DIST = 23;
      var DISTEXT = 24;
      var MATCH = 25;
      var LIT = 26;
      var CHECK = 27;
      var LENGTH = 28;
      var DONE = 29;
      var BAD = 30;
      var MEM = 31;
      var SYNC = 32;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      var MAX_WBITS = 15;
      var DEF_WBITS = MAX_WBITS;
      function zswap32(q) {
        return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
      }
      function InflateState() {
        this.mode = 0;
        this.last = false;
        this.wrap = 0;
        this.havedict = false;
        this.flags = 0;
        this.dmax = 0;
        this.check = 0;
        this.total = 0;
        this.head = null;
        this.wbits = 0;
        this.wsize = 0;
        this.whave = 0;
        this.wnext = 0;
        this.window = null;
        this.hold = 0;
        this.bits = 0;
        this.length = 0;
        this.offset = 0;
        this.extra = 0;
        this.lencode = null;
        this.distcode = null;
        this.lenbits = 0;
        this.distbits = 0;
        this.ncode = 0;
        this.nlen = 0;
        this.ndist = 0;
        this.have = 0;
        this.next = null;
        this.lens = new utils.Buf16(320);
        this.work = new utils.Buf16(288);
        this.lendyn = null;
        this.distdyn = null;
        this.sane = 0;
        this.back = 0;
        this.was = 0;
      }
      function inflateResetKeep(strm) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = "";
        if (state.wrap) {
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.dmax = 32768;
        state.head = null;
        state.hold = 0;
        state.bits = 0;
        state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
        state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);
        state.sane = 1;
        state.back = -1;
        return Z_OK;
      }
      function inflateReset(strm) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
      }
      function inflateReset2(strm, windowBits) {
        var wrap;
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else {
          wrap = (windowBits >> 4) + 1;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset(strm);
      }
      function inflateInit2(strm, windowBits) {
        var ret;
        var state;
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        state = new InflateState();
        strm.state = state;
        state.window = null;
        ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK) {
          strm.state = null;
        }
        return ret;
      }
      function inflateInit(strm) {
        return inflateInit2(strm, DEF_WBITS);
      }
      var virgin = true;
      var lenfix;
      var distfix;
      function fixedtables(state) {
        if (virgin) {
          var sym;
          lenfix = new utils.Buf32(512);
          distfix = new utils.Buf32(32);
          sym = 0;
          while (sym < 144) {
            state.lens[sym++] = 8;
          }
          while (sym < 256) {
            state.lens[sym++] = 9;
          }
          while (sym < 280) {
            state.lens[sym++] = 7;
          }
          while (sym < 288) {
            state.lens[sym++] = 8;
          }
          inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
          sym = 0;
          while (sym < 32) {
            state.lens[sym++] = 5;
          }
          inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
          virgin = false;
        }
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
      }
      function updatewindow(strm, src, end, copy) {
        var dist;
        var state = strm.state;
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
          state.window = new utils.Buf8(state.wsize);
        }
        if (copy >= state.wsize) {
          utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
          state.wnext = 0;
          state.whave = state.wsize;
        } else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          utils.arraySet(state.window, src, end - copy, dist, state.wnext);
          copy -= dist;
          if (copy) {
            utils.arraySet(state.window, src, end - copy, copy, 0);
            state.wnext = copy;
            state.whave = state.wsize;
          } else {
            state.wnext += dist;
            if (state.wnext === state.wsize) {
              state.wnext = 0;
            }
            if (state.whave < state.wsize) {
              state.whave += dist;
            }
          }
        }
        return 0;
      }
      function inflate(strm, flush) {
        var state;
        var input, output;
        var next;
        var put;
        var have, left;
        var hold;
        var bits;
        var _in, _out;
        var copy;
        var from;
        var from_source;
        var here = 0;
        var here_bits, here_op, here_val;
        var last_bits, last_op, last_val;
        var len;
        var ret;
        var hbuf = new utils.Buf8(4);
        var opts;
        var n;
        var order = (
          /* permutation of code lengths */
          [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
        );
        if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.mode === TYPE) {
          state.mode = TYPEDO;
        }
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        _in = have;
        _out = left;
        ret = Z_OK;
        inf_leave:
          for (; ; ) {
            switch (state.mode) {
              case HEAD:
                if (state.wrap === 0) {
                  state.mode = TYPEDO;
                  break;
                }
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.wrap & 2 && hold === 35615) {
                  state.check = 0;
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                  hold = 0;
                  bits = 0;
                  state.mode = FLAGS;
                  break;
                }
                state.flags = 0;
                if (state.head) {
                  state.head.done = false;
                }
                if (!(state.wrap & 1) || /* check if zlib header allowed */
                (((hold & 255) << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check";
                  state.mode = BAD;
                  break;
                }
                if ((hold & 15) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                hold >>>= 4;
                bits -= 4;
                len = (hold & 15) + 8;
                if (state.wbits === 0) {
                  state.wbits = len;
                } else if (len > state.wbits) {
                  strm.msg = "invalid window size";
                  state.mode = BAD;
                  break;
                }
                state.dmax = 1 << len;
                strm.adler = state.check = 1;
                state.mode = hold & 512 ? DICTID : TYPE;
                hold = 0;
                bits = 0;
                break;
              case FLAGS:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.flags = hold;
                if ((state.flags & 255) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                if (state.flags & 57344) {
                  strm.msg = "unknown header flags set";
                  state.mode = BAD;
                  break;
                }
                if (state.head) {
                  state.head.text = hold >> 8 & 1;
                }
                if (state.flags & 512) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = TIME;
              /* falls through */
              case TIME:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.time = hold;
                }
                if (state.flags & 512) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  hbuf[2] = hold >>> 16 & 255;
                  hbuf[3] = hold >>> 24 & 255;
                  state.check = crc322(state.check, hbuf, 4, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = OS;
              /* falls through */
              case OS:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.xflags = hold & 255;
                  state.head.os = hold >> 8;
                }
                if (state.flags & 512) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = EXLEN;
              /* falls through */
              case EXLEN:
                if (state.flags & 1024) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length = hold;
                  if (state.head) {
                    state.head.extra_len = hold;
                  }
                  if (state.flags & 512) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = hold >>> 8 & 255;
                    state.check = crc322(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                } else if (state.head) {
                  state.head.extra = null;
                }
                state.mode = EXTRA;
              /* falls through */
              case EXTRA:
                if (state.flags & 1024) {
                  copy = state.length;
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy) {
                    if (state.head) {
                      len = state.head.extra_len - state.length;
                      if (!state.head.extra) {
                        state.head.extra = new Array(state.head.extra_len);
                      }
                      utils.arraySet(
                        state.head.extra,
                        input,
                        next,
                        // extra field is limited to 65536 bytes
                        // - no need for additional size check
                        copy,
                        /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                        len
                      );
                    }
                    if (state.flags & 512) {
                      state.check = crc322(state.check, input, copy, next);
                    }
                    have -= copy;
                    next += copy;
                    state.length -= copy;
                  }
                  if (state.length) {
                    break inf_leave;
                  }
                }
                state.length = 0;
                state.mode = NAME;
              /* falls through */
              case NAME:
                if (state.flags & 2048) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.name += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512) {
                    state.check = crc322(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.name = null;
                }
                state.length = 0;
                state.mode = COMMENT;
              /* falls through */
              case COMMENT:
                if (state.flags & 4096) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.comment += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512) {
                    state.check = crc322(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.comment = null;
                }
                state.mode = HCRC;
              /* falls through */
              case HCRC:
                if (state.flags & 512) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (hold !== (state.check & 65535)) {
                    strm.msg = "header crc mismatch";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                if (state.head) {
                  state.head.hcrc = state.flags >> 9 & 1;
                  state.head.done = true;
                }
                strm.adler = state.check = 0;
                state.mode = TYPE;
                break;
              case DICTID:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                strm.adler = state.check = zswap32(hold);
                hold = 0;
                bits = 0;
                state.mode = DICT;
              /* falls through */
              case DICT:
                if (state.havedict === 0) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  return Z_NEED_DICT;
                }
                strm.adler = state.check = 1;
                state.mode = TYPE;
              /* falls through */
              case TYPE:
                if (flush === Z_BLOCK || flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case TYPEDO:
                if (state.last) {
                  hold >>>= bits & 7;
                  bits -= bits & 7;
                  state.mode = CHECK;
                  break;
                }
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.last = hold & 1;
                hold >>>= 1;
                bits -= 1;
                switch (hold & 3) {
                  case 0:
                    state.mode = STORED;
                    break;
                  case 1:
                    fixedtables(state);
                    state.mode = LEN_;
                    if (flush === Z_TREES) {
                      hold >>>= 2;
                      bits -= 2;
                      break inf_leave;
                    }
                    break;
                  case 2:
                    state.mode = TABLE;
                    break;
                  case 3:
                    strm.msg = "invalid block type";
                    state.mode = BAD;
                }
                hold >>>= 2;
                bits -= 2;
                break;
              case STORED:
                hold >>>= bits & 7;
                bits -= bits & 7;
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                  strm.msg = "invalid stored block lengths";
                  state.mode = BAD;
                  break;
                }
                state.length = hold & 65535;
                hold = 0;
                bits = 0;
                state.mode = COPY_;
                if (flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case COPY_:
                state.mode = COPY;
              /* falls through */
              case COPY:
                copy = state.length;
                if (copy) {
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy > left) {
                    copy = left;
                  }
                  if (copy === 0) {
                    break inf_leave;
                  }
                  utils.arraySet(output, input, next, copy, put);
                  have -= copy;
                  next += copy;
                  left -= copy;
                  put += copy;
                  state.length -= copy;
                  break;
                }
                state.mode = TYPE;
                break;
              case TABLE:
                while (bits < 14) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.nlen = (hold & 31) + 257;
                hold >>>= 5;
                bits -= 5;
                state.ndist = (hold & 31) + 1;
                hold >>>= 5;
                bits -= 5;
                state.ncode = (hold & 15) + 4;
                hold >>>= 4;
                bits -= 4;
                if (state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = LENLENS;
              /* falls through */
              case LENLENS:
                while (state.have < state.ncode) {
                  while (bits < 3) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.lens[order[state.have++]] = hold & 7;
                  hold >>>= 3;
                  bits -= 3;
                }
                while (state.have < 19) {
                  state.lens[order[state.have++]] = 0;
                }
                state.lencode = state.lendyn;
                state.lenbits = 7;
                opts = { bits: state.lenbits };
                ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid code lengths set";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = CODELENS;
              /* falls through */
              case CODELENS:
                while (state.have < state.nlen + state.ndist) {
                  for (; ; ) {
                    here = state.lencode[hold & (1 << state.lenbits) - 1];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (here_val < 16) {
                    hold >>>= here_bits;
                    bits -= here_bits;
                    state.lens[state.have++] = here_val;
                  } else {
                    if (here_val === 16) {
                      n = here_bits + 2;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      if (state.have === 0) {
                        strm.msg = "invalid bit length repeat";
                        state.mode = BAD;
                        break;
                      }
                      len = state.lens[state.have - 1];
                      copy = 3 + (hold & 3);
                      hold >>>= 2;
                      bits -= 2;
                    } else if (here_val === 17) {
                      n = here_bits + 3;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 3 + (hold & 7);
                      hold >>>= 3;
                      bits -= 3;
                    } else {
                      n = here_bits + 7;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 11 + (hold & 127);
                      hold >>>= 7;
                      bits -= 7;
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD;
                      break;
                    }
                    while (copy--) {
                      state.lens[state.have++] = len;
                    }
                  }
                }
                if (state.mode === BAD) {
                  break;
                }
                if (state.lens[256] === 0) {
                  strm.msg = "invalid code -- missing end-of-block";
                  state.mode = BAD;
                  break;
                }
                state.lenbits = 9;
                opts = { bits: state.lenbits };
                ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid literal/lengths set";
                  state.mode = BAD;
                  break;
                }
                state.distbits = 6;
                state.distcode = state.distdyn;
                opts = { bits: state.distbits };
                ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                state.distbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid distances set";
                  state.mode = BAD;
                  break;
                }
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case LEN_:
                state.mode = LEN;
              /* falls through */
              case LEN:
                if (have >= 6 && left >= 258) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  inflate_fast(strm, _out);
                  put = strm.next_out;
                  output = strm.output;
                  left = strm.avail_out;
                  next = strm.next_in;
                  input = strm.input;
                  have = strm.avail_in;
                  hold = state.hold;
                  bits = state.bits;
                  if (state.mode === TYPE) {
                    state.back = -1;
                  }
                  break;
                }
                state.back = 0;
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_op && (here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                state.length = here_val;
                if (here_op === 0) {
                  state.mode = LIT;
                  break;
                }
                if (here_op & 32) {
                  state.back = -1;
                  state.mode = TYPE;
                  break;
                }
                if (here_op & 64) {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break;
                }
                state.extra = here_op & 15;
                state.mode = LENEXT;
              /* falls through */
              case LENEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                state.was = state.length;
                state.mode = DIST;
              /* falls through */
              case DIST:
                for (; ; ) {
                  here = state.distcode[hold & (1 << state.distbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                if (here_op & 64) {
                  strm.msg = "invalid distance code";
                  state.mode = BAD;
                  break;
                }
                state.offset = here_val;
                state.extra = here_op & 15;
                state.mode = DISTEXT;
              /* falls through */
              case DISTEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.offset += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
                state.mode = MATCH;
              /* falls through */
              case MATCH:
                if (left === 0) {
                  break inf_leave;
                }
                copy = _out - left;
                if (state.offset > copy) {
                  copy = state.offset - copy;
                  if (copy > state.whave) {
                    if (state.sane) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break;
                    }
                  }
                  if (copy > state.wnext) {
                    copy -= state.wnext;
                    from = state.wsize - copy;
                  } else {
                    from = state.wnext - copy;
                  }
                  if (copy > state.length) {
                    copy = state.length;
                  }
                  from_source = state.window;
                } else {
                  from_source = output;
                  from = put - state.offset;
                  copy = state.length;
                }
                if (copy > left) {
                  copy = left;
                }
                left -= copy;
                state.length -= copy;
                do {
                  output[put++] = from_source[from++];
                } while (--copy);
                if (state.length === 0) {
                  state.mode = LEN;
                }
                break;
              case LIT:
                if (left === 0) {
                  break inf_leave;
                }
                output[put++] = state.length;
                left--;
                state.mode = LEN;
                break;
              case CHECK:
                if (state.wrap) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold |= input[next++] << bits;
                    bits += 8;
                  }
                  _out -= left;
                  strm.total_out += _out;
                  state.total += _out;
                  if (_out) {
                    strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                    state.flags ? crc322(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
                  }
                  _out = left;
                  if ((state.flags ? hold : zswap32(hold)) !== state.check) {
                    strm.msg = "incorrect data check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = LENGTH;
              /* falls through */
              case LENGTH:
                if (state.wrap && state.flags) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (hold !== (state.total & 4294967295)) {
                    strm.msg = "incorrect length check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
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
          }
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
          if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
            state.mode = MEM;
            return Z_MEM_ERROR;
          }
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap && _out) {
          strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
          state.flags ? crc322(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
          ret = Z_BUF_ERROR;
        }
        return ret;
      }
      function inflateEnd(strm) {
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        var state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK;
      }
      function inflateGetHeader(strm, head) {
        var state;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if ((state.wrap & 2) === 0) {
          return Z_STREAM_ERROR;
        }
        state.head = head;
        head.done = false;
        return Z_OK;
      }
      function inflateSetDictionary(strm, dictionary) {
        var dictLength = dictionary.length;
        var state;
        var dictid;
        var ret;
        if (!strm || !strm.state) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT) {
          return Z_STREAM_ERROR;
        }
        if (state.mode === DICT) {
          dictid = 1;
          dictid = adler32(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR;
          }
        }
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
        state.havedict = 1;
        return Z_OK;
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

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/constants.js
  var require_constants = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/constants.js"(exports, module) {
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

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/gzheader.js
  var require_gzheader = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/zlib/gzheader.js"(exports, module) {
      "use strict";
      function GZheader() {
        this.text = 0;
        this.time = 0;
        this.xflags = 0;
        this.os = 0;
        this.extra = null;
        this.extra_len = 0;
        this.name = "";
        this.comment = "";
        this.hcrc = 0;
        this.done = false;
      }
      module.exports = GZheader;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/inflate.js
  var require_inflate2 = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/lib/inflate.js"(exports) {
      "use strict";
      var zlib_inflate = require_inflate();
      var utils = require_common();
      var strings = require_strings();
      var c = require_constants();
      var msg = require_messages();
      var ZStream = require_zstream();
      var GZheader = require_gzheader();
      var toString = Object.prototype.toString;
      function Inflate(options) {
        if (!(this instanceof Inflate)) return new Inflate(options);
        this.options = utils.assign({
          chunkSize: 16384,
          windowBits: 0,
          to: ""
        }, options || {});
        var opt = this.options;
        if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
          opt.windowBits = -opt.windowBits;
          if (opt.windowBits === 0) {
            opt.windowBits = -15;
          }
        }
        if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
          opt.windowBits += 32;
        }
        if (opt.windowBits > 15 && opt.windowBits < 48) {
          if ((opt.windowBits & 15) === 0) {
            opt.windowBits |= 15;
          }
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        var status = zlib_inflate.inflateInit2(
          this.strm,
          opt.windowBits
        );
        if (status !== c.Z_OK) {
          throw new Error(msg[status]);
        }
        this.header = new GZheader();
        zlib_inflate.inflateGetHeader(this.strm, this.header);
        if (opt.dictionary) {
          if (typeof opt.dictionary === "string") {
            opt.dictionary = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
            opt.dictionary = new Uint8Array(opt.dictionary);
          }
          if (opt.raw) {
            status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
            if (status !== c.Z_OK) {
              throw new Error(msg[status]);
            }
          }
        }
      }
      Inflate.prototype.push = function(data, mode) {
        var strm = this.strm;
        var chunkSize = this.options.chunkSize;
        var dictionary = this.options.dictionary;
        var status, _mode;
        var next_out_utf8, tail, utf8str;
        var allowBufError = false;
        if (this.ended) {
          return false;
        }
        _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
        if (typeof data === "string") {
          strm.input = strings.binstring2buf(data);
        } else if (toString.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        do {
          if (strm.avail_out === 0) {
            strm.output = new utils.Buf8(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
          if (status === c.Z_NEED_DICT && dictionary) {
            status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
          }
          if (status === c.Z_BUF_ERROR && allowBufError === true) {
            status = c.Z_OK;
            allowBufError = false;
          }
          if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
            this.onEnd(status);
            this.ended = true;
            return false;
          }
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
              if (this.options.to === "string") {
                next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                tail = strm.next_out - next_out_utf8;
                utf8str = strings.buf2string(strm.output, next_out_utf8);
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) {
                  utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
                }
                this.onData(utf8str);
              } else {
                this.onData(utils.shrinkBuf(strm.output, strm.next_out));
              }
            }
          }
          if (strm.avail_in === 0 && strm.avail_out === 0) {
            allowBufError = true;
          }
        } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
        if (status === c.Z_STREAM_END) {
          _mode = c.Z_FINISH;
        }
        if (_mode === c.Z_FINISH) {
          status = zlib_inflate.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === c.Z_OK;
        }
        if (_mode === c.Z_SYNC_FLUSH) {
          this.onEnd(c.Z_OK);
          strm.avail_out = 0;
          return true;
        }
        return true;
      };
      Inflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Inflate.prototype.onEnd = function(status) {
        if (status === c.Z_OK) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("");
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function inflate(input, options) {
        var inflator = new Inflate(options);
        inflator.push(input, true);
        if (inflator.err) {
          throw inflator.msg || msg[inflator.err];
        }
        return inflator.result;
      }
      function inflateRaw2(input, options) {
        options = options || {};
        options.raw = true;
        return inflate(input, options);
      }
      exports.Inflate = Inflate;
      exports.inflate = inflate;
      exports.inflateRaw = inflateRaw2;
      exports.ungzip = inflate;
    }
  });

  // node_modules/.pnpm/pako@1.0.11/node_modules/pako/index.js
  var require_pako = __commonJS({
    "node_modules/.pnpm/pako@1.0.11/node_modules/pako/index.js"(exports, module) {
      "use strict";
      var assign = require_common().assign;
      var deflate = require_deflate2();
      var inflate = require_inflate2();
      var constants = require_constants();
      var pako = {};
      assign(pako, deflate, inflate, constants);
      module.exports = pako;
    }
  });

  // node_modules/.pnpm/upng-js@2.1.0/node_modules/upng-js/UPNG.js
  var require_UPNG = __commonJS({
    "node_modules/.pnpm/upng-js@2.1.0/node_modules/upng-js/UPNG.js"(exports, module) {
      (function() {
        var UPNG3 = {};
        var pako;
        if (typeof module == "object") {
          module.exports = UPNG3;
        } else {
          window.UPNG = UPNG3;
        }
        if (typeof __require == "function") {
          pako = require_pako();
        } else {
          pako = window.pako;
        }
        function log() {
          if (typeof process == "undefined" || true) console.log.apply(console, arguments);
        }
        (function(UPNG4, pako2) {
          UPNG4.toRGBA8 = function(out) {
            var w = out.width, h = out.height;
            if (out.tabs.acTL == null) return [UPNG4.toRGBA8.decodeImage(out.data, w, h, out).buffer];
            var frms = [];
            if (out.frames[0].data == null) out.frames[0].data = out.data;
            var img, empty = new Uint8Array(w * h * 4);
            for (var i = 0; i < out.frames.length; i++) {
              var frm = out.frames[i];
              var fx = frm.rect.x, fy = frm.rect.y, fw = frm.rect.width, fh = frm.rect.height;
              var fdata = UPNG4.toRGBA8.decodeImage(frm.data, fw, fh, out);
              if (i == 0) img = fdata;
              else if (frm.blend == 0) UPNG4._copyTile(fdata, fw, fh, img, w, h, fx, fy, 0);
              else if (frm.blend == 1) UPNG4._copyTile(fdata, fw, fh, img, w, h, fx, fy, 1);
              frms.push(img.buffer);
              img = img.slice(0);
              if (frm.dispose == 0) {
              } else if (frm.dispose == 1) UPNG4._copyTile(empty, fw, fh, img, w, h, fx, fy, 0);
              else if (frm.dispose == 2) {
                var pi = i - 1;
                while (out.frames[pi].dispose == 2) pi--;
                img = new Uint8Array(frms[pi]).slice(0);
              }
            }
            return frms;
          };
          UPNG4.toRGBA8.decodeImage = function(data, w, h, out) {
            var area = w * h, bpp = UPNG4.decode._getBPP(out);
            var bpl = Math.ceil(w * bpp / 8);
            var bf = new Uint8Array(area * 4), bf32 = new Uint32Array(bf.buffer);
            var ctype = out.ctype, depth = out.depth;
            var rs = UPNG4._bin.readUshort;
            if (ctype == 6) {
              var qarea = area << 2;
              if (depth == 8) for (var i = 0; i < qarea; i++) {
                bf[i] = data[i];
              }
              if (depth == 16) for (var i = 0; i < qarea; i++) {
                bf[i] = data[i << 1];
              }
            } else if (ctype == 2) {
              var ts = out.tabs["tRNS"], tr = -1, tg = -1, tb = -1;
              if (ts) {
                tr = ts[0];
                tg = ts[1];
                tb = ts[2];
              }
              if (depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2, ti = i * 3;
                bf[qi] = data[ti];
                bf[qi + 1] = data[ti + 1];
                bf[qi + 2] = data[ti + 2];
                bf[qi + 3] = 255;
                if (tr != -1 && data[ti] == tr && data[ti + 1] == tg && data[ti + 2] == tb) bf[qi + 3] = 0;
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var qi = i << 2, ti = i * 6;
                bf[qi] = data[ti];
                bf[qi + 1] = data[ti + 2];
                bf[qi + 2] = data[ti + 4];
                bf[qi + 3] = 255;
                if (tr != -1 && rs(data, ti) == tr && rs(data, ti + 2) == tg && rs(data, ti + 4) == tb) bf[qi + 3] = 0;
              }
            } else if (ctype == 3) {
              var p = out.tabs["PLTE"], ap = out.tabs["tRNS"], tl = ap ? ap.length : 0;
              if (depth == 1) for (var y = 0; y < h; y++) {
                var s0 = y * bpl, t0 = y * w;
                for (var i = 0; i < w; i++) {
                  var qi = t0 + i << 2, j = data[s0 + (i >> 3)] >> 7 - ((i & 7) << 0) & 1, cj = 3 * j;
                  bf[qi] = p[cj];
                  bf[qi + 1] = p[cj + 1];
                  bf[qi + 2] = p[cj + 2];
                  bf[qi + 3] = j < tl ? ap[j] : 255;
                }
              }
              if (depth == 2) for (var y = 0; y < h; y++) {
                var s0 = y * bpl, t0 = y * w;
                for (var i = 0; i < w; i++) {
                  var qi = t0 + i << 2, j = data[s0 + (i >> 2)] >> 6 - ((i & 3) << 1) & 3, cj = 3 * j;
                  bf[qi] = p[cj];
                  bf[qi + 1] = p[cj + 1];
                  bf[qi + 2] = p[cj + 2];
                  bf[qi + 3] = j < tl ? ap[j] : 255;
                }
              }
              if (depth == 4) for (var y = 0; y < h; y++) {
                var s0 = y * bpl, t0 = y * w;
                for (var i = 0; i < w; i++) {
                  var qi = t0 + i << 2, j = data[s0 + (i >> 1)] >> 4 - ((i & 1) << 2) & 15, cj = 3 * j;
                  bf[qi] = p[cj];
                  bf[qi + 1] = p[cj + 1];
                  bf[qi + 2] = p[cj + 2];
                  bf[qi + 3] = j < tl ? ap[j] : 255;
                }
              }
              if (depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2, j = data[i], cj = 3 * j;
                bf[qi] = p[cj];
                bf[qi + 1] = p[cj + 1];
                bf[qi + 2] = p[cj + 2];
                bf[qi + 3] = j < tl ? ap[j] : 255;
              }
            } else if (ctype == 4) {
              if (depth == 8) for (var i = 0; i < area; i++) {
                var qi = i << 2, di = i << 1, gr = data[di];
                bf[qi] = gr;
                bf[qi + 1] = gr;
                bf[qi + 2] = gr;
                bf[qi + 3] = data[di + 1];
              }
              if (depth == 16) for (var i = 0; i < area; i++) {
                var qi = i << 2, di = i << 2, gr = data[di];
                bf[qi] = gr;
                bf[qi + 1] = gr;
                bf[qi + 2] = gr;
                bf[qi + 3] = data[di + 2];
              }
            } else if (ctype == 0) {
              var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
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
          };
          UPNG4.decode = function(buff) {
            var data = new Uint8Array(buff), offset = 8, bin = UPNG4._bin, rUs = bin.readUshort, rUi = bin.readUint;
            var out = { tabs: {}, frames: [] };
            var dd = new Uint8Array(data.length), doff = 0;
            var fd, foff = 0;
            var mgck = [137, 80, 78, 71, 13, 10, 26, 10];
            for (var i = 0; i < 8; i++) if (data[i] != mgck[i]) throw "The input is not a PNG file!";
            while (offset < data.length) {
              var len = bin.readUint(data, offset);
              offset += 4;
              var type = bin.readASCII(data, offset, 4);
              offset += 4;
              if (type == "IHDR") {
                UPNG4.decode._IHDR(data, offset, out);
              } else if (type == "IDAT") {
                for (var i = 0; i < len; i++) dd[doff + i] = data[offset + i];
                doff += len;
              } else if (type == "acTL") {
                out.tabs[type] = { num_frames: rUi(data, offset), num_plays: rUi(data, offset + 4) };
                fd = new Uint8Array(data.length);
              } else if (type == "fcTL") {
                if (foff != 0) {
                  var fr = out.frames[out.frames.length - 1];
                  fr.data = UPNG4.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
                  foff = 0;
                }
                var rct = { x: rUi(data, offset + 12), y: rUi(data, offset + 16), width: rUi(data, offset + 4), height: rUi(data, offset + 8) };
                var del = rUs(data, offset + 22);
                del = rUs(data, offset + 20) / (del == 0 ? 100 : del);
                var frm = { rect: rct, delay: Math.round(del * 1e3), dispose: data[offset + 24], blend: data[offset + 25] };
                out.frames.push(frm);
              } else if (type == "fdAT") {
                for (var i = 0; i < len - 4; i++) fd[foff + i] = data[offset + i + 4];
                foff += len - 4;
              } else if (type == "pHYs") {
                out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset + 4), data[offset + 8]];
              } else if (type == "cHRM") {
                out.tabs[type] = [];
                for (var i = 0; i < 8; i++) out.tabs[type].push(bin.readUint(data, offset + i * 4));
              } else if (type == "tEXt") {
                if (out.tabs[type] == null) out.tabs[type] = {};
                var nz = bin.nextZero(data, offset);
                var keyw = bin.readASCII(data, offset, nz - offset);
                var text = bin.readASCII(data, nz + 1, offset + len - nz - 1);
                out.tabs[type][keyw] = text;
              } else if (type == "iTXt") {
                if (out.tabs[type] == null) out.tabs[type] = {};
                var nz = 0, off = offset;
                nz = bin.nextZero(data, off);
                var keyw = bin.readASCII(data, off, nz - off);
                off = nz + 1;
                var cflag = data[off], cmeth = data[off + 1];
                off += 2;
                nz = bin.nextZero(data, off);
                var ltag = bin.readASCII(data, off, nz - off);
                off = nz + 1;
                nz = bin.nextZero(data, off);
                var tkeyw = bin.readUTF8(data, off, nz - off);
                off = nz + 1;
                var text = bin.readUTF8(data, off, len - (off - offset));
                out.tabs[type][keyw] = text;
              } else if (type == "PLTE") {
                out.tabs[type] = bin.readBytes(data, offset, len);
              } else if (type == "hIST") {
                var pl = out.tabs["PLTE"].length / 3;
                out.tabs[type] = [];
                for (var i = 0; i < pl; i++) out.tabs[type].push(rUs(data, offset + i * 2));
              } else if (type == "tRNS") {
                if (out.ctype == 3) out.tabs[type] = bin.readBytes(data, offset, len);
                else if (out.ctype == 0) out.tabs[type] = rUs(data, offset);
                else if (out.ctype == 2) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];
              } else if (type == "gAMA") out.tabs[type] = bin.readUint(data, offset) / 1e5;
              else if (type == "sRGB") out.tabs[type] = data[offset];
              else if (type == "bKGD") {
                if (out.ctype == 0 || out.ctype == 4) out.tabs[type] = [rUs(data, offset)];
                else if (out.ctype == 2 || out.ctype == 6) out.tabs[type] = [rUs(data, offset), rUs(data, offset + 2), rUs(data, offset + 4)];
                else if (out.ctype == 3) out.tabs[type] = data[offset];
              } else if (type == "IEND") {
                if (foff != 0) {
                  var fr = out.frames[out.frames.length - 1];
                  fr.data = UPNG4.decode._decompress(out, fd.slice(0, foff), fr.rect.width, fr.rect.height);
                  foff = 0;
                }
                out.data = UPNG4.decode._decompress(out, dd, out.width, out.height);
                break;
              }
              offset += len;
              var crc = bin.readUint(data, offset);
              offset += 4;
            }
            delete out.compress;
            delete out.interlace;
            delete out.filter;
            return out;
          };
          UPNG4.decode._decompress = function(out, dd, w, h) {
            if (out.compress == 0) dd = UPNG4.decode._inflate(dd);
            if (out.interlace == 0) dd = UPNG4.decode._filterZero(dd, out, 0, w, h);
            else if (out.interlace == 1) dd = UPNG4.decode._readInterlace(dd, out);
            return dd;
          };
          UPNG4.decode._inflate = function(data) {
            return pako2["inflate"](data);
          };
          UPNG4.decode._readInterlace = function(data, out) {
            var w = out.width, h = out.height;
            var bpp = UPNG4.decode._getBPP(out), cbpp = bpp >> 3, bpl = Math.ceil(w * bpp / 8);
            var img = new Uint8Array(h * bpl);
            var di = 0;
            var starting_row = [0, 0, 4, 0, 2, 0, 1];
            var starting_col = [0, 4, 0, 2, 0, 1, 0];
            var row_increment = [8, 8, 8, 4, 4, 2, 2];
            var col_increment = [8, 8, 4, 4, 2, 2, 1];
            var pass = 0;
            while (pass < 7) {
              var ri = row_increment[pass], ci = col_increment[pass];
              var sw = 0, sh = 0;
              var cr = starting_row[pass];
              while (cr < h) {
                cr += ri;
                sh++;
              }
              var cc = starting_col[pass];
              while (cc < w) {
                cc += ci;
                sw++;
              }
              var bpll = Math.ceil(sw * bpp / 8);
              UPNG4.decode._filterZero(data, out, di, sw, sh);
              var y = 0, row = starting_row[pass];
              while (row < h) {
                var col = starting_col[pass];
                var cdi = di + y * bpll << 3;
                while (col < w) {
                  if (bpp == 1) {
                    var val = data[cdi >> 3];
                    val = val >> 7 - (cdi & 7) & 1;
                    img[row * bpl + (col >> 3)] |= val << 7 - ((col & 3) << 0);
                  }
                  if (bpp == 2) {
                    var val = data[cdi >> 3];
                    val = val >> 6 - (cdi & 7) & 3;
                    img[row * bpl + (col >> 2)] |= val << 6 - ((col & 3) << 1);
                  }
                  if (bpp == 4) {
                    var val = data[cdi >> 3];
                    val = val >> 4 - (cdi & 7) & 15;
                    img[row * bpl + (col >> 1)] |= val << 4 - ((col & 1) << 2);
                  }
                  if (bpp >= 8) {
                    var ii = row * bpl + col * cbpp;
                    for (var j = 0; j < cbpp; j++) img[ii + j] = data[(cdi >> 3) + j];
                  }
                  cdi += bpp;
                  col += ci;
                }
                y++;
                row += ri;
              }
              if (sw * sh != 0) di += sh * (1 + bpll);
              pass = pass + 1;
            }
            return img;
          };
          UPNG4.decode._getBPP = function(out) {
            var noc = [1, null, 3, 1, 2, null, 4][out.ctype];
            return noc * out.depth;
          };
          UPNG4.decode._filterZero = function(data, out, off, w, h) {
            var bpp = UPNG4.decode._getBPP(out), bpl = Math.ceil(w * bpp / 8), paeth = UPNG4.decode._paeth;
            bpp = Math.ceil(bpp / 8);
            for (var y = 0; y < h; y++) {
              var i = off + y * bpl, di = i + y + 1;
              var type = data[di - 1];
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
                if (type == 2) {
                  for (var x = 0; x < bpl; x++) data[i + x] = data[di + x] + data[i + x - bpl] & 255;
                }
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
          };
          UPNG4.decode._paeth = function(a, b, c) {
            var p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
            if (pa <= pb && pa <= pc) return a;
            else if (pb <= pc) return b;
            return c;
          };
          UPNG4.decode._IHDR = function(data, offset, out) {
            var bin = UPNG4._bin;
            out.width = bin.readUint(data, offset);
            offset += 4;
            out.height = bin.readUint(data, offset);
            offset += 4;
            out.depth = data[offset];
            offset++;
            out.ctype = data[offset];
            offset++;
            out.compress = data[offset];
            offset++;
            out.filter = data[offset];
            offset++;
            out.interlace = data[offset];
            offset++;
          };
          UPNG4._bin = {
            nextZero: function(data, p) {
              while (data[p] != 0) p++;
              return p;
            },
            readUshort: function(buff, p) {
              return buff[p] << 8 | buff[p + 1];
            },
            writeUshort: function(buff, p, n) {
              buff[p] = n >> 8 & 255;
              buff[p + 1] = n & 255;
            },
            readUint: function(buff, p) {
              return buff[p] * (256 * 256 * 256) + (buff[p + 1] << 16 | buff[p + 2] << 8 | buff[p + 3]);
            },
            writeUint: function(buff, p, n) {
              buff[p] = n >> 24 & 255;
              buff[p + 1] = n >> 16 & 255;
              buff[p + 2] = n >> 8 & 255;
              buff[p + 3] = n & 255;
            },
            readASCII: function(buff, p, l) {
              var s = "";
              for (var i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);
              return s;
            },
            writeASCII: function(data, p, s) {
              for (var i = 0; i < s.length; i++) data[p + i] = s.charCodeAt(i);
            },
            readBytes: function(buff, p, l) {
              var arr = [];
              for (var i = 0; i < l; i++) arr.push(buff[p + i]);
              return arr;
            },
            pad: function(n) {
              return n.length < 2 ? "0" + n : n;
            },
            readUTF8: function(buff, p, l) {
              var s = "", ns2;
              for (var i = 0; i < l; i++) s += "%" + UPNG4._bin.pad(buff[p + i].toString(16));
              try {
                ns2 = decodeURIComponent(s);
              } catch (e) {
                return UPNG4._bin.readASCII(buff, p, l);
              }
              return ns2;
            }
          };
          UPNG4._copyTile = function(sb, sw, sh, tb, tw, th, xoff, yoff, mode) {
            var w = Math.min(sw, tw), h = Math.min(sh, th);
            var si = 0, ti = 0;
            for (var y = 0; y < h; y++)
              for (var x = 0; x < w; x++) {
                if (xoff >= 0 && yoff >= 0) {
                  si = y * sw + x << 2;
                  ti = (yoff + y) * tw + xoff + x << 2;
                } else {
                  si = (-yoff + y) * sw - xoff + x << 2;
                  ti = y * tw + x << 2;
                }
                if (mode == 0) {
                  tb[ti] = sb[si];
                  tb[ti + 1] = sb[si + 1];
                  tb[ti + 2] = sb[si + 2];
                  tb[ti + 3] = sb[si + 3];
                } else if (mode == 1) {
                  var fa = sb[si + 3] * (1 / 255), fr = sb[si] * fa, fg = sb[si + 1] * fa, fb = sb[si + 2] * fa;
                  var ba = tb[ti + 3] * (1 / 255), br = tb[ti] * ba, bg = tb[ti + 1] * ba, bb = tb[ti + 2] * ba;
                  var ifa = 1 - fa, oa = fa + ba * ifa, ioa = oa == 0 ? 0 : 1 / oa;
                  tb[ti + 3] = 255 * oa;
                  tb[ti + 0] = (fr + br * ifa) * ioa;
                  tb[ti + 1] = (fg + bg * ifa) * ioa;
                  tb[ti + 2] = (fb + bb * ifa) * ioa;
                } else if (mode == 2) {
                  var fa = sb[si + 3], fr = sb[si], fg = sb[si + 1], fb = sb[si + 2];
                  var ba = tb[ti + 3], br = tb[ti], bg = tb[ti + 1], bb = tb[ti + 2];
                  if (fa == ba && fr == br && fg == bg && fb == bb) {
                    tb[ti] = 0;
                    tb[ti + 1] = 0;
                    tb[ti + 2] = 0;
                    tb[ti + 3] = 0;
                  } else {
                    tb[ti] = fr;
                    tb[ti + 1] = fg;
                    tb[ti + 2] = fb;
                    tb[ti + 3] = fa;
                  }
                } else if (mode == 3) {
                  var fa = sb[si + 3], fr = sb[si], fg = sb[si + 1], fb = sb[si + 2];
                  var ba = tb[ti + 3], br = tb[ti], bg = tb[ti + 1], bb = tb[ti + 2];
                  if (fa == ba && fr == br && fg == bg && fb == bb) continue;
                  if (fa < 220 && ba > 20) return false;
                }
              }
            return true;
          };
          UPNG4.encode = function(bufs, w, h, ps, dels, forbidPlte) {
            if (ps == null) ps = 0;
            if (forbidPlte == null) forbidPlte = false;
            var data = new Uint8Array(bufs[0].byteLength * bufs.length + 100);
            var wr = [137, 80, 78, 71, 13, 10, 26, 10];
            for (var i = 0; i < 8; i++) data[i] = wr[i];
            var offset = 8, bin = UPNG4._bin, crc = UPNG4.crc.crc, wUi = bin.writeUint, wUs = bin.writeUshort, wAs = bin.writeASCII;
            var nimg = UPNG4.encode.compressPNG(bufs, w, h, ps, forbidPlte);
            wUi(data, offset, 13);
            offset += 4;
            wAs(data, offset, "IHDR");
            offset += 4;
            wUi(data, offset, w);
            offset += 4;
            wUi(data, offset, h);
            offset += 4;
            data[offset] = nimg.depth;
            offset++;
            data[offset] = nimg.ctype;
            offset++;
            data[offset] = 0;
            offset++;
            data[offset] = 0;
            offset++;
            data[offset] = 0;
            offset++;
            wUi(data, offset, crc(data, offset - 17, 17));
            offset += 4;
            wUi(data, offset, 1);
            offset += 4;
            wAs(data, offset, "sRGB");
            offset += 4;
            data[offset] = 1;
            offset++;
            wUi(data, offset, crc(data, offset - 5, 5));
            offset += 4;
            var anim = bufs.length > 1;
            if (anim) {
              wUi(data, offset, 8);
              offset += 4;
              wAs(data, offset, "acTL");
              offset += 4;
              wUi(data, offset, bufs.length);
              offset += 4;
              wUi(data, offset, 0);
              offset += 4;
              wUi(data, offset, crc(data, offset - 12, 12));
              offset += 4;
            }
            if (nimg.ctype == 3) {
              var dl = nimg.plte.length;
              wUi(data, offset, dl * 3);
              offset += 4;
              wAs(data, offset, "PLTE");
              offset += 4;
              for (var i = 0; i < dl; i++) {
                var ti = i * 3, c = nimg.plte[i], r = c & 255, g = c >> 8 & 255, b = c >> 16 & 255;
                data[offset + ti + 0] = r;
                data[offset + ti + 1] = g;
                data[offset + ti + 2] = b;
              }
              offset += dl * 3;
              wUi(data, offset, crc(data, offset - dl * 3 - 4, dl * 3 + 4));
              offset += 4;
              if (nimg.gotAlpha) {
                wUi(data, offset, dl);
                offset += 4;
                wAs(data, offset, "tRNS");
                offset += 4;
                for (var i = 0; i < dl; i++) data[offset + i] = nimg.plte[i] >> 24 & 255;
                offset += dl;
                wUi(data, offset, crc(data, offset - dl - 4, dl + 4));
                offset += 4;
              }
            }
            var fi = 0;
            for (var j = 0; j < nimg.frames.length; j++) {
              var fr = nimg.frames[j];
              if (anim) {
                wUi(data, offset, 26);
                offset += 4;
                wAs(data, offset, "fcTL");
                offset += 4;
                wUi(data, offset, fi++);
                offset += 4;
                wUi(data, offset, fr.rect.width);
                offset += 4;
                wUi(data, offset, fr.rect.height);
                offset += 4;
                wUi(data, offset, fr.rect.x);
                offset += 4;
                wUi(data, offset, fr.rect.y);
                offset += 4;
                wUs(data, offset, dels[j]);
                offset += 2;
                wUs(data, offset, 1e3);
                offset += 2;
                data[offset] = fr.dispose;
                offset++;
                data[offset] = fr.blend;
                offset++;
                wUi(data, offset, crc(data, offset - 30, 30));
                offset += 4;
              }
              var imgd = fr.cimg, dl = imgd.length;
              wUi(data, offset, dl + (j == 0 ? 0 : 4));
              offset += 4;
              var ioff = offset;
              wAs(data, offset, j == 0 ? "IDAT" : "fdAT");
              offset += 4;
              if (j != 0) {
                wUi(data, offset, fi++);
                offset += 4;
              }
              for (var i = 0; i < dl; i++) data[offset + i] = imgd[i];
              offset += dl;
              wUi(data, offset, crc(data, ioff, offset - ioff));
              offset += 4;
            }
            wUi(data, offset, 0);
            offset += 4;
            wAs(data, offset, "IEND");
            offset += 4;
            wUi(data, offset, crc(data, offset - 4, 4));
            offset += 4;
            return data.buffer.slice(0, offset);
          };
          UPNG4.encode.compressPNG = function(bufs, w, h, ps, forbidPlte) {
            var out = UPNG4.encode.compress(bufs, w, h, ps, false, forbidPlte);
            for (var i = 0; i < bufs.length; i++) {
              var frm = out.frames[i], nw = frm.rect.width, nh = frm.rect.height, bpl = frm.bpl, bpp = frm.bpp;
              var fdata = new Uint8Array(nh * bpl + nh);
              frm.cimg = UPNG4.encode._filterZero(frm.img, nh, bpp, bpl, fdata);
            }
            return out;
          };
          UPNG4.encode.compress = function(bufs, w, h, ps, forGIF, forbidPlte) {
            if (forbidPlte == null) forbidPlte = false;
            var ctype = 6, depth = 8, bpp = 4, alphaAnd = 255;
            for (var j = 0; j < bufs.length; j++) {
              var img = new Uint8Array(bufs[j]), ilen = img.length;
              for (var i = 0; i < ilen; i += 4) alphaAnd &= img[i + 3];
            }
            var gotAlpha = alphaAnd != 255;
            var cmap = {}, plte = [];
            if (bufs.length != 0) {
              cmap[0] = 0;
              plte.push(0);
              if (ps != 0) ps--;
            }
            if (ps != 0) {
              var qres = UPNG4.quantize(bufs, ps, forGIF);
              bufs = qres.bufs;
              for (var i = 0; i < qres.plte.length; i++) {
                var c = qres.plte[i].est.rgba;
                if (cmap[c] == null) {
                  cmap[c] = plte.length;
                  plte.push(c);
                }
              }
            } else {
              for (var j = 0; j < bufs.length; j++) {
                var img32 = new Uint32Array(bufs[j]), ilen = img32.length;
                for (var i = 0; i < ilen; i++) {
                  var c = img32[i];
                  if ((i < w || c != img32[i - 1] && c != img32[i - w]) && cmap[c] == null) {
                    cmap[c] = plte.length;
                    plte.push(c);
                    if (plte.length >= 300) break;
                  }
                }
              }
            }
            var brute = gotAlpha ? forGIF : false;
            var cc = plte.length;
            if (cc <= 256 && forbidPlte == false) {
              if (cc <= 2) depth = 1;
              else if (cc <= 4) depth = 2;
              else if (cc <= 16) depth = 4;
              else depth = 8;
              if (forGIF) depth = 8;
              gotAlpha = true;
            }
            var frms = [];
            for (var j = 0; j < bufs.length; j++) {
              var cimg = new Uint8Array(bufs[j]), cimg32 = new Uint32Array(cimg.buffer);
              var nx = 0, ny = 0, nw = w, nh = h, blend = 0;
              if (j != 0 && !brute) {
                var tlim = forGIF || j == 1 || frms[frms.length - 2].dispose == 2 ? 1 : 2, tstp = 0, tarea = 1e9;
                for (var it = 0; it < tlim; it++) {
                  var pimg = new Uint8Array(bufs[j - 1 - it]), p32 = new Uint32Array(bufs[j - 1 - it]);
                  var mix = w, miy = h, max = -1, may = -1;
                  for (var y = 0; y < h; y++) for (var x = 0; x < w; x++) {
                    var i = y * w + x;
                    if (cimg32[i] != p32[i]) {
                      if (x < mix) mix = x;
                      if (x > max) max = x;
                      if (y < miy) miy = y;
                      if (y > may) may = y;
                    }
                  }
                  var sarea = max == -1 ? 1 : (max - mix + 1) * (may - miy + 1);
                  if (sarea < tarea) {
                    tarea = sarea;
                    tstp = it;
                    if (max == -1) {
                      nx = ny = 0;
                      nw = nh = 1;
                    } else {
                      nx = mix;
                      ny = miy;
                      nw = max - mix + 1;
                      nh = may - miy + 1;
                    }
                  }
                }
                var pimg = new Uint8Array(bufs[j - 1 - tstp]);
                if (tstp == 1) frms[frms.length - 1].dispose = 2;
                var nimg = new Uint8Array(nw * nh * 4), nimg32 = new Uint32Array(nimg.buffer);
                UPNG4._copyTile(pimg, w, h, nimg, nw, nh, -nx, -ny, 0);
                if (UPNG4._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 3)) {
                  UPNG4._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 2);
                  blend = 1;
                } else {
                  UPNG4._copyTile(cimg, w, h, nimg, nw, nh, -nx, -ny, 0);
                  blend = 0;
                }
                cimg = nimg;
                cimg32 = new Uint32Array(cimg.buffer);
              }
              var bpl = 4 * nw;
              if (cc <= 256 && forbidPlte == false) {
                bpl = Math.ceil(depth * nw / 8);
                var nimg = new Uint8Array(bpl * nh);
                for (var y = 0; y < nh; y++) {
                  var i = y * bpl, ii = y * nw;
                  if (depth == 8) for (var x = 0; x < nw; x++) nimg[i + x] = cmap[cimg32[ii + x]];
                  else if (depth == 4) for (var x = 0; x < nw; x++) nimg[i + (x >> 1)] |= cmap[cimg32[ii + x]] << 4 - (x & 1) * 4;
                  else if (depth == 2) for (var x = 0; x < nw; x++) nimg[i + (x >> 2)] |= cmap[cimg32[ii + x]] << 6 - (x & 3) * 2;
                  else if (depth == 1) for (var x = 0; x < nw; x++) nimg[i + (x >> 3)] |= cmap[cimg32[ii + x]] << 7 - (x & 7) * 1;
                }
                cimg = nimg;
                ctype = 3;
                bpp = 1;
              } else if (gotAlpha == false && bufs.length == 1) {
                var nimg = new Uint8Array(nw * nh * 3), area = nw * nh;
                for (var i = 0; i < area; i++) {
                  var ti = i * 3, qi = i * 4;
                  nimg[ti] = cimg[qi];
                  nimg[ti + 1] = cimg[qi + 1];
                  nimg[ti + 2] = cimg[qi + 2];
                }
                cimg = nimg;
                ctype = 2;
                bpp = 3;
                bpl = 3 * nw;
              }
              frms.push({ rect: { x: nx, y: ny, width: nw, height: nh }, img: cimg, bpl, bpp, blend, dispose: brute ? 1 : 0 });
            }
            return { ctype, depth, plte, gotAlpha, frames: frms };
          };
          UPNG4.encode._filterZero = function(img, h, bpp, bpl, data) {
            var fls = [];
            for (var t = 0; t < 5; t++) {
              if (h * bpl > 5e5 && (t == 2 || t == 3 || t == 4)) continue;
              for (var y = 0; y < h; y++) UPNG4.encode._filterLine(data, img, y, bpl, bpp, t);
              fls.push(pako2["deflate"](data));
              if (bpp == 1) break;
            }
            var ti, tsize = 1e9;
            for (var i = 0; i < fls.length; i++) if (fls[i].length < tsize) {
              ti = i;
              tsize = fls[i].length;
            }
            return fls[ti];
          };
          UPNG4.encode._filterLine = function(data, img, y, bpl, bpp, type) {
            var i = y * bpl, di = i + y, paeth = UPNG4.decode._paeth;
            data[di] = type;
            di++;
            if (type == 0) for (var x = 0; x < bpl; x++) data[di + x] = img[i + x];
            else if (type == 1) {
              for (var x = 0; x < bpp; x++) data[di + x] = img[i + x];
              for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - img[i + x - bpp] + 256 & 255;
            } else if (y == 0) {
              for (var x = 0; x < bpp; x++) data[di + x] = img[i + x];
              if (type == 2) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x];
              if (type == 3) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - (img[i + x - bpp] >> 1) + 256 & 255;
              if (type == 4) for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] - paeth(img[i + x - bpp], 0, 0) + 256 & 255;
            } else {
              if (type == 2) {
                for (var x = 0; x < bpl; x++) data[di + x] = img[i + x] + 256 - img[i + x - bpl] & 255;
              }
              if (type == 3) {
                for (var x = 0; x < bpp; x++) data[di + x] = img[i + x] + 256 - (img[i + x - bpl] >> 1) & 255;
                for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] + 256 - (img[i + x - bpl] + img[i + x - bpp] >> 1) & 255;
              }
              if (type == 4) {
                for (var x = 0; x < bpp; x++) data[di + x] = img[i + x] + 256 - paeth(0, img[i + x - bpl], 0) & 255;
                for (var x = bpp; x < bpl; x++) data[di + x] = img[i + x] + 256 - paeth(img[i + x - bpp], img[i + x - bpl], img[i + x - bpp - bpl]) & 255;
              }
            }
          };
          UPNG4.crc = {
            table: (function() {
              var tab = new Uint32Array(256);
              for (var n = 0; n < 256; n++) {
                var c = n;
                for (var k = 0; k < 8; k++) {
                  if (c & 1) c = 3988292384 ^ c >>> 1;
                  else c = c >>> 1;
                }
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
          };
          UPNG4.quantize = function(bufs, ps, roundAlpha) {
            var imgs = [], totl = 0;
            for (var i = 0; i < bufs.length; i++) {
              imgs.push(UPNG4.encode.alphaMul(new Uint8Array(bufs[i]), roundAlpha));
              totl += bufs[i].byteLength;
            }
            var nimg = new Uint8Array(totl), nimg32 = new Uint32Array(nimg.buffer), noff = 0;
            for (var i = 0; i < imgs.length; i++) {
              var img = imgs[i], il = img.length;
              for (var j = 0; j < il; j++) nimg[noff + j] = img[j];
              noff += il;
            }
            var root = { i0: 0, i1: nimg.length, bst: null, est: null, tdst: 0, left: null, right: null };
            root.bst = UPNG4.quantize.stats(nimg, root.i0, root.i1);
            root.est = UPNG4.quantize.estats(root.bst);
            var leafs = [root];
            while (leafs.length < ps) {
              var maxL = 0, mi = 0;
              for (var i = 0; i < leafs.length; i++) if (leafs[i].est.L > maxL) {
                maxL = leafs[i].est.L;
                mi = i;
              }
              if (maxL < 1e-3) break;
              var node = leafs[mi];
              var s0 = UPNG4.quantize.splitPixels(nimg, nimg32, node.i0, node.i1, node.est.e, node.est.eMq255);
              var ln = { i0: node.i0, i1: s0, bst: null, est: null, tdst: 0, left: null, right: null };
              ln.bst = UPNG4.quantize.stats(nimg, ln.i0, ln.i1);
              ln.est = UPNG4.quantize.estats(ln.bst);
              var rn = { i0: s0, i1: node.i1, bst: null, est: null, tdst: 0, left: null, right: null };
              rn.bst = { R: [], m: [], N: node.bst.N - ln.bst.N };
              for (var i = 0; i < 16; i++) rn.bst.R[i] = node.bst.R[i] - ln.bst.R[i];
              for (var i = 0; i < 4; i++) rn.bst.m[i] = node.bst.m[i] - ln.bst.m[i];
              rn.est = UPNG4.quantize.estats(rn.bst);
              node.left = ln;
              node.right = rn;
              leafs[mi] = ln;
              leafs.push(rn);
            }
            leafs.sort(function(a2, b2) {
              return b2.bst.N - a2.bst.N;
            });
            for (var ii = 0; ii < imgs.length; ii++) {
              var planeDst = UPNG4.quantize.planeDst;
              var sb = new Uint8Array(imgs[ii].buffer), tb = new Uint32Array(imgs[ii].buffer), len = sb.length;
              var stack = [], si = 0;
              for (var i = 0; i < len; i += 4) {
                var r = sb[i] * (1 / 255), g = sb[i + 1] * (1 / 255), b = sb[i + 2] * (1 / 255), a = sb[i + 3] * (1 / 255);
                var nd = root;
                while (nd.left) nd = planeDst(nd.est, r, g, b, a) <= 0 ? nd.left : nd.right;
                tb[i >> 2] = nd.est.rgba;
              }
              imgs[ii] = tb.buffer;
            }
            return { bufs: imgs, plte: leafs };
          };
          UPNG4.quantize.getNearest = function(nd, r, g, b, a) {
            if (nd.left == null) {
              nd.tdst = UPNG4.quantize.dist(nd.est.q, r, g, b, a);
              return nd;
            }
            var planeDst = UPNG4.quantize.planeDst(nd.est, r, g, b, a);
            var node0 = nd.left, node1 = nd.right;
            if (planeDst > 0) {
              node0 = nd.right;
              node1 = nd.left;
            }
            var ln = UPNG4.quantize.getNearest(node0, r, g, b, a);
            if (ln.tdst <= planeDst * planeDst) return ln;
            var rn = UPNG4.quantize.getNearest(node1, r, g, b, a);
            return rn.tdst < ln.tdst ? rn : ln;
          };
          UPNG4.quantize.planeDst = function(est, r, g, b, a) {
            var e = est.e;
            return e[0] * r + e[1] * g + e[2] * b + e[3] * a - est.eMq;
          };
          UPNG4.quantize.dist = function(q, r, g, b, a) {
            var d0 = r - q[0], d1 = g - q[1], d2 = b - q[2], d3 = a - q[3];
            return d0 * d0 + d1 * d1 + d2 * d2 + d3 * d3;
          };
          UPNG4.quantize.splitPixels = function(nimg, nimg32, i0, i1, e, eMq) {
            var vecDot = UPNG4.quantize.vecDot;
            i1 -= 4;
            var shfs = 0;
            while (i0 < i1) {
              while (vecDot(nimg, i0, e) <= eMq) i0 += 4;
              while (vecDot(nimg, i1, e) > eMq) i1 -= 4;
              if (i0 >= i1) break;
              var t = nimg32[i0 >> 2];
              nimg32[i0 >> 2] = nimg32[i1 >> 2];
              nimg32[i1 >> 2] = t;
              i0 += 4;
              i1 -= 4;
            }
            while (vecDot(nimg, i0, e) > eMq) i0 -= 4;
            return i0 + 4;
          };
          UPNG4.quantize.vecDot = function(nimg, i, e) {
            return nimg[i] * e[0] + nimg[i + 1] * e[1] + nimg[i + 2] * e[2] + nimg[i + 3] * e[3];
          };
          UPNG4.quantize.stats = function(nimg, i0, i1) {
            var R = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            var m = [0, 0, 0, 0];
            var N = i1 - i0 >> 2;
            for (var i = i0; i < i1; i += 4) {
              var r = nimg[i] * (1 / 255), g = nimg[i + 1] * (1 / 255), b = nimg[i + 2] * (1 / 255), a = nimg[i + 3] * (1 / 255);
              m[0] += r;
              m[1] += g;
              m[2] += b;
              m[3] += a;
              R[0] += r * r;
              R[1] += r * g;
              R[2] += r * b;
              R[3] += r * a;
              R[5] += g * g;
              R[6] += g * b;
              R[7] += g * a;
              R[10] += b * b;
              R[11] += b * a;
              R[15] += a * a;
            }
            R[4] = R[1];
            R[8] = R[2];
            R[12] = R[3];
            R[9] = R[6];
            R[13] = R[7];
            R[14] = R[11];
            return { R, m, N };
          };
          UPNG4.quantize.estats = function(stats) {
            var R = stats.R, m = stats.m, N = stats.N;
            var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3], iN = N == 0 ? 0 : 1 / N;
            var Rj = [
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
            ];
            var A = Rj, M = UPNG4.M4;
            var b = [0.5, 0.5, 0.5, 0.5], mi = 0, tmi = 0;
            if (N != 0)
              for (var i = 0; i < 10; i++) {
                b = M.multVec(A, b);
                tmi = Math.sqrt(M.dot(b, b));
                b = M.sml(1 / tmi, b);
                if (Math.abs(tmi - mi) < 1e-9) break;
                mi = tmi;
              }
            var q = [m0 * iN, m1 * iN, m2 * iN, m3 * iN];
            var eMq255 = M.dot(M.sml(255, q), b);
            var ia = q[3] < 1e-3 ? 0 : 1 / q[3];
            return {
              Cov: Rj,
              q,
              e: b,
              L: mi,
              eMq255,
              eMq: M.dot(b, q),
              rgba: (Math.round(255 * q[3]) << 24 | Math.round(255 * q[2] * ia) << 16 | Math.round(255 * q[1] * ia) << 8 | Math.round(255 * q[0] * ia) << 0) >>> 0
            };
          };
          UPNG4.M4 = {
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
          };
          UPNG4.encode.alphaMul = function(img, roundA) {
            var nimg = new Uint8Array(img.length), area = img.length >> 2;
            for (var i = 0; i < area; i++) {
              var qi = i << 2, ia = img[qi + 3];
              if (roundA) ia = ia < 128 ? 0 : 255;
              var a = ia * (1 / 255);
              nimg[qi + 0] = img[qi + 0] * a;
              nimg[qi + 1] = img[qi + 1] * a;
              nimg[qi + 2] = img[qi + 2] * a;
              nimg[qi + 3] = ia;
            }
            return nimg;
          };
        })(UPNG3, pako);
      })();
    }
  });

  // node_modules/.pnpm/utif@3.1.0/node_modules/utif/UTIF.js
  var require_UTIF = __commonJS({
    "node_modules/.pnpm/utif@3.1.0/node_modules/utif/UTIF.js"(exports, module) {
      (function() {
        var UTIF2 = {};
        if (typeof module == "object") {
          module.exports = UTIF2;
        } else {
          self.UTIF = UTIF2;
        }
        var pako;
        if (typeof __require == "function") {
          pako = require_pako();
        } else {
          pako = self.pako;
        }
        function log() {
          if (typeof process == "undefined" || true) console.log.apply(console, arguments);
        }
        (function(UTIF3, pako2) {
          (function() {
            var V = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(g) {
              return typeof g;
            } : function(g) {
              return g && "function" === typeof Symbol && g.constructor === Symbol && g !== Symbol.prototype ? "symbol" : typeof g;
            }, D = (function() {
              function g(g2) {
                this.message = "JPEG error: " + g2;
              }
              g.prototype = Error();
              g.prototype.name = "JpegError";
              return g.constructor = g;
            })(), P = (function() {
              function g(g2, D2) {
                this.message = g2;
                this.g = D2;
              }
              g.prototype = Error();
              g.prototype.name = "DNLMarkerError";
              return g.constructor = g;
            })();
            (function() {
              function g() {
                this.M = null;
                this.B = -1;
              }
              function W(a, d) {
                for (var f = 0, e = [], b, B, k = 16; 0 < k && !a[k - 1]; ) k--;
                e.push({ children: [], index: 0 });
                var l = e[0], r;
                for (b = 0; b < k; b++) {
                  for (B = 0; B < a[b]; B++) {
                    l = e.pop();
                    for (l.children[l.index] = d[f]; 0 < l.index; ) l = e.pop();
                    l.index++;
                    for (e.push(l); e.length <= b; ) e.push(r = { children: [], index: 0 }), l.children[l.index] = r.children, l = r;
                    f++;
                  }
                  b + 1 < k && (e.push(r = { children: [], index: 0 }), l.children[l.index] = r.children, l = r);
                }
                return e[0].children;
              }
              function X(a, d, f, e, b, B, k, l, r) {
                function n() {
                  if (0 < x) return x--, z >> x & 1;
                  z = a[d++];
                  if (255 === z) {
                    var c2 = a[d++];
                    if (c2) {
                      if (220 === c2 && g2) {
                        d += 2;
                        var b2 = a[d++] << 8 | a[d++];
                        if (0 < b2 && b2 !== f.g) throw new P("Found DNL marker (0xFFDC) while parsing scan data", b2);
                      }
                      throw new D("unexpected marker " + (z << 8 | c2).toString(16));
                    }
                  }
                  x = 7;
                  return z >>> 7;
                }
                function q(a2) {
                  for (; ; ) {
                    a2 = a2[n()];
                    if ("number" === typeof a2) return a2;
                    if ("object" !== ("undefined" === typeof a2 ? "undefined" : V(a2))) throw new D("invalid huffman sequence");
                  }
                }
                function h(a2) {
                  for (var c2 = 0; 0 < a2; ) c2 = c2 << 1 | n(), a2--;
                  return c2;
                }
                function c(a2) {
                  if (1 === a2) return 1 === n() ? 1 : -1;
                  var c2 = h(a2);
                  return c2 >= 1 << a2 - 1 ? c2 : c2 + (-1 << a2) + 1;
                }
                function C(a2, b2) {
                  var d2 = q(a2.D);
                  d2 = 0 === d2 ? 0 : c(d2);
                  a2.a[b2] = a2.m += d2;
                  for (d2 = 1; 64 > d2; ) {
                    var h2 = q(a2.o), k2 = h2 & 15;
                    h2 >>= 4;
                    if (0 === k2) {
                      if (15 > h2) break;
                      d2 += 16;
                    } else d2 += h2, a2.a[b2 + J[d2]] = c(k2), d2++;
                  }
                }
                function w(a2, d2) {
                  var b2 = q(a2.D);
                  b2 = 0 === b2 ? 0 : c(b2) << r;
                  a2.a[d2] = a2.m += b2;
                }
                function p(a2, c2) {
                  a2.a[c2] |= n() << r;
                }
                function m(a2, b2) {
                  if (0 < A) A--;
                  else for (var d2 = B; d2 <= k; ) {
                    var e2 = q(a2.o), f2 = e2 & 15;
                    e2 >>= 4;
                    if (0 === f2) {
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
                        e2 = q(a2.o);
                        f2 = e2 & 15;
                        e2 >>= 4;
                        if (0 === f2) 15 > e2 ? (A = h(e2) + (1 << e2), E = 4) : (e2 = 16, E = 1);
                        else {
                          if (1 !== f2) throw new D("invalid ACn encoding");
                          Q = c(f2);
                          E = e2 ? 2 : 3;
                        }
                        continue;
                      case 1:
                      case 2:
                        a2.a[f2] ? a2.a[f2] += l2 * (n() << r) : (e2--, 0 === e2 && (E = 2 === E ? 3 : 0));
                        break;
                      case 3:
                        a2.a[f2] ? a2.a[f2] += l2 * (n() << r) : (a2.a[f2] = Q << r, E = 0);
                        break;
                      case 4:
                        a2.a[f2] && (a2.a[f2] += l2 * (n() << r));
                    }
                    b2++;
                  }
                  4 === E && (A--, 0 === A && (E = 0));
                }
                var g2 = 9 < arguments.length && void 0 !== arguments[9] ? arguments[9] : false, u = f.P, v = d, z = 0, x = 0, A = 0, E = 0, Q, K = e.length, F, L, M, I;
                var R = f.S ? 0 === B ? 0 === l ? w : p : 0 === l ? m : t : C;
                var G = 0;
                var O = 1 === K ? e[0].c * e[0].l : u * f.O;
                for (var S, T; G < O; ) {
                  var U = b ? Math.min(O - G, b) : O;
                  for (F = 0; F < K; F++) e[F].m = 0;
                  A = 0;
                  if (1 === K) {
                    var y = e[0];
                    for (I = 0; I < U; I++) R(y, 64 * ((y.c + 1) * (G / y.c | 0) + G % y.c)), G++;
                  } else for (I = 0; I < U; I++) {
                    for (F = 0; F < K; F++) for (y = e[F], S = y.h, T = y.j, L = 0; L < T; L++) for (M = 0; M < S; M++) R(y, 64 * ((y.c + 1) * ((G / u | 0) * y.j + L) + (G % u * y.h + M)));
                    G++;
                  }
                  x = 0;
                  (y = N(a, d)) && y.f && ((0, _util.warn)("decodeScan - unexpected MCU data, current marker is: " + y.f), d = y.offset);
                  y = y && y.F;
                  if (!y || 65280 >= y) throw new D("marker was not found");
                  if (65488 <= y && 65495 >= y) d += 2;
                  else break;
                }
                (y = N(a, d)) && y.f && ((0, _util.warn)("decodeScan - unexpected Scan data, current marker is: " + y.f), d = y.offset);
                return d - v;
              }
              function Y(a, d) {
                for (var f = d.c, e = d.l, b = new Int16Array(64), B = 0; B < e; B++) for (var k = 0; k < f; k++) {
                  var l = 64 * ((d.c + 1) * B + k), r = b, n = d.G, q = d.a;
                  if (!n) throw new D("missing required Quantization Table.");
                  for (var h = 0; 64 > h; h += 8) {
                    var c = q[l + h];
                    var C = q[l + h + 1];
                    var w = q[l + h + 2];
                    var p = q[l + h + 3];
                    var m = q[l + h + 4];
                    var t = q[l + h + 5];
                    var g2 = q[l + h + 6];
                    var u = q[l + h + 7];
                    c *= n[h];
                    if (0 === (C | w | p | m | t | g2 | u)) c = 5793 * c + 512 >> 10, r[h] = c, r[h + 1] = c, r[h + 2] = c, r[h + 3] = c, r[h + 4] = c, r[h + 5] = c, r[h + 6] = c, r[h + 7] = c;
                    else {
                      C *= n[h + 1];
                      w *= n[h + 2];
                      p *= n[h + 3];
                      m *= n[h + 4];
                      t *= n[h + 5];
                      g2 *= n[h + 6];
                      u *= n[h + 7];
                      var v = 5793 * c + 128 >> 8;
                      var z = 5793 * m + 128 >> 8;
                      var x = w;
                      var A = g2;
                      m = 2896 * (C - u) + 128 >> 8;
                      u = 2896 * (C + u) + 128 >> 8;
                      p <<= 4;
                      t <<= 4;
                      v = v + z + 1 >> 1;
                      z = v - z;
                      c = 3784 * x + 1567 * A + 128 >> 8;
                      x = 1567 * x - 3784 * A + 128 >> 8;
                      A = c;
                      m = m + t + 1 >> 1;
                      t = m - t;
                      u = u + p + 1 >> 1;
                      p = u - p;
                      v = v + A + 1 >> 1;
                      A = v - A;
                      z = z + x + 1 >> 1;
                      x = z - x;
                      c = 2276 * m + 3406 * u + 2048 >> 12;
                      m = 3406 * m - 2276 * u + 2048 >> 12;
                      u = c;
                      c = 799 * p + 4017 * t + 2048 >> 12;
                      p = 4017 * p - 799 * t + 2048 >> 12;
                      t = c;
                      r[h] = v + u;
                      r[h + 7] = v - u;
                      r[h + 1] = z + t;
                      r[h + 6] = z - t;
                      r[h + 2] = x + p;
                      r[h + 5] = x - p;
                      r[h + 3] = A + m;
                      r[h + 4] = A - m;
                    }
                  }
                  for (n = 0; 8 > n; ++n) c = r[n], C = r[n + 8], w = r[n + 16], p = r[n + 24], m = r[n + 32], t = r[n + 40], g2 = r[n + 48], u = r[n + 56], 0 === (C | w | p | m | t | g2 | u) ? (c = 5793 * c + 8192 >> 14, c = -2040 > c ? 0 : 2024 <= c ? 255 : c + 2056 >> 4, q[l + n] = c, q[l + n + 8] = c, q[l + n + 16] = c, q[l + n + 24] = c, q[l + n + 32] = c, q[l + n + 40] = c, q[l + n + 48] = c, q[l + n + 56] = c) : (v = 5793 * c + 2048 >> 12, z = 5793 * m + 2048 >> 12, x = w, A = g2, m = 2896 * (C - u) + 2048 >> 12, u = 2896 * (C + u) + 2048 >> 12, v = (v + z + 1 >> 1) + 4112, z = v - z, c = 3784 * x + 1567 * A + 2048 >> 12, x = 1567 * x - 3784 * A + 2048 >> 12, A = c, m = m + t + 1 >> 1, t = m - t, u = u + p + 1 >> 1, p = u - p, v = v + A + 1 >> 1, A = v - A, z = z + x + 1 >> 1, x = z - x, c = 2276 * m + 3406 * u + 2048 >> 12, m = 3406 * m - 2276 * u + 2048 >> 12, u = c, c = 799 * p + 4017 * t + 2048 >> 12, p = 4017 * p - 799 * t + 2048 >> 12, t = c, c = v + u, u = v - u, C = z + t, g2 = z - t, w = x + p, t = x - p, p = A + m, m = A - m, c = 16 > c ? 0 : 4080 <= c ? 255 : c >> 4, C = 16 > C ? 0 : 4080 <= C ? 255 : C >> 4, w = 16 > w ? 0 : 4080 <= w ? 255 : w >> 4, p = 16 > p ? 0 : 4080 <= p ? 255 : p >> 4, m = 16 > m ? 0 : 4080 <= m ? 255 : m >> 4, t = 16 > t ? 0 : 4080 <= t ? 255 : t >> 4, g2 = 16 > g2 ? 0 : 4080 <= g2 ? 255 : g2 >> 4, u = 16 > u ? 0 : 4080 <= u ? 255 : u >> 4, q[l + n] = c, q[l + n + 8] = C, q[l + n + 16] = w, q[l + n + 24] = p, q[l + n + 32] = m, q[l + n + 40] = t, q[l + n + 48] = g2, q[l + n + 56] = u);
                }
                return d.a;
              }
              function N(a, d) {
                var f = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : d, e = a.length - 1;
                f = f < d ? f : d;
                if (d >= e) return null;
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
                  k += 2;
                  return d2;
                }
                function f() {
                  var b2 = d();
                  b2 = k + b2 - 2;
                  var c2 = N(a, b2, k);
                  c2 && c2.f && ((0, _util.warn)("readDataBlock - incorrect length, current marker is: " + c2.f), b2 = c2.offset);
                  b2 = a.subarray(k, b2);
                  k += b2.length;
                  return b2;
                }
                function e(a2) {
                  for (var b2 = Math.ceil(a2.v / 8 / a2.s), c2 = Math.ceil(a2.g / 8 / a2.u), d2 = 0; d2 < a2.b.length; d2++) {
                    v = a2.b[d2];
                    var e2 = Math.ceil(Math.ceil(a2.v / 8) * v.h / a2.s), f2 = Math.ceil(Math.ceil(a2.g / 8) * v.j / a2.u);
                    v.a = new Int16Array(64 * c2 * v.j * (b2 * v.h + 1));
                    v.c = e2;
                    v.l = f2;
                  }
                  a2.P = b2;
                  a2.O = c2;
                }
                var b = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).N, B = void 0 === b ? null : b, k = 0, l = null, r = 0;
                b = [];
                var n = [], q = [], h = d();
                if (65496 !== h) throw new D("SOI not found");
                for (h = d(); 65497 !== h; ) {
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
                      65518 === h && 65 === c[0] && 100 === c[1] && 111 === c[2] && 98 === c[3] && 101 === c[4] && (l = { version: c[5] << 8 | c[6], Y: c[7] << 8 | c[8], Z: c[9] << 8 | c[10], W: c[11] });
                      break;
                    case 65499:
                      h = d() + k - 2;
                      for (var g2; k < h; ) {
                        var w = a[k++], p = new Uint16Array(64);
                        if (0 === w >> 4) for (c = 0; 64 > c; c++) g2 = J[c], p[g2] = a[k++];
                        else if (1 === w >> 4) for (c = 0; 64 > c; c++) g2 = J[c], p[g2] = d();
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
                      m.X = 65473 === h;
                      m.S = 65474 === h;
                      m.precision = a[k++];
                      h = d();
                      m.g = B || h;
                      m.v = d();
                      m.b = [];
                      m.C = {};
                      c = a[k++];
                      for (h = p = w = 0; h < c; h++) {
                        g2 = a[k];
                        var t = a[k + 1] >> 4;
                        var H = a[k + 1] & 15;
                        w < t && (w = t);
                        p < H && (p = H);
                        t = m.b.push({ h: t, j: H, T: a[k + 2], G: null });
                        m.C[g2] = t - 1;
                        k += 3;
                      }
                      m.s = w;
                      m.u = p;
                      e(m);
                      break;
                    case 65476:
                      g2 = d();
                      for (h = 2; h < g2; ) {
                        w = a[k++];
                        p = new Uint8Array(16);
                        for (c = t = 0; 16 > c; c++, k++) t += p[c] = a[k];
                        H = new Uint8Array(t);
                        for (c = 0; c < t; c++, k++) H[c] = a[k];
                        h += 17 + t;
                        (0 === w >> 4 ? q : n)[w & 15] = W(p, H);
                      }
                      break;
                    case 65501:
                      d();
                      var u = d();
                      break;
                    case 65498:
                      c = 1 === ++r && !B;
                      d();
                      w = a[k++];
                      g2 = [];
                      for (h = 0; h < w; h++) {
                        p = m.C[a[k++]];
                        var v = m.b[p];
                        p = a[k++];
                        v.D = q[p >> 4];
                        v.o = n[p & 15];
                        g2.push(v);
                      }
                      h = a[k++];
                      w = a[k++];
                      p = a[k++];
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
                      255 !== a[k] && k--;
                      break;
                    default:
                      if (255 === a[k - 3] && 192 <= a[k - 2] && 254 >= a[k - 2]) k -= 3;
                      else if ((c = N(a, k - 2)) && c.f) (0, _util.warn)("JpegImage.parse - unexpected data, current marker is: " + c.f), k = c.offset;
                      else throw new D("unknown marker " + h.toString(16));
                  }
                  h = d();
                }
                this.width = m.v;
                this.height = m.g;
                this.A = l;
                this.b = [];
                for (h = 0; h < m.b.length; h++) {
                  v = m.b[h];
                  if (u = b[v.T]) v.G = u;
                  this.b.push({ R: Y(m, v), U: v.h / m.s, V: v.j / m.u, c: v.c, l: v.l });
                }
                this.i = this.b.length;
              }, L: function(a, d) {
                var f = this.width / a, e = this.height / d, b, g2, k = this.b.length, l = a * d * k, r = new Uint8ClampedArray(l), n = new Uint32Array(a);
                for (g2 = 0; g2 < k; g2++) {
                  var q = this.b[g2];
                  var h = q.U * f;
                  var c = q.V * e;
                  var C = g2;
                  var w = q.R;
                  var p = q.c + 1 << 3;
                  for (b = 0; b < a; b++) q = 0 | b * h, n[b] = (q & 4294967288) << 3 | q & 7;
                  for (h = 0; h < d; h++) for (q = 0 | h * c, q = p * (q & 4294967288) | (q & 7) << 3, b = 0; b < a; b++) r[C] = w[q + n[b]], C += k;
                }
                if (e = this.M) for (g2 = 0; g2 < l; ) for (f = q = 0; q < k; q++, g2++, f += 2) r[g2] = (r[g2] * e[f] >> 8) + e[f + 1];
                return r;
              }, w: function() {
                return this.A ? !!this.A.W : 3 === this.i ? 0 === this.B ? false : true : 1 === this.B ? true : false;
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
                a = this.L(a, d);
                if (1 === this.i && f) {
                  f = a.length;
                  d = new Uint8ClampedArray(3 * f);
                  for (var e = 0, b = 0; b < f; b++) {
                    var g2 = a[b];
                    d[e++] = g2;
                    d[e++] = g2;
                    d[e++] = g2;
                  }
                  return d;
                }
                if (3 === this.i && this.w()) return this.I(a);
                if (4 === this.i) {
                  if (this.w()) return f ? this.K(a) : this.J(a);
                  if (f) return this.H(a);
                }
                return a;
              } };
              UTIF3.JpegDecoder = g;
            })();
          })();
          UTIF3.encodeImage = function(rgba, w, h, metadata) {
            var idf = {
              "t256": [w],
              "t257": [h],
              "t258": [8, 8, 8, 8],
              "t259": [1],
              "t262": [2],
              "t273": [1e3],
              // strips offset
              "t277": [4],
              "t278": [h],
              /* rows per strip */
              "t279": [w * h * 4],
              // strip byte counts
              "t282": [1],
              "t283": [1],
              "t284": [1],
              "t286": [0],
              "t287": [0],
              "t296": [1],
              "t305": ["Photopea (UTIF.js)"],
              "t338": [1]
            };
            if (metadata) for (var i in metadata) idf[i] = metadata[i];
            var prfx = new Uint8Array(UTIF3.encode([idf]));
            var img = new Uint8Array(rgba);
            var data = new Uint8Array(1e3 + w * h * 4);
            for (var i = 0; i < prfx.length; i++) data[i] = prfx[i];
            for (var i = 0; i < img.length; i++) data[1e3 + i] = img[i];
            return data.buffer;
          };
          UTIF3.encode = function(ifds) {
            var data = new Uint8Array(2e4), offset = 4, bin = UTIF3._binBE;
            data[0] = 77;
            data[1] = 77;
            data[3] = 42;
            var ifdo = 8;
            bin.writeUint(data, offset, ifdo);
            offset += 4;
            for (var i = 0; i < ifds.length; i++) {
              var noffs = UTIF3._writeIFD(bin, data, ifdo, ifds[i]);
              ifdo = noffs[1];
              if (i < ifds.length - 1) bin.writeUint(data, noffs[0], ifdo);
            }
            return data.slice(0, ifdo).buffer;
          };
          UTIF3.decode = function(buff) {
            UTIF3.decode._decodeG3.allow2D = null;
            var data = new Uint8Array(buff), offset = 0;
            var id = UTIF3._binBE.readASCII(data, offset, 2);
            offset += 2;
            var bin = id == "II" ? UTIF3._binLE : UTIF3._binBE;
            var num = bin.readUshort(data, offset);
            offset += 2;
            var ifdo = bin.readUint(data, offset);
            offset += 4;
            var ifds = [];
            while (true) {
              var noff = UTIF3._readIFD(bin, data, ifdo, ifds, 0, false);
              ifdo = bin.readUint(data, noff);
              if (ifdo == 0) break;
            }
            return ifds;
          };
          UTIF3.decodeImage = function(buff, img, ifds) {
            var data = new Uint8Array(buff);
            var id = UTIF3._binBE.readASCII(data, 0, 2);
            if (img["t256"] == null) return;
            img.isLE = id == "II";
            img.width = img["t256"][0];
            img.height = img["t257"][0];
            var cmpr = img["t259"] ? img["t259"][0] : 1;
            var fo = img["t266"] ? img["t266"][0] : 1;
            if (img["t284"] && img["t284"][0] == 2) log("PlanarConfiguration 2 should not be used!");
            var bipp;
            if (img["t258"]) bipp = Math.min(32, img["t258"][0]) * img["t258"].length;
            else bipp = img["t277"] ? img["t277"][0] : 1;
            if (cmpr == 1 && img["t279"] != null && img["t278"] && img["t262"][0] == 32803) {
              bipp = Math.round(img["t279"][0] * 8 / (img.width * img["t278"][0]));
            }
            var bipl = Math.ceil(img.width * bipp / 8) * 8;
            var soff = img["t273"];
            if (soff == null) soff = img["t324"];
            var bcnt = img["t279"];
            if (cmpr == 1 && soff.length == 1) bcnt = [img.height * (bipl >>> 3)];
            if (bcnt == null) bcnt = img["t325"];
            var bytes = new Uint8Array(img.height * (bipl >>> 3)), bilen = 0;
            if (img["t322"] != null) {
              var tw = img["t322"][0], th = img["t323"][0];
              var tx = Math.floor((img.width + tw - 1) / tw);
              var ty = Math.floor((img.height + th - 1) / th);
              var tbuff = new Uint8Array(Math.ceil(tw * th * bipp / 8) | 0);
              for (var y = 0; y < ty; y++)
                for (var x = 0; x < tx; x++) {
                  var i = y * tx + x;
                  for (var j = 0; j < tbuff.length; j++) tbuff[j] = 0;
                  UTIF3.decode._decompress(img, ifds, data, soff[i], bcnt[i], cmpr, tbuff, 0, fo);
                  if (cmpr == 6) bytes = tbuff;
                  else UTIF3._copyTile(tbuff, Math.ceil(tw * bipp / 8) | 0, th, bytes, Math.ceil(img.width * bipp / 8) | 0, img.height, Math.ceil(x * tw * bipp / 8) | 0, y * th);
                }
              bilen = bytes.length * 8;
            } else {
              var rps = img["t278"] ? img["t278"][0] : img.height;
              rps = Math.min(rps, img.height);
              for (var i = 0; i < soff.length; i++) {
                UTIF3.decode._decompress(img, ifds, data, soff[i], bcnt[i], cmpr, bytes, Math.ceil(bilen / 8) | 0, fo);
                bilen += bipl * rps;
              }
              bilen = Math.min(bilen, bytes.length * 8);
            }
            img.data = new Uint8Array(bytes.buffer, 0, Math.ceil(bilen / 8) | 0);
          };
          UTIF3.decode._decompress = function(img, ifds, data, off, len, cmpr, tgt, toff, fo) {
            if (false) {
            } else if (cmpr == 1 || len == tgt.length && cmpr != 32767) for (var j = 0; j < len; j++) tgt[toff + j] = data[off + j];
            else if (cmpr == 3) UTIF3.decode._decodeG3(data, off, len, tgt, toff, img.width, fo);
            else if (cmpr == 4) UTIF3.decode._decodeG4(data, off, len, tgt, toff, img.width, fo);
            else if (cmpr == 5) UTIF3.decode._decodeLZW(data, off, tgt, toff);
            else if (cmpr == 6) UTIF3.decode._decodeOldJPEG(img, data, off, len, tgt, toff);
            else if (cmpr == 7) UTIF3.decode._decodeNewJPEG(img, data, off, len, tgt, toff);
            else if (cmpr == 8) {
              var src = new Uint8Array(data.buffer, off, len);
              var bin = pako2["inflate"](src);
              for (var i = 0; i < bin.length; i++) tgt[toff + i] = bin[i];
            } else if (cmpr == 32767) UTIF3.decode._decodeARW(img, data, off, len, tgt, toff);
            else if (cmpr == 32773) UTIF3.decode._decodePackBits(data, off, len, tgt, toff);
            else if (cmpr == 32809) UTIF3.decode._decodeThunder(data, off, len, tgt, toff);
            else if (cmpr == 34713)
              UTIF3.decode._decodeNikon(img, ifds, data, off, len, tgt, toff);
            else log("Unknown compression", cmpr);
            var bps = img["t258"] ? Math.min(32, img["t258"][0]) : 1;
            var noc = img["t277"] ? img["t277"][0] : 1, bpp = bps * noc >>> 3, h = img["t278"] ? img["t278"][0] : img.height, bpl = Math.ceil(bps * noc * img.width / 8);
            if (bps == 16 && !img.isLE && img["t33422"] == null)
              for (var y = 0; y < h; y++) {
                var roff = toff + y * bpl;
                for (var x = 1; x < bpl; x += 2) {
                  var t = tgt[roff + x];
                  tgt[roff + x] = tgt[roff + x - 1];
                  tgt[roff + x - 1] = t;
                }
              }
            if (img["t317"] && img["t317"][0] == 2) {
              for (var y = 0; y < h; y++) {
                var ntoff = toff + y * bpl;
                if (bps == 16) for (var j = bpp; j < bpl; j += 2) {
                  var nv = (tgt[ntoff + j + 1] << 8 | tgt[ntoff + j]) + (tgt[ntoff + j - bpp + 1] << 8 | tgt[ntoff + j - bpp]);
                  tgt[ntoff + j] = nv & 255;
                  tgt[ntoff + j + 1] = nv >>> 8 & 255;
                }
                else if (noc == 3) for (var j = 3; j < bpl; j += 3) {
                  tgt[ntoff + j] = tgt[ntoff + j] + tgt[ntoff + j - 3] & 255;
                  tgt[ntoff + j + 1] = tgt[ntoff + j + 1] + tgt[ntoff + j - 2] & 255;
                  tgt[ntoff + j + 2] = tgt[ntoff + j + 2] + tgt[ntoff + j - 1] & 255;
                }
                else for (var j = bpp; j < bpl; j++) tgt[ntoff + j] = tgt[ntoff + j] + tgt[ntoff + j - bpp] & 255;
              }
            }
          };
          UTIF3.decode._ljpeg_diff = function(data, prm, huff) {
            var getbithuff = UTIF3.decode._getbithuff;
            var len, diff;
            len = getbithuff(data, prm, huff[0], huff);
            diff = getbithuff(data, prm, len, 0);
            if ((diff & 1 << len - 1) == 0) diff -= (1 << len) - 1;
            return diff;
          };
          UTIF3.decode._decodeARW = function(img, inp, off, src_length, tgt, toff) {
            var raw_width = img["t256"][0], height = img["t257"][0], tiff_bps = img["t258"][0];
            var bin = img.isLE ? UTIF3._binLE : UTIF3._binBE;
            var arw2 = raw_width * height == src_length || raw_width * height * 1.5 == src_length;
            if (!arw2) {
              height += 8;
              var prm = [off, 0, 0, 0];
              var huff = new Uint16Array(32770);
              var tab = [
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
              ];
              var i, c, n, col, row, sum = 0;
              var ljpeg_diff = UTIF3.decode._ljpeg_diff;
              huff[0] = 15;
              for (n = i = 0; i < 18; i++) {
                var lim = 32768 >>> (tab[i] >>> 8);
                for (var c = 0; c < lim; c++) huff[++n] = tab[i];
              }
              for (col = raw_width; col--; )
                for (row = 0; row < height + 1; row += 2) {
                  if (row == height) row = 1;
                  sum += ljpeg_diff(inp, prm, huff);
                  if (row < height) {
                    var clr = sum & 4095;
                    UTIF3.decode._putsF(tgt, (row * raw_width + col) * tiff_bps, clr << 16 - tiff_bps);
                  }
                }
              return;
            }
            if (raw_width * height * 1.5 == src_length) {
              for (var i = 0; i < src_length; i += 3) {
                var b0 = inp[off + i + 0], b1 = inp[off + i + 1], b2 = inp[off + i + 2];
                tgt[toff + i] = b1 << 4 | b0 >>> 4;
                tgt[toff + i + 1] = b0 << 4 | b2 >>> 4;
                tgt[toff + i + 2] = b2 << 4 | b1 >>> 4;
              }
              return;
            }
            var pix = new Uint16Array(16);
            var row, col, val, max, min, imax, imin, sh, bit, i, dp;
            var data = new Uint8Array(raw_width + 1);
            for (row = 0; row < height; row++) {
              for (var j = 0; j < raw_width; j++) data[j] = inp[off++];
              for (dp = 0, col = 0; col < raw_width - 30; dp += 16) {
                max = 2047 & (val = bin.readUint(data, dp));
                min = 2047 & val >>> 11;
                imax = 15 & val >>> 22;
                imin = 15 & val >>> 26;
                for (sh = 0; sh < 4 && 128 << sh <= max - min; sh++) ;
                for (bit = 30, i = 0; i < 16; i++)
                  if (i == imax) pix[i] = max;
                  else if (i == imin) pix[i] = min;
                  else {
                    pix[i] = ((bin.readUshort(data, dp + (bit >> 3)) >>> (bit & 7) & 127) << sh) + min;
                    if (pix[i] > 2047) pix[i] = 2047;
                    bit += 7;
                  }
                for (i = 0; i < 16; i++, col += 2) {
                  var clr = pix[i] << 1;
                  UTIF3.decode._putsF(tgt, (row * raw_width + col) * tiff_bps, clr << 16 - tiff_bps);
                }
                col -= col & 1 ? 1 : 31;
              }
            }
          };
          UTIF3.decode._decodeNikon = function(img, imgs, data, off, src_length, tgt, toff) {
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
            ];
            var raw_width = img["t256"][0], height = img["t257"][0], tiff_bps = img["t258"][0];
            var tree = 0, split = 0;
            var make_decoder = UTIF3.decode._make_decoder;
            var getbithuff = UTIF3.decode._getbithuff;
            var mn = imgs[0].exifIFD.makerNote, md = mn["t150"] ? mn["t150"] : mn["t140"], mdo = 0;
            var ver0 = md[mdo++], ver1 = md[mdo++];
            if (ver0 == 73 || ver1 == 88) mdo += 2110;
            if (ver0 == 70) tree = 2;
            if (tiff_bps == 14) tree += 3;
            var vpred = [[0, 0], [0, 0]], bin = img.isLE ? UTIF3._binLE : UTIF3._binBE;
            for (var i = 0; i < 2; i++) for (var j = 0; j < 2; j++) {
              vpred[i][j] = bin.readShort(md, mdo);
              mdo += 2;
            }
            var max = 1 << tiff_bps & 32767, step = 0;
            var csize = bin.readShort(md, mdo);
            mdo += 2;
            if (csize > 1) step = Math.floor(max / (csize - 1));
            if (ver0 == 68 && ver1 == 32 && step > 0) split = bin.readShort(md, 562);
            var i;
            var row, col;
            var len, shl, diff;
            var min_v = 0;
            var hpred = [0, 0];
            var huff = make_decoder(nikon_tree[tree]);
            var prm = [off, 0, 0, 0];
            for (min_v = row = 0; row < height; row++) {
              if (split && row == split) {
                huff = make_decoder(nikon_tree[tree + 1]);
              }
              for (col = 0; col < raw_width; col++) {
                i = getbithuff(data, prm, huff[0], huff);
                len = i & 15;
                shl = i >>> 4;
                diff = (getbithuff(data, prm, len - shl, 0) << 1) + 1 << shl >>> 1;
                if ((diff & 1 << len - 1) == 0)
                  diff -= (1 << len) - (shl == 0 ? 1 : 0);
                if (col < 2) hpred[col] = vpred[row & 1][col] += diff;
                else hpred[col & 1] += diff;
                var clr = Math.min(Math.max(hpred[col & 1], 0), (1 << tiff_bps) - 1);
                var bti = (row * raw_width + col) * tiff_bps;
                UTIF3.decode._putsF(tgt, bti, clr << 16 - tiff_bps);
              }
            }
          };
          UTIF3.decode._putsF = function(dt, pos, val) {
            val = val << 8 - (pos & 7);
            var o = pos >>> 3;
            dt[o] |= val >>> 16;
            dt[o + 1] |= val >>> 8;
            dt[o + 2] |= val;
          };
          UTIF3.decode._getbithuff = function(data, prm, nbits, huff) {
            var zero_after_ff = 0;
            var get_byte = UTIF3.decode._get_byte;
            var c;
            var off = prm[0], bitbuf = prm[1], vbits = prm[2], reset = prm[3];
            if (nbits == 0 || vbits < 0) return 0;
            while (!reset && vbits < nbits && (c = data[off++]) != -1 && !(reset = zero_after_ff && c == 255 && data[off++])) {
              bitbuf = (bitbuf << 8) + c;
              vbits += 8;
            }
            c = bitbuf << 32 - vbits >>> 32 - nbits;
            if (huff) {
              vbits -= huff[c + 1] >>> 8;
              c = huff[c + 1] & 255;
            } else
              vbits -= nbits;
            if (vbits < 0) throw "e";
            prm[0] = off;
            prm[1] = bitbuf;
            prm[2] = vbits;
            prm[3] = reset;
            return c;
          };
          UTIF3.decode._make_decoder = function(source) {
            var max, len, h, i, j;
            var huff = [];
            for (max = 16; max != 0 && !source[max]; max--) ;
            var si = 17;
            huff[0] = max;
            for (h = len = 1; len <= max; len++)
              for (i = 0; i < source[len]; i++, ++si)
                for (j = 0; j < 1 << max - len; j++)
                  if (h <= 1 << max)
                    huff[h++] = len << 8 | source[si];
            return huff;
          };
          UTIF3.decode._decodeNewJPEG = function(img, data, off, len, tgt, toff) {
            var tables = img["t347"], tlen = tables ? tables.length : 0, buff = new Uint8Array(tlen + len);
            if (tables) {
              var SOI = 216, EOI2 = 217, boff = 0;
              for (var i = 0; i < tlen - 1; i++) {
                if (tables[i] == 255 && tables[i + 1] == EOI2) break;
                buff[boff++] = tables[i];
              }
              var byte1 = data[off], byte2 = data[off + 1];
              if (byte1 != 255 || byte2 != SOI) {
                buff[boff++] = byte1;
                buff[boff++] = byte2;
              }
              for (var i = 2; i < len; i++) buff[boff++] = data[off + i];
            } else for (var i = 0; i < len; i++) buff[i] = data[off + i];
            if (img["t262"][0] == 32803 || img["t262"][0] == 34892) {
              var bps = img["t258"][0];
              var out = UTIF3.LosslessJpegDecode(buff), olen = out.length;
              if (false) {
              } else if (bps == 16) {
                if (img.isLE) for (var i = 0; i < olen; i++) {
                  tgt[toff + (i << 1)] = out[i] & 255;
                  tgt[toff + (i << 1) + 1] = out[i] >>> 8;
                }
                else for (var i = 0; i < olen; i++) {
                  tgt[toff + (i << 1)] = out[i] >>> 8;
                  tgt[toff + (i << 1) + 1] = out[i] & 255;
                }
              } else if (bps == 14 || bps == 12) {
                var rst = 16 - bps;
                for (var i = 0; i < olen; i++) UTIF3.decode._putsF(tgt, i * bps, out[i] << rst);
              } else throw new Error("unsupported bit depth " + bps);
            } else {
              var parser = new UTIF3.JpegDecoder();
              parser.parse(buff);
              var decoded = parser.getData(parser.width, parser.height);
              for (var i = 0; i < decoded.length; i++) tgt[toff + i] = decoded[i];
            }
            if (img["t262"][0] == 6) img["t262"][0] = 2;
          };
          UTIF3.decode._decodeOldJPEGInit = function(img, data, off, len) {
            var SOI = 216, EOI2 = 217, DQT = 219, DHT = 196, DRI = 221, SOF0 = 192, SOS2 = 218;
            var joff = 0, soff = 0, tables, sosMarker2, isTiled = false, i, j, k;
            var jpgIchgFmt = img["t513"], jifoff = jpgIchgFmt ? jpgIchgFmt[0] : 0;
            var jpgIchgFmtLen = img["t514"], jiflen = jpgIchgFmtLen ? jpgIchgFmtLen[0] : 0;
            var soffTag = img["t324"] || img["t273"] || jpgIchgFmt;
            var ycbcrss = img["t530"], ssx = 0, ssy = 0;
            var spp = img["t277"] ? img["t277"][0] : 1;
            var jpgresint = img["t515"];
            if (soffTag) {
              soff = soffTag[0];
              isTiled = soffTag.length > 1;
            }
            if (!isTiled) {
              if (data[off] == 255 && data[off + 1] == SOI) return { jpegOffset: off };
              if (jpgIchgFmt != null) {
                if (data[off + jifoff] == 255 && data[off + jifoff + 1] == SOI) joff = off + jifoff;
                else log("JPEGInterchangeFormat does not point to SOI");
                if (jpgIchgFmtLen == null) log("JPEGInterchangeFormatLength field is missing");
                else if (jifoff >= soff || jifoff + jiflen <= soff) log("JPEGInterchangeFormatLength field value is invalid");
                if (joff != null) return { jpegOffset: joff };
              }
            }
            if (ycbcrss != null) {
              ssx = ycbcrss[0];
              ssy = ycbcrss[1];
            }
            if (jpgIchgFmt != null) {
              if (jpgIchgFmtLen != null)
                if (jiflen >= 2 && jifoff + jiflen <= soff) {
                  if (data[off + jifoff + jiflen - 2] == 255 && data[off + jifoff + jiflen - 1] == SOI) tables = new Uint8Array(jiflen - 2);
                  else tables = new Uint8Array(jiflen);
                  for (i = 0; i < tables.length; i++) tables[i] = data[off + jifoff + i];
                  log("Incorrect JPEG interchange format: using JPEGInterchangeFormat offset to derive tables");
                } else log("JPEGInterchangeFormat+JPEGInterchangeFormatLength > offset to first strip or tile");
            }
            if (tables == null) {
              var ooff = 0, out = [];
              out[ooff++] = 255;
              out[ooff++] = SOI;
              var qtables = img["t519"];
              if (qtables == null) throw new Error("JPEGQTables tag is missing");
              for (i = 0; i < qtables.length; i++) {
                out[ooff++] = 255;
                out[ooff++] = DQT;
                out[ooff++] = 0;
                out[ooff++] = 67;
                out[ooff++] = i;
                for (j = 0; j < 64; j++) out[ooff++] = data[off + qtables[i] + j];
              }
              for (k = 0; k < 2; k++) {
                var htables = img[k == 0 ? "t520" : "t521"];
                if (htables == null) throw new Error((k == 0 ? "JPEGDCTables" : "JPEGACTables") + " tag is missing");
                for (i = 0; i < htables.length; i++) {
                  out[ooff++] = 255;
                  out[ooff++] = DHT;
                  var nc = 19;
                  for (j = 0; j < 16; j++) nc += data[off + htables[i] + j];
                  out[ooff++] = nc >>> 8;
                  out[ooff++] = nc & 255;
                  out[ooff++] = i | k << 4;
                  for (j = 0; j < 16; j++) out[ooff++] = data[off + htables[i] + j];
                  for (j = 0; j < nc; j++) out[ooff++] = data[off + htables[i] + 16 + j];
                }
              }
              out[ooff++] = 255;
              out[ooff++] = SOF0;
              out[ooff++] = 0;
              out[ooff++] = 8 + 3 * spp;
              out[ooff++] = 8;
              out[ooff++] = img.height >>> 8 & 255;
              out[ooff++] = img.height & 255;
              out[ooff++] = img.width >>> 8 & 255;
              out[ooff++] = img.width & 255;
              out[ooff++] = spp;
              if (spp == 1) {
                out[ooff++] = 1;
                out[ooff++] = 17;
                out[ooff++] = 0;
              } else for (i = 0; i < 3; i++) {
                out[ooff++] = i + 1;
                out[ooff++] = i != 0 ? 17 : (ssx & 15) << 4 | ssy & 15;
                out[ooff++] = i;
              }
              if (jpgresint != null && jpgresint[0] != 0) {
                out[ooff++] = 255;
                out[ooff++] = DRI;
                out[ooff++] = 0;
                out[ooff++] = 4;
                out[ooff++] = jpgresint[0] >>> 8 & 255;
                out[ooff++] = jpgresint[0] & 255;
              }
              tables = new Uint8Array(out);
            }
            var sofpos = -1;
            i = 0;
            while (i < tables.length - 1) {
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
              sofpos = tables.length;
              tables = tmptab;
              tables[tmpoff++] = 255;
              tables[tmpoff++] = SOF0;
              tables[tmpoff++] = 0;
              tables[tmpoff++] = 8 + 3 * spp;
              tables[tmpoff++] = 8;
              tables[tmpoff++] = img.height >>> 8 & 255;
              tables[tmpoff++] = img.height & 255;
              tables[tmpoff++] = img.width >>> 8 & 255;
              tables[tmpoff++] = img.width & 255;
              tables[tmpoff++] = spp;
              if (spp == 1) {
                tables[tmpoff++] = 1;
                tables[tmpoff++] = 17;
                tables[tmpoff++] = 0;
              } else for (i = 0; i < 3; i++) {
                tables[tmpoff++] = i + 1;
                tables[tmpoff++] = i != 0 ? 17 : (ssx & 15) << 4 | ssy & 15;
                tables[tmpoff++] = i;
              }
            }
            if (data[soff] == 255 && data[soff + 1] == SOS2) {
              var soslen = data[soff + 2] << 8 | data[soff + 3];
              sosMarker2 = new Uint8Array(soslen + 2);
              sosMarker2[0] = data[soff];
              sosMarker2[1] = data[soff + 1];
              sosMarker2[2] = data[soff + 2];
              sosMarker2[3] = data[soff + 3];
              for (i = 0; i < soslen - 2; i++) sosMarker2[i + 4] = data[soff + i + 4];
            } else {
              sosMarker2 = new Uint8Array(2 + 6 + 2 * spp);
              var sosoff = 0;
              sosMarker2[sosoff++] = 255;
              sosMarker2[sosoff++] = SOS2;
              sosMarker2[sosoff++] = 0;
              sosMarker2[sosoff++] = 6 + 2 * spp;
              sosMarker2[sosoff++] = spp;
              if (spp == 1) {
                sosMarker2[sosoff++] = 1;
                sosMarker2[sosoff++] = 0;
              } else for (i = 0; i < 3; i++) {
                sosMarker2[sosoff++] = i + 1;
                sosMarker2[sosoff++] = i << 4 | i;
              }
              sosMarker2[sosoff++] = 0;
              sosMarker2[sosoff++] = 63;
              sosMarker2[sosoff++] = 0;
            }
            return { jpegOffset: off, tables, sosMarker: sosMarker2, sofPosition: sofpos };
          };
          UTIF3.decode._decodeOldJPEG = function(img, data, off, len, tgt, toff) {
            var i, dlen, tlen, buff, buffoff;
            var jpegData = UTIF3.decode._decodeOldJPEGInit(img, data, off, len);
            if (jpegData.jpegOffset != null) {
              dlen = off + len - jpegData.jpegOffset;
              buff = new Uint8Array(dlen);
              for (i = 0; i < dlen; i++) buff[i] = data[jpegData.jpegOffset + i];
            } else {
              tlen = jpegData.tables.length;
              buff = new Uint8Array(tlen + jpegData.sosMarker.length + len + 2);
              buff.set(jpegData.tables);
              buffoff = tlen;
              buff[jpegData.sofPosition + 5] = img.height >>> 8 & 255;
              buff[jpegData.sofPosition + 6] = img.height & 255;
              buff[jpegData.sofPosition + 7] = img.width >>> 8 & 255;
              buff[jpegData.sofPosition + 8] = img.width & 255;
              if (data[off] != 255 || data[off + 1] != SOS) {
                buff.set(jpegData.sosMarker, buffoff);
                buffoff += sosMarker.length;
              }
              for (i = 0; i < len; i++) buff[buffoff++] = data[off + i];
              buff[buffoff++] = 255;
              buff[buffoff++] = EOI;
            }
            var parser = new UTIF3.JpegDecoder();
            parser.parse(buff);
            var decoded = parser.getData(parser.width, parser.height);
            for (var i = 0; i < decoded.length; i++) tgt[toff + i] = decoded[i];
            if (img["t262"] && img["t262"][0] == 6) img["t262"][0] = 2;
          };
          UTIF3.decode._decodePackBits = function(data, off, len, tgt, toff) {
            var sa = new Int8Array(data.buffer), ta = new Int8Array(tgt.buffer), lim = off + len;
            while (off < lim) {
              var n = sa[off];
              off++;
              if (n >= 0 && n < 128) for (var i = 0; i < n + 1; i++) {
                ta[toff] = sa[off];
                toff++;
                off++;
              }
              if (n >= -127 && n < 0) {
                for (var i = 0; i < -n + 1; i++) {
                  ta[toff] = sa[off];
                  toff++;
                }
                off++;
              }
            }
          };
          UTIF3.decode._decodeThunder = function(data, off, len, tgt, toff) {
            var d2 = [0, 1, 0, -1], d3 = [0, 1, 2, 3, 0, -3, -2, -1];
            var lim = off + len, qoff = toff * 2, px = 0;
            while (off < lim) {
              var b = data[off], msk = b >>> 6, n = b & 63;
              off++;
              if (msk == 3) {
                px = n & 15;
                tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1);
                qoff++;
              }
              if (msk == 0) for (var i = 0; i < n; i++) {
                tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1);
                qoff++;
              }
              if (msk == 2) for (var i = 0; i < 2; i++) {
                var d = n >>> 3 * (1 - i) & 7;
                if (d != 4) {
                  px += d3[d];
                  tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1);
                  qoff++;
                }
              }
              if (msk == 1) for (var i = 0; i < 3; i++) {
                var d = n >>> 2 * (2 - i) & 3;
                if (d != 2) {
                  px += d2[d];
                  tgt[qoff >>> 1] |= px << 4 * (1 - qoff & 1);
                  qoff++;
                }
              }
            }
          };
          UTIF3.decode._dmap = { "1": 0, "011": 1, "000011": 2, "0000011": 3, "010": -1, "000010": -2, "0000010": -3 };
          UTIF3.decode._lens = (function() {
            var addKeys = function(lens, arr, i0, inc) {
              for (var i = 0; i < arr.length; i++) lens[arr[i]] = i0 + i * inc;
            };
            var termW = "00110101,000111,0111,1000,1011,1100,1110,1111,10011,10100,00111,01000,001000,000011,110100,110101,101010,101011,0100111,0001100,0001000,0010111,0000011,0000100,0101000,0101011,0010011,0100100,0011000,00000010,00000011,00011010,00011011,00010010,00010011,00010100,00010101,00010110,00010111,00101000,00101001,00101010,00101011,00101100,00101101,00000100,00000101,00001010,00001011,01010010,01010011,01010100,01010101,00100100,00100101,01011000,01011001,01011010,01011011,01001010,01001011,00110010,00110011,00110100";
            var termB = "0000110111,010,11,10,011,0011,0010,00011,000101,000100,0000100,0000101,0000111,00000100,00000111,000011000,0000010111,0000011000,0000001000,00001100111,00001101000,00001101100,00000110111,00000101000,00000010111,00000011000,000011001010,000011001011,000011001100,000011001101,000001101000,000001101001,000001101010,000001101011,000011010010,000011010011,000011010100,000011010101,000011010110,000011010111,000001101100,000001101101,000011011010,000011011011,000001010100,000001010101,000001010110,000001010111,000001100100,000001100101,000001010010,000001010011,000000100100,000000110111,000000111000,000000100111,000000101000,000001011000,000001011001,000000101011,000000101100,000001011010,000001100110,000001100111";
            var makeW = "11011,10010,010111,0110111,00110110,00110111,01100100,01100101,01101000,01100111,011001100,011001101,011010010,011010011,011010100,011010101,011010110,011010111,011011000,011011001,011011010,011011011,010011000,010011001,010011010,011000,010011011";
            var makeB = "0000001111,000011001000,000011001001,000001011011,000000110011,000000110100,000000110101,0000001101100,0000001101101,0000001001010,0000001001011,0000001001100,0000001001101,0000001110010,0000001110011,0000001110100,0000001110101,0000001110110,0000001110111,0000001010010,0000001010011,0000001010100,0000001010101,0000001011010,0000001011011,0000001100100,0000001100101";
            var makeA = "00000001000,00000001100,00000001101,000000010010,000000010011,000000010100,000000010101,000000010110,000000010111,000000011100,000000011101,000000011110,000000011111";
            termW = termW.split(",");
            termB = termB.split(",");
            makeW = makeW.split(",");
            makeB = makeB.split(",");
            makeA = makeA.split(",");
            var lensW = {}, lensB = {};
            addKeys(lensW, termW, 0, 1);
            addKeys(lensW, makeW, 64, 64);
            addKeys(lensW, makeA, 1792, 64);
            addKeys(lensB, termB, 0, 1);
            addKeys(lensB, makeB, 64, 64);
            addKeys(lensB, makeA, 1792, 64);
            return [lensW, lensB];
          })();
          UTIF3.decode._decodeG4 = function(data, off, slen, tgt, toff, w, fo) {
            var U = UTIF3.decode, boff = off << 3, len = 0, wrd = "";
            var line = [], pline = [];
            for (var i = 0; i < w; i++) pline.push(0);
            pline = U._makeDiff(pline);
            var a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, clr = 0;
            var y = 0, mode = "", toRead = 0;
            var bipl = Math.ceil(w / 8) * 8;
            while (boff >>> 3 < off + slen) {
              b1 = U._findDiff(pline, a0 + (a0 == 0 ? 0 : 1), 1 - clr), b2 = U._findDiff(pline, b1, clr);
              var bit = 0;
              if (fo == 1) bit = data[boff >>> 3] >>> 7 - (boff & 7) & 1;
              if (fo == 2) bit = data[boff >>> 3] >>> (boff & 7) & 1;
              boff++;
              wrd += bit;
              if (mode == "H") {
                if (U._lens[clr][wrd] != null) {
                  var dl = U._lens[clr][wrd];
                  wrd = "";
                  len += dl;
                  if (dl < 64) {
                    U._addNtimes(line, len, clr);
                    a0 += len;
                    clr = 1 - clr;
                    len = 0;
                    toRead--;
                    if (toRead == 0) mode = "";
                  }
                }
              } else {
                if (wrd == "0001") {
                  wrd = "";
                  U._addNtimes(line, b2 - a0, clr);
                  a0 = b2;
                }
                if (wrd == "001") {
                  wrd = "";
                  mode = "H";
                  toRead = 2;
                }
                if (U._dmap[wrd] != null) {
                  a1 = b1 + U._dmap[wrd];
                  U._addNtimes(line, a1 - a0, clr);
                  a0 = a1;
                  wrd = "";
                  clr = 1 - clr;
                }
              }
              if (line.length == w && mode == "") {
                U._writeBits(line, tgt, toff * 8 + y * bipl);
                clr = 0;
                y++;
                a0 = 0;
                pline = U._makeDiff(line);
                line = [];
              }
            }
          };
          UTIF3.decode._findDiff = function(line, x, clr) {
            for (var i = 0; i < line.length; i += 2) if (line[i] >= x && line[i + 1] == clr) return line[i];
          };
          UTIF3.decode._makeDiff = function(line) {
            var out = [];
            if (line[0] == 1) out.push(0, 1);
            for (var i = 1; i < line.length; i++) if (line[i - 1] != line[i]) out.push(i, line[i]);
            out.push(line.length, 0, line.length, 1);
            return out;
          };
          UTIF3.decode._decodeG3 = function(data, off, slen, tgt, toff, w, fo) {
            var U = UTIF3.decode, boff = off << 3, len = 0, wrd = "";
            var line = [], pline = [];
            for (var i = 0; i < w; i++) line.push(0);
            var a0 = 0, a1 = 0, a2 = 0, b1 = 0, b2 = 0, clr = 0;
            var y = -1, mode = "", toRead = 0, is1D = false;
            var bipl = Math.ceil(w / 8) * 8;
            while (boff >>> 3 < off + slen) {
              b1 = U._findDiff(pline, a0 + (a0 == 0 ? 0 : 1), 1 - clr), b2 = U._findDiff(pline, b1, clr);
              var bit = 0;
              if (fo == 1) bit = data[boff >>> 3] >>> 7 - (boff & 7) & 1;
              if (fo == 2) bit = data[boff >>> 3] >>> (boff & 7) & 1;
              boff++;
              wrd += bit;
              if (is1D) {
                if (U._lens[clr][wrd] != null) {
                  var dl = U._lens[clr][wrd];
                  wrd = "";
                  len += dl;
                  if (dl < 64) {
                    U._addNtimes(line, len, clr);
                    clr = 1 - clr;
                    len = 0;
                  }
                }
              } else {
                if (mode == "H") {
                  if (U._lens[clr][wrd] != null) {
                    var dl = U._lens[clr][wrd];
                    wrd = "";
                    len += dl;
                    if (dl < 64) {
                      U._addNtimes(line, len, clr);
                      a0 += len;
                      clr = 1 - clr;
                      len = 0;
                      toRead--;
                      if (toRead == 0) mode = "";
                    }
                  }
                } else {
                  if (wrd == "0001") {
                    wrd = "";
                    U._addNtimes(line, b2 - a0, clr);
                    a0 = b2;
                  }
                  if (wrd == "001") {
                    wrd = "";
                    mode = "H";
                    toRead = 2;
                  }
                  if (U._dmap[wrd] != null) {
                    a1 = b1 + U._dmap[wrd];
                    U._addNtimes(line, a1 - a0, clr);
                    a0 = a1;
                    wrd = "";
                    clr = 1 - clr;
                  }
                }
              }
              if (wrd.endsWith("000000000001")) {
                if (y >= 0) U._writeBits(line, tgt, toff * 8 + y * bipl);
                if (fo == 1) is1D = (data[boff >>> 3] >>> 7 - (boff & 7) & 1) == 1;
                if (fo == 2) is1D = (data[boff >>> 3] >>> (boff & 7) & 1) == 1;
                boff++;
                if (U._decodeG3.allow2D == null) U._decodeG3.allow2D = is1D;
                if (!U._decodeG3.allow2D) {
                  is1D = true;
                  boff--;
                }
                wrd = "";
                clr = 0;
                y++;
                a0 = 0;
                pline = U._makeDiff(line);
                line = [];
              }
            }
            if (line.length == w) U._writeBits(line, tgt, toff * 8 + y * bipl);
          };
          UTIF3.decode._addNtimes = function(arr, n, val) {
            for (var i = 0; i < n; i++) arr.push(val);
          };
          UTIF3.decode._writeBits = function(bits, tgt, boff) {
            for (var i = 0; i < bits.length; i++) tgt[boff + i >>> 3] |= bits[i] << 7 - (boff + i & 7);
          };
          UTIF3.decode._decodeLZW = function(data, off, tgt, toff) {
            if (UTIF3.decode._lzwTab == null) {
              var tb = new Uint32Array(65535), tn = new Uint16Array(65535), chr = new Uint8Array(2e6);
              for (var i = 0; i < 256; i++) {
                chr[i << 2] = i;
                tb[i] = i << 2;
                tn[i] = 1;
              }
              UTIF3.decode._lzwTab = [tb, tn, chr];
            }
            var copy = UTIF3.decode._copyData;
            var tab = UTIF3.decode._lzwTab[0], tln = UTIF3.decode._lzwTab[1], chr = UTIF3.decode._lzwTab[2], totl = 258, chrl = 258 << 2;
            var bits = 9, boff = off << 3;
            var ClearCode = 256, EoiCode = 257;
            var v = 0, Code = 0, OldCode = 0;
            while (true) {
              v = data[boff >>> 3] << 16 | data[boff + 8 >>> 3] << 8 | data[boff + 16 >>> 3];
              Code = v >> 24 - (boff & 7) - bits & (1 << bits) - 1;
              boff += bits;
              if (Code == EoiCode) break;
              if (Code == ClearCode) {
                bits = 9;
                totl = 258;
                chrl = 258 << 2;
                v = data[boff >>> 3] << 16 | data[boff + 8 >>> 3] << 8 | data[boff + 16 >>> 3];
                Code = v >> 24 - (boff & 7) - bits & (1 << bits) - 1;
                boff += bits;
                if (Code == EoiCode) break;
                tgt[toff] = Code;
                toff++;
              } else if (Code < totl) {
                var cd = tab[Code], cl = tln[Code];
                copy(chr, cd, tgt, toff, cl);
                toff += cl;
                if (OldCode >= totl) {
                  tab[totl] = chrl;
                  chr[tab[totl]] = cd[0];
                  tln[totl] = 1;
                  chrl = chrl + 1 + 3 & ~3;
                  totl++;
                } else {
                  tab[totl] = chrl;
                  var nit = tab[OldCode], nil = tln[OldCode];
                  copy(chr, nit, chr, chrl, nil);
                  chr[chrl + nil] = chr[cd];
                  nil++;
                  tln[totl] = nil;
                  totl++;
                  chrl = chrl + nil + 3 & ~3;
                }
                if (totl + 1 == 1 << bits) bits++;
              } else {
                if (OldCode >= totl) {
                  tab[totl] = chrl;
                  tln[totl] = 0;
                  totl++;
                } else {
                  tab[totl] = chrl;
                  var nit = tab[OldCode], nil = tln[OldCode];
                  copy(chr, nit, chr, chrl, nil);
                  chr[chrl + nil] = chr[chrl];
                  nil++;
                  tln[totl] = nil;
                  totl++;
                  copy(chr, chrl, tgt, toff, nil);
                  toff += nil;
                  chrl = chrl + nil + 3 & ~3;
                }
                if (totl + 1 == 1 << bits) bits++;
              }
              OldCode = Code;
            }
          };
          UTIF3.decode._copyData = function(s, so, t, to, l) {
            for (var i = 0; i < l; i += 4) {
              t[to + i] = s[so + i];
              t[to + i + 1] = s[so + i + 1];
              t[to + i + 2] = s[so + i + 2];
              t[to + i + 3] = s[so + i + 3];
            }
          };
          UTIF3.tags = {};
          UTIF3.ttypes = { 256: 3, 257: 3, 258: 3, 259: 3, 262: 3, 273: 4, 274: 3, 277: 3, 278: 4, 279: 4, 282: 5, 283: 5, 284: 3, 286: 5, 287: 5, 296: 3, 305: 2, 306: 2, 338: 3, 513: 4, 514: 4, 34665: 4 };
          UTIF3._readIFD = function(bin, data, offset, ifds, depth, debug) {
            var cnt = bin.readUshort(data, offset);
            offset += 2;
            var ifd = {};
            ifds.push(ifd);
            if (debug) log("   ".repeat(depth), ifds.length - 1, ">>>----------------");
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
              if (type == 1 || type == 7) {
                arr = new Uint8Array(data.buffer, num < 5 ? offset - 4 : voff, num);
              }
              if (type == 2) {
                var o0 = num < 5 ? offset - 4 : voff, c = data[o0];
                if (c < 128) arr.push(bin.readASCII(data, o0, num - 1));
                else arr = new Uint8Array(data.buffer, o0, num - 1);
              }
              if (type == 3) {
                for (var j = 0; j < num; j++) arr.push(bin.readUshort(data, (num < 3 ? offset - 4 : voff) + 2 * j));
              }
              if (type == 4) {
                for (var j = 0; j < num; j++) arr.push(bin.readUint(data, (num < 2 ? offset - 4 : voff) + 4 * j));
              }
              if (type == 5) {
                for (var j = 0; j < num; j++) arr.push(bin.readUint(data, voff + j * 8) / bin.readUint(data, voff + j * 8 + 4));
              }
              if (type == 8) {
                for (var j = 0; j < num; j++) arr.push(bin.readShort(data, (num < 3 ? offset - 4 : voff) + 2 * j));
              }
              if (type == 9) {
                for (var j = 0; j < num; j++) arr.push(bin.readInt(data, (num < 2 ? offset - 4 : voff) + 4 * j));
              }
              if (type == 10) {
                for (var j = 0; j < num; j++) arr.push(bin.readInt(data, voff + j * 8) / bin.readInt(data, voff + j * 8 + 4));
              }
              if (type == 11) {
                for (var j = 0; j < num; j++) arr.push(bin.readFloat(data, voff + j * 4));
              }
              if (type == 12) {
                for (var j = 0; j < num; j++) arr.push(bin.readDouble(data, voff + j * 8));
              }
              ifd["t" + tag] = arr;
              if (num != 0 && arr.length == 0) {
                log("unknown TIFF tag type: ", type, "num:", num);
              }
              if (debug) log("   ".repeat(depth), tag, type, UTIF3.tags[tag], arr);
              if (tag == 330 && ifd["t272"] && ifd["t272"][0] == "DSLR-A100") {
              } else if (tag == 330 || tag == 34665 || tag == 50740 && bin.readUshort(data, bin.readUint(arr, 0)) < 300) {
                var oarr = tag == 50740 ? [bin.readUint(arr, 0)] : arr;
                var subfd = [];
                for (var j = 0; j < oarr.length; j++) UTIF3._readIFD(bin, data, oarr[j], subfd, depth + 1, debug);
                if (tag == 330) ifd.subIFD = subfd;
                if (tag == 34665) ifd.exifIFD = subfd[0];
                if (tag == 50740) ifd.dngPrvt = subfd[0];
              }
              if (tag == 37500) {
                var mn = arr;
                if (bin.readASCII(mn, 0, 5) == "Nikon") ifd.makerNote = UTIF3["decode"](mn.slice(10).buffer)[0];
                else if (bin.readUshort(data, voff) < 300) {
                  var subsub = [];
                  UTIF3._readIFD(bin, data, voff, subsub, depth + 1, debug);
                  ifd.makerNote = subsub[0];
                }
              }
            }
            if (debug) log("   ".repeat(depth), "<<<---------------");
            return offset;
          };
          UTIF3._writeIFD = function(bin, data, offset, ifd) {
            var keys = Object.keys(ifd);
            bin.writeUshort(data, offset, keys.length);
            offset += 2;
            var eoff = offset + keys.length * 12 + 4;
            for (var ki = 0; ki < keys.length; ki++) {
              var key = keys[ki];
              var tag = parseInt(key.slice(1)), type = UTIF3.ttypes[tag];
              if (type == null) throw new Error("unknown type of tag: " + tag);
              var val = ifd[key];
              if (type == 2) val = val[0] + "\0";
              var num = val.length;
              bin.writeUshort(data, offset, tag);
              offset += 2;
              bin.writeUshort(data, offset, type);
              offset += 2;
              bin.writeUint(data, offset, num);
              offset += 4;
              var dlen = [-1, 1, 1, 2, 4, 8, 0, 0, 0, 0, 0, 0, 8][type] * num;
              var toff = offset;
              if (dlen > 4) {
                bin.writeUint(data, offset, eoff);
                toff = eoff;
              }
              if (type == 2) {
                bin.writeASCII(data, toff, val);
              }
              if (type == 3) {
                for (var i = 0; i < num; i++) bin.writeUshort(data, toff + 2 * i, val[i]);
              }
              if (type == 4) {
                for (var i = 0; i < num; i++) bin.writeUint(data, toff + 4 * i, val[i]);
              }
              if (type == 5) {
                for (var i = 0; i < num; i++) {
                  bin.writeUint(data, toff + 8 * i, Math.round(val[i] * 1e4));
                  bin.writeUint(data, toff + 8 * i + 4, 1e4);
                }
              }
              if (type == 12) {
                for (var i = 0; i < num; i++) bin.writeDouble(data, toff + 8 * i, val[i]);
              }
              if (dlen > 4) {
                dlen += dlen & 1;
                eoff += dlen;
              }
              offset += 4;
            }
            return [offset, eoff];
          };
          UTIF3.toRGBA8 = function(out) {
            var w = out.width, h = out.height, area = w * h, qarea = area * 4, data = out.data;
            var img = new Uint8Array(area * 4);
            var intp = out["t262"] ? out["t262"][0] : 2, bps = out["t258"] ? Math.min(32, out["t258"][0]) : 1;
            if (false) {
            } else if (intp == 0) {
              var bpl = Math.ceil(bps * w / 8);
              for (var y = 0; y < h; y++) {
                var off = y * bpl, io = y * w;
                if (bps == 1) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 3)] >> 7 - (i & 7) & 1;
                  img[qi] = img[qi + 1] = img[qi + 2] = (1 - px) * 255;
                  img[qi + 3] = 255;
                }
                if (bps == 4) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 1)] >> 4 - 4 * (i & 1) & 15;
                  img[qi] = img[qi + 1] = img[qi + 2] = (15 - px) * 17;
                  img[qi + 3] = 255;
                }
                if (bps == 8) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + i];
                  img[qi] = img[qi + 1] = img[qi + 2] = 255 - px;
                  img[qi + 3] = 255;
                }
              }
            } else if (intp == 1) {
              var bpl = Math.ceil(bps * w / 8);
              for (var y = 0; y < h; y++) {
                var off = y * bpl, io = y * w;
                if (bps == 1) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 3)] >> 7 - (i & 7) & 1;
                  img[qi] = img[qi + 1] = img[qi + 2] = px * 255;
                  img[qi + 3] = 255;
                }
                if (bps == 2) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (i >> 2)] >> 6 - 2 * (i & 3) & 3;
                  img[qi] = img[qi + 1] = img[qi + 2] = px * 85;
                  img[qi + 3] = 255;
                }
                if (bps == 8) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + i];
                  img[qi] = img[qi + 1] = img[qi + 2] = px;
                  img[qi + 3] = 255;
                }
                if (bps == 16) for (var i = 0; i < w; i++) {
                  var qi = io + i << 2, px = data[off + (2 * i + 1)];
                  img[qi] = img[qi + 1] = img[qi + 2] = Math.min(255, px);
                  img[qi + 3] = 255;
                }
              }
            } else if (intp == 2) {
              var smpls = out["t258"] ? out["t258"].length : 3;
              if (bps == 8) {
                if (smpls == 4) for (var i = 0; i < qarea; i++) img[i] = data[i];
                if (smpls == 3) for (var i = 0; i < area; i++) {
                  var qi = i << 2, ti = i * 3;
                  img[qi] = data[ti];
                  img[qi + 1] = data[ti + 1];
                  img[qi + 2] = data[ti + 2];
                  img[qi + 3] = 255;
                }
              } else {
                if (smpls == 4) for (var i = 0; i < area; i++) {
                  var qi = i << 2, ti = i * 8 + 1;
                  img[qi] = data[ti];
                  img[qi + 1] = data[ti + 2];
                  img[qi + 2] = data[ti + 4];
                  img[qi + 3] = data[ti + 6];
                }
                if (smpls == 3) for (var i = 0; i < area; i++) {
                  var qi = i << 2, ti = i * 6 + 1;
                  img[qi] = data[ti];
                  img[qi + 1] = data[ti + 2];
                  img[qi + 2] = data[ti + 4];
                  img[qi + 3] = 255;
                }
              }
            } else if (intp == 3) {
              var map = out["t320"];
              for (var i = 0; i < area; i++) {
                var qi = i << 2, mi = data[i];
                img[qi] = map[mi] >> 8;
                img[qi + 1] = map[256 + mi] >> 8;
                img[qi + 2] = map[512 + mi] >> 8;
                img[qi + 3] = 255;
              }
            } else if (intp == 5) {
              var smpls = out["t258"] ? out["t258"].length : 4;
              var gotAlpha = smpls > 4 ? 1 : 0;
              for (var i = 0; i < area; i++) {
                var qi = i << 2, si = i * smpls;
                var C = 255 - data[si], M = 255 - data[si + 1], Y = 255 - data[si + 2], K = (255 - data[si + 3]) * (1 / 255);
                img[qi] = ~~(C * K + 0.5);
                img[qi + 1] = ~~(M * K + 0.5);
                img[qi + 2] = ~~(Y * K + 0.5);
                img[qi + 3] = 255 * (1 - gotAlpha) + data[si + 4] * gotAlpha;
              }
            } else log("Unknown Photometric interpretation: " + intp);
            return img;
          };
          UTIF3.replaceIMG = function(imgs) {
            if (imgs == null) imgs = document.getElementsByTagName("img");
            var sufs = ["tif", "tiff", "dng", "cr2", "nef"];
            for (var i = 0; i < imgs.length; i++) {
              var img = imgs[i], src = img.getAttribute("src");
              if (src == null) continue;
              var suff = src.split(".").pop().toLowerCase();
              if (sufs.indexOf(suff) == -1) continue;
              var xhr = new XMLHttpRequest();
              UTIF3._xhrs.push(xhr);
              UTIF3._imgs.push(img);
              xhr.open("GET", src);
              xhr.responseType = "arraybuffer";
              xhr.onload = UTIF3._imgLoaded;
              xhr.send();
            }
          };
          UTIF3._xhrs = [];
          UTIF3._imgs = [];
          UTIF3._imgLoaded = function(e) {
            var buff = e.target.response;
            var ifds = UTIF3.decode(buff);
            var vsns = ifds, ma = 0, page = vsns[0];
            if (ifds[0].subIFD) vsns = vsns.concat(ifds[0].subIFD);
            for (var i = 0; i < vsns.length; i++) {
              var img = vsns[i];
              if (img["t258"] == null || img["t258"].length < 3) continue;
              var ar = img["t256"] * img["t257"];
              if (ar > ma) {
                ma = ar;
                page = img;
              }
            }
            UTIF3.decodeImage(buff, page, ifds);
            var rgba = UTIF3.toRGBA8(page), w = page.width, h = page.height;
            var ind = UTIF3._xhrs.indexOf(e.target), img = UTIF3._imgs[ind];
            UTIF3._xhrs.splice(ind, 1);
            UTIF3._imgs.splice(ind, 1);
            var cnv = document.createElement("canvas");
            cnv.width = w;
            cnv.height = h;
            var ctx2 = cnv.getContext("2d"), imgd = ctx2.createImageData(w, h);
            for (var i = 0; i < rgba.length; i++) imgd.data[i] = rgba[i];
            ctx2.putImageData(imgd, 0, 0);
            img.setAttribute("src", cnv.toDataURL());
          };
          UTIF3._binBE = {
            nextZero: function(data, o) {
              while (data[o] != 0) o++;
              return o;
            },
            readUshort: function(buff, p) {
              return buff[p] << 8 | buff[p + 1];
            },
            readShort: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              a[0] = buff[p + 1];
              a[1] = buff[p + 0];
              return UTIF3._binBE.i16[0];
            },
            readInt: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              a[0] = buff[p + 3];
              a[1] = buff[p + 2];
              a[2] = buff[p + 1];
              a[3] = buff[p + 0];
              return UTIF3._binBE.i32[0];
            },
            readUint: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              a[0] = buff[p + 3];
              a[1] = buff[p + 2];
              a[2] = buff[p + 1];
              a[3] = buff[p + 0];
              return UTIF3._binBE.ui32[0];
            },
            readASCII: function(buff, p, l) {
              var s = "";
              for (var i = 0; i < l; i++) s += String.fromCharCode(buff[p + i]);
              return s;
            },
            readFloat: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              for (var i = 0; i < 4; i++) a[i] = buff[p + 3 - i];
              return UTIF3._binBE.fl32[0];
            },
            readDouble: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              for (var i = 0; i < 8; i++) a[i] = buff[p + 7 - i];
              return UTIF3._binBE.fl64[0];
            },
            writeUshort: function(buff, p, n) {
              buff[p] = n >> 8 & 255;
              buff[p + 1] = n & 255;
            },
            writeUint: function(buff, p, n) {
              buff[p] = n >> 24 & 255;
              buff[p + 1] = n >> 16 & 255;
              buff[p + 2] = n >> 8 & 255;
              buff[p + 3] = n >> 0 & 255;
            },
            writeASCII: function(buff, p, s) {
              for (var i = 0; i < s.length; i++) buff[p + i] = s.charCodeAt(i);
            },
            writeDouble: function(buff, p, n) {
              UTIF3._binBE.fl64[0] = n;
              for (var i = 0; i < 8; i++) buff[p + i] = UTIF3._binBE.ui8[7 - i];
            }
          };
          UTIF3._binBE.ui8 = new Uint8Array(8);
          UTIF3._binBE.i16 = new Int16Array(UTIF3._binBE.ui8.buffer);
          UTIF3._binBE.i32 = new Int32Array(UTIF3._binBE.ui8.buffer);
          UTIF3._binBE.ui32 = new Uint32Array(UTIF3._binBE.ui8.buffer);
          UTIF3._binBE.fl32 = new Float32Array(UTIF3._binBE.ui8.buffer);
          UTIF3._binBE.fl64 = new Float64Array(UTIF3._binBE.ui8.buffer);
          UTIF3._binLE = {
            nextZero: UTIF3._binBE.nextZero,
            readUshort: function(buff, p) {
              return buff[p + 1] << 8 | buff[p];
            },
            readShort: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              a[0] = buff[p + 0];
              a[1] = buff[p + 1];
              return UTIF3._binBE.i16[0];
            },
            readInt: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              a[0] = buff[p + 0];
              a[1] = buff[p + 1];
              a[2] = buff[p + 2];
              a[3] = buff[p + 3];
              return UTIF3._binBE.i32[0];
            },
            readUint: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              a[0] = buff[p + 0];
              a[1] = buff[p + 1];
              a[2] = buff[p + 2];
              a[3] = buff[p + 3];
              return UTIF3._binBE.ui32[0];
            },
            readASCII: UTIF3._binBE.readASCII,
            readFloat: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              for (var i = 0; i < 4; i++) a[i] = buff[p + i];
              return UTIF3._binBE.fl32[0];
            },
            readDouble: function(buff, p) {
              var a = UTIF3._binBE.ui8;
              for (var i = 0; i < 8; i++) a[i] = buff[p + i];
              return UTIF3._binBE.fl64[0];
            }
          };
          UTIF3._copyTile = function(tb, tw, th, b, w, h, xoff, yoff) {
            var xlim = Math.min(tw, w - xoff);
            var ylim = Math.min(th, h - yoff);
            for (var y = 0; y < ylim; y++) {
              var tof = (yoff + y) * w + xoff;
              var sof = y * tw;
              for (var x = 0; x < xlim; x++) b[tof + x] = tb[sof + x];
            }
          };
          UTIF3.LosslessJpegDecode = (function() {
            function t(Z) {
              this.w = Z;
              this.N = 0;
              this._ = 0;
              this.G = 0;
            }
            t.prototype = { t: function(Z) {
              this.N = Math.max(0, Math.min(this.w.length, Z));
            }, i: function() {
              return this.w[this.N++];
            }, l: function() {
              var Z = this.N;
              this.N += 2;
              return this.w[Z] << 8 | this.w[Z + 1];
            }, J: function() {
              if (this._ == 0) {
                this.G = this.w[this.N];
                this.N += 1 + (this.G + 1 >>> 8);
                this._ = 8;
              }
              return this.G >>> --this._ & 1;
            }, Z: function(Z) {
              var X = this._, s = this.G, E = Math.min(X, Z);
              Z -= E;
              X -= E;
              var Y = s >>> X & (1 << E) - 1;
              while (Z > 0) {
                s = this.w[this.N];
                this.N += 1 + (s + 1 >>> 8);
                E = Math.min(8, Z);
                Z -= E;
                X = 8 - E;
                Y <<= E;
                Y |= s >>> X & (1 << E) - 1;
              }
              this._ = X;
              this.G = s;
              return Y;
            } };
            var i = {};
            i.X = function() {
              return [0, 0, -1];
            };
            i.s = function(Z, X, s) {
              Z[i.Y(Z, 0, s) + 2] = X;
            };
            i.Y = function(Z, X, s) {
              if (Z[X + 2] != -1) return 0;
              if (s == 0) return X;
              for (var E = 0; E < 2; E++) {
                if (Z[X + E] == 0) {
                  Z[X + E] = Z.length;
                  Z.push(0);
                  Z.push(0);
                  Z.push(-1);
                }
                var Y = i.Y(Z, Z[X + E], s - 1);
                if (Y != 0) return Y;
              }
              return 0;
            };
            i.B = function(Z, X) {
              var s = 0, E = 0, Y = 0, B = X._, $ = X.G, e = X.N;
              while (true) {
                if (B == 0) {
                  $ = X.w[e];
                  e += 1 + ($ + 1 >>> 8);
                  B = 8;
                }
                Y = $ >>> --B & 1;
                s = Z[s + Y];
                E = Z[s + 2];
                if (E != -1) {
                  X._ = B;
                  X.G = $;
                  X.N = e;
                  return E;
                }
              }
              return -1;
            };
            function l(Z) {
              this.z = new t(Z);
              this.D(this.z);
            }
            l.prototype = { $: function(Z, X) {
              this.Q = Z.i();
              this.F = Z.l();
              this.o = Z.l();
              var s = this.O = Z.i();
              this.L = [];
              for (var E = 0; E < s; E++) {
                var Y = Z.i(), B = Z.i();
                Z.i();
                this.L[Y] = E;
              }
              Z.t(Z.N + X - (6 + s * 3));
            }, e: function() {
              var Z = 0, X = this.z.i();
              if (this.H == null) this.H = {};
              var s = this.H[X] = i.X(), E = [];
              for (var Y = 0; Y < 16; Y++) {
                E[Y] = this.z.i();
                Z += E[Y];
              }
              for (var Y = 0; Y < 16; Y++) for (var B = 0; B < E[Y]; B++) i.s(s, this.z.i(), Y + 1);
              return Z + 17;
            }, W: function(Z) {
              while (Z > 0) Z -= this.e();
            }, p: function(Z, X) {
              var s = Z.i();
              if (!this.U) {
                this.U = [];
              }
              for (var E = 0; E < s; E++) {
                var Y = Z.i(), B = Z.i();
                this.U[this.L[Y]] = this.H[B >>> 4];
              }
              this.g = Z.i();
              Z.t(Z.N + X - (2 + s * 2));
            }, D: function(Z) {
              var X = false, s = Z.l();
              if (s !== l.q) return;
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
                    this.p(Z, E);
                    X = true;
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
              if ((E & 1 << s - 1) == 0) E -= (1 << s) - 1;
              return E;
            }, B: function(Z, X) {
              var s = this.z, E = this.O, Y = this.F, B = this.I, $ = this.g, e = this.o * E, W = this.U;
              for (var p = 0; p < E; p++) {
                Z[p] = B(s, W[p]) + (1 << this.Q - 1);
              }
              for (var D = E; D < e; D += E) {
                for (var p = 0; p < E; p++) Z[D + p] = B(s, W[p]) + Z[D + p - E];
              }
              var I = X;
              for (var m = 1; m < Y; m++) {
                for (var p = 0; p < E; p++) {
                  Z[I + p] = B(s, W[p]) + Z[I + p - X];
                }
                for (var D = E; D < e; D += E) {
                  for (var p = 0; p < E; p++) {
                    var K = I + D + p, q = Z[K - E];
                    if ($ == 6) q = Z[K - X] + (q - Z[K - E - X] >>> 1);
                    Z[K] = q + B(s, W[p]);
                  }
                }
                I += X;
              }
            } };
            l.m = 65475;
            l.K = 65476;
            l.q = 65496;
            l.V = 65498;
            function J(Z) {
              var X = new l(Z), s = X.Q > 8 ? Uint16Array : Uint8Array, E = new s(X.o * X.F * X.O), Y = X.o * X.O;
              X.B(E, Y);
              return E;
            }
            return J;
          })();
        })(UTIF2, pako);
      })();
    }
  });

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/conventions.js
  var require_conventions = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
      "use strict";
      function find(list, predicate, ac) {
        if (ac === void 0) {
          ac = Array.prototype;
        }
        if (list && typeof ac.find === "function") {
          return ac.find.call(list, predicate);
        }
        for (var i = 0; i < list.length; i++) {
          if (hasOwn(list, i)) {
            var item = list[i];
            if (predicate.call(void 0, item, i, list)) {
              return item;
            }
          }
        }
      }
      function freeze(object, oc) {
        if (oc === void 0) {
          oc = Object;
        }
        if (oc && typeof oc.getOwnPropertyDescriptors === "function") {
          object = oc.create(null, oc.getOwnPropertyDescriptors(object));
        }
        return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
      }
      function hasOwn(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
      }
      function assign(target, source) {
        if (target === null || typeof target !== "object") {
          throw new TypeError("target is not an object");
        }
        for (var key in source) {
          if (hasOwn(source, key)) {
            target[key] = source[key];
          }
        }
        return target;
      }
      var HTML_BOOLEAN_ATTRIBUTES = freeze({
        allowfullscreen: true,
        async: true,
        autofocus: true,
        autoplay: true,
        checked: true,
        controls: true,
        default: true,
        defer: true,
        disabled: true,
        formnovalidate: true,
        hidden: true,
        ismap: true,
        itemscope: true,
        loop: true,
        multiple: true,
        muted: true,
        nomodule: true,
        novalidate: true,
        open: true,
        playsinline: true,
        readonly: true,
        required: true,
        reversed: true,
        selected: true
      });
      function isHTMLBooleanAttribute(name) {
        return hasOwn(HTML_BOOLEAN_ATTRIBUTES, name.toLowerCase());
      }
      var HTML_VOID_ELEMENTS = freeze({
        area: true,
        base: true,
        br: true,
        col: true,
        embed: true,
        hr: true,
        img: true,
        input: true,
        link: true,
        meta: true,
        param: true,
        source: true,
        track: true,
        wbr: true
      });
      function isHTMLVoidElement(tagName) {
        return hasOwn(HTML_VOID_ELEMENTS, tagName.toLowerCase());
      }
      var HTML_RAW_TEXT_ELEMENTS = freeze({
        script: false,
        style: false,
        textarea: true,
        title: true
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
      });
      var _MIME_TYPES = Object.keys(MIME_TYPE).map(function(key) {
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

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/errors.js
  var require_errors = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/errors.js"(exports) {
      "use strict";
      var conventions = require_conventions();
      function extendError(constructor, writableName) {
        constructor.prototype = Object.create(Error.prototype, {
          constructor: { value: constructor },
          name: { value: constructor.name, enumerable: true, writable: writableName }
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
      });
      var DOMExceptionNames = Object.keys(DOMExceptionName);
      function isValidDomExceptionCode(value) {
        return typeof value === "number" && value >= 1 && value <= 25;
      }
      function endsWithError(value) {
        return typeof value === "string" && value.substring(value.length - DOMExceptionName.Error.length) === DOMExceptionName.Error;
      }
      function DOMException(messageOrCode, nameOrMessage) {
        if (isValidDomExceptionCode(messageOrCode)) {
          this.name = DOMExceptionNames[messageOrCode];
          this.message = nameOrMessage || "";
        } else {
          this.message = messageOrCode;
          this.name = endsWithError(nameOrMessage) ? nameOrMessage : DOMExceptionName.Error;
        }
        if (Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
      }
      extendError(DOMException, true);
      Object.defineProperties(DOMException.prototype, {
        code: {
          enumerable: true,
          get: function() {
            var code = DOMExceptionNames.indexOf(this.name);
            if (isValidDomExceptionCode(code)) return code;
            return 0;
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
      };
      var entries = Object.entries(ExceptionCode);
      for (i = 0; i < entries.length; i++) {
        key = entries[i][0];
        DOMException[key] = entries[i][1];
      }
      var key;
      var i;
      function ParseError(message, locator) {
        this.message = message;
        this.locator = locator;
        if (Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
      }
      extendError(ParseError);
      exports.DOMException = DOMException;
      exports.DOMExceptionName = DOMExceptionName;
      exports.ExceptionCode = ExceptionCode;
      exports.ParseError = ParseError;
    }
  });

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/grammar.js
  var require_grammar = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/grammar.js"(exports) {
      "use strict";
      function detectUnicodeSupport(RegExpImpl) {
        try {
          if (typeof RegExpImpl !== "function") {
            RegExpImpl = RegExp;
          }
          var match = new RegExpImpl("\u{1D306}", "u").exec("\u{1D306}");
          return !!match && match[0].length === 2;
        } catch (error) {
        }
        return false;
      }
      var UNICODE_SUPPORT = detectUnicodeSupport();
      function chars(regexp) {
        if (regexp.source[0] !== "[") {
          throw new Error(regexp + " can not be used with chars");
        }
        return regexp.source.slice(1, regexp.source.lastIndexOf("]"));
      }
      function chars_without(regexp, search) {
        if (regexp.source[0] !== "[") {
          throw new Error("/" + regexp.source + "/ can not be used with chars_without");
        }
        if (!search || typeof search !== "string") {
          throw new Error(JSON.stringify(search) + " is not a valid search");
        }
        if (regexp.source.indexOf(search) === -1) {
          throw new Error('"' + search + '" is not is /' + regexp.source + "/");
        }
        if (search === "-" && regexp.source.indexOf(search) !== 1) {
          throw new Error('"' + search + '" is not at the first postion of /' + regexp.source + "/");
        }
        return new RegExp(regexp.source.replace(search, ""), UNICODE_SUPPORT ? "u" : "");
      }
      function reg(args) {
        var self2 = this;
        return new RegExp(
          Array.prototype.slice.call(arguments).map(function(part) {
            var isStr = typeof part === "string";
            if (isStr && self2 === void 0 && part === "|") {
              throw new Error("use regg instead of reg to wrap expressions with `|`!");
            }
            return isStr ? part : part.source;
          }).join(""),
          UNICODE_SUPPORT ? "mu" : "m"
        );
      }
      function regg(args) {
        if (arguments.length === 0) {
          throw new Error("no parameters provided");
        }
        return reg.apply(regg, ["(?:"].concat(Array.prototype.slice.call(arguments), [")"]));
      }
      var UNICODE_REPLACEMENT_CHARACTER = "\uFFFD";
      var Char = /[-\x09\x0A\x0D\x20-\x2C\x2E-\uD7FF\uE000-\uFFFD]/;
      if (UNICODE_SUPPORT) {
        Char = reg("[", chars(Char), "\\u{10000}-\\u{10FFFF}", "]");
      }
      var InvalidChar = new RegExp("[^" + chars(Char) + "]", UNICODE_SUPPORT ? "u" : "");
      var _SChar = /[\x20\x09\x0D\x0A]/;
      var SChar_s = chars(_SChar);
      var S = reg(_SChar, "+");
      var S_OPT = reg(_SChar, "*");
      var NameStartChar = /[:_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      if (UNICODE_SUPPORT) {
        NameStartChar = reg("[", chars(NameStartChar), "\\u{10000}-\\u{10FFFF}", "]");
      }
      var NameStartChar_s = chars(NameStartChar);
      var NameChar = reg("[", NameStartChar_s, chars(/[-.0-9\xB7]/), chars(/[\u0300-\u036F\u203F-\u2040]/), "]");
      var Name = reg(NameStartChar, NameChar, "*");
      var Nmtoken = reg(NameChar, "+");
      var EntityRef = reg("&", Name, ";");
      var CharRef = regg(/&#[0-9]+;|&#x[0-9a-fA-F]+;/);
      var Reference = regg(EntityRef, "|", CharRef);
      var PEReference = reg("%", Name, ";");
      var EntityValue = regg(
        reg('"', regg(/[^%&"]/, "|", PEReference, "|", Reference), "*", '"'),
        "|",
        reg("'", regg(/[^%&']/, "|", PEReference, "|", Reference), "*", "'")
      );
      var AttValue = regg('"', regg(/[^<&"]/, "|", Reference), "*", '"', "|", "'", regg(/[^<&']/, "|", Reference), "*", "'");
      var NCNameStartChar = chars_without(NameStartChar, ":");
      var NCNameChar = chars_without(NameChar, ":");
      var NCName = reg(NCNameStartChar, NCNameChar, "*");
      var QName = reg(NCName, regg(":", NCName), "?");
      var QName_exact = reg("^", QName, "$");
      var QName_group = reg("(", QName, ")");
      var SystemLiteral = regg(/"[^"]*"|'[^']*'/);
      var PI = reg(/^<\?/, "(", Name, ")", regg(S, "(", Char, "*?)"), "?", /\?>/);
      var PubidChar = /[\x20\x0D\x0Aa-zA-Z0-9-'()+,./:=?;!*#@$_%]/;
      var PubidLiteral = regg('"', PubidChar, '*"', "|", "'", chars_without(PubidChar, "'"), "*'");
      var COMMENT_START = "<!--";
      var COMMENT_END = "-->";
      var Comment = reg(COMMENT_START, regg(chars_without(Char, "-"), "|", reg("-", chars_without(Char, "-"))), "*", COMMENT_END);
      var PCDATA = "#PCDATA";
      var Mixed = regg(
        reg(/\(/, S_OPT, PCDATA, regg(S_OPT, /\|/, S_OPT, QName), "*", S_OPT, /\)\*/),
        "|",
        reg(/\(/, S_OPT, PCDATA, S_OPT, /\)/)
      );
      var _children_quantity = /[?*+]?/;
      var children = reg(
        /\([^>]+\)/,
        _children_quantity
        /*regg(choice, '|', seq), _children_quantity*/
      );
      var contentspec = regg("EMPTY", "|", "ANY", "|", Mixed, "|", children);
      var ELEMENTDECL_START = "<!ELEMENT";
      var elementdecl = reg(ELEMENTDECL_START, S, regg(QName, "|", PEReference), S, regg(contentspec, "|", PEReference), S_OPT, ">");
      var NotationType = reg("NOTATION", S, /\(/, S_OPT, Name, regg(S_OPT, /\|/, S_OPT, Name), "*", S_OPT, /\)/);
      var Enumeration = reg(/\(/, S_OPT, Nmtoken, regg(S_OPT, /\|/, S_OPT, Nmtoken), "*", S_OPT, /\)/);
      var EnumeratedType = regg(NotationType, "|", Enumeration);
      var AttType = regg(/CDATA|ID|IDREF|IDREFS|ENTITY|ENTITIES|NMTOKEN|NMTOKENS/, "|", EnumeratedType);
      var DefaultDecl = regg(/#REQUIRED|#IMPLIED/, "|", regg(regg("#FIXED", S), "?", AttValue));
      var AttDef = regg(S, Name, S, AttType, S, DefaultDecl);
      var ATTLIST_DECL_START = "<!ATTLIST";
      var AttlistDecl = reg(ATTLIST_DECL_START, S, Name, AttDef, "*", S_OPT, ">");
      var ABOUT_LEGACY_COMPAT = "about:legacy-compat";
      var ABOUT_LEGACY_COMPAT_SystemLiteral = regg('"' + ABOUT_LEGACY_COMPAT + '"', "|", "'" + ABOUT_LEGACY_COMPAT + "'");
      var SYSTEM = "SYSTEM";
      var PUBLIC = "PUBLIC";
      var ExternalID = regg(regg(SYSTEM, S, SystemLiteral), "|", regg(PUBLIC, S, PubidLiteral, S, SystemLiteral));
      var ExternalID_match = reg(
        "^",
        regg(
          regg(SYSTEM, S, "(?<SystemLiteralOnly>", SystemLiteral, ")"),
          "|",
          regg(PUBLIC, S, "(?<PubidLiteral>", PubidLiteral, ")", S, "(?<SystemLiteral>", SystemLiteral, ")")
        )
      );
      var PubidLiteral_match = reg("^", PubidLiteral, "$");
      var SystemLiteral_match = reg("^", SystemLiteral, "$");
      var NDataDecl = regg(S, "NDATA", S, Name);
      var EntityDef = regg(EntityValue, "|", regg(ExternalID, NDataDecl, "?"));
      var ENTITY_DECL_START = "<!ENTITY";
      var GEDecl = reg(ENTITY_DECL_START, S, Name, S, EntityDef, S_OPT, ">");
      var PEDef = regg(EntityValue, "|", ExternalID);
      var PEDecl = reg(ENTITY_DECL_START, S, "%", S, Name, S, PEDef, S_OPT, ">");
      var EntityDecl = regg(GEDecl, "|", PEDecl);
      var PublicID = reg(PUBLIC, S, PubidLiteral);
      var NotationDecl = reg("<!NOTATION", S, Name, S, regg(ExternalID, "|", PublicID), S_OPT, ">");
      var Eq = reg(S_OPT, "=", S_OPT);
      var VersionNum = /1[.]\d+/;
      var VersionInfo = reg(S, "version", Eq, regg("'", VersionNum, "'", "|", '"', VersionNum, '"'));
      var EncName = /[A-Za-z][-A-Za-z0-9._]*/;
      var EncodingDecl = regg(S, "encoding", Eq, regg('"', EncName, '"', "|", "'", EncName, "'"));
      var SDDecl = regg(S, "standalone", Eq, regg("'", regg("yes", "|", "no"), "'", "|", '"', regg("yes", "|", "no"), '"'));
      var XMLDecl = reg(/^<\?xml/, VersionInfo, EncodingDecl, "?", SDDecl, "?", S_OPT, /\?>/);
      var DOCTYPE_DECL_START = "<!DOCTYPE";
      var CDATA_START = "<![CDATA[";
      var CDATA_END = "]]>";
      var CDStart = /<!\[CDATA\[/;
      var CDEnd = /\]\]>/;
      var CData = reg(Char, "*?", CDEnd);
      var CDSect = reg(CDStart, CData);
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

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/dom.js
  var require_dom = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
      "use strict";
      var conventions = require_conventions();
      var find = conventions.find;
      var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
      var hasOwn = conventions.hasOwn;
      var isHTMLMimeType = conventions.isHTMLMimeType;
      var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
      var isHTMLVoidElement = conventions.isHTMLVoidElement;
      var MIME_TYPE = conventions.MIME_TYPE;
      var NAMESPACE = conventions.NAMESPACE;
      var PDC = /* @__PURE__ */ Symbol();
      var errors = require_errors();
      var DOMException = errors.DOMException;
      var DOMExceptionName = errors.DOMExceptionName;
      var g = require_grammar();
      function checkSymbol(symbol) {
        if (symbol !== PDC) {
          throw new TypeError("Illegal constructor");
        }
      }
      function notEmptyString(input) {
        return input !== "";
      }
      function splitOnASCIIWhitespace(input) {
        return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
      }
      function orderedSetReducer(current, element) {
        if (!hasOwn(current, element)) {
          current[element] = true;
        }
        return current;
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
        if (!g.QName_exact.test(qualifiedName)) {
          throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in qualified name "' + qualifiedName + '"');
        }
      }
      function validateAndExtract(namespace, qualifiedName) {
        validateQualifiedName(qualifiedName);
        namespace = namespace || null;
        var prefix = null;
        var localName = qualifiedName;
        if (qualifiedName.indexOf(":") >= 0) {
          var splitResult = qualifiedName.split(":");
          prefix = splitResult[0];
          localName = splitResult[1];
        }
        if (prefix !== null && namespace === null) {
          throw new DOMException(DOMException.NAMESPACE_ERR, "prefix is non-null and namespace is null");
        }
        if (prefix === "xml" && namespace !== conventions.NAMESPACE.XML) {
          throw new DOMException(DOMException.NAMESPACE_ERR, 'prefix is "xml" and namespace is not the XML namespace');
        }
        if ((prefix === "xmlns" || qualifiedName === "xmlns") && namespace !== conventions.NAMESPACE.XMLNS) {
          throw new DOMException(
            DOMException.NAMESPACE_ERR,
            'either qualifiedName or prefix is "xmlns" and namespace is not the XMLNS namespace'
          );
        }
        if (namespace === conventions.NAMESPACE.XMLNS && prefix !== "xmlns" && qualifiedName !== "xmlns") {
          throw new DOMException(
            DOMException.NAMESPACE_ERR,
            'namespace is the XMLNS namespace and neither qualifiedName nor prefix is "xmlns"'
          );
        }
        return [namespace, prefix, localName];
      }
      function copy(src, dest) {
        for (var p in src) {
          if (hasOwn(src, p)) {
            dest[p] = src[p];
          }
        }
      }
      function _extends(Class, Super) {
        var pt = Class.prototype;
        if (!(pt instanceof Super)) {
          let t = function() {
          };
          t.prototype = Super.prototype;
          t = new t();
          copy(pt, t);
          Class.prototype = pt = t;
        }
        if (pt.constructor != Class) {
          if (typeof Class != "function") {
            console.error("unknown Class:" + Class);
          }
          pt.constructor = Class;
        }
      }
      var NodeType = {};
      var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
      var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
      var TEXT_NODE = NodeType.TEXT_NODE = 3;
      var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
      var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
      var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
      var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
      var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
      var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
      var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
      var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
      var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
      var DocumentPosition = conventions.freeze({
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
        if (!doc.guid) doc.guid = Math.random();
        return doc.guid;
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
          if (typeof options === "function") {
            opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
          } else if (!!options) {
            opts = {
              requireWellFormed: !!options.requireWellFormed,
              splitCDATASections: options.splitCDATASections !== false,
              nodeFilter: options.nodeFilter || null
            };
          } else {
            opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
          }
          for (var buf = [], i = 0; i < this.length; i++) {
            serializeToString(this[i], buf, null, opts);
          }
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
        var me = this;
        var index = 0;
        return {
          next: function() {
            if (index < me.length) {
              return {
                value: me[index++],
                done: false
              };
            } else {
              return {
                done: true
              };
            }
          },
          return: function() {
            return {
              done: true
            };
          }
        };
      };
      function LiveNodeList(node, refresh) {
        this._node = node;
        this._refresh = refresh;
        _updateLiveList(this);
      }
      function _updateLiveList(list) {
        var inc = list._node._inc || list._node.ownerDocument._inc;
        if (list._inc !== inc) {
          var ls = list._refresh(list._node);
          __set__(list, "length", ls.length);
          if (!list.$$length || ls.length < list.$$length) {
            for (var i = ls.length; i in list; i++) {
              if (hasOwn(list, i)) {
                delete list[i];
              }
            }
          }
          copy(ls, list);
          list._inc = inc;
        }
      }
      LiveNodeList.prototype.item = function(i) {
        _updateLiveList(this);
        return this[i] || null;
      };
      _extends(LiveNodeList, NodeList);
      function NamedNodeMap() {
      }
      function _findNodeIndex(list, node) {
        var i = 0;
        while (i < list.length) {
          if (list[i] === node) {
            return i;
          }
          i++;
        }
      }
      function _addNamedNode(el, list, newAttr, oldAttr) {
        if (oldAttr) {
          list[_findNodeIndex(list, oldAttr)] = newAttr;
        } else {
          list[list.length] = newAttr;
          list.length++;
        }
        if (el) {
          newAttr.ownerElement = el;
          var doc = el.ownerDocument;
          if (doc) {
            oldAttr && _onRemoveAttribute(doc, el, oldAttr);
            _onAddAttribute(doc, el, newAttr);
          }
        }
      }
      function _removeNamedNode(el, list, attr) {
        var i = _findNodeIndex(list, attr);
        if (i >= 0) {
          var lastIndex = list.length - 1;
          while (i <= lastIndex) {
            list[i] = list[++i];
          }
          list.length = lastIndex;
          if (el) {
            var doc = el.ownerDocument;
            if (doc) {
              _onRemoveAttribute(doc, el, attr);
            }
            attr.ownerElement = null;
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
          if (this._ownerElement && this._ownerElement._isInHTMLDocumentAndNamespace()) {
            localName = localName.toLowerCase();
          }
          var i = 0;
          while (i < this.length) {
            var attr = this[i];
            if (attr.nodeName === localName) {
              return attr;
            }
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
          if (el && el !== this._ownerElement) {
            throw new DOMException(DOMException.INUSE_ATTRIBUTE_ERR);
          }
          var oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
          if (oldAttr === attr) {
            return attr;
          }
          _addNamedNode(this._ownerElement, this, attr, oldAttr);
          return oldAttr;
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
          if (!attr) {
            throw new DOMException(DOMException.NOT_FOUND_ERR, localName);
          }
          _removeNamedNode(this._ownerElement, this, attr);
          return attr;
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
          if (!attr) {
            throw new DOMException(DOMException.NOT_FOUND_ERR, namespaceURI ? namespaceURI + " : " + localName : localName);
          }
          _removeNamedNode(this._ownerElement, this, attr);
          return attr;
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
          if (!namespaceURI) {
            namespaceURI = null;
          }
          var i = 0;
          while (i < this.length) {
            var node = this[i];
            if (node.localName === localName && node.namespaceURI === namespaceURI) {
              return node;
            }
            i++;
          }
          return null;
        }
      };
      NamedNodeMap.prototype[Symbol.iterator] = function() {
        var me = this;
        var index = 0;
        return {
          next: function() {
            if (index < me.length) {
              return {
                value: me[index++],
                done: false
              };
            } else {
              return {
                done: true
              };
            }
          },
          return: function() {
            return {
              done: true
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
          return true;
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
          if (namespaceURI === NAMESPACE.HTML) {
            contentType = MIME_TYPE.XML_XHTML_APPLICATION;
          } else if (namespaceURI === NAMESPACE.SVG) {
            contentType = MIME_TYPE.XML_SVG_IMAGE;
          }
          var doc = new Document(PDC, { contentType });
          doc.implementation = this;
          doc.childNodes = new NodeList();
          doc.doctype = doctype || null;
          if (doctype) {
            doc.appendChild(doctype);
          }
          if (qualifiedName) {
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
          node.name = qualifiedName;
          node.nodeName = qualifiedName;
          node.publicId = publicId || "";
          node.systemId = systemId || "";
          node.internalSubset = internalSubset || "";
          node.childNodes = new NodeList();
          return node;
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
          doc.implementation = this;
          doc.childNodes = new NodeList();
          if (title !== false) {
            doc.doctype = this.createDocumentType("html");
            doc.doctype.ownerDocument = doc;
            doc.appendChild(doc.doctype);
            var htmlNode = doc.createElement("html");
            doc.appendChild(htmlNode);
            var headNode = doc.createElement("head");
            htmlNode.appendChild(headNode);
            if (typeof title === "string") {
              var titleNode = doc.createElement("title");
              titleNode.appendChild(doc.createTextNode(title));
              headNode.appendChild(titleNode);
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
          if (!other) return false;
          var parent = other;
          do {
            if (this === parent) return true;
            parent = parent.parentNode;
          } while (parent);
          return false;
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
            if (!parent.parentNode) {
              return parent;
            }
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
          if (!otherNode) return false;
          var stack = [{ node: this, other: otherNode }];
          while (stack.length > 0) {
            var pair = stack.pop();
            var node = pair.node;
            var other = pair.other;
            if (node.nodeType !== other.nodeType) return false;
            switch (node.nodeType) {
              case node.DOCUMENT_TYPE_NODE:
                if (node.name !== other.name) return false;
                if (node.publicId !== other.publicId) return false;
                if (node.systemId !== other.systemId) return false;
                break;
              case node.ELEMENT_NODE:
                if (node.namespaceURI !== other.namespaceURI) return false;
                if (node.prefix !== other.prefix) return false;
                if (node.localName !== other.localName) return false;
                if (node.attributes.length !== other.attributes.length) return false;
                for (var i = 0; i < node.attributes.length; i++) {
                  var attr = node.attributes.item(i);
                  var otherAttr = other.getAttributeNodeNS(attr.namespaceURI, attr.localName);
                  if (!otherAttr) return false;
                  stack.push({ node: attr, other: otherAttr });
                }
                break;
              case node.ATTRIBUTE_NODE:
                if (node.namespaceURI !== other.namespaceURI) return false;
                if (node.localName !== other.localName) return false;
                if (node.value !== other.value) return false;
                break;
              case node.PROCESSING_INSTRUCTION_NODE:
                if (node.target !== other.target || node.data !== other.data) return false;
                break;
              case node.TEXT_NODE:
              case node.CDATA_SECTION_NODE:
              case node.COMMENT_NODE:
                if (node.data !== other.data) return false;
                break;
            }
            if (node.childNodes.length !== other.childNodes.length) return false;
            for (var i = node.childNodes.length - 1; i >= 0; i--) {
              stack.push({ node: node.childNodes[i], other: other.childNodes[i] });
            }
          }
          return true;
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
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
          if (oldChild) {
            this.removeChild(oldChild);
          }
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
              var child = node.firstChild;
              while (child) {
                var next = child.nextSibling;
                if (next !== null && next.nodeType === TEXT_NODE && child.nodeType === TEXT_NODE) {
                  node.removeChild(next);
                  child.appendData(next.data);
                } else {
                  child = next;
                }
              }
              return true;
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
          var el = this;
          while (el) {
            var map = el._nsMap;
            if (map) {
              for (var n in map) {
                if (hasOwn(map, n) && map[n] === namespaceURI) {
                  return n;
                }
              }
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
          var el = this;
          while (el) {
            var map = el._nsMap;
            if (map) {
              if (hasOwn(map, prefix)) {
                return map[prefix];
              }
            }
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
          var node1 = other;
          var node2 = this;
          var attr1 = null;
          var attr2 = null;
          if (node1 instanceof Attr) {
            attr1 = node1;
            node1 = attr1.ownerElement;
          }
          if (node2 instanceof Attr) {
            attr2 = node2;
            node2 = attr2.ownerElement;
            if (attr1 && node1 && node2 === node1) {
              for (var i = 0, attr; attr = node2.attributes[i]; i++) {
                if (attr === attr1)
                  return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
                if (attr === attr2)
                  return DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
              }
            }
          }
          if (!node1 || !node2 || node2.ownerDocument !== node1.ownerDocument) {
            return DocumentPosition.DOCUMENT_POSITION_DISCONNECTED + DocumentPosition.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC + (docGUID(node2.ownerDocument) > docGUID(node1.ownerDocument) ? DocumentPosition.DOCUMENT_POSITION_FOLLOWING : DocumentPosition.DOCUMENT_POSITION_PRECEDING);
          }
          if (attr2 && node1 === node2) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
          }
          if (attr1 && node1 === node2) {
            return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
          }
          var chain1 = [];
          var ancestor1 = node1.parentNode;
          while (ancestor1) {
            if (!attr2 && ancestor1 === node2) {
              return DocumentPosition.DOCUMENT_POSITION_CONTAINED_BY + DocumentPosition.DOCUMENT_POSITION_FOLLOWING;
            }
            chain1.push(ancestor1);
            ancestor1 = ancestor1.parentNode;
          }
          chain1.reverse();
          var chain2 = [];
          var ancestor2 = node2.parentNode;
          while (ancestor2) {
            if (!attr1 && ancestor2 === node1) {
              return DocumentPosition.DOCUMENT_POSITION_CONTAINS + DocumentPosition.DOCUMENT_POSITION_PRECEDING;
            }
            chain2.push(ancestor2);
            ancestor2 = ancestor2.parentNode;
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
            return callback(n) ? walkDOM.STOP : true;
          }
        });
      }
      function walkDOM(node, context, callbacks) {
        var stack = [{ node, context, phase: walkDOM.ENTER }];
        while (stack.length > 0) {
          var frame = stack.pop();
          if (frame.phase === walkDOM.ENTER) {
            var childContext = callbacks.enter(frame.node, frame.context);
            if (childContext === walkDOM.STOP) {
              return walkDOM.STOP;
            }
            stack.push({ node: frame.node, context: childContext, phase: walkDOM.EXIT });
            if (childContext === null || childContext === void 0) {
              continue;
            }
            var child = frame.node.lastChild;
            while (child) {
              stack.push({ node: child, context: childContext, phase: walkDOM.ENTER });
              child = child.previousSibling;
            }
          } else {
            if (callbacks.exit) {
              callbacks.exit(frame.node, frame.context);
            }
          }
        }
      }
      walkDOM.STOP = /* @__PURE__ */ Symbol("walkDOM.STOP");
      walkDOM.ENTER = 0;
      walkDOM.EXIT = 1;
      function Document(symbol, options) {
        checkSymbol(symbol);
        var opt = options || {};
        this.ownerDocument = this;
        this.contentType = opt.contentType || MIME_TYPE.XML_APPLICATION;
        this.type = isHTMLMimeType(this.contentType) ? "html" : "xml";
      }
      function _onAddAttribute(doc, el, newAttr) {
        doc && doc._inc++;
        var ns2 = newAttr.namespaceURI;
        if (ns2 === NAMESPACE.XMLNS) {
          el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
        }
      }
      function _onRemoveAttribute(doc, el, newAttr, remove) {
        doc && doc._inc++;
        var ns2 = newAttr.namespaceURI;
        if (ns2 === NAMESPACE.XMLNS) {
          delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
        }
      }
      function _onUpdateChild(doc, parent, newChild) {
        if (doc && doc._inc) {
          doc._inc++;
          var childNodes = parent.childNodes;
          if (newChild && !newChild.nextSibling) {
            childNodes[childNodes.length++] = newChild;
          } else {
            var child = parent.firstChild;
            var i = 0;
            while (child) {
              childNodes[i++] = child;
              child = child.nextSibling;
            }
            childNodes.length = i;
            delete childNodes[childNodes.length];
          }
        }
      }
      function _removeChild(parentNode, child) {
        if (parentNode !== child.parentNode) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, "child's parent is not parent");
        }
        var oldPreviousSibling = child.previousSibling;
        var oldNextSibling = child.nextSibling;
        if (oldPreviousSibling) {
          oldPreviousSibling.nextSibling = oldNextSibling;
        } else {
          parentNode.firstChild = oldNextSibling;
        }
        if (oldNextSibling) {
          oldNextSibling.previousSibling = oldPreviousSibling;
        } else {
          parentNode.lastChild = oldPreviousSibling;
        }
        _onUpdateChild(parentNode.ownerDocument, parentNode);
        child.parentNode = null;
        child.previousSibling = null;
        child.nextSibling = null;
        return child;
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
        if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
          return false;
        }
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function isElementReplacementPossible(doc, child) {
        var parentChildNodes = doc.childNodes || [];
        function hasElementChildThatIsNotChild(node) {
          return isElementNode(node) && node !== child;
        }
        if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
          return false;
        }
        var docTypeNode = find(parentChildNodes, isDocTypeNode);
        return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
      }
      function assertPreInsertionValidity1to5(parent, node, child) {
        if (!hasValidParentNodeType(parent)) {
          throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
        }
        if (child && child.parentNode !== parent) {
          throw new DOMException(DOMException.NOT_FOUND_ERR, "child not in parent");
        }
        if (
          // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
          !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
          // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
          // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
          // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
          isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
        ) {
          throw new DOMException(
            DOMException.HIERARCHY_REQUEST_ERR,
            "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
          );
        }
      }
      function assertPreInsertionValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [];
        var nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          }
          if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
          }
        }
        if (isElementNode(node)) {
          if (!isElementInsertionPossible(parent, child)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
          }
        }
        if (isDocTypeNode(node)) {
          if (find(parentChildNodes, isDocTypeNode)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          }
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          }
          if (!child && parentElementChild) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
          }
        }
      }
      function assertPreReplacementValidityInDocument(parent, node, child) {
        var parentChildNodes = parent.childNodes || [];
        var nodeChildNodes = node.childNodes || [];
        if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          var nodeChildElements = nodeChildNodes.filter(isElementNode);
          if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
          }
          if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
          }
        }
        if (isElementNode(node)) {
          if (!isElementReplacementPossible(parent, child)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
          }
        }
        if (isDocTypeNode(node)) {
          let hasDoctypeChildThatIsNotChild = function(node2) {
            return isDocTypeNode(node2) && node2 !== child;
          };
          if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
          }
          var parentElementChild = find(parentChildNodes, isElementNode);
          if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
            throw new DOMException(DOMException.HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
          }
        }
      }
      function _insertBefore(parent, node, child, _inDocumentAssertion) {
        assertPreInsertionValidity1to5(parent, node, child);
        if (parent.nodeType === Node.DOCUMENT_NODE) {
          (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
        }
        var cp = node.parentNode;
        if (cp) {
          cp.removeChild(node);
        }
        if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
          var newFirst = node.firstChild;
          if (newFirst == null) {
            return node;
          }
          var newLast = node.lastChild;
        } else {
          newFirst = newLast = node;
        }
        var pre = child ? child.previousSibling : parent.lastChild;
        newFirst.previousSibling = pre;
        newLast.nextSibling = child;
        if (pre) {
          pre.nextSibling = newFirst;
        } else {
          parent.firstChild = newFirst;
        }
        if (child == null) {
          parent.lastChild = newLast;
        } else {
          child.previousSibling = newLast;
        }
        do {
          newFirst.parentNode = parent;
        } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
        _onUpdateChild(parent.ownerDocument || parent, parent, node);
        if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
          node.firstChild = node.lastChild = null;
        }
        return node;
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
            var child = newChild.firstChild;
            while (child) {
              var next = child.nextSibling;
              this.insertBefore(child, refChild);
              child = next;
            }
            return newChild;
          }
          _insertBefore(this, newChild, refChild);
          newChild.ownerDocument = this;
          if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
            this.documentElement = newChild;
          }
          return newChild;
        },
        removeChild: function(oldChild) {
          var removed = _removeChild(this, oldChild);
          if (removed === this.documentElement) {
            this.documentElement = null;
          }
          return removed;
        },
        replaceChild: function(newChild, oldChild) {
          _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
          newChild.ownerDocument = this;
          if (oldChild) {
            this.removeChild(oldChild);
          }
          if (isElementNode(newChild)) {
            this.documentElement = newChild;
          }
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
          _visitNode(this.documentElement, function(node) {
            if (node.nodeType == ELEMENT_NODE) {
              if (node.getAttribute("id") == id) {
                rtv = node;
                return true;
              }
            }
          });
          return rtv;
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
          node.ownerDocument = this;
          if (this.type === "html") {
            tagName = tagName.toLowerCase();
          }
          if (hasDefaultHTMLNamespace(this.contentType)) {
            node.namespaceURI = NAMESPACE.HTML;
          }
          node.nodeName = tagName;
          node.tagName = tagName;
          node.localName = tagName;
          node.childNodes = new NodeList();
          var attrs = node.attributes = new NamedNodeMap();
          attrs._ownerElement = node;
          return node;
        },
        /**
         * @returns {DocumentFragment}
         */
        createDocumentFragment: function() {
          var node = new DocumentFragment(PDC);
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          return node;
        },
        /**
         * @param {string} data
         * @returns {Text}
         */
        createTextNode: function(data) {
          var node = new Text(PDC);
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.appendData(data);
          return node;
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
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.appendData(data);
          return node;
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
          if (data.indexOf("]]>") !== -1) {
            throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'data contains "]]>"');
          }
          var node = new CDATASection(PDC);
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.appendData(data);
          return node;
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
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.nodeName = node.target = target;
          node.nodeValue = node.data = data;
          return node;
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
          if (!g.QName_exact.test(name)) {
            throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'invalid character in name "' + name + '"');
          }
          if (this.type === "html") {
            name = name.toLowerCase();
          }
          return this._createAttribute(name);
        },
        _createAttribute: function(name) {
          var node = new Attr(PDC);
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.name = name;
          node.nodeName = name;
          node.localName = name;
          node.specified = true;
          return node;
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
          if (!g.Name.test(name)) {
            throw new DOMException(DOMException.INVALID_CHARACTER_ERR, 'not a valid xml name "' + name + '"');
          }
          if (this.type === "html") {
            throw new DOMException("document is an html document", DOMExceptionName.NotSupportedError);
          }
          var node = new EntityReference(PDC);
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.nodeName = name;
          return node;
        },
        // Introduced in DOM Level 2:
        /**
         * @param {string} namespaceURI
         * @param {string} qualifiedName
         * @returns {Element}
         */
        createElementNS: function(namespaceURI, qualifiedName) {
          var validated = validateAndExtract(namespaceURI, qualifiedName);
          var node = new Element(PDC);
          var attrs = node.attributes = new NamedNodeMap();
          node.childNodes = new NodeList();
          node.ownerDocument = this;
          node.nodeName = qualifiedName;
          node.tagName = qualifiedName;
          node.namespaceURI = validated[0];
          node.prefix = validated[1];
          node.localName = validated[2];
          attrs._ownerElement = node;
          return node;
        },
        // Introduced in DOM Level 2:
        /**
         * @param {string} namespaceURI
         * @param {string} qualifiedName
         * @returns {Attr}
         */
        createAttributeNS: function(namespaceURI, qualifiedName) {
          var validated = validateAndExtract(namespaceURI, qualifiedName);
          var node = new Attr(PDC);
          node.ownerDocument = this;
          node.childNodes = new NodeList();
          node.nodeName = qualifiedName;
          node.name = qualifiedName;
          node.specified = true;
          node.namespaceURI = validated[0];
          node.prefix = validated[1];
          node.localName = validated[2];
          return node;
        }
      };
      _extends(Document, Node);
      function Element(symbol) {
        checkSymbol(symbol);
        this._nsMap = /* @__PURE__ */ Object.create(null);
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
          if (this._isInHTMLDocumentAndNamespace()) {
            name = name.toLowerCase();
          }
          return this.attributes.getNamedItem(name);
        },
        /**
         * Sets the value of element’s first attribute whose qualified name is qualifiedName to value.
         *
         * @param {string} name
         * @param {string} value
         */
        setAttribute: function(name, value) {
          if (this._isInHTMLDocumentAndNamespace()) {
            name = name.toLowerCase();
          }
          var attr = this.getAttributeNode(name);
          if (attr) {
            attr.value = attr.nodeValue = "" + value;
          } else {
            attr = this.ownerDocument._createAttribute(name);
            attr.value = attr.nodeValue = "" + value;
            this.setAttributeNode(attr);
          }
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
          var validated = validateAndExtract(namespaceURI, qualifiedName);
          var localName = validated[2];
          var attr = this.getAttributeNodeNS(namespaceURI, localName);
          if (attr) {
            attr.value = attr.nodeValue = "" + value;
          } else {
            attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
            attr.value = attr.nodeValue = "" + value;
            this.setAttributeNode(attr);
          }
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
            if (classNamesSet.length > 0) {
              _visitNode(base, function(node) {
                if (node !== base && node.nodeType === ELEMENT_NODE) {
                  var nodeClassNames = node.getAttribute("class");
                  if (nodeClassNames) {
                    var matches = classNames === nodeClassNames;
                    if (!matches) {
                      var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                      matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                    }
                    if (matches) {
                      ls.push(node);
                    }
                  }
                }
              });
            }
            return ls;
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
          var isHTMLDocument = (this.nodeType === DOCUMENT_NODE ? this : this.ownerDocument).type === "html";
          var lowerQualifiedName = qualifiedName.toLowerCase();
          return new LiveNodeList(this, function(base) {
            var ls = [];
            _visitNode(base, function(node) {
              if (node === base || node.nodeType !== ELEMENT_NODE) {
                return;
              }
              if (qualifiedName === "*") {
                ls.push(node);
              } else {
                var nodeQualifiedName = node.getQualifiedName();
                var matchingQName = isHTMLDocument && node.namespaceURI === NAMESPACE.HTML ? lowerQualifiedName : qualifiedName;
                if (nodeQualifiedName === matchingQName) {
                  ls.push(node);
                }
              }
            });
            return ls;
          });
        },
        getElementsByTagNameNS: function(namespaceURI, localName) {
          return new LiveNodeList(this, function(base) {
            var ls = [];
            _visitNode(base, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
                ls.push(node);
              }
            });
            return ls;
          });
        }
      };
      Document.prototype.getElementsByClassName = Element.prototype.getElementsByClassName;
      Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
      Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
      _extends(Element, Node);
      function Attr(symbol) {
        checkSymbol(symbol);
        this.namespaceURI = null;
        this.prefix = null;
        this.ownerElement = null;
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
          text = this.data + text;
          this.nodeValue = this.data = text;
          this.length = text.length;
        },
        insertData: function(offset, text) {
          this.replaceData(offset, 0, text);
        },
        deleteData: function(offset, count) {
          this.replaceData(offset, count, "");
        },
        replaceData: function(offset, count, text) {
          var start = this.data.substring(0, offset);
          var end = this.data.substring(offset + count);
          text = start + text + end;
          this.nodeValue = this.data = text;
          this.length = text.length;
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
          var text = this.data;
          var newText = text.substring(offset);
          text = text.substring(0, offset);
          this.data = this.nodeValue = text;
          this.length = text.length;
          var newNode = this.ownerDocument.createTextNode(newText);
          if (this.parentNode) {
            this.parentNode.insertBefore(newNode, this.nextSibling);
          }
          return newNode;
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
        if (typeof options === "function") {
          opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: options };
        } else if (options != null) {
          opts = {
            requireWellFormed: !!options.requireWellFormed,
            splitCDATASections: options.splitCDATASections !== false,
            nodeFilter: options.nodeFilter || null
          };
        } else {
          opts = { requireWellFormed: false, splitCDATASections: true, nodeFilter: null };
        }
        var buf = [];
        var refNode = this.nodeType === DOCUMENT_NODE && this.documentElement || this;
        var prefix = refNode.prefix;
        var uri = refNode.namespaceURI;
        if (uri && prefix == null) {
          var prefix = refNode.lookupPrefix(uri);
          if (prefix == null) {
            var visibleNamespaces = [
              { namespace: uri, prefix: null }
              //{namespace:uri,prefix:''}
            ];
          }
        }
        serializeToString(this, buf, visibleNamespaces, opts);
        return buf.join("");
      }
      function needNamespaceDefine(node, isHTML, visibleNamespaces) {
        var prefix = node.prefix || "";
        var uri = node.namespaceURI;
        if (!uri) {
          return false;
        }
        if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
          return false;
        }
        var i = visibleNamespaces.length;
        while (i--) {
          var ns2 = visibleNamespaces[i];
          if (ns2.prefix === prefix) {
            return ns2.namespace !== uri;
          }
        }
        return true;
      }
      function addSerializedAttribute(buf, qualifiedName, value) {
        buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
      }
      function serializeToString(node, buf, visibleNamespaces, opts) {
        if (!visibleNamespaces) {
          visibleNamespaces = [];
        }
        var nodeFilter = opts.nodeFilter;
        var requireWellFormed = opts.requireWellFormed;
        var splitCDATASections = opts.splitCDATASections;
        var doc = node.nodeType === DOCUMENT_NODE ? node : node.ownerDocument;
        var isHTML = doc.type === "html";
        walkDOM(
          node,
          { ns: visibleNamespaces },
          {
            enter: function(n, ctx2) {
              var namespaces = ctx2.ns;
              if (nodeFilter) {
                n = nodeFilter(n);
                if (n) {
                  if (typeof n == "string") {
                    buf.push(n);
                    return null;
                  }
                } else {
                  return null;
                }
              }
              switch (n.nodeType) {
                case ELEMENT_NODE:
                  var attrs = n.attributes;
                  var len = attrs.length;
                  var nodeName = n.tagName;
                  var prefixedNodeName = nodeName;
                  if (!isHTML && !n.prefix && n.namespaceURI) {
                    var defaultNS;
                    for (var ai = 0; ai < attrs.length; ai++) {
                      if (attrs.item(ai).name === "xmlns") {
                        defaultNS = attrs.item(ai).value;
                        break;
                      }
                    }
                    if (!defaultNS) {
                      for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                        var nsEntry = namespaces[nsi];
                        if (nsEntry.prefix === "" && nsEntry.namespace === n.namespaceURI) {
                          defaultNS = nsEntry.namespace;
                          break;
                        }
                      }
                    }
                    if (defaultNS !== n.namespaceURI) {
                      for (var nsi = namespaces.length - 1; nsi >= 0; nsi--) {
                        var nsEntry = namespaces[nsi];
                        if (nsEntry.namespace === n.namespaceURI) {
                          if (nsEntry.prefix) {
                            prefixedNodeName = nsEntry.prefix + ":" + nodeName;
                          }
                          break;
                        }
                      }
                    }
                  }
                  buf.push("<", prefixedNodeName);
                  var childNamespaces = namespaces.slice();
                  for (var i = 0; i < len; i++) {
                    var attr = attrs.item(i);
                    if (attr.prefix == "xmlns") {
                      childNamespaces.push({
                        prefix: attr.localName,
                        namespace: attr.value
                      });
                    } else if (attr.nodeName == "xmlns") {
                      childNamespaces.push({ prefix: "", namespace: attr.value });
                    }
                  }
                  for (var i = 0; i < len; i++) {
                    var attr = attrs.item(i);
                    if (needNamespaceDefine(attr, isHTML, childNamespaces)) {
                      var attrPrefix = attr.prefix || "";
                      var uri = attr.namespaceURI;
                      addSerializedAttribute(buf, attrPrefix ? "xmlns:" + attrPrefix : "xmlns", uri);
                      childNamespaces.push({ prefix: attrPrefix, namespace: uri });
                    }
                    var filteredAttr = nodeFilter ? nodeFilter(attr) : attr;
                    if (filteredAttr) {
                      if (typeof filteredAttr === "string") {
                        buf.push(filteredAttr);
                      } else {
                        addSerializedAttribute(buf, filteredAttr.name, filteredAttr.value);
                      }
                    }
                  }
                  if (nodeName === prefixedNodeName && needNamespaceDefine(n, isHTML, childNamespaces)) {
                    var nodePrefix = n.prefix || "";
                    var uri = n.namespaceURI;
                    addSerializedAttribute(buf, nodePrefix ? "xmlns:" + nodePrefix : "xmlns", uri);
                    childNamespaces.push({ prefix: nodePrefix, namespace: uri });
                  }
                  var canCloseTag = !n.firstChild;
                  if (canCloseTag && (isHTML || n.namespaceURI === NAMESPACE.HTML)) {
                    canCloseTag = isHTMLVoidElement(nodeName);
                  }
                  if (canCloseTag) {
                    buf.push("/>");
                    return null;
                  }
                  buf.push(">");
                  if (isHTML && isHTMLRawTextElement(nodeName)) {
                    var child = n.firstChild;
                    while (child) {
                      if (child.data) {
                        buf.push(child.data);
                      } else {
                        serializeToString(child, buf, childNamespaces.slice(), opts);
                      }
                      child = child.nextSibling;
                    }
                    buf.push("</", prefixedNodeName, ">");
                    return null;
                  }
                  return { ns: childNamespaces, tag: prefixedNodeName };
                case DOCUMENT_NODE:
                case DOCUMENT_FRAGMENT_NODE:
                  if (requireWellFormed && n.nodeType === DOCUMENT_NODE && n.documentElement == null) {
                    throw new DOMException("The Document has no documentElement", DOMExceptionName.InvalidStateError);
                  }
                  return { ns: namespaces };
                case ATTRIBUTE_NODE:
                  addSerializedAttribute(buf, n.name, n.value);
                  return null;
                case TEXT_NODE:
                  if (requireWellFormed && g.InvalidChar.test(n.data)) {
                    throw new DOMException(
                      "The Text node data contains characters outside the XML Char production",
                      DOMExceptionName.InvalidStateError
                    );
                  }
                  buf.push(n.data.replace(/[<&>]/g, _xmlEncoder));
                  return null;
                case CDATA_SECTION_NODE:
                  if (requireWellFormed && n.data.indexOf("]]>") !== -1) {
                    throw new DOMException('The CDATASection data contains "]]>"', DOMExceptionName.InvalidStateError);
                  }
                  if (splitCDATASections) {
                    buf.push(g.CDATA_START, n.data.replace(/]]>/g, "]]]]><![CDATA[>"), g.CDATA_END);
                  } else {
                    buf.push(g.CDATA_START, n.data, g.CDATA_END);
                  }
                  return null;
                case COMMENT_NODE:
                  if (requireWellFormed) {
                    if (g.InvalidChar.test(n.data)) {
                      throw new DOMException(
                        "The comment node data contains characters outside the XML Char production",
                        DOMExceptionName.InvalidStateError
                      );
                    }
                    if (n.data.indexOf("--") !== -1 || n.data[n.data.length - 1] === "-") {
                      throw new DOMException(
                        'The comment node data contains "--" or ends with "-"',
                        DOMExceptionName.InvalidStateError
                      );
                    }
                  }
                  buf.push(g.COMMENT_START, n.data, g.COMMENT_END);
                  return null;
                case DOCUMENT_TYPE_NODE:
                  var pubid = n.publicId;
                  var sysid = n.systemId;
                  if (requireWellFormed) {
                    if (pubid && !g.PubidLiteral_match.test(pubid)) {
                      throw new DOMException("DocumentType publicId is not a valid PubidLiteral", DOMExceptionName.InvalidStateError);
                    }
                    if (sysid && sysid !== "." && !g.SystemLiteral_match.test(sysid)) {
                      throw new DOMException("DocumentType systemId is not a valid SystemLiteral", DOMExceptionName.InvalidStateError);
                    }
                    if (n.internalSubset && n.internalSubset.indexOf("]>") !== -1) {
                      throw new DOMException('DocumentType internalSubset contains "]>"', DOMExceptionName.InvalidStateError);
                    }
                  }
                  buf.push(g.DOCTYPE_DECL_START, " ", n.name);
                  if (pubid) {
                    buf.push(" ", g.PUBLIC, " ", pubid);
                    if (sysid && sysid !== ".") {
                      buf.push(" ", sysid);
                    }
                  } else if (sysid && sysid !== ".") {
                    buf.push(" ", g.SYSTEM, " ", sysid);
                  }
                  if (n.internalSubset) {
                    buf.push(" [", n.internalSubset, "]");
                  }
                  buf.push(">");
                  return null;
                case PROCESSING_INSTRUCTION_NODE:
                  if (requireWellFormed) {
                    if (n.target.indexOf(":") !== -1 || n.target.toLowerCase() === "xml") {
                      throw new DOMException("The ProcessingInstruction target is not well-formed", DOMExceptionName.InvalidStateError);
                    }
                    if (g.InvalidChar.test(n.data)) {
                      throw new DOMException(
                        "The ProcessingInstruction data contains characters outside the XML Char production",
                        DOMExceptionName.InvalidStateError
                      );
                    }
                    if (n.data.indexOf("?>") !== -1) {
                      throw new DOMException('The ProcessingInstruction data contains "?>"', DOMExceptionName.InvalidStateError);
                    }
                  }
                  buf.push("<?", n.target, " ", n.data, "?>");
                  return null;
                case ENTITY_REFERENCE_NODE:
                  buf.push("&", n.nodeName, ";");
                  return null;
                //case ENTITY_NODE:
                //case NOTATION_NODE:
                default:
                  buf.push("??", n.nodeName);
                  return null;
              }
            },
            exit: function(n, childCtx) {
              if (childCtx && childCtx.tag) {
                buf.push("</", childCtx.tag, ">");
              }
            }
          }
        );
      }
      function importNode(doc, node, deep) {
        var destRoot;
        walkDOM(node, null, {
          enter: function(srcNode, destParent) {
            var destNode = srcNode.cloneNode(false);
            destNode.ownerDocument = doc;
            destNode.parentNode = null;
            if (destParent === null) {
              destRoot = destNode;
            } else {
              destParent.appendChild(destNode);
            }
            var shouldDeep = srcNode.nodeType === ATTRIBUTE_NODE || deep;
            return shouldDeep ? destNode : null;
          }
        });
        return destRoot;
      }
      function cloneNode(doc, node, deep) {
        var destRoot;
        walkDOM(node, null, {
          enter: function(srcNode, destParent) {
            var destNode = new srcNode.constructor(PDC);
            for (var n in srcNode) {
              if (hasOwn(srcNode, n)) {
                var v = srcNode[n];
                if (typeof v != "object") {
                  if (v != destNode[n]) {
                    destNode[n] = v;
                  }
                }
              }
            }
            if (srcNode.childNodes) {
              destNode.childNodes = new NodeList();
            }
            destNode.ownerDocument = doc;
            var shouldDeep = deep;
            switch (destNode.nodeType) {
              case ELEMENT_NODE:
                var attrs = srcNode.attributes;
                var attrs2 = destNode.attributes = new NamedNodeMap();
                var len = attrs.length;
                attrs2._ownerElement = destNode;
                for (var i = 0; i < len; i++) {
                  destNode.setAttributeNode(cloneNode(doc, attrs.item(i), true));
                }
                break;
              case ATTRIBUTE_NODE:
                shouldDeep = true;
            }
            if (destParent !== null) {
              destParent.appendChild(destNode);
            } else {
              destRoot = destNode;
            }
            return shouldDeep ? destNode : null;
          }
        });
        return destRoot;
      }
      function __set__(object, key, value) {
        object[key] = value;
      }
      function childrenRefresh(node) {
        var ls = [];
        var child = node.firstChild;
        while (child) {
          if (child.nodeType === ELEMENT_NODE) {
            ls.push(child);
          }
          child = child.nextSibling;
        }
        return ls;
      }
      try {
        if (Object.defineProperty) {
          Object.defineProperty(LiveNodeList.prototype, "length", {
            get: function() {
              _updateLiveList(this);
              return this.$$length;
            }
          });
          Object.defineProperty(Node.prototype, "textContent", {
            get: function() {
              if (this.nodeType === ELEMENT_NODE || this.nodeType === DOCUMENT_FRAGMENT_NODE) {
                var buf = [];
                walkDOM(this, null, {
                  enter: function(n) {
                    if (n.nodeType === ELEMENT_NODE || n.nodeType === DOCUMENT_FRAGMENT_NODE) {
                      return true;
                    }
                    if (n.nodeType === PROCESSING_INSTRUCTION_NODE || n.nodeType === COMMENT_NODE) {
                      return null;
                    }
                    buf.push(n.nodeValue);
                  }
                });
                return buf.join("");
              }
              return this.nodeValue;
            },
            set: function(data) {
              switch (this.nodeType) {
                case ELEMENT_NODE:
                case DOCUMENT_FRAGMENT_NODE:
                  while (this.firstChild) {
                    this.removeChild(this.firstChild);
                  }
                  if (data || String(data)) {
                    this.appendChild(this.ownerDocument.createTextNode(data));
                  }
                  break;
                default:
                  this.data = data;
                  this.value = data;
                  this.nodeValue = data;
              }
            }
          });
          Object.defineProperty(Element.prototype, "children", {
            get: function() {
              return new LiveNodeList(this, childrenRefresh);
            }
          });
          Object.defineProperty(Document.prototype, "children", {
            get: function() {
              return new LiveNodeList(this, childrenRefresh);
            }
          });
          Object.defineProperty(DocumentFragment.prototype, "children", {
            get: function() {
              return new LiveNodeList(this, childrenRefresh);
            }
          });
          __set__ = function(object, key, value) {
            object["$$" + key] = value;
          };
        }
      } catch (e) {
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

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/entities.js
  var require_entities = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
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
        Aacute: "\xC1",
        aacute: "\xE1",
        Abreve: "\u0102",
        abreve: "\u0103",
        ac: "\u223E",
        acd: "\u223F",
        acE: "\u223E\u0333",
        Acirc: "\xC2",
        acirc: "\xE2",
        acute: "\xB4",
        Acy: "\u0410",
        acy: "\u0430",
        AElig: "\xC6",
        aelig: "\xE6",
        af: "\u2061",
        Afr: "\u{1D504}",
        afr: "\u{1D51E}",
        Agrave: "\xC0",
        agrave: "\xE0",
        alefsym: "\u2135",
        aleph: "\u2135",
        Alpha: "\u0391",
        alpha: "\u03B1",
        Amacr: "\u0100",
        amacr: "\u0101",
        amalg: "\u2A3F",
        AMP: "&",
        amp: "&",
        And: "\u2A53",
        and: "\u2227",
        andand: "\u2A55",
        andd: "\u2A5C",
        andslope: "\u2A58",
        andv: "\u2A5A",
        ang: "\u2220",
        ange: "\u29A4",
        angle: "\u2220",
        angmsd: "\u2221",
        angmsdaa: "\u29A8",
        angmsdab: "\u29A9",
        angmsdac: "\u29AA",
        angmsdad: "\u29AB",
        angmsdae: "\u29AC",
        angmsdaf: "\u29AD",
        angmsdag: "\u29AE",
        angmsdah: "\u29AF",
        angrt: "\u221F",
        angrtvb: "\u22BE",
        angrtvbd: "\u299D",
        angsph: "\u2222",
        angst: "\xC5",
        angzarr: "\u237C",
        Aogon: "\u0104",
        aogon: "\u0105",
        Aopf: "\u{1D538}",
        aopf: "\u{1D552}",
        ap: "\u2248",
        apacir: "\u2A6F",
        apE: "\u2A70",
        ape: "\u224A",
        apid: "\u224B",
        apos: "'",
        ApplyFunction: "\u2061",
        approx: "\u2248",
        approxeq: "\u224A",
        Aring: "\xC5",
        aring: "\xE5",
        Ascr: "\u{1D49C}",
        ascr: "\u{1D4B6}",
        Assign: "\u2254",
        ast: "*",
        asymp: "\u2248",
        asympeq: "\u224D",
        Atilde: "\xC3",
        atilde: "\xE3",
        Auml: "\xC4",
        auml: "\xE4",
        awconint: "\u2233",
        awint: "\u2A11",
        backcong: "\u224C",
        backepsilon: "\u03F6",
        backprime: "\u2035",
        backsim: "\u223D",
        backsimeq: "\u22CD",
        Backslash: "\u2216",
        Barv: "\u2AE7",
        barvee: "\u22BD",
        Barwed: "\u2306",
        barwed: "\u2305",
        barwedge: "\u2305",
        bbrk: "\u23B5",
        bbrktbrk: "\u23B6",
        bcong: "\u224C",
        Bcy: "\u0411",
        bcy: "\u0431",
        bdquo: "\u201E",
        becaus: "\u2235",
        Because: "\u2235",
        because: "\u2235",
        bemptyv: "\u29B0",
        bepsi: "\u03F6",
        bernou: "\u212C",
        Bernoullis: "\u212C",
        Beta: "\u0392",
        beta: "\u03B2",
        beth: "\u2136",
        between: "\u226C",
        Bfr: "\u{1D505}",
        bfr: "\u{1D51F}",
        bigcap: "\u22C2",
        bigcirc: "\u25EF",
        bigcup: "\u22C3",
        bigodot: "\u2A00",
        bigoplus: "\u2A01",
        bigotimes: "\u2A02",
        bigsqcup: "\u2A06",
        bigstar: "\u2605",
        bigtriangledown: "\u25BD",
        bigtriangleup: "\u25B3",
        biguplus: "\u2A04",
        bigvee: "\u22C1",
        bigwedge: "\u22C0",
        bkarow: "\u290D",
        blacklozenge: "\u29EB",
        blacksquare: "\u25AA",
        blacktriangle: "\u25B4",
        blacktriangledown: "\u25BE",
        blacktriangleleft: "\u25C2",
        blacktriangleright: "\u25B8",
        blank: "\u2423",
        blk12: "\u2592",
        blk14: "\u2591",
        blk34: "\u2593",
        block: "\u2588",
        bne: "=\u20E5",
        bnequiv: "\u2261\u20E5",
        bNot: "\u2AED",
        bnot: "\u2310",
        Bopf: "\u{1D539}",
        bopf: "\u{1D553}",
        bot: "\u22A5",
        bottom: "\u22A5",
        bowtie: "\u22C8",
        boxbox: "\u29C9",
        boxDL: "\u2557",
        boxDl: "\u2556",
        boxdL: "\u2555",
        boxdl: "\u2510",
        boxDR: "\u2554",
        boxDr: "\u2553",
        boxdR: "\u2552",
        boxdr: "\u250C",
        boxH: "\u2550",
        boxh: "\u2500",
        boxHD: "\u2566",
        boxHd: "\u2564",
        boxhD: "\u2565",
        boxhd: "\u252C",
        boxHU: "\u2569",
        boxHu: "\u2567",
        boxhU: "\u2568",
        boxhu: "\u2534",
        boxminus: "\u229F",
        boxplus: "\u229E",
        boxtimes: "\u22A0",
        boxUL: "\u255D",
        boxUl: "\u255C",
        boxuL: "\u255B",
        boxul: "\u2518",
        boxUR: "\u255A",
        boxUr: "\u2559",
        boxuR: "\u2558",
        boxur: "\u2514",
        boxV: "\u2551",
        boxv: "\u2502",
        boxVH: "\u256C",
        boxVh: "\u256B",
        boxvH: "\u256A",
        boxvh: "\u253C",
        boxVL: "\u2563",
        boxVl: "\u2562",
        boxvL: "\u2561",
        boxvl: "\u2524",
        boxVR: "\u2560",
        boxVr: "\u255F",
        boxvR: "\u255E",
        boxvr: "\u251C",
        bprime: "\u2035",
        Breve: "\u02D8",
        breve: "\u02D8",
        brvbar: "\xA6",
        Bscr: "\u212C",
        bscr: "\u{1D4B7}",
        bsemi: "\u204F",
        bsim: "\u223D",
        bsime: "\u22CD",
        bsol: "\\",
        bsolb: "\u29C5",
        bsolhsub: "\u27C8",
        bull: "\u2022",
        bullet: "\u2022",
        bump: "\u224E",
        bumpE: "\u2AAE",
        bumpe: "\u224F",
        Bumpeq: "\u224E",
        bumpeq: "\u224F",
        Cacute: "\u0106",
        cacute: "\u0107",
        Cap: "\u22D2",
        cap: "\u2229",
        capand: "\u2A44",
        capbrcup: "\u2A49",
        capcap: "\u2A4B",
        capcup: "\u2A47",
        capdot: "\u2A40",
        CapitalDifferentialD: "\u2145",
        caps: "\u2229\uFE00",
        caret: "\u2041",
        caron: "\u02C7",
        Cayleys: "\u212D",
        ccaps: "\u2A4D",
        Ccaron: "\u010C",
        ccaron: "\u010D",
        Ccedil: "\xC7",
        ccedil: "\xE7",
        Ccirc: "\u0108",
        ccirc: "\u0109",
        Cconint: "\u2230",
        ccups: "\u2A4C",
        ccupssm: "\u2A50",
        Cdot: "\u010A",
        cdot: "\u010B",
        cedil: "\xB8",
        Cedilla: "\xB8",
        cemptyv: "\u29B2",
        cent: "\xA2",
        CenterDot: "\xB7",
        centerdot: "\xB7",
        Cfr: "\u212D",
        cfr: "\u{1D520}",
        CHcy: "\u0427",
        chcy: "\u0447",
        check: "\u2713",
        checkmark: "\u2713",
        Chi: "\u03A7",
        chi: "\u03C7",
        cir: "\u25CB",
        circ: "\u02C6",
        circeq: "\u2257",
        circlearrowleft: "\u21BA",
        circlearrowright: "\u21BB",
        circledast: "\u229B",
        circledcirc: "\u229A",
        circleddash: "\u229D",
        CircleDot: "\u2299",
        circledR: "\xAE",
        circledS: "\u24C8",
        CircleMinus: "\u2296",
        CirclePlus: "\u2295",
        CircleTimes: "\u2297",
        cirE: "\u29C3",
        cire: "\u2257",
        cirfnint: "\u2A10",
        cirmid: "\u2AEF",
        cirscir: "\u29C2",
        ClockwiseContourIntegral: "\u2232",
        CloseCurlyDoubleQuote: "\u201D",
        CloseCurlyQuote: "\u2019",
        clubs: "\u2663",
        clubsuit: "\u2663",
        Colon: "\u2237",
        colon: ":",
        Colone: "\u2A74",
        colone: "\u2254",
        coloneq: "\u2254",
        comma: ",",
        commat: "@",
        comp: "\u2201",
        compfn: "\u2218",
        complement: "\u2201",
        complexes: "\u2102",
        cong: "\u2245",
        congdot: "\u2A6D",
        Congruent: "\u2261",
        Conint: "\u222F",
        conint: "\u222E",
        ContourIntegral: "\u222E",
        Copf: "\u2102",
        copf: "\u{1D554}",
        coprod: "\u2210",
        Coproduct: "\u2210",
        COPY: "\xA9",
        copy: "\xA9",
        copysr: "\u2117",
        CounterClockwiseContourIntegral: "\u2233",
        crarr: "\u21B5",
        Cross: "\u2A2F",
        cross: "\u2717",
        Cscr: "\u{1D49E}",
        cscr: "\u{1D4B8}",
        csub: "\u2ACF",
        csube: "\u2AD1",
        csup: "\u2AD0",
        csupe: "\u2AD2",
        ctdot: "\u22EF",
        cudarrl: "\u2938",
        cudarrr: "\u2935",
        cuepr: "\u22DE",
        cuesc: "\u22DF",
        cularr: "\u21B6",
        cularrp: "\u293D",
        Cup: "\u22D3",
        cup: "\u222A",
        cupbrcap: "\u2A48",
        CupCap: "\u224D",
        cupcap: "\u2A46",
        cupcup: "\u2A4A",
        cupdot: "\u228D",
        cupor: "\u2A45",
        cups: "\u222A\uFE00",
        curarr: "\u21B7",
        curarrm: "\u293C",
        curlyeqprec: "\u22DE",
        curlyeqsucc: "\u22DF",
        curlyvee: "\u22CE",
        curlywedge: "\u22CF",
        curren: "\xA4",
        curvearrowleft: "\u21B6",
        curvearrowright: "\u21B7",
        cuvee: "\u22CE",
        cuwed: "\u22CF",
        cwconint: "\u2232",
        cwint: "\u2231",
        cylcty: "\u232D",
        Dagger: "\u2021",
        dagger: "\u2020",
        daleth: "\u2138",
        Darr: "\u21A1",
        dArr: "\u21D3",
        darr: "\u2193",
        dash: "\u2010",
        Dashv: "\u2AE4",
        dashv: "\u22A3",
        dbkarow: "\u290F",
        dblac: "\u02DD",
        Dcaron: "\u010E",
        dcaron: "\u010F",
        Dcy: "\u0414",
        dcy: "\u0434",
        DD: "\u2145",
        dd: "\u2146",
        ddagger: "\u2021",
        ddarr: "\u21CA",
        DDotrahd: "\u2911",
        ddotseq: "\u2A77",
        deg: "\xB0",
        Del: "\u2207",
        Delta: "\u0394",
        delta: "\u03B4",
        demptyv: "\u29B1",
        dfisht: "\u297F",
        Dfr: "\u{1D507}",
        dfr: "\u{1D521}",
        dHar: "\u2965",
        dharl: "\u21C3",
        dharr: "\u21C2",
        DiacriticalAcute: "\xB4",
        DiacriticalDot: "\u02D9",
        DiacriticalDoubleAcute: "\u02DD",
        DiacriticalGrave: "`",
        DiacriticalTilde: "\u02DC",
        diam: "\u22C4",
        Diamond: "\u22C4",
        diamond: "\u22C4",
        diamondsuit: "\u2666",
        diams: "\u2666",
        die: "\xA8",
        DifferentialD: "\u2146",
        digamma: "\u03DD",
        disin: "\u22F2",
        div: "\xF7",
        divide: "\xF7",
        divideontimes: "\u22C7",
        divonx: "\u22C7",
        DJcy: "\u0402",
        djcy: "\u0452",
        dlcorn: "\u231E",
        dlcrop: "\u230D",
        dollar: "$",
        Dopf: "\u{1D53B}",
        dopf: "\u{1D555}",
        Dot: "\xA8",
        dot: "\u02D9",
        DotDot: "\u20DC",
        doteq: "\u2250",
        doteqdot: "\u2251",
        DotEqual: "\u2250",
        dotminus: "\u2238",
        dotplus: "\u2214",
        dotsquare: "\u22A1",
        doublebarwedge: "\u2306",
        DoubleContourIntegral: "\u222F",
        DoubleDot: "\xA8",
        DoubleDownArrow: "\u21D3",
        DoubleLeftArrow: "\u21D0",
        DoubleLeftRightArrow: "\u21D4",
        DoubleLeftTee: "\u2AE4",
        DoubleLongLeftArrow: "\u27F8",
        DoubleLongLeftRightArrow: "\u27FA",
        DoubleLongRightArrow: "\u27F9",
        DoubleRightArrow: "\u21D2",
        DoubleRightTee: "\u22A8",
        DoubleUpArrow: "\u21D1",
        DoubleUpDownArrow: "\u21D5",
        DoubleVerticalBar: "\u2225",
        DownArrow: "\u2193",
        Downarrow: "\u21D3",
        downarrow: "\u2193",
        DownArrowBar: "\u2913",
        DownArrowUpArrow: "\u21F5",
        DownBreve: "\u0311",
        downdownarrows: "\u21CA",
        downharpoonleft: "\u21C3",
        downharpoonright: "\u21C2",
        DownLeftRightVector: "\u2950",
        DownLeftTeeVector: "\u295E",
        DownLeftVector: "\u21BD",
        DownLeftVectorBar: "\u2956",
        DownRightTeeVector: "\u295F",
        DownRightVector: "\u21C1",
        DownRightVectorBar: "\u2957",
        DownTee: "\u22A4",
        DownTeeArrow: "\u21A7",
        drbkarow: "\u2910",
        drcorn: "\u231F",
        drcrop: "\u230C",
        Dscr: "\u{1D49F}",
        dscr: "\u{1D4B9}",
        DScy: "\u0405",
        dscy: "\u0455",
        dsol: "\u29F6",
        Dstrok: "\u0110",
        dstrok: "\u0111",
        dtdot: "\u22F1",
        dtri: "\u25BF",
        dtrif: "\u25BE",
        duarr: "\u21F5",
        duhar: "\u296F",
        dwangle: "\u29A6",
        DZcy: "\u040F",
        dzcy: "\u045F",
        dzigrarr: "\u27FF",
        Eacute: "\xC9",
        eacute: "\xE9",
        easter: "\u2A6E",
        Ecaron: "\u011A",
        ecaron: "\u011B",
        ecir: "\u2256",
        Ecirc: "\xCA",
        ecirc: "\xEA",
        ecolon: "\u2255",
        Ecy: "\u042D",
        ecy: "\u044D",
        eDDot: "\u2A77",
        Edot: "\u0116",
        eDot: "\u2251",
        edot: "\u0117",
        ee: "\u2147",
        efDot: "\u2252",
        Efr: "\u{1D508}",
        efr: "\u{1D522}",
        eg: "\u2A9A",
        Egrave: "\xC8",
        egrave: "\xE8",
        egs: "\u2A96",
        egsdot: "\u2A98",
        el: "\u2A99",
        Element: "\u2208",
        elinters: "\u23E7",
        ell: "\u2113",
        els: "\u2A95",
        elsdot: "\u2A97",
        Emacr: "\u0112",
        emacr: "\u0113",
        empty: "\u2205",
        emptyset: "\u2205",
        EmptySmallSquare: "\u25FB",
        emptyv: "\u2205",
        EmptyVerySmallSquare: "\u25AB",
        emsp: "\u2003",
        emsp13: "\u2004",
        emsp14: "\u2005",
        ENG: "\u014A",
        eng: "\u014B",
        ensp: "\u2002",
        Eogon: "\u0118",
        eogon: "\u0119",
        Eopf: "\u{1D53C}",
        eopf: "\u{1D556}",
        epar: "\u22D5",
        eparsl: "\u29E3",
        eplus: "\u2A71",
        epsi: "\u03B5",
        Epsilon: "\u0395",
        epsilon: "\u03B5",
        epsiv: "\u03F5",
        eqcirc: "\u2256",
        eqcolon: "\u2255",
        eqsim: "\u2242",
        eqslantgtr: "\u2A96",
        eqslantless: "\u2A95",
        Equal: "\u2A75",
        equals: "=",
        EqualTilde: "\u2242",
        equest: "\u225F",
        Equilibrium: "\u21CC",
        equiv: "\u2261",
        equivDD: "\u2A78",
        eqvparsl: "\u29E5",
        erarr: "\u2971",
        erDot: "\u2253",
        Escr: "\u2130",
        escr: "\u212F",
        esdot: "\u2250",
        Esim: "\u2A73",
        esim: "\u2242",
        Eta: "\u0397",
        eta: "\u03B7",
        ETH: "\xD0",
        eth: "\xF0",
        Euml: "\xCB",
        euml: "\xEB",
        euro: "\u20AC",
        excl: "!",
        exist: "\u2203",
        Exists: "\u2203",
        expectation: "\u2130",
        ExponentialE: "\u2147",
        exponentiale: "\u2147",
        fallingdotseq: "\u2252",
        Fcy: "\u0424",
        fcy: "\u0444",
        female: "\u2640",
        ffilig: "\uFB03",
        fflig: "\uFB00",
        ffllig: "\uFB04",
        Ffr: "\u{1D509}",
        ffr: "\u{1D523}",
        filig: "\uFB01",
        FilledSmallSquare: "\u25FC",
        FilledVerySmallSquare: "\u25AA",
        fjlig: "fj",
        flat: "\u266D",
        fllig: "\uFB02",
        fltns: "\u25B1",
        fnof: "\u0192",
        Fopf: "\u{1D53D}",
        fopf: "\u{1D557}",
        ForAll: "\u2200",
        forall: "\u2200",
        fork: "\u22D4",
        forkv: "\u2AD9",
        Fouriertrf: "\u2131",
        fpartint: "\u2A0D",
        frac12: "\xBD",
        frac13: "\u2153",
        frac14: "\xBC",
        frac15: "\u2155",
        frac16: "\u2159",
        frac18: "\u215B",
        frac23: "\u2154",
        frac25: "\u2156",
        frac34: "\xBE",
        frac35: "\u2157",
        frac38: "\u215C",
        frac45: "\u2158",
        frac56: "\u215A",
        frac58: "\u215D",
        frac78: "\u215E",
        frasl: "\u2044",
        frown: "\u2322",
        Fscr: "\u2131",
        fscr: "\u{1D4BB}",
        gacute: "\u01F5",
        Gamma: "\u0393",
        gamma: "\u03B3",
        Gammad: "\u03DC",
        gammad: "\u03DD",
        gap: "\u2A86",
        Gbreve: "\u011E",
        gbreve: "\u011F",
        Gcedil: "\u0122",
        Gcirc: "\u011C",
        gcirc: "\u011D",
        Gcy: "\u0413",
        gcy: "\u0433",
        Gdot: "\u0120",
        gdot: "\u0121",
        gE: "\u2267",
        ge: "\u2265",
        gEl: "\u2A8C",
        gel: "\u22DB",
        geq: "\u2265",
        geqq: "\u2267",
        geqslant: "\u2A7E",
        ges: "\u2A7E",
        gescc: "\u2AA9",
        gesdot: "\u2A80",
        gesdoto: "\u2A82",
        gesdotol: "\u2A84",
        gesl: "\u22DB\uFE00",
        gesles: "\u2A94",
        Gfr: "\u{1D50A}",
        gfr: "\u{1D524}",
        Gg: "\u22D9",
        gg: "\u226B",
        ggg: "\u22D9",
        gimel: "\u2137",
        GJcy: "\u0403",
        gjcy: "\u0453",
        gl: "\u2277",
        gla: "\u2AA5",
        glE: "\u2A92",
        glj: "\u2AA4",
        gnap: "\u2A8A",
        gnapprox: "\u2A8A",
        gnE: "\u2269",
        gne: "\u2A88",
        gneq: "\u2A88",
        gneqq: "\u2269",
        gnsim: "\u22E7",
        Gopf: "\u{1D53E}",
        gopf: "\u{1D558}",
        grave: "`",
        GreaterEqual: "\u2265",
        GreaterEqualLess: "\u22DB",
        GreaterFullEqual: "\u2267",
        GreaterGreater: "\u2AA2",
        GreaterLess: "\u2277",
        GreaterSlantEqual: "\u2A7E",
        GreaterTilde: "\u2273",
        Gscr: "\u{1D4A2}",
        gscr: "\u210A",
        gsim: "\u2273",
        gsime: "\u2A8E",
        gsiml: "\u2A90",
        Gt: "\u226B",
        GT: ">",
        gt: ">",
        gtcc: "\u2AA7",
        gtcir: "\u2A7A",
        gtdot: "\u22D7",
        gtlPar: "\u2995",
        gtquest: "\u2A7C",
        gtrapprox: "\u2A86",
        gtrarr: "\u2978",
        gtrdot: "\u22D7",
        gtreqless: "\u22DB",
        gtreqqless: "\u2A8C",
        gtrless: "\u2277",
        gtrsim: "\u2273",
        gvertneqq: "\u2269\uFE00",
        gvnE: "\u2269\uFE00",
        Hacek: "\u02C7",
        hairsp: "\u200A",
        half: "\xBD",
        hamilt: "\u210B",
        HARDcy: "\u042A",
        hardcy: "\u044A",
        hArr: "\u21D4",
        harr: "\u2194",
        harrcir: "\u2948",
        harrw: "\u21AD",
        Hat: "^",
        hbar: "\u210F",
        Hcirc: "\u0124",
        hcirc: "\u0125",
        hearts: "\u2665",
        heartsuit: "\u2665",
        hellip: "\u2026",
        hercon: "\u22B9",
        Hfr: "\u210C",
        hfr: "\u{1D525}",
        HilbertSpace: "\u210B",
        hksearow: "\u2925",
        hkswarow: "\u2926",
        hoarr: "\u21FF",
        homtht: "\u223B",
        hookleftarrow: "\u21A9",
        hookrightarrow: "\u21AA",
        Hopf: "\u210D",
        hopf: "\u{1D559}",
        horbar: "\u2015",
        HorizontalLine: "\u2500",
        Hscr: "\u210B",
        hscr: "\u{1D4BD}",
        hslash: "\u210F",
        Hstrok: "\u0126",
        hstrok: "\u0127",
        HumpDownHump: "\u224E",
        HumpEqual: "\u224F",
        hybull: "\u2043",
        hyphen: "\u2010",
        Iacute: "\xCD",
        iacute: "\xED",
        ic: "\u2063",
        Icirc: "\xCE",
        icirc: "\xEE",
        Icy: "\u0418",
        icy: "\u0438",
        Idot: "\u0130",
        IEcy: "\u0415",
        iecy: "\u0435",
        iexcl: "\xA1",
        iff: "\u21D4",
        Ifr: "\u2111",
        ifr: "\u{1D526}",
        Igrave: "\xCC",
        igrave: "\xEC",
        ii: "\u2148",
        iiiint: "\u2A0C",
        iiint: "\u222D",
        iinfin: "\u29DC",
        iiota: "\u2129",
        IJlig: "\u0132",
        ijlig: "\u0133",
        Im: "\u2111",
        Imacr: "\u012A",
        imacr: "\u012B",
        image: "\u2111",
        ImaginaryI: "\u2148",
        imagline: "\u2110",
        imagpart: "\u2111",
        imath: "\u0131",
        imof: "\u22B7",
        imped: "\u01B5",
        Implies: "\u21D2",
        in: "\u2208",
        incare: "\u2105",
        infin: "\u221E",
        infintie: "\u29DD",
        inodot: "\u0131",
        Int: "\u222C",
        int: "\u222B",
        intcal: "\u22BA",
        integers: "\u2124",
        Integral: "\u222B",
        intercal: "\u22BA",
        Intersection: "\u22C2",
        intlarhk: "\u2A17",
        intprod: "\u2A3C",
        InvisibleComma: "\u2063",
        InvisibleTimes: "\u2062",
        IOcy: "\u0401",
        iocy: "\u0451",
        Iogon: "\u012E",
        iogon: "\u012F",
        Iopf: "\u{1D540}",
        iopf: "\u{1D55A}",
        Iota: "\u0399",
        iota: "\u03B9",
        iprod: "\u2A3C",
        iquest: "\xBF",
        Iscr: "\u2110",
        iscr: "\u{1D4BE}",
        isin: "\u2208",
        isindot: "\u22F5",
        isinE: "\u22F9",
        isins: "\u22F4",
        isinsv: "\u22F3",
        isinv: "\u2208",
        it: "\u2062",
        Itilde: "\u0128",
        itilde: "\u0129",
        Iukcy: "\u0406",
        iukcy: "\u0456",
        Iuml: "\xCF",
        iuml: "\xEF",
        Jcirc: "\u0134",
        jcirc: "\u0135",
        Jcy: "\u0419",
        jcy: "\u0439",
        Jfr: "\u{1D50D}",
        jfr: "\u{1D527}",
        jmath: "\u0237",
        Jopf: "\u{1D541}",
        jopf: "\u{1D55B}",
        Jscr: "\u{1D4A5}",
        jscr: "\u{1D4BF}",
        Jsercy: "\u0408",
        jsercy: "\u0458",
        Jukcy: "\u0404",
        jukcy: "\u0454",
        Kappa: "\u039A",
        kappa: "\u03BA",
        kappav: "\u03F0",
        Kcedil: "\u0136",
        kcedil: "\u0137",
        Kcy: "\u041A",
        kcy: "\u043A",
        Kfr: "\u{1D50E}",
        kfr: "\u{1D528}",
        kgreen: "\u0138",
        KHcy: "\u0425",
        khcy: "\u0445",
        KJcy: "\u040C",
        kjcy: "\u045C",
        Kopf: "\u{1D542}",
        kopf: "\u{1D55C}",
        Kscr: "\u{1D4A6}",
        kscr: "\u{1D4C0}",
        lAarr: "\u21DA",
        Lacute: "\u0139",
        lacute: "\u013A",
        laemptyv: "\u29B4",
        lagran: "\u2112",
        Lambda: "\u039B",
        lambda: "\u03BB",
        Lang: "\u27EA",
        lang: "\u27E8",
        langd: "\u2991",
        langle: "\u27E8",
        lap: "\u2A85",
        Laplacetrf: "\u2112",
        laquo: "\xAB",
        Larr: "\u219E",
        lArr: "\u21D0",
        larr: "\u2190",
        larrb: "\u21E4",
        larrbfs: "\u291F",
        larrfs: "\u291D",
        larrhk: "\u21A9",
        larrlp: "\u21AB",
        larrpl: "\u2939",
        larrsim: "\u2973",
        larrtl: "\u21A2",
        lat: "\u2AAB",
        lAtail: "\u291B",
        latail: "\u2919",
        late: "\u2AAD",
        lates: "\u2AAD\uFE00",
        lBarr: "\u290E",
        lbarr: "\u290C",
        lbbrk: "\u2772",
        lbrace: "{",
        lbrack: "[",
        lbrke: "\u298B",
        lbrksld: "\u298F",
        lbrkslu: "\u298D",
        Lcaron: "\u013D",
        lcaron: "\u013E",
        Lcedil: "\u013B",
        lcedil: "\u013C",
        lceil: "\u2308",
        lcub: "{",
        Lcy: "\u041B",
        lcy: "\u043B",
        ldca: "\u2936",
        ldquo: "\u201C",
        ldquor: "\u201E",
        ldrdhar: "\u2967",
        ldrushar: "\u294B",
        ldsh: "\u21B2",
        lE: "\u2266",
        le: "\u2264",
        LeftAngleBracket: "\u27E8",
        LeftArrow: "\u2190",
        Leftarrow: "\u21D0",
        leftarrow: "\u2190",
        LeftArrowBar: "\u21E4",
        LeftArrowRightArrow: "\u21C6",
        leftarrowtail: "\u21A2",
        LeftCeiling: "\u2308",
        LeftDoubleBracket: "\u27E6",
        LeftDownTeeVector: "\u2961",
        LeftDownVector: "\u21C3",
        LeftDownVectorBar: "\u2959",
        LeftFloor: "\u230A",
        leftharpoondown: "\u21BD",
        leftharpoonup: "\u21BC",
        leftleftarrows: "\u21C7",
        LeftRightArrow: "\u2194",
        Leftrightarrow: "\u21D4",
        leftrightarrow: "\u2194",
        leftrightarrows: "\u21C6",
        leftrightharpoons: "\u21CB",
        leftrightsquigarrow: "\u21AD",
        LeftRightVector: "\u294E",
        LeftTee: "\u22A3",
        LeftTeeArrow: "\u21A4",
        LeftTeeVector: "\u295A",
        leftthreetimes: "\u22CB",
        LeftTriangle: "\u22B2",
        LeftTriangleBar: "\u29CF",
        LeftTriangleEqual: "\u22B4",
        LeftUpDownVector: "\u2951",
        LeftUpTeeVector: "\u2960",
        LeftUpVector: "\u21BF",
        LeftUpVectorBar: "\u2958",
        LeftVector: "\u21BC",
        LeftVectorBar: "\u2952",
        lEg: "\u2A8B",
        leg: "\u22DA",
        leq: "\u2264",
        leqq: "\u2266",
        leqslant: "\u2A7D",
        les: "\u2A7D",
        lescc: "\u2AA8",
        lesdot: "\u2A7F",
        lesdoto: "\u2A81",
        lesdotor: "\u2A83",
        lesg: "\u22DA\uFE00",
        lesges: "\u2A93",
        lessapprox: "\u2A85",
        lessdot: "\u22D6",
        lesseqgtr: "\u22DA",
        lesseqqgtr: "\u2A8B",
        LessEqualGreater: "\u22DA",
        LessFullEqual: "\u2266",
        LessGreater: "\u2276",
        lessgtr: "\u2276",
        LessLess: "\u2AA1",
        lesssim: "\u2272",
        LessSlantEqual: "\u2A7D",
        LessTilde: "\u2272",
        lfisht: "\u297C",
        lfloor: "\u230A",
        Lfr: "\u{1D50F}",
        lfr: "\u{1D529}",
        lg: "\u2276",
        lgE: "\u2A91",
        lHar: "\u2962",
        lhard: "\u21BD",
        lharu: "\u21BC",
        lharul: "\u296A",
        lhblk: "\u2584",
        LJcy: "\u0409",
        ljcy: "\u0459",
        Ll: "\u22D8",
        ll: "\u226A",
        llarr: "\u21C7",
        llcorner: "\u231E",
        Lleftarrow: "\u21DA",
        llhard: "\u296B",
        lltri: "\u25FA",
        Lmidot: "\u013F",
        lmidot: "\u0140",
        lmoust: "\u23B0",
        lmoustache: "\u23B0",
        lnap: "\u2A89",
        lnapprox: "\u2A89",
        lnE: "\u2268",
        lne: "\u2A87",
        lneq: "\u2A87",
        lneqq: "\u2268",
        lnsim: "\u22E6",
        loang: "\u27EC",
        loarr: "\u21FD",
        lobrk: "\u27E6",
        LongLeftArrow: "\u27F5",
        Longleftarrow: "\u27F8",
        longleftarrow: "\u27F5",
        LongLeftRightArrow: "\u27F7",
        Longleftrightarrow: "\u27FA",
        longleftrightarrow: "\u27F7",
        longmapsto: "\u27FC",
        LongRightArrow: "\u27F6",
        Longrightarrow: "\u27F9",
        longrightarrow: "\u27F6",
        looparrowleft: "\u21AB",
        looparrowright: "\u21AC",
        lopar: "\u2985",
        Lopf: "\u{1D543}",
        lopf: "\u{1D55D}",
        loplus: "\u2A2D",
        lotimes: "\u2A34",
        lowast: "\u2217",
        lowbar: "_",
        LowerLeftArrow: "\u2199",
        LowerRightArrow: "\u2198",
        loz: "\u25CA",
        lozenge: "\u25CA",
        lozf: "\u29EB",
        lpar: "(",
        lparlt: "\u2993",
        lrarr: "\u21C6",
        lrcorner: "\u231F",
        lrhar: "\u21CB",
        lrhard: "\u296D",
        lrm: "\u200E",
        lrtri: "\u22BF",
        lsaquo: "\u2039",
        Lscr: "\u2112",
        lscr: "\u{1D4C1}",
        Lsh: "\u21B0",
        lsh: "\u21B0",
        lsim: "\u2272",
        lsime: "\u2A8D",
        lsimg: "\u2A8F",
        lsqb: "[",
        lsquo: "\u2018",
        lsquor: "\u201A",
        Lstrok: "\u0141",
        lstrok: "\u0142",
        Lt: "\u226A",
        LT: "<",
        lt: "<",
        ltcc: "\u2AA6",
        ltcir: "\u2A79",
        ltdot: "\u22D6",
        lthree: "\u22CB",
        ltimes: "\u22C9",
        ltlarr: "\u2976",
        ltquest: "\u2A7B",
        ltri: "\u25C3",
        ltrie: "\u22B4",
        ltrif: "\u25C2",
        ltrPar: "\u2996",
        lurdshar: "\u294A",
        luruhar: "\u2966",
        lvertneqq: "\u2268\uFE00",
        lvnE: "\u2268\uFE00",
        macr: "\xAF",
        male: "\u2642",
        malt: "\u2720",
        maltese: "\u2720",
        Map: "\u2905",
        map: "\u21A6",
        mapsto: "\u21A6",
        mapstodown: "\u21A7",
        mapstoleft: "\u21A4",
        mapstoup: "\u21A5",
        marker: "\u25AE",
        mcomma: "\u2A29",
        Mcy: "\u041C",
        mcy: "\u043C",
        mdash: "\u2014",
        mDDot: "\u223A",
        measuredangle: "\u2221",
        MediumSpace: "\u205F",
        Mellintrf: "\u2133",
        Mfr: "\u{1D510}",
        mfr: "\u{1D52A}",
        mho: "\u2127",
        micro: "\xB5",
        mid: "\u2223",
        midast: "*",
        midcir: "\u2AF0",
        middot: "\xB7",
        minus: "\u2212",
        minusb: "\u229F",
        minusd: "\u2238",
        minusdu: "\u2A2A",
        MinusPlus: "\u2213",
        mlcp: "\u2ADB",
        mldr: "\u2026",
        mnplus: "\u2213",
        models: "\u22A7",
        Mopf: "\u{1D544}",
        mopf: "\u{1D55E}",
        mp: "\u2213",
        Mscr: "\u2133",
        mscr: "\u{1D4C2}",
        mstpos: "\u223E",
        Mu: "\u039C",
        mu: "\u03BC",
        multimap: "\u22B8",
        mumap: "\u22B8",
        nabla: "\u2207",
        Nacute: "\u0143",
        nacute: "\u0144",
        nang: "\u2220\u20D2",
        nap: "\u2249",
        napE: "\u2A70\u0338",
        napid: "\u224B\u0338",
        napos: "\u0149",
        napprox: "\u2249",
        natur: "\u266E",
        natural: "\u266E",
        naturals: "\u2115",
        nbsp: "\xA0",
        nbump: "\u224E\u0338",
        nbumpe: "\u224F\u0338",
        ncap: "\u2A43",
        Ncaron: "\u0147",
        ncaron: "\u0148",
        Ncedil: "\u0145",
        ncedil: "\u0146",
        ncong: "\u2247",
        ncongdot: "\u2A6D\u0338",
        ncup: "\u2A42",
        Ncy: "\u041D",
        ncy: "\u043D",
        ndash: "\u2013",
        ne: "\u2260",
        nearhk: "\u2924",
        neArr: "\u21D7",
        nearr: "\u2197",
        nearrow: "\u2197",
        nedot: "\u2250\u0338",
        NegativeMediumSpace: "\u200B",
        NegativeThickSpace: "\u200B",
        NegativeThinSpace: "\u200B",
        NegativeVeryThinSpace: "\u200B",
        nequiv: "\u2262",
        nesear: "\u2928",
        nesim: "\u2242\u0338",
        NestedGreaterGreater: "\u226B",
        NestedLessLess: "\u226A",
        NewLine: "\n",
        nexist: "\u2204",
        nexists: "\u2204",
        Nfr: "\u{1D511}",
        nfr: "\u{1D52B}",
        ngE: "\u2267\u0338",
        nge: "\u2271",
        ngeq: "\u2271",
        ngeqq: "\u2267\u0338",
        ngeqslant: "\u2A7E\u0338",
        nges: "\u2A7E\u0338",
        nGg: "\u22D9\u0338",
        ngsim: "\u2275",
        nGt: "\u226B\u20D2",
        ngt: "\u226F",
        ngtr: "\u226F",
        nGtv: "\u226B\u0338",
        nhArr: "\u21CE",
        nharr: "\u21AE",
        nhpar: "\u2AF2",
        ni: "\u220B",
        nis: "\u22FC",
        nisd: "\u22FA",
        niv: "\u220B",
        NJcy: "\u040A",
        njcy: "\u045A",
        nlArr: "\u21CD",
        nlarr: "\u219A",
        nldr: "\u2025",
        nlE: "\u2266\u0338",
        nle: "\u2270",
        nLeftarrow: "\u21CD",
        nleftarrow: "\u219A",
        nLeftrightarrow: "\u21CE",
        nleftrightarrow: "\u21AE",
        nleq: "\u2270",
        nleqq: "\u2266\u0338",
        nleqslant: "\u2A7D\u0338",
        nles: "\u2A7D\u0338",
        nless: "\u226E",
        nLl: "\u22D8\u0338",
        nlsim: "\u2274",
        nLt: "\u226A\u20D2",
        nlt: "\u226E",
        nltri: "\u22EA",
        nltrie: "\u22EC",
        nLtv: "\u226A\u0338",
        nmid: "\u2224",
        NoBreak: "\u2060",
        NonBreakingSpace: "\xA0",
        Nopf: "\u2115",
        nopf: "\u{1D55F}",
        Not: "\u2AEC",
        not: "\xAC",
        NotCongruent: "\u2262",
        NotCupCap: "\u226D",
        NotDoubleVerticalBar: "\u2226",
        NotElement: "\u2209",
        NotEqual: "\u2260",
        NotEqualTilde: "\u2242\u0338",
        NotExists: "\u2204",
        NotGreater: "\u226F",
        NotGreaterEqual: "\u2271",
        NotGreaterFullEqual: "\u2267\u0338",
        NotGreaterGreater: "\u226B\u0338",
        NotGreaterLess: "\u2279",
        NotGreaterSlantEqual: "\u2A7E\u0338",
        NotGreaterTilde: "\u2275",
        NotHumpDownHump: "\u224E\u0338",
        NotHumpEqual: "\u224F\u0338",
        notin: "\u2209",
        notindot: "\u22F5\u0338",
        notinE: "\u22F9\u0338",
        notinva: "\u2209",
        notinvb: "\u22F7",
        notinvc: "\u22F6",
        NotLeftTriangle: "\u22EA",
        NotLeftTriangleBar: "\u29CF\u0338",
        NotLeftTriangleEqual: "\u22EC",
        NotLess: "\u226E",
        NotLessEqual: "\u2270",
        NotLessGreater: "\u2278",
        NotLessLess: "\u226A\u0338",
        NotLessSlantEqual: "\u2A7D\u0338",
        NotLessTilde: "\u2274",
        NotNestedGreaterGreater: "\u2AA2\u0338",
        NotNestedLessLess: "\u2AA1\u0338",
        notni: "\u220C",
        notniva: "\u220C",
        notnivb: "\u22FE",
        notnivc: "\u22FD",
        NotPrecedes: "\u2280",
        NotPrecedesEqual: "\u2AAF\u0338",
        NotPrecedesSlantEqual: "\u22E0",
        NotReverseElement: "\u220C",
        NotRightTriangle: "\u22EB",
        NotRightTriangleBar: "\u29D0\u0338",
        NotRightTriangleEqual: "\u22ED",
        NotSquareSubset: "\u228F\u0338",
        NotSquareSubsetEqual: "\u22E2",
        NotSquareSuperset: "\u2290\u0338",
        NotSquareSupersetEqual: "\u22E3",
        NotSubset: "\u2282\u20D2",
        NotSubsetEqual: "\u2288",
        NotSucceeds: "\u2281",
        NotSucceedsEqual: "\u2AB0\u0338",
        NotSucceedsSlantEqual: "\u22E1",
        NotSucceedsTilde: "\u227F\u0338",
        NotSuperset: "\u2283\u20D2",
        NotSupersetEqual: "\u2289",
        NotTilde: "\u2241",
        NotTildeEqual: "\u2244",
        NotTildeFullEqual: "\u2247",
        NotTildeTilde: "\u2249",
        NotVerticalBar: "\u2224",
        npar: "\u2226",
        nparallel: "\u2226",
        nparsl: "\u2AFD\u20E5",
        npart: "\u2202\u0338",
        npolint: "\u2A14",
        npr: "\u2280",
        nprcue: "\u22E0",
        npre: "\u2AAF\u0338",
        nprec: "\u2280",
        npreceq: "\u2AAF\u0338",
        nrArr: "\u21CF",
        nrarr: "\u219B",
        nrarrc: "\u2933\u0338",
        nrarrw: "\u219D\u0338",
        nRightarrow: "\u21CF",
        nrightarrow: "\u219B",
        nrtri: "\u22EB",
        nrtrie: "\u22ED",
        nsc: "\u2281",
        nsccue: "\u22E1",
        nsce: "\u2AB0\u0338",
        Nscr: "\u{1D4A9}",
        nscr: "\u{1D4C3}",
        nshortmid: "\u2224",
        nshortparallel: "\u2226",
        nsim: "\u2241",
        nsime: "\u2244",
        nsimeq: "\u2244",
        nsmid: "\u2224",
        nspar: "\u2226",
        nsqsube: "\u22E2",
        nsqsupe: "\u22E3",
        nsub: "\u2284",
        nsubE: "\u2AC5\u0338",
        nsube: "\u2288",
        nsubset: "\u2282\u20D2",
        nsubseteq: "\u2288",
        nsubseteqq: "\u2AC5\u0338",
        nsucc: "\u2281",
        nsucceq: "\u2AB0\u0338",
        nsup: "\u2285",
        nsupE: "\u2AC6\u0338",
        nsupe: "\u2289",
        nsupset: "\u2283\u20D2",
        nsupseteq: "\u2289",
        nsupseteqq: "\u2AC6\u0338",
        ntgl: "\u2279",
        Ntilde: "\xD1",
        ntilde: "\xF1",
        ntlg: "\u2278",
        ntriangleleft: "\u22EA",
        ntrianglelefteq: "\u22EC",
        ntriangleright: "\u22EB",
        ntrianglerighteq: "\u22ED",
        Nu: "\u039D",
        nu: "\u03BD",
        num: "#",
        numero: "\u2116",
        numsp: "\u2007",
        nvap: "\u224D\u20D2",
        nVDash: "\u22AF",
        nVdash: "\u22AE",
        nvDash: "\u22AD",
        nvdash: "\u22AC",
        nvge: "\u2265\u20D2",
        nvgt: ">\u20D2",
        nvHarr: "\u2904",
        nvinfin: "\u29DE",
        nvlArr: "\u2902",
        nvle: "\u2264\u20D2",
        nvlt: "<\u20D2",
        nvltrie: "\u22B4\u20D2",
        nvrArr: "\u2903",
        nvrtrie: "\u22B5\u20D2",
        nvsim: "\u223C\u20D2",
        nwarhk: "\u2923",
        nwArr: "\u21D6",
        nwarr: "\u2196",
        nwarrow: "\u2196",
        nwnear: "\u2927",
        Oacute: "\xD3",
        oacute: "\xF3",
        oast: "\u229B",
        ocir: "\u229A",
        Ocirc: "\xD4",
        ocirc: "\xF4",
        Ocy: "\u041E",
        ocy: "\u043E",
        odash: "\u229D",
        Odblac: "\u0150",
        odblac: "\u0151",
        odiv: "\u2A38",
        odot: "\u2299",
        odsold: "\u29BC",
        OElig: "\u0152",
        oelig: "\u0153",
        ofcir: "\u29BF",
        Ofr: "\u{1D512}",
        ofr: "\u{1D52C}",
        ogon: "\u02DB",
        Ograve: "\xD2",
        ograve: "\xF2",
        ogt: "\u29C1",
        ohbar: "\u29B5",
        ohm: "\u03A9",
        oint: "\u222E",
        olarr: "\u21BA",
        olcir: "\u29BE",
        olcross: "\u29BB",
        oline: "\u203E",
        olt: "\u29C0",
        Omacr: "\u014C",
        omacr: "\u014D",
        Omega: "\u03A9",
        omega: "\u03C9",
        Omicron: "\u039F",
        omicron: "\u03BF",
        omid: "\u29B6",
        ominus: "\u2296",
        Oopf: "\u{1D546}",
        oopf: "\u{1D560}",
        opar: "\u29B7",
        OpenCurlyDoubleQuote: "\u201C",
        OpenCurlyQuote: "\u2018",
        operp: "\u29B9",
        oplus: "\u2295",
        Or: "\u2A54",
        or: "\u2228",
        orarr: "\u21BB",
        ord: "\u2A5D",
        order: "\u2134",
        orderof: "\u2134",
        ordf: "\xAA",
        ordm: "\xBA",
        origof: "\u22B6",
        oror: "\u2A56",
        orslope: "\u2A57",
        orv: "\u2A5B",
        oS: "\u24C8",
        Oscr: "\u{1D4AA}",
        oscr: "\u2134",
        Oslash: "\xD8",
        oslash: "\xF8",
        osol: "\u2298",
        Otilde: "\xD5",
        otilde: "\xF5",
        Otimes: "\u2A37",
        otimes: "\u2297",
        otimesas: "\u2A36",
        Ouml: "\xD6",
        ouml: "\xF6",
        ovbar: "\u233D",
        OverBar: "\u203E",
        OverBrace: "\u23DE",
        OverBracket: "\u23B4",
        OverParenthesis: "\u23DC",
        par: "\u2225",
        para: "\xB6",
        parallel: "\u2225",
        parsim: "\u2AF3",
        parsl: "\u2AFD",
        part: "\u2202",
        PartialD: "\u2202",
        Pcy: "\u041F",
        pcy: "\u043F",
        percnt: "%",
        period: ".",
        permil: "\u2030",
        perp: "\u22A5",
        pertenk: "\u2031",
        Pfr: "\u{1D513}",
        pfr: "\u{1D52D}",
        Phi: "\u03A6",
        phi: "\u03C6",
        phiv: "\u03D5",
        phmmat: "\u2133",
        phone: "\u260E",
        Pi: "\u03A0",
        pi: "\u03C0",
        pitchfork: "\u22D4",
        piv: "\u03D6",
        planck: "\u210F",
        planckh: "\u210E",
        plankv: "\u210F",
        plus: "+",
        plusacir: "\u2A23",
        plusb: "\u229E",
        pluscir: "\u2A22",
        plusdo: "\u2214",
        plusdu: "\u2A25",
        pluse: "\u2A72",
        PlusMinus: "\xB1",
        plusmn: "\xB1",
        plussim: "\u2A26",
        plustwo: "\u2A27",
        pm: "\xB1",
        Poincareplane: "\u210C",
        pointint: "\u2A15",
        Popf: "\u2119",
        popf: "\u{1D561}",
        pound: "\xA3",
        Pr: "\u2ABB",
        pr: "\u227A",
        prap: "\u2AB7",
        prcue: "\u227C",
        prE: "\u2AB3",
        pre: "\u2AAF",
        prec: "\u227A",
        precapprox: "\u2AB7",
        preccurlyeq: "\u227C",
        Precedes: "\u227A",
        PrecedesEqual: "\u2AAF",
        PrecedesSlantEqual: "\u227C",
        PrecedesTilde: "\u227E",
        preceq: "\u2AAF",
        precnapprox: "\u2AB9",
        precneqq: "\u2AB5",
        precnsim: "\u22E8",
        precsim: "\u227E",
        Prime: "\u2033",
        prime: "\u2032",
        primes: "\u2119",
        prnap: "\u2AB9",
        prnE: "\u2AB5",
        prnsim: "\u22E8",
        prod: "\u220F",
        Product: "\u220F",
        profalar: "\u232E",
        profline: "\u2312",
        profsurf: "\u2313",
        prop: "\u221D",
        Proportion: "\u2237",
        Proportional: "\u221D",
        propto: "\u221D",
        prsim: "\u227E",
        prurel: "\u22B0",
        Pscr: "\u{1D4AB}",
        pscr: "\u{1D4C5}",
        Psi: "\u03A8",
        psi: "\u03C8",
        puncsp: "\u2008",
        Qfr: "\u{1D514}",
        qfr: "\u{1D52E}",
        qint: "\u2A0C",
        Qopf: "\u211A",
        qopf: "\u{1D562}",
        qprime: "\u2057",
        Qscr: "\u{1D4AC}",
        qscr: "\u{1D4C6}",
        quaternions: "\u210D",
        quatint: "\u2A16",
        quest: "?",
        questeq: "\u225F",
        QUOT: '"',
        quot: '"',
        rAarr: "\u21DB",
        race: "\u223D\u0331",
        Racute: "\u0154",
        racute: "\u0155",
        radic: "\u221A",
        raemptyv: "\u29B3",
        Rang: "\u27EB",
        rang: "\u27E9",
        rangd: "\u2992",
        range: "\u29A5",
        rangle: "\u27E9",
        raquo: "\xBB",
        Rarr: "\u21A0",
        rArr: "\u21D2",
        rarr: "\u2192",
        rarrap: "\u2975",
        rarrb: "\u21E5",
        rarrbfs: "\u2920",
        rarrc: "\u2933",
        rarrfs: "\u291E",
        rarrhk: "\u21AA",
        rarrlp: "\u21AC",
        rarrpl: "\u2945",
        rarrsim: "\u2974",
        Rarrtl: "\u2916",
        rarrtl: "\u21A3",
        rarrw: "\u219D",
        rAtail: "\u291C",
        ratail: "\u291A",
        ratio: "\u2236",
        rationals: "\u211A",
        RBarr: "\u2910",
        rBarr: "\u290F",
        rbarr: "\u290D",
        rbbrk: "\u2773",
        rbrace: "}",
        rbrack: "]",
        rbrke: "\u298C",
        rbrksld: "\u298E",
        rbrkslu: "\u2990",
        Rcaron: "\u0158",
        rcaron: "\u0159",
        Rcedil: "\u0156",
        rcedil: "\u0157",
        rceil: "\u2309",
        rcub: "}",
        Rcy: "\u0420",
        rcy: "\u0440",
        rdca: "\u2937",
        rdldhar: "\u2969",
        rdquo: "\u201D",
        rdquor: "\u201D",
        rdsh: "\u21B3",
        Re: "\u211C",
        real: "\u211C",
        realine: "\u211B",
        realpart: "\u211C",
        reals: "\u211D",
        rect: "\u25AD",
        REG: "\xAE",
        reg: "\xAE",
        ReverseElement: "\u220B",
        ReverseEquilibrium: "\u21CB",
        ReverseUpEquilibrium: "\u296F",
        rfisht: "\u297D",
        rfloor: "\u230B",
        Rfr: "\u211C",
        rfr: "\u{1D52F}",
        rHar: "\u2964",
        rhard: "\u21C1",
        rharu: "\u21C0",
        rharul: "\u296C",
        Rho: "\u03A1",
        rho: "\u03C1",
        rhov: "\u03F1",
        RightAngleBracket: "\u27E9",
        RightArrow: "\u2192",
        Rightarrow: "\u21D2",
        rightarrow: "\u2192",
        RightArrowBar: "\u21E5",
        RightArrowLeftArrow: "\u21C4",
        rightarrowtail: "\u21A3",
        RightCeiling: "\u2309",
        RightDoubleBracket: "\u27E7",
        RightDownTeeVector: "\u295D",
        RightDownVector: "\u21C2",
        RightDownVectorBar: "\u2955",
        RightFloor: "\u230B",
        rightharpoondown: "\u21C1",
        rightharpoonup: "\u21C0",
        rightleftarrows: "\u21C4",
        rightleftharpoons: "\u21CC",
        rightrightarrows: "\u21C9",
        rightsquigarrow: "\u219D",
        RightTee: "\u22A2",
        RightTeeArrow: "\u21A6",
        RightTeeVector: "\u295B",
        rightthreetimes: "\u22CC",
        RightTriangle: "\u22B3",
        RightTriangleBar: "\u29D0",
        RightTriangleEqual: "\u22B5",
        RightUpDownVector: "\u294F",
        RightUpTeeVector: "\u295C",
        RightUpVector: "\u21BE",
        RightUpVectorBar: "\u2954",
        RightVector: "\u21C0",
        RightVectorBar: "\u2953",
        ring: "\u02DA",
        risingdotseq: "\u2253",
        rlarr: "\u21C4",
        rlhar: "\u21CC",
        rlm: "\u200F",
        rmoust: "\u23B1",
        rmoustache: "\u23B1",
        rnmid: "\u2AEE",
        roang: "\u27ED",
        roarr: "\u21FE",
        robrk: "\u27E7",
        ropar: "\u2986",
        Ropf: "\u211D",
        ropf: "\u{1D563}",
        roplus: "\u2A2E",
        rotimes: "\u2A35",
        RoundImplies: "\u2970",
        rpar: ")",
        rpargt: "\u2994",
        rppolint: "\u2A12",
        rrarr: "\u21C9",
        Rrightarrow: "\u21DB",
        rsaquo: "\u203A",
        Rscr: "\u211B",
        rscr: "\u{1D4C7}",
        Rsh: "\u21B1",
        rsh: "\u21B1",
        rsqb: "]",
        rsquo: "\u2019",
        rsquor: "\u2019",
        rthree: "\u22CC",
        rtimes: "\u22CA",
        rtri: "\u25B9",
        rtrie: "\u22B5",
        rtrif: "\u25B8",
        rtriltri: "\u29CE",
        RuleDelayed: "\u29F4",
        ruluhar: "\u2968",
        rx: "\u211E",
        Sacute: "\u015A",
        sacute: "\u015B",
        sbquo: "\u201A",
        Sc: "\u2ABC",
        sc: "\u227B",
        scap: "\u2AB8",
        Scaron: "\u0160",
        scaron: "\u0161",
        sccue: "\u227D",
        scE: "\u2AB4",
        sce: "\u2AB0",
        Scedil: "\u015E",
        scedil: "\u015F",
        Scirc: "\u015C",
        scirc: "\u015D",
        scnap: "\u2ABA",
        scnE: "\u2AB6",
        scnsim: "\u22E9",
        scpolint: "\u2A13",
        scsim: "\u227F",
        Scy: "\u0421",
        scy: "\u0441",
        sdot: "\u22C5",
        sdotb: "\u22A1",
        sdote: "\u2A66",
        searhk: "\u2925",
        seArr: "\u21D8",
        searr: "\u2198",
        searrow: "\u2198",
        sect: "\xA7",
        semi: ";",
        seswar: "\u2929",
        setminus: "\u2216",
        setmn: "\u2216",
        sext: "\u2736",
        Sfr: "\u{1D516}",
        sfr: "\u{1D530}",
        sfrown: "\u2322",
        sharp: "\u266F",
        SHCHcy: "\u0429",
        shchcy: "\u0449",
        SHcy: "\u0428",
        shcy: "\u0448",
        ShortDownArrow: "\u2193",
        ShortLeftArrow: "\u2190",
        shortmid: "\u2223",
        shortparallel: "\u2225",
        ShortRightArrow: "\u2192",
        ShortUpArrow: "\u2191",
        shy: "\xAD",
        Sigma: "\u03A3",
        sigma: "\u03C3",
        sigmaf: "\u03C2",
        sigmav: "\u03C2",
        sim: "\u223C",
        simdot: "\u2A6A",
        sime: "\u2243",
        simeq: "\u2243",
        simg: "\u2A9E",
        simgE: "\u2AA0",
        siml: "\u2A9D",
        simlE: "\u2A9F",
        simne: "\u2246",
        simplus: "\u2A24",
        simrarr: "\u2972",
        slarr: "\u2190",
        SmallCircle: "\u2218",
        smallsetminus: "\u2216",
        smashp: "\u2A33",
        smeparsl: "\u29E4",
        smid: "\u2223",
        smile: "\u2323",
        smt: "\u2AAA",
        smte: "\u2AAC",
        smtes: "\u2AAC\uFE00",
        SOFTcy: "\u042C",
        softcy: "\u044C",
        sol: "/",
        solb: "\u29C4",
        solbar: "\u233F",
        Sopf: "\u{1D54A}",
        sopf: "\u{1D564}",
        spades: "\u2660",
        spadesuit: "\u2660",
        spar: "\u2225",
        sqcap: "\u2293",
        sqcaps: "\u2293\uFE00",
        sqcup: "\u2294",
        sqcups: "\u2294\uFE00",
        Sqrt: "\u221A",
        sqsub: "\u228F",
        sqsube: "\u2291",
        sqsubset: "\u228F",
        sqsubseteq: "\u2291",
        sqsup: "\u2290",
        sqsupe: "\u2292",
        sqsupset: "\u2290",
        sqsupseteq: "\u2292",
        squ: "\u25A1",
        Square: "\u25A1",
        square: "\u25A1",
        SquareIntersection: "\u2293",
        SquareSubset: "\u228F",
        SquareSubsetEqual: "\u2291",
        SquareSuperset: "\u2290",
        SquareSupersetEqual: "\u2292",
        SquareUnion: "\u2294",
        squarf: "\u25AA",
        squf: "\u25AA",
        srarr: "\u2192",
        Sscr: "\u{1D4AE}",
        sscr: "\u{1D4C8}",
        ssetmn: "\u2216",
        ssmile: "\u2323",
        sstarf: "\u22C6",
        Star: "\u22C6",
        star: "\u2606",
        starf: "\u2605",
        straightepsilon: "\u03F5",
        straightphi: "\u03D5",
        strns: "\xAF",
        Sub: "\u22D0",
        sub: "\u2282",
        subdot: "\u2ABD",
        subE: "\u2AC5",
        sube: "\u2286",
        subedot: "\u2AC3",
        submult: "\u2AC1",
        subnE: "\u2ACB",
        subne: "\u228A",
        subplus: "\u2ABF",
        subrarr: "\u2979",
        Subset: "\u22D0",
        subset: "\u2282",
        subseteq: "\u2286",
        subseteqq: "\u2AC5",
        SubsetEqual: "\u2286",
        subsetneq: "\u228A",
        subsetneqq: "\u2ACB",
        subsim: "\u2AC7",
        subsub: "\u2AD5",
        subsup: "\u2AD3",
        succ: "\u227B",
        succapprox: "\u2AB8",
        succcurlyeq: "\u227D",
        Succeeds: "\u227B",
        SucceedsEqual: "\u2AB0",
        SucceedsSlantEqual: "\u227D",
        SucceedsTilde: "\u227F",
        succeq: "\u2AB0",
        succnapprox: "\u2ABA",
        succneqq: "\u2AB6",
        succnsim: "\u22E9",
        succsim: "\u227F",
        SuchThat: "\u220B",
        Sum: "\u2211",
        sum: "\u2211",
        sung: "\u266A",
        Sup: "\u22D1",
        sup: "\u2283",
        sup1: "\xB9",
        sup2: "\xB2",
        sup3: "\xB3",
        supdot: "\u2ABE",
        supdsub: "\u2AD8",
        supE: "\u2AC6",
        supe: "\u2287",
        supedot: "\u2AC4",
        Superset: "\u2283",
        SupersetEqual: "\u2287",
        suphsol: "\u27C9",
        suphsub: "\u2AD7",
        suplarr: "\u297B",
        supmult: "\u2AC2",
        supnE: "\u2ACC",
        supne: "\u228B",
        supplus: "\u2AC0",
        Supset: "\u22D1",
        supset: "\u2283",
        supseteq: "\u2287",
        supseteqq: "\u2AC6",
        supsetneq: "\u228B",
        supsetneqq: "\u2ACC",
        supsim: "\u2AC8",
        supsub: "\u2AD4",
        supsup: "\u2AD6",
        swarhk: "\u2926",
        swArr: "\u21D9",
        swarr: "\u2199",
        swarrow: "\u2199",
        swnwar: "\u292A",
        szlig: "\xDF",
        Tab: "	",
        target: "\u2316",
        Tau: "\u03A4",
        tau: "\u03C4",
        tbrk: "\u23B4",
        Tcaron: "\u0164",
        tcaron: "\u0165",
        Tcedil: "\u0162",
        tcedil: "\u0163",
        Tcy: "\u0422",
        tcy: "\u0442",
        tdot: "\u20DB",
        telrec: "\u2315",
        Tfr: "\u{1D517}",
        tfr: "\u{1D531}",
        there4: "\u2234",
        Therefore: "\u2234",
        therefore: "\u2234",
        Theta: "\u0398",
        theta: "\u03B8",
        thetasym: "\u03D1",
        thetav: "\u03D1",
        thickapprox: "\u2248",
        thicksim: "\u223C",
        ThickSpace: "\u205F\u200A",
        thinsp: "\u2009",
        ThinSpace: "\u2009",
        thkap: "\u2248",
        thksim: "\u223C",
        THORN: "\xDE",
        thorn: "\xFE",
        Tilde: "\u223C",
        tilde: "\u02DC",
        TildeEqual: "\u2243",
        TildeFullEqual: "\u2245",
        TildeTilde: "\u2248",
        times: "\xD7",
        timesb: "\u22A0",
        timesbar: "\u2A31",
        timesd: "\u2A30",
        tint: "\u222D",
        toea: "\u2928",
        top: "\u22A4",
        topbot: "\u2336",
        topcir: "\u2AF1",
        Topf: "\u{1D54B}",
        topf: "\u{1D565}",
        topfork: "\u2ADA",
        tosa: "\u2929",
        tprime: "\u2034",
        TRADE: "\u2122",
        trade: "\u2122",
        triangle: "\u25B5",
        triangledown: "\u25BF",
        triangleleft: "\u25C3",
        trianglelefteq: "\u22B4",
        triangleq: "\u225C",
        triangleright: "\u25B9",
        trianglerighteq: "\u22B5",
        tridot: "\u25EC",
        trie: "\u225C",
        triminus: "\u2A3A",
        TripleDot: "\u20DB",
        triplus: "\u2A39",
        trisb: "\u29CD",
        tritime: "\u2A3B",
        trpezium: "\u23E2",
        Tscr: "\u{1D4AF}",
        tscr: "\u{1D4C9}",
        TScy: "\u0426",
        tscy: "\u0446",
        TSHcy: "\u040B",
        tshcy: "\u045B",
        Tstrok: "\u0166",
        tstrok: "\u0167",
        twixt: "\u226C",
        twoheadleftarrow: "\u219E",
        twoheadrightarrow: "\u21A0",
        Uacute: "\xDA",
        uacute: "\xFA",
        Uarr: "\u219F",
        uArr: "\u21D1",
        uarr: "\u2191",
        Uarrocir: "\u2949",
        Ubrcy: "\u040E",
        ubrcy: "\u045E",
        Ubreve: "\u016C",
        ubreve: "\u016D",
        Ucirc: "\xDB",
        ucirc: "\xFB",
        Ucy: "\u0423",
        ucy: "\u0443",
        udarr: "\u21C5",
        Udblac: "\u0170",
        udblac: "\u0171",
        udhar: "\u296E",
        ufisht: "\u297E",
        Ufr: "\u{1D518}",
        ufr: "\u{1D532}",
        Ugrave: "\xD9",
        ugrave: "\xF9",
        uHar: "\u2963",
        uharl: "\u21BF",
        uharr: "\u21BE",
        uhblk: "\u2580",
        ulcorn: "\u231C",
        ulcorner: "\u231C",
        ulcrop: "\u230F",
        ultri: "\u25F8",
        Umacr: "\u016A",
        umacr: "\u016B",
        uml: "\xA8",
        UnderBar: "_",
        UnderBrace: "\u23DF",
        UnderBracket: "\u23B5",
        UnderParenthesis: "\u23DD",
        Union: "\u22C3",
        UnionPlus: "\u228E",
        Uogon: "\u0172",
        uogon: "\u0173",
        Uopf: "\u{1D54C}",
        uopf: "\u{1D566}",
        UpArrow: "\u2191",
        Uparrow: "\u21D1",
        uparrow: "\u2191",
        UpArrowBar: "\u2912",
        UpArrowDownArrow: "\u21C5",
        UpDownArrow: "\u2195",
        Updownarrow: "\u21D5",
        updownarrow: "\u2195",
        UpEquilibrium: "\u296E",
        upharpoonleft: "\u21BF",
        upharpoonright: "\u21BE",
        uplus: "\u228E",
        UpperLeftArrow: "\u2196",
        UpperRightArrow: "\u2197",
        Upsi: "\u03D2",
        upsi: "\u03C5",
        upsih: "\u03D2",
        Upsilon: "\u03A5",
        upsilon: "\u03C5",
        UpTee: "\u22A5",
        UpTeeArrow: "\u21A5",
        upuparrows: "\u21C8",
        urcorn: "\u231D",
        urcorner: "\u231D",
        urcrop: "\u230E",
        Uring: "\u016E",
        uring: "\u016F",
        urtri: "\u25F9",
        Uscr: "\u{1D4B0}",
        uscr: "\u{1D4CA}",
        utdot: "\u22F0",
        Utilde: "\u0168",
        utilde: "\u0169",
        utri: "\u25B5",
        utrif: "\u25B4",
        uuarr: "\u21C8",
        Uuml: "\xDC",
        uuml: "\xFC",
        uwangle: "\u29A7",
        vangrt: "\u299C",
        varepsilon: "\u03F5",
        varkappa: "\u03F0",
        varnothing: "\u2205",
        varphi: "\u03D5",
        varpi: "\u03D6",
        varpropto: "\u221D",
        vArr: "\u21D5",
        varr: "\u2195",
        varrho: "\u03F1",
        varsigma: "\u03C2",
        varsubsetneq: "\u228A\uFE00",
        varsubsetneqq: "\u2ACB\uFE00",
        varsupsetneq: "\u228B\uFE00",
        varsupsetneqq: "\u2ACC\uFE00",
        vartheta: "\u03D1",
        vartriangleleft: "\u22B2",
        vartriangleright: "\u22B3",
        Vbar: "\u2AEB",
        vBar: "\u2AE8",
        vBarv: "\u2AE9",
        Vcy: "\u0412",
        vcy: "\u0432",
        VDash: "\u22AB",
        Vdash: "\u22A9",
        vDash: "\u22A8",
        vdash: "\u22A2",
        Vdashl: "\u2AE6",
        Vee: "\u22C1",
        vee: "\u2228",
        veebar: "\u22BB",
        veeeq: "\u225A",
        vellip: "\u22EE",
        Verbar: "\u2016",
        verbar: "|",
        Vert: "\u2016",
        vert: "|",
        VerticalBar: "\u2223",
        VerticalLine: "|",
        VerticalSeparator: "\u2758",
        VerticalTilde: "\u2240",
        VeryThinSpace: "\u200A",
        Vfr: "\u{1D519}",
        vfr: "\u{1D533}",
        vltri: "\u22B2",
        vnsub: "\u2282\u20D2",
        vnsup: "\u2283\u20D2",
        Vopf: "\u{1D54D}",
        vopf: "\u{1D567}",
        vprop: "\u221D",
        vrtri: "\u22B3",
        Vscr: "\u{1D4B1}",
        vscr: "\u{1D4CB}",
        vsubnE: "\u2ACB\uFE00",
        vsubne: "\u228A\uFE00",
        vsupnE: "\u2ACC\uFE00",
        vsupne: "\u228B\uFE00",
        Vvdash: "\u22AA",
        vzigzag: "\u299A",
        Wcirc: "\u0174",
        wcirc: "\u0175",
        wedbar: "\u2A5F",
        Wedge: "\u22C0",
        wedge: "\u2227",
        wedgeq: "\u2259",
        weierp: "\u2118",
        Wfr: "\u{1D51A}",
        wfr: "\u{1D534}",
        Wopf: "\u{1D54E}",
        wopf: "\u{1D568}",
        wp: "\u2118",
        wr: "\u2240",
        wreath: "\u2240",
        Wscr: "\u{1D4B2}",
        wscr: "\u{1D4CC}",
        xcap: "\u22C2",
        xcirc: "\u25EF",
        xcup: "\u22C3",
        xdtri: "\u25BD",
        Xfr: "\u{1D51B}",
        xfr: "\u{1D535}",
        xhArr: "\u27FA",
        xharr: "\u27F7",
        Xi: "\u039E",
        xi: "\u03BE",
        xlArr: "\u27F8",
        xlarr: "\u27F5",
        xmap: "\u27FC",
        xnis: "\u22FB",
        xodot: "\u2A00",
        Xopf: "\u{1D54F}",
        xopf: "\u{1D569}",
        xoplus: "\u2A01",
        xotime: "\u2A02",
        xrArr: "\u27F9",
        xrarr: "\u27F6",
        Xscr: "\u{1D4B3}",
        xscr: "\u{1D4CD}",
        xsqcup: "\u2A06",
        xuplus: "\u2A04",
        xutri: "\u25B3",
        xvee: "\u22C1",
        xwedge: "\u22C0",
        Yacute: "\xDD",
        yacute: "\xFD",
        YAcy: "\u042F",
        yacy: "\u044F",
        Ycirc: "\u0176",
        ycirc: "\u0177",
        Ycy: "\u042B",
        ycy: "\u044B",
        yen: "\xA5",
        Yfr: "\u{1D51C}",
        yfr: "\u{1D536}",
        YIcy: "\u0407",
        yicy: "\u0457",
        Yopf: "\u{1D550}",
        yopf: "\u{1D56A}",
        Yscr: "\u{1D4B4}",
        yscr: "\u{1D4CE}",
        YUcy: "\u042E",
        yucy: "\u044E",
        Yuml: "\u0178",
        yuml: "\xFF",
        Zacute: "\u0179",
        zacute: "\u017A",
        Zcaron: "\u017D",
        zcaron: "\u017E",
        Zcy: "\u0417",
        zcy: "\u0437",
        Zdot: "\u017B",
        zdot: "\u017C",
        zeetrf: "\u2128",
        ZeroWidthSpace: "\u200B",
        Zeta: "\u0396",
        zeta: "\u03B6",
        Zfr: "\u2128",
        zfr: "\u{1D537}",
        ZHcy: "\u0416",
        zhcy: "\u0436",
        zigrarr: "\u21DD",
        Zopf: "\u2124",
        zopf: "\u{1D56B}",
        Zscr: "\u{1D4B5}",
        zscr: "\u{1D4CF}",
        zwj: "\u200D",
        zwnj: "\u200C"
      });
      exports.entityMap = exports.HTML_ENTITIES;
    }
  });

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/sax.js
  var require_sax = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
      "use strict";
      var conventions = require_conventions();
      var g = require_grammar();
      var errors = require_errors();
      var isHTMLEscapableRawTextElement = conventions.isHTMLEscapableRawTextElement;
      var isHTMLMimeType = conventions.isHTMLMimeType;
      var isHTMLRawTextElement = conventions.isHTMLRawTextElement;
      var hasOwn = conventions.hasOwn;
      var NAMESPACE = conventions.NAMESPACE;
      var ParseError = errors.ParseError;
      var DOMException = errors.DOMException;
      var S_TAG = 0;
      var S_ATTR = 1;
      var S_ATTR_SPACE = 2;
      var S_EQ = 3;
      var S_ATTR_NOQUOT_VALUE = 4;
      var S_ATTR_END = 5;
      var S_TAG_SPACE = 6;
      var S_TAG_CLOSE = 7;
      function XMLReader() {
      }
      XMLReader.prototype = {
        parse: function(source, defaultNSMap, entityMap) {
          var domBuilder = this.domBuilder;
          domBuilder.startDocument();
          _copy(defaultNSMap, defaultNSMap = /* @__PURE__ */ Object.create(null));
          parse(source, defaultNSMap, entityMap, domBuilder, this.errorHandler);
          domBuilder.endDocument();
        }
      };
      var ENTITY_REG = /&#?\w+;?/g;
      function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
        var isHTML = isHTMLMimeType(domBuilder.mimeType);
        if (source.indexOf(g.UNICODE_REPLACEMENT_CHARACTER) >= 0) {
          errorHandler.warning("Unicode replacement character detected, source encoding issues?");
        }
        function fixedFromCharCode(code) {
          if (code > 65535) {
            code -= 65536;
            var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
            return String.fromCharCode(surrogate1, surrogate2);
          } else {
            return String.fromCharCode(code);
          }
        }
        function entityReplacer(a2) {
          var complete = a2[a2.length - 1] === ";" ? a2 : a2 + ";";
          if (!isHTML && complete !== a2) {
            errorHandler.error("EntityRef: expecting ;");
            return a2;
          }
          var match = g.Reference.exec(complete);
          if (!match || match[0].length !== complete.length) {
            errorHandler.error("entity not matching Reference production: " + a2);
            return a2;
          }
          var k = complete.slice(1, -1);
          if (hasOwn(entityMap, k)) {
            return entityMap[k];
          } else if (k.charAt(0) === "#") {
            return fixedFromCharCode(parseInt(k.substring(1).replace("x", "0x")));
          } else {
            errorHandler.error("entity not found:" + a2);
            return a2;
          }
        }
        function appendText(end2) {
          if (end2 > start) {
            var xt = source.substring(start, end2).replace(ENTITY_REG, entityReplacer);
            locator && position(start);
            domBuilder.characters(xt, 0, end2 - start);
            start = end2;
          }
        }
        var lineStart = 0;
        var lineEnd = 0;
        var linePattern = /\r\n?|\n|$/g;
        var locator = domBuilder.locator;
        function position(p, m) {
          while (p >= lineEnd && (m = linePattern.exec(source))) {
            lineStart = lineEnd;
            lineEnd = m.index + m[0].length;
            locator.lineNumber++;
          }
          locator.columnNumber = p - lineStart + 1;
        }
        var parseStack = [{ currentNSMap: defaultNSMapCopy }];
        var unclosedTags = [];
        var start = 0;
        while (true) {
          try {
            var tagStart = source.indexOf("<", start);
            if (tagStart < 0) {
              if (!isHTML && unclosedTags.length > 0) {
                return errorHandler.fatalError("unclosed xml tag(s): " + unclosedTags.join(", "));
              }
              if (!source.substring(start).match(/^\s*$/)) {
                var doc = domBuilder.doc;
                var text = doc.createTextNode(source.substring(start));
                if (doc.documentElement) {
                  return errorHandler.error("Extra content at the end of the document");
                }
                doc.appendChild(text);
                domBuilder.currentElement = text;
              }
              return;
            }
            if (tagStart > start) {
              var fromSource = source.substring(start, tagStart);
              if (!isHTML && unclosedTags.length === 0) {
                fromSource = fromSource.replace(new RegExp(g.S_OPT.source, "g"), "");
                fromSource && errorHandler.error("Unexpected content outside root element: '" + fromSource + "'");
              }
              appendText(tagStart);
            }
            switch (source.charAt(tagStart + 1)) {
              case "/":
                var end = source.indexOf(">", tagStart + 2);
                var tagNameRaw = source.substring(tagStart + 2, end > 0 ? end : void 0);
                if (!tagNameRaw) {
                  return errorHandler.fatalError("end tag name missing");
                }
                var tagNameMatch = end > 0 && g.reg("^", g.QName_group, g.S_OPT, "$").exec(tagNameRaw);
                if (!tagNameMatch) {
                  return errorHandler.fatalError('end tag name contains invalid characters: "' + tagNameRaw + '"');
                }
                if (!domBuilder.currentElement && !domBuilder.doc.documentElement) {
                  return;
                }
                var currentTagName = unclosedTags[unclosedTags.length - 1] || domBuilder.currentElement.tagName || domBuilder.doc.documentElement.tagName || "";
                if (currentTagName !== tagNameMatch[1]) {
                  var tagNameLower = tagNameMatch[1].toLowerCase();
                  if (!isHTML || currentTagName.toLowerCase() !== tagNameLower) {
                    return errorHandler.fatalError('Opening and ending tag mismatch: "' + currentTagName + '" != "' + tagNameRaw + '"');
                  }
                }
                var config = parseStack.pop();
                unclosedTags.pop();
                var localNSMap = config.localNSMap;
                domBuilder.endElement(config.uri, config.localName, currentTagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    if (hasOwn(localNSMap, prefix)) {
                      domBuilder.endPrefixMapping(prefix);
                    }
                  }
                }
                end++;
                break;
              // end element
              case "?":
                locator && position(tagStart);
                end = parseProcessingInstruction(source, tagStart, domBuilder, errorHandler);
                break;
              case "!":
                locator && position(tagStart);
                end = parseDoctypeCommentOrCData(source, tagStart, domBuilder, errorHandler, isHTML);
                break;
              default:
                locator && position(tagStart);
                var el = new ElementAttributes();
                var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
                var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler, isHTML);
                var len = el.length;
                if (!el.closed) {
                  if (isHTML && conventions.isHTMLVoidElement(el.tagName)) {
                    el.closed = true;
                  } else {
                    unclosedTags.push(el.tagName);
                  }
                }
                if (locator && len) {
                  var locator2 = copyLocator(locator, {});
                  for (var i = 0; i < len; i++) {
                    var a = el[i];
                    position(a.offset);
                    a.locator = copyLocator(locator, {});
                  }
                  domBuilder.locator = locator2;
                  if (appendElement(el, domBuilder, currentNSMap)) {
                    parseStack.push(el);
                  }
                  domBuilder.locator = locator;
                } else {
                  if (appendElement(el, domBuilder, currentNSMap)) {
                    parseStack.push(el);
                  }
                }
                if (isHTML && !el.closed) {
                  end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
                } else {
                  end++;
                }
            }
          } catch (e) {
            if (e instanceof ParseError) {
              throw e;
            } else if (e instanceof DOMException) {
              throw new ParseError(e.name + ": " + e.message, domBuilder.locator, e);
            }
            errorHandler.error("element parse error: " + e);
            end = -1;
          }
          if (end > start) {
            start = end;
          } else {
            appendText(Math.max(tagStart, start) + 1);
          }
        }
      }
      function copyLocator(f, t) {
        t.lineNumber = f.lineNumber;
        t.columnNumber = f.columnNumber;
        return t;
      }
      function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler, isHTML) {
        function addAttribute(qname, value2, startIndex) {
          if (hasOwn(el.attributeNames, qname)) {
            return errorHandler.fatalError("Attribute " + qname + " redefined");
          }
          if (!isHTML && value2.indexOf("<") >= 0) {
            return errorHandler.fatalError("Unescaped '<' not allowed in attributes values");
          }
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
        var attrName;
        var value;
        var p = ++start;
        var s = S_TAG;
        while (true) {
          var c = source.charAt(p);
          switch (c) {
            case "=":
              if (s === S_ATTR) {
                attrName = source.slice(start, p);
                s = S_EQ;
              } else if (s === S_ATTR_SPACE) {
                s = S_EQ;
              } else {
                throw new Error("attribute equal must after attrName");
              }
              break;
            case "'":
            case '"':
              if (s === S_EQ || s === S_ATTR) {
                if (s === S_ATTR) {
                  errorHandler.warning('attribute value must after "="');
                  attrName = source.slice(start, p);
                }
                start = p + 1;
                p = source.indexOf(c, start);
                if (p > 0) {
                  value = source.slice(start, p);
                  addAttribute(attrName, value, start - 1);
                  s = S_ATTR_END;
                } else {
                  throw new Error("attribute value no end '" + c + "' match");
                }
              } else if (s == S_ATTR_NOQUOT_VALUE) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start);
                errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
                start = p + 1;
                s = S_ATTR_END;
              } else {
                throw new Error('attribute value must after "="');
              }
              break;
            case "/":
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                case S_ATTR_END:
                case S_TAG_SPACE:
                case S_TAG_CLOSE:
                  s = S_TAG_CLOSE;
                  el.closed = true;
                case S_ATTR_NOQUOT_VALUE:
                case S_ATTR:
                  break;
                case S_ATTR_SPACE:
                  el.closed = true;
                  break;
                //case S_EQ:
                default:
                  throw new Error("attribute invalid close char('/')");
              }
              break;
            case "":
              errorHandler.error("unexpected end of input");
              if (s == S_TAG) {
                el.setTagName(source.slice(start, p));
              }
              return p;
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
                  value = source.slice(start, p);
                  if (value.slice(-1) === "/") {
                    el.closed = true;
                    value = value.slice(0, -1);
                  }
                case S_ATTR_SPACE:
                  if (s === S_ATTR_SPACE) {
                    value = attrName;
                  }
                  if (s == S_ATTR_NOQUOT_VALUE) {
                    errorHandler.warning('attribute "' + value + '" missed quot(")!');
                    addAttribute(attrName, value, start);
                  } else {
                    if (!isHTML) {
                      errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                    }
                    addAttribute(value, value, start);
                  }
                  break;
                case S_EQ:
                  if (!isHTML) {
                    return errorHandler.fatalError(`AttValue: ' or " expected`);
                  }
              }
              return p;
            /*xml space '\x20' | #x9 | #xD | #xA; */
            case "\x80":
              c = " ";
            default:
              if (c <= " ") {
                switch (s) {
                  case S_TAG:
                    el.setTagName(source.slice(start, p));
                    s = S_TAG_SPACE;
                    break;
                  case S_ATTR:
                    attrName = source.slice(start, p);
                    s = S_ATTR_SPACE;
                    break;
                  case S_ATTR_NOQUOT_VALUE:
                    var value = source.slice(start, p);
                    errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                    addAttribute(attrName, value, start);
                  case S_ATTR_END:
                    s = S_TAG_SPACE;
                    break;
                }
              } else {
                switch (s) {
                  //case S_TAG:void();break;
                  //case S_ATTR:void();break;
                  //case S_ATTR_NOQUOT_VALUE:void();break;
                  case S_ATTR_SPACE:
                    if (!isHTML) {
                      errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                    }
                    addAttribute(attrName, attrName, start);
                    start = p;
                    s = S_ATTR;
                    break;
                  case S_ATTR_END:
                    errorHandler.warning('attribute space is required"' + attrName + '"!!');
                  case S_TAG_SPACE:
                    s = S_ATTR;
                    start = p;
                    break;
                  case S_EQ:
                    s = S_ATTR_NOQUOT_VALUE;
                    start = p;
                    break;
                  case S_TAG_CLOSE:
                    throw new Error("elements closed character '/' and '>' must be connected to");
                }
              }
          }
          p++;
        }
      }
      function appendElement(el, domBuilder, currentNSMap) {
        var tagName = el.tagName;
        var localNSMap = null;
        var i = el.length;
        while (i--) {
          var a = el[i];
          var qName = a.qName;
          var value = a.value;
          var nsp = qName.indexOf(":");
          if (nsp > 0) {
            var prefix = a.prefix = qName.slice(0, nsp);
            var localName = qName.slice(nsp + 1);
            var nsPrefix = prefix === "xmlns" && localName;
          } else {
            localName = qName;
            prefix = null;
            nsPrefix = qName === "xmlns" && "";
          }
          a.localName = localName;
          if (nsPrefix !== false) {
            if (localNSMap == null) {
              localNSMap = /* @__PURE__ */ Object.create(null);
              _copy(currentNSMap, currentNSMap = /* @__PURE__ */ Object.create(null));
            }
            currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
            a.uri = NAMESPACE.XMLNS;
            domBuilder.startPrefixMapping(nsPrefix, value);
          }
        }
        var i = el.length;
        while (i--) {
          a = el[i];
          if (a.prefix) {
            if (a.prefix === "xml") {
              a.uri = NAMESPACE.XML;
            }
            if (a.prefix !== "xmlns") {
              a.uri = currentNSMap[a.prefix];
            }
          }
        }
        var nsp = tagName.indexOf(":");
        if (nsp > 0) {
          prefix = el.prefix = tagName.slice(0, nsp);
          localName = el.localName = tagName.slice(nsp + 1);
        } else {
          prefix = null;
          localName = el.localName = tagName;
        }
        var ns2 = el.uri = currentNSMap[prefix || ""];
        domBuilder.startElement(ns2, localName, tagName, el);
        if (el.closed) {
          domBuilder.endElement(ns2, localName, tagName);
          if (localNSMap) {
            for (prefix in localNSMap) {
              if (hasOwn(localNSMap, prefix)) {
                domBuilder.endPrefixMapping(prefix);
              }
            }
          }
        } else {
          el.currentNSMap = currentNSMap;
          el.localNSMap = localNSMap;
          return true;
        }
      }
      function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
        var isEscapableRaw = isHTMLEscapableRawTextElement(tagName);
        if (isEscapableRaw || isHTMLRawTextElement(tagName)) {
          var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
          var text = source.substring(elStartEnd + 1, elEndStart);
          if (isEscapableRaw) {
            text = text.replace(ENTITY_REG, entityReplacer);
          }
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
        return elStartEnd + 1;
      }
      function _copy(source, target) {
        for (var n in source) {
          if (hasOwn(source, n)) {
            target[n] = source[n];
          }
        }
      }
      function parseUtils(source, start) {
        var index = start;
        function char(n) {
          n = n || 0;
          return source.charAt(index + n);
        }
        function skip(n) {
          n = n || 1;
          index += n;
        }
        function skipBlanks() {
          var blanks = 0;
          while (index < source.length) {
            var c = char();
            if (c !== " " && c !== "\n" && c !== "	" && c !== "\r") {
              return blanks;
            }
            blanks++;
            skip();
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
          var expr = g.reg("^", args);
          var match = expr.exec(substringFromIndex());
          if (match) {
            skip(match[0].length);
            return match[0];
          }
          return null;
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
          if (!match) {
            return errorHandler2.fatalError("processing instruction is not well-formed at position " + p2.getIndex());
          }
          if (match[1].toLowerCase() === "xml") {
            return errorHandler2.fatalError(
              "xml declaration is only allowed at the start of the document, but found at position " + p2.getIndex()
            );
          }
          p2.skip(match[0].length);
          return match[0];
        }
        var source = p.getSource();
        if (p.char() === "[") {
          p.skip(1);
          var intSubsetStart = p.getIndex();
          while (p.getIndex() < source.length) {
            p.skipBlanks();
            if (p.char() === "]") {
              var internalSubset = source.substring(intSubsetStart, p.getIndex());
              p.skip(1);
              return internalSubset;
            }
            var current = null;
            if (p.char() === "<" && p.char(1) === "!") {
              switch (p.char(2)) {
                case "E":
                  if (p.char(3) === "L") {
                    current = p.getMatch(g.elementdecl);
                  } else if (p.char(3) === "N") {
                    current = p.getMatch(g.EntityDecl);
                  }
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
            } else if (p.char() === "<" && p.char(1) === "?") {
              current = parsePI(p, errorHandler);
            } else if (p.char() === "%") {
              current = p.getMatch(g.PEReference);
            } else {
              return errorHandler.fatalError("Error detected in Markup declaration");
            }
            if (!current) {
              return errorHandler.fatalError("Error in internal subset at position " + p.getIndex());
            }
          }
          return errorHandler.fatalError("doctype internal subset is not well-formed, missing ]");
        }
      }
      function parseDoctypeCommentOrCData(source, start, domBuilder, errorHandler, isHTML) {
        var p = parseUtils(source, start);
        switch (isHTML ? p.char(2).toUpperCase() : p.char(2)) {
          case "-":
            var comment = p.getMatch(g.Comment);
            if (comment) {
              domBuilder.comment(comment, g.COMMENT_START.length, comment.length - g.COMMENT_START.length - g.COMMENT_END.length);
              return p.getIndex();
            } else {
              return errorHandler.fatalError("comment is not well-formed at position " + p.getIndex());
            }
          case "[":
            var cdata = p.getMatch(g.CDSect);
            if (cdata) {
              if (!isHTML && !domBuilder.currentElement) {
                return errorHandler.fatalError("CDATA outside of element");
              }
              domBuilder.startCDATA();
              domBuilder.characters(cdata, g.CDATA_START.length, cdata.length - g.CDATA_START.length - g.CDATA_END.length);
              domBuilder.endCDATA();
              return p.getIndex();
            } else {
              return errorHandler.fatalError("Invalid CDATA starting at position " + start);
            }
          case "D": {
            if (domBuilder.doc && domBuilder.doc.documentElement) {
              return errorHandler.fatalError("Doctype not allowed inside or after documentElement at position " + p.getIndex());
            }
            if (isHTML ? !p.substringStartsWithCaseInsensitive(g.DOCTYPE_DECL_START) : !p.substringStartsWith(g.DOCTYPE_DECL_START)) {
              return errorHandler.fatalError("Expected " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
            }
            p.skip(g.DOCTYPE_DECL_START.length);
            if (p.skipBlanks() < 1) {
              return errorHandler.fatalError("Expected whitespace after " + g.DOCTYPE_DECL_START + " at position " + p.getIndex());
            }
            var doctype = {
              name: void 0,
              publicId: void 0,
              systemId: void 0,
              internalSubset: void 0
            };
            doctype.name = p.getMatch(g.Name);
            if (!doctype.name)
              return errorHandler.fatalError("doctype name missing or contains unexpected characters at position " + p.getIndex());
            if (isHTML && doctype.name.toLowerCase() !== "html") {
              errorHandler.warning("Unexpected DOCTYPE in HTML document at position " + p.getIndex());
            }
            p.skipBlanks();
            if (p.substringStartsWith(g.PUBLIC) || p.substringStartsWith(g.SYSTEM)) {
              var match = g.ExternalID_match.exec(p.substringFromIndex());
              if (!match) {
                return errorHandler.fatalError("doctype external id is not well-formed at position " + p.getIndex());
              }
              if (match.groups.SystemLiteralOnly !== void 0) {
                doctype.systemId = match.groups.SystemLiteralOnly;
              } else {
                doctype.systemId = match.groups.SystemLiteral;
                doctype.publicId = match.groups.PubidLiteral;
              }
              p.skip(match[0].length);
            } else if (isHTML && p.substringStartsWithCaseInsensitive(g.SYSTEM)) {
              p.skip(g.SYSTEM.length);
              if (p.skipBlanks() < 1) {
                return errorHandler.fatalError("Expected whitespace after " + g.SYSTEM + " at position " + p.getIndex());
              }
              doctype.systemId = p.getMatch(g.ABOUT_LEGACY_COMPAT_SystemLiteral);
              if (!doctype.systemId) {
                return errorHandler.fatalError(
                  "Expected " + g.ABOUT_LEGACY_COMPAT + " in single or double quotes after " + g.SYSTEM + " at position " + p.getIndex()
                );
              }
            }
            if (isHTML && doctype.systemId && !g.ABOUT_LEGACY_COMPAT_SystemLiteral.test(doctype.systemId)) {
              errorHandler.warning("Unexpected doctype.systemId in HTML document at position " + p.getIndex());
            }
            if (!isHTML) {
              p.skipBlanks();
              doctype.internalSubset = parseDoctypeInternalSubset(p, errorHandler);
            }
            p.skipBlanks();
            if (p.char() !== ">") {
              return errorHandler.fatalError("doctype not terminated with > at position " + p.getIndex());
            }
            p.skip(1);
            domBuilder.startDTD(doctype.name, doctype.publicId, doctype.systemId, doctype.internalSubset);
            domBuilder.endDTD();
            return p.getIndex();
          }
          default:
            return errorHandler.fatalError('Not well-formed XML starting with "<!" at position ' + start);
        }
      }
      function parseProcessingInstruction(source, start, domBuilder, errorHandler) {
        var match = source.substring(start).match(g.PI);
        if (!match) {
          return errorHandler.fatalError("Invalid processing instruction starting at position " + start);
        }
        if (match[1].toLowerCase() === "xml") {
          if (start > 0) {
            return errorHandler.fatalError(
              "processing instruction at position " + start + " is an xml declaration which is only at the start of the document"
            );
          }
          if (!g.XMLDecl.test(source.substring(start))) {
            return errorHandler.fatalError("xml declaration is not well-formed");
          }
        }
        domBuilder.processingInstruction(match[1], match[2]);
        return start + match[0].length;
      }
      function ElementAttributes() {
        this.attributeNames = /* @__PURE__ */ Object.create(null);
      }
      ElementAttributes.prototype = {
        setTagName: function(tagName) {
          if (!g.QName_exact.test(tagName)) {
            throw new Error("invalid tagName:" + tagName);
          }
          this.tagName = tagName;
        },
        addValue: function(qName, value, offset) {
          if (!g.QName_exact.test(qName)) {
            throw new Error("invalid attribute:" + qName);
          }
          this.attributeNames[qName] = this.length;
          this[this.length++] = { qName, value, offset };
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

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/dom-parser.js
  var require_dom_parser = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
      "use strict";
      var conventions = require_conventions();
      var dom = require_dom();
      var errors = require_errors();
      var entities = require_entities();
      var sax = require_sax();
      var DOMImplementation = dom.DOMImplementation;
      var hasDefaultHTMLNamespace = conventions.hasDefaultHTMLNamespace;
      var isHTMLMimeType = conventions.isHTMLMimeType;
      var isValidMimeType = conventions.isValidMimeType;
      var MIME_TYPE = conventions.MIME_TYPE;
      var NAMESPACE = conventions.NAMESPACE;
      var ParseError = errors.ParseError;
      var XMLReader = sax.XMLReader;
      function normalizeLineEndings(input) {
        return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028\u2029]/g, "\n");
      }
      function DOMParser2(options) {
        options = options || {};
        if (options.locator === void 0) {
          options.locator = true;
        }
        this.assign = options.assign || conventions.assign;
        this.domHandler = options.domHandler || DOMHandler;
        this.onError = options.onError || options.errorHandler;
        if (options.errorHandler && typeof options.errorHandler !== "function") {
          throw new TypeError("errorHandler object is no longer supported, switch to onError!");
        } else if (options.errorHandler) {
          options.errorHandler("warning", "The `errorHandler` option has been deprecated, use `onError` instead!", this);
        }
        this.normalizeLineEndings = options.normalizeLineEndings || normalizeLineEndings;
        this.locator = !!options.locator;
        this.xmlns = this.assign(/* @__PURE__ */ Object.create(null), options.xmlns);
      }
      DOMParser2.prototype.parseFromString = function(source, mimeType) {
        if (!isValidMimeType(mimeType)) {
          throw new TypeError('DOMParser.parseFromString: the provided mimeType "' + mimeType + '" is not valid.');
        }
        var defaultNSMap = this.assign(/* @__PURE__ */ Object.create(null), this.xmlns);
        var entityMap = entities.XML_ENTITIES;
        var defaultNamespace = defaultNSMap[""] || null;
        if (hasDefaultHTMLNamespace(mimeType)) {
          entityMap = entities.HTML_ENTITIES;
          defaultNamespace = NAMESPACE.HTML;
        } else if (mimeType === MIME_TYPE.XML_SVG_IMAGE) {
          defaultNamespace = NAMESPACE.SVG;
        }
        defaultNSMap[""] = defaultNamespace;
        defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
        var domBuilder = new this.domHandler({
          mimeType,
          defaultNamespace,
          onError: this.onError
        });
        var locator = this.locator ? {} : void 0;
        if (this.locator) {
          domBuilder.setDocumentLocator(locator);
        }
        var sax2 = new XMLReader();
        sax2.errorHandler = domBuilder;
        sax2.domBuilder = domBuilder;
        var isXml = !conventions.isHTMLMimeType(mimeType);
        if (isXml && typeof source !== "string") {
          sax2.errorHandler.fatalError("source is not a string");
        }
        sax2.parse(this.normalizeLineEndings(String(source)), defaultNSMap, entityMap);
        if (!domBuilder.doc.documentElement) {
          sax2.errorHandler.fatalError("missing root element");
        }
        return domBuilder.doc;
      };
      function DOMHandler(options) {
        var opt = options || {};
        this.mimeType = opt.mimeType || MIME_TYPE.XML_APPLICATION;
        this.defaultNamespace = opt.defaultNamespace || null;
        this.cdata = false;
        this.currentElement = void 0;
        this.doc = void 0;
        this.locator = void 0;
        this.onError = opt.onError;
      }
      function position(locator, node) {
        node.lineNumber = locator.lineNumber;
        node.columnNumber = locator.columnNumber;
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
          this.doc = isHTMLMimeType(this.mimeType) ? impl.createHTMLDocument(false) : impl.createDocument(this.defaultNamespace, "");
        },
        startElement: function(namespaceURI, localName, qName, attrs) {
          var doc = this.doc;
          var el = doc.createElementNS(namespaceURI, qName || localName);
          var len = attrs.length;
          appendElement(this, el);
          this.currentElement = el;
          this.locator && position(this.locator, el);
          for (var i = 0; i < len; i++) {
            var namespaceURI = attrs.getURI(i);
            var value = attrs.getValue(i);
            var qName = attrs.getQName(i);
            var attr = doc.createAttributeNS(namespaceURI, qName);
            this.locator && position(attrs.getLocator(i), attr);
            attr.value = attr.nodeValue = value;
            el.setAttributeNode(attr);
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
          this.locator && position(this.locator, ins);
          appendElement(this, ins);
        },
        ignorableWhitespace: function(ch, start, length) {
        },
        characters: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          if (chars) {
            if (this.cdata) {
              var charNode = this.doc.createCDATASection(chars);
            } else {
              var charNode = this.doc.createTextNode(chars);
            }
            if (this.currentElement) {
              this.currentElement.appendChild(charNode);
            } else if (/^\s*$/.test(chars)) {
              this.doc.appendChild(charNode);
            }
            this.locator && position(this.locator, charNode);
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
          if (locator) {
            locator.lineNumber = 0;
          }
          this.locator = locator;
        },
        //LexicalHandler
        comment: function(chars, start, length) {
          chars = _toString.apply(this, arguments);
          var comm = this.doc.createComment(chars);
          this.locator && position(this.locator, comm);
          appendElement(this, comm);
        },
        startCDATA: function() {
          this.cdata = true;
        },
        endCDATA: function() {
          this.cdata = false;
        },
        startDTD: function(name, publicId, systemId, internalSubset) {
          var impl = this.doc.implementation;
          if (impl && impl.createDocumentType) {
            var dt = impl.createDocumentType(name, publicId, systemId, internalSubset);
            this.locator && position(this.locator, dt);
            appendElement(this, dt);
            this.doc.doctype = dt;
          }
        },
        reportError: function(level, message) {
          if (typeof this.onError === "function") {
            try {
              this.onError(level, message, this);
            } catch (e) {
              throw new ParseError("Reporting " + level + ' "' + message + '" caused ' + e, this.locator);
            }
          } else {
            console.error("[xmldom " + level + "]	" + message, _locator(this.locator));
          }
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
          this.reportError("fatalError", message);
          throw new ParseError(message, this.locator);
        }
      };
      function _locator(l) {
        if (l) {
          return "\n@#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
        }
      }
      function _toString(chars, start, length) {
        if (typeof chars == "string") {
          return chars.substr(start, length);
        } else {
          if (chars.length >= start + length || start) {
            return new java.lang.String(chars, start, length) + "";
          }
          return chars;
        }
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
        if (!handler.currentElement) {
          handler.doc.appendChild(node);
        } else {
          handler.currentElement.appendChild(node);
        }
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

  // node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/index.js
  var require_lib = __commonJS({
    "node_modules/.pnpm/@xmldom+xmldom@0.9.10/node_modules/@xmldom/xmldom/lib/index.js"(exports) {
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
    let si = path.lastIndexOf("/") + 1;
    let folder = si == 0 ? "" : path.substring(0, si);
    let fileName = si == 0 ? path : path.substring(si);
    return [folder, fileName];
  }
  function resolvePath(path, base) {
    try {
      const prefix = "http://docx/";
      const url = new URL(path, prefix + base).toString();
      return url.substring(prefix.length);
    } catch {
      return `${base}${path}`;
    }
  }
  function keyBy(array, by) {
    return array.reduce((a, x) => {
      a[by(x)] = x;
      return a;
    }, {});
  }
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject();
      reader.readAsDataURL(blob);
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
  };
  var LengthUsage = {
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
    if (val == null || val === "" || /.+(p[xt]|[%])$/i.test(val)) {
      return val;
    }
    var parsed = parseFloat(val);
    if (Number.isNaN(parsed)) {
      return null;
    }
    var num = parsed * usage.mul;
    if (usage.min != null && usage.max != null)
      num = clamp(num, usage.min, usage.max);
    return `${num.toFixed(2)}${usage.unit}`;
  }
  function convertBoolean(v, defaultValue = false) {
    switch (v) {
      case "1":
        return true;
      case "0":
        return false;
      case "on":
        return true;
      case "off":
        return false;
      case "true":
        return true;
      case "false":
        return false;
      default:
        return defaultValue;
    }
  }
  function parseCommonProperty(elem, props, xml) {
    if (elem.namespaceURI != ns.wordml)
      return false;
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
        return false;
    }
    return true;
  }

  // src/parser/xml-parser.ts
  function parseXmlString(xmlString, trimXmlDeclaration = false) {
    if (trimXmlDeclaration)
      xmlString = xmlString.replace(/<[?].*[?]>/, "");
    xmlString = removeUTF8BOM(xmlString);
    const result = new DOMParser().parseFromString(xmlString, "application/xml");
    const errorText = hasXmlParserError(result);
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
      const result = [];
      for (let i = 0, l = elem.childNodes.length; i < l; i++) {
        let c = elem.childNodes.item(i);
        if (c.nodeType == 1 && (localName == null || c.localName == localName))
          result.push(c);
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
        if (a.localName == localName)
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
  };
  var globalXmlParser = new XmlParser();
  var xml_parser_default = globalXmlParser;

  // src/common/part.ts
  var Part = class {
    constructor(_package, path) {
      this._package = _package;
      this.path = path;
    }
    async load() {
      const [rels, xmlText] = await Promise.all([
        this._package.loadRelationships(this.path),
        this._package.load(this.path)
      ]);
      this.rels = rels;
      const xmlDoc = this._package.parseXmlDocument(xmlText);
      if (this._package.options.keepOrigin) {
        this._xmlDocument = xmlDoc;
      }
      this.parseXml(xmlDoc.firstElementChild ?? xmlDoc.documentElement);
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
    for (let el of xml.elements(elem)) {
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
      const data = this.updatedData ?? await this.archive.readEntryData(this.metadata);
      return convertOutput(data, type);
    }
    setContent(content) {
      this.updatedData = contentToBytes(content);
      this.metadata.compression = 0;
      this.metadata.compressedSize = this.updatedData.length;
      this.metadata.uncompressedSize = this.updatedData.length;
      this.metadata.crc32 = crc32(this.updatedData);
    }
    async bytes() {
      return this.updatedData ?? await this.archive.readEntryData(this.metadata);
    }
  };
  var ZipArchive = class _ZipArchive {
    constructor(source) {
      this.source = source;
      this.files = {};
    }
    static async loadAsync(input) {
      const archive = new _ZipArchive(await inputToBytes(input));
      archive.readCentralDirectory();
      return archive;
    }
    file(path, content) {
      const normalized = normalizePath(path);
      let entry = this.files[normalized] ?? this.files[normalized.replace(/\//g, "\\")];
      if (arguments.length === 1)
        return entry;
      if (!entry) {
        entry = new ZipEntry(this, {
          name: normalized,
          flags: 2048,
          compression: 0,
          crc32: 0,
          compressedSize: 0,
          uncompressedSize: 0,
          localHeaderOffset: 0
        });
        this.files[normalized] = entry;
      }
      entry.setContent(content);
      return entry;
    }
    async generateAsync(options = { type: "blob" }) {
      const localParts = [];
      const centralParts = [];
      let offset = 0;
      for (const entry of Object.values(this.files)) {
        const nameBytes = encodeUtf8(entry.metadata.name);
        const data = await entry.bytes();
        const crc = crc32(data);
        const local = new Uint8Array(30 + nameBytes.length);
        const localView = new DataView(local.buffer);
        writeU32(localView, 0, 67324752);
        writeU16(localView, 4, 20);
        writeU16(localView, 6, 2048);
        writeU16(localView, 8, 0);
        writeU16(localView, 10, 0);
        writeU16(localView, 12, 0);
        writeU32(localView, 14, crc);
        writeU32(localView, 18, data.length);
        writeU32(localView, 22, data.length);
        writeU16(localView, 26, nameBytes.length);
        writeU16(localView, 28, 0);
        local.set(nameBytes, 30);
        localParts.push(local, data);
        const central = new Uint8Array(46 + nameBytes.length);
        const centralView = new DataView(central.buffer);
        writeU32(centralView, 0, 33639248);
        writeU16(centralView, 4, 20);
        writeU16(centralView, 6, 20);
        writeU16(centralView, 8, 2048);
        writeU16(centralView, 10, 0);
        writeU16(centralView, 12, 0);
        writeU16(centralView, 14, 0);
        writeU32(centralView, 16, crc);
        writeU32(centralView, 20, data.length);
        writeU32(centralView, 24, data.length);
        writeU16(centralView, 28, nameBytes.length);
        writeU16(centralView, 30, 0);
        writeU16(centralView, 32, 0);
        writeU16(centralView, 34, 0);
        writeU16(centralView, 36, 0);
        writeU32(centralView, 38, 0);
        writeU32(centralView, 42, offset);
        central.set(nameBytes, 46);
        centralParts.push(central);
        offset += local.length + data.length;
      }
      const centralOffset = offset;
      const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
      const end = new Uint8Array(22);
      const endView = new DataView(end.buffer);
      writeU32(endView, 0, 101010256);
      writeU16(endView, 4, 0);
      writeU16(endView, 6, 0);
      writeU16(endView, 8, centralParts.length);
      writeU16(endView, 10, centralParts.length);
      writeU32(endView, 12, centralSize);
      writeU32(endView, 16, centralOffset);
      writeU16(endView, 20, 0);
      return convertOutput(concatBytes([...localParts, ...centralParts, end]), options.type);
    }
    async readEntryData(entry) {
      const view = dataView(this.source);
      if (readU32(view, entry.localHeaderOffset) !== 67324752)
        throw new Error(`Invalid ZIP local header for ${entry.name}`);
      const nameLength = readU16(view, entry.localHeaderOffset + 26);
      const extraLength = readU16(view, entry.localHeaderOffset + 28);
      const dataStart = entry.localHeaderOffset + 30 + nameLength + extraLength;
      const compressed = this.source.slice(dataStart, dataStart + entry.compressedSize);
      switch (entry.compression) {
        case 0:
          return compressed;
        case 8:
          return inflateRaw(compressed);
        default:
          throw new Error(`Unsupported ZIP compression method ${entry.compression} for ${entry.name}`);
      }
    }
    readCentralDirectory() {
      const view = dataView(this.source);
      const eocd = findEndOfCentralDirectory(view);
      const totalEntries = readU16(view, eocd + 10);
      const centralOffset = readU32(view, eocd + 16);
      let offset = centralOffset;
      for (let i = 0; i < totalEntries; i++) {
        if (readU32(view, offset) !== 33639248)
          throw new Error("Invalid ZIP central directory");
        const flags = readU16(view, offset + 8);
        const compression = readU16(view, offset + 10);
        const crc = readU32(view, offset + 16);
        const compressedSize = readU32(view, offset + 20);
        const uncompressedSize = readU32(view, offset + 24);
        const nameLength = readU16(view, offset + 28);
        const extraLength = readU16(view, offset + 30);
        const commentLength = readU16(view, offset + 32);
        const localHeaderOffset = readU32(view, offset + 42);
        const nameBytes = this.source.slice(offset + 46, offset + 46 + nameLength);
        const name = decodeFileName(nameBytes, flags);
        this.files[name] = new ZipEntry(this, {
          name,
          flags,
          compression,
          crc32: crc,
          compressedSize,
          uncompressedSize,
          localHeaderOffset
        });
        offset += 46 + nameLength + extraLength + commentLength;
      }
    }
  };
  async function inputToBytes(input) {
    if (input instanceof Uint8Array)
      return input;
    if (input instanceof ArrayBuffer)
      return new Uint8Array(input);
    if (ArrayBuffer.isView(input))
      return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
    if (typeof Blob !== "undefined" && input instanceof Blob)
      return new Uint8Array(await input.arrayBuffer());
    throw new Error("Unsupported ZIP input type");
  }
  function contentToBytes(content) {
    if (content instanceof Uint8Array)
      return content;
    if (content instanceof ArrayBuffer)
      return new Uint8Array(content);
    if (ArrayBuffer.isView(content))
      return new Uint8Array(content.buffer, content.byteOffset, content.byteLength);
    if (typeof content === "string")
      return encodeUtf8(content);
    throw new Error("Unsupported ZIP entry content type");
  }
  async function inflateRaw(data) {
    const DecompressionStreamCtor = globalThis.DecompressionStream;
    if (DecompressionStreamCtor) {
      const stream = new Blob([toArrayBuffer(data)]).stream().pipeThrough(new DecompressionStreamCtor("deflate-raw"));
      return new Uint8Array(await new Response(stream).arrayBuffer());
    }
    const zlib = nodeZlib();
    if (zlib?.inflateRawSync)
      return new Uint8Array(zlib.inflateRawSync(data));
    throw new Error("This runtime does not support deflate-raw ZIP entries");
  }
  function nodeZlib() {
    try {
      const processObject = globalThis.process;
      const getBuiltinModule = processObject?.getBuiltinModule;
      return typeof getBuiltinModule == "function" ? getBuiltinModule.call(processObject, "node:zlib") : null;
    } catch {
      return null;
    }
  }
  function convertOutput(data, type) {
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
        const BufferCtor = globalThis.Buffer;
        return BufferCtor ? BufferCtor.from(data) : data;
      }
      case "base64":
        return bytesToBase64(data);
      case "blob":
      default:
        return new Blob([toArrayBuffer(data)]);
    }
  }
  function toArrayBuffer(data) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  function findEndOfCentralDirectory(view) {
    const min = Math.max(0, view.byteLength - 22 - 65535);
    for (let i = view.byteLength - 22; i >= min; i--) {
      if (readU32(view, i) === 101010256)
        return i;
    }
    throw new Error("Invalid ZIP file: missing end of central directory");
  }
  function normalizePath(path) {
    return path.startsWith("/") ? path.substring(1) : path;
  }
  function dataView(data) {
    return new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  function readU16(view, offset) {
    return view.getUint16(offset, true);
  }
  function readU32(view, offset) {
    return view.getUint32(offset, true);
  }
  function writeU16(view, offset, value) {
    view.setUint16(offset, value, true);
  }
  function writeU32(view, offset, value) {
    view.setUint32(offset, value >>> 0, true);
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
    for (const byte of data)
      text += String.fromCharCode(byte);
    return text;
  }
  function concatBytes(parts) {
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const result = new Uint8Array(total);
    let offset = 0;
    for (const part of parts) {
      result.set(part, offset);
      offset += part.length;
    }
    return result;
  }
  function bytesToBase64(data) {
    const BufferCtor = globalThis.Buffer;
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
    for (const byte of data)
      crc = crcTable[(crc ^ byte) & 255] ^ crc >>> 8;
    return (crc ^ 4294967295) >>> 0;
  }
  function makeCrcTable() {
    const table = new Uint32Array(256);
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
      const p = normalizePath2(path);
      return this._zip.files[p] ?? this._zip.files[p.replace(/\//g, "\\")];
    }
    update(path, content) {
      this._zip.file(path, content);
    }
    static async load(input, options) {
      const zip = await ZipArchive.loadAsync(input);
      return new _OpenXmlPackage(zip, options);
    }
    save(type = "blob") {
      return this._zip.generateAsync({ type });
    }
    load(path, type = "string") {
      return this.get(path)?.async(type) ?? Promise.resolve(null);
    }
    async loadRelationships(path = null) {
      let relsPath = `_rels/.rels`;
      if (path != null) {
        const [f, fn] = splitPath(path);
        relsPath = `${f}_rels/${fn}.rels`;
      }
      const txt = await this.load(relsPath);
      return txt ? parseRelationships(rootElement(this.parseXmlDocument(txt)), this.xmlParser) : null;
    }
    async loadContentTypes() {
      const txt = await this.load("[Content_Types].xml");
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
      super(pkg, path);
      this._documentParser = parser;
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
    for (let e of xml.elements(elem)) {
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
    }
    return result;
  }

  // src/document/section.ts
  function parseSectionProperties(elem, xml = xml_parser_default) {
    var section = {};
    for (let e of xml.elements(elem)) {
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
          section.titlePage = xml.boolAttr(e, "val", true);
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
    }
    return section;
  }
  function parseColumns(elem, xml) {
    return {
      numberOfColumns: xml.intAttr(elem, "num"),
      space: xml.lengthAttr(elem, "space"),
      separator: xml.boolAttr(elem, "sep"),
      equalWidth: xml.boolAttr(elem, "equalWidth", true),
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
    const charSpaceRaw = xml.intAttr(elem, "charSpace", null);
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
    if (value === "exact")
      return "exactly";
    if (value === "exactly" || value === "atLeast" || value === "auto")
      return value;
    return value;
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
    for (let el of xml.elements(elem)) {
      parseRunProperty(el, result, xml);
    }
    return result;
  }
  function parseRunProperty(elem, props, xml) {
    if (parseCommonProperty(elem, props, xml))
      return true;
    return false;
  }

  // src/document/paragraph.ts
  function parseParagraphProperties(elem, xml) {
    let result = {};
    for (let el of xml.elements(elem)) {
      parseParagraphProperty(el, result, xml);
    }
    return result;
  }
  function parseParagraphProperty(elem, props, xml) {
    if (elem.namespaceURI != ns.wordml)
      return false;
    if (parseCommonProperty(elem, props, xml))
      return true;
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
        props.lineSpacing = parseLineSpacing(elem, xml);
        return false;
        break;
      case "textAlignment":
        props.textAlignment = xml.attr(elem, "val");
        return false;
        break;
      case "keepLines":
        props.keepLines = xml.boolAttr(elem, "val", true);
        break;
      case "keepNext":
        props.keepNext = xml.boolAttr(elem, "val", true);
        break;
      case "pageBreakBefore":
        props.pageBreakBefore = xml.boolAttr(elem, "val", true);
        break;
      case "widowControl":
        props.widowControl = xml.boolAttr(elem, "val", true);
        break;
      case "contextualSpacing":
        props.contextualSpacing = xml.boolAttr(elem, "val", true);
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
        return false;
    }
    return true;
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
    for (let e of xml.elements(elem)) {
      switch (e.localName) {
        case "numId":
          result.id = xml.attr(e, "val");
          break;
        case "ilvl":
          result.level = xml.intAttr(e, "val");
          break;
      }
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
    for (let e of xml.elements(elem)) {
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
    }
    return result;
  }
  function parseNumbering2(elem, xml) {
    let result = {
      id: xml.attr(elem, "numId"),
      overrides: []
    };
    for (let e of xml.elements(elem)) {
      switch (e.localName) {
        case "abstractNumId":
          result.abstractId = xml.attr(e, "val");
          break;
        case "lvlOverride":
          result.overrides.push(parseNumberingLevelOverrride(e, xml));
          break;
      }
    }
    return result;
  }
  function parseAbstractNumbering(elem, xml) {
    let result = {
      id: xml.attr(elem, "abstractNumId"),
      levels: []
    };
    for (let e of xml.elements(elem)) {
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
    }
    return result;
  }
  function parseNumberingLevel(elem, xml) {
    let result = {
      level: xml.intAttr(elem, "ilvl")
    };
    for (let e of xml.elements(elem)) {
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
    }
    return result;
  }
  function parseNumberingLevelOverrride(elem, xml) {
    let result = {
      level: xml.intAttr(elem, "ilvl")
    };
    for (let e of xml.elements(elem)) {
      switch (e.localName) {
        case "startOverride":
          result.start = xml.intAttr(e, "val");
          break;
        case "lvl":
          result.numberingLevel = parseNumberingLevel(e, xml);
          break;
      }
    }
    return result;
  }
  function parseNumberingBulletPicture(elem, xml) {
    var id = xml.attr(elem, "numPicBulletId");
    var pict = xml.element(elem, "pict");
    var shape = pict && xml.element(pict, "shape");
    var imagedata = shape && xml.element(shape, "imagedata");
    if (imagedata) {
      return {
        id,
        referenceId: xml.attr(imagedata, "id"),
        style: xml.attr(shape, "style")
      };
    }
    var drawing = xml.element(elem, "drawing");
    var blip = drawing && findDescendant(drawing, "blip", xml);
    return blip ? {
      id,
      referenceId: xml.attr(blip, "embed") ?? xml.attr(blip, "link"),
      style: null
    } : null;
  }
  function findDescendant(elem, localName, xml) {
    for (const child of xml.elements(elem)) {
      if (child.localName == localName)
        return child;
      const nested = findDescendant(child, localName, xml);
      if (nested)
        return nested;
    }
    return null;
  }

  // src/numbering/numbering-part.ts
  var NumberingPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path);
      this._documentParser = parser;
    }
    parseXml(root) {
      Object.assign(this, parseNumberingPart(root, this._package.xmlParser));
      this.domNumberings = this._documentParser.parseNumberingFile(root);
    }
  };

  // src/styles/styles-part.ts
  var StylesPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path);
      this._documentParser = parser;
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
  };
  var WmlFooter = class extends OpenXmlElementBase {
    constructor() {
      super(...arguments);
      this.type = "footer" /* Footer */;
    }
  };

  // src/header-footer/parts.ts
  var BaseHeaderFooterPart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path);
      this._documentParser = parser;
    }
    parseXml(root) {
      this.rootElement = this.createRootElement();
      this.rootElement.children = this._documentParser.parseBodyElements(root);
    }
  };
  var HeaderPart = class extends BaseHeaderFooterPart {
    createRootElement() {
      return new WmlHeader();
    }
  };
  var FooterPart = class extends BaseHeaderFooterPart {
    createRootElement() {
      return new WmlFooter();
    }
  };

  // src/document-props/extended-props.ts
  function parseExtendedProps(root, xmlParser) {
    const result = {};
    for (let el of xmlParser.elements(root)) {
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
    }
    return result;
  }
  function safeParseToInt(value) {
    if (typeof value === "undefined")
      return;
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
    const result = {};
    for (let el of xmlParser.elements(root)) {
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
    var result = new DmlTheme();
    var themeElements = xml.element(elem, "themeElements");
    for (let el of xml.elements(themeElements)) {
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
    }
    return result;
  }
  function parseColorScheme(elem, xml) {
    var result = {
      name: xml.attr(elem, "name"),
      colors: {}
    };
    for (let el of xml.elements(elem)) {
      var srgbClr = xml.element(el, "srgbClr");
      var sysClr = xml.element(el, "sysClr");
      if (srgbClr) {
        result.colors[el.localName] = xml.attr(srgbClr, "val");
      } else if (sysClr) {
        result.colors[el.localName] = xml.attr(sysClr, "lastClr");
      }
    }
    return result;
  }
  function parseFontScheme(elem, xml) {
    var result = {
      name: xml.attr(elem, "name")
    };
    for (let el of xml.elements(elem)) {
      switch (el.localName) {
        case "majorFont":
          result.majorFont = parseFontInfo(el, xml);
          break;
        case "minorFont":
          result.minorFont = parseFontInfo(el, xml);
          break;
      }
    }
    return result;
  }
  function parseFontInfo(elem, xml) {
    const scriptTypefaces = {};
    for (const font of xml.elements(elem)) {
      if (font.localName != "font")
        continue;
      const script = xml.attr(font, "script");
      const typeface = xml.attr(font, "typeface");
      if (script && typeface)
        scriptTypefaces[script] = typeface;
    }
    return {
      latinTypeface: xml.elementAttr(elem, "latin", "typeface"),
      eaTypeface: xml.elementAttr(elem, "ea", "typeface"),
      csTypeface: xml.elementAttr(elem, "cs", "typeface"),
      scriptTypefaces
    };
  }
  function parseFormatScheme(elem, xml) {
    const result = {
      name: xml.attr(elem, "name"),
      lineStyles: []
    };
    const lineStyleList = xml.element(elem, "lnStyleLst");
    if (lineStyleList) {
      for (const line of xml.elements(lineStyleList, "ln"))
        result.lineStyles.push(parseThemeLineStyle(line, xml));
    }
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
  };
  var WmlFootnote = class extends WmlBaseNote {
    constructor() {
      super(...arguments);
      this.type = "footnote" /* Footnote */;
    }
  };
  var WmlEndnote = class extends WmlBaseNote {
    constructor() {
      super(...arguments);
      this.type = "endnote" /* Endnote */;
    }
  };

  // src/notes/parts.ts
  var BaseNotePart = class extends Part {
    constructor(pkg, path, parser) {
      super(pkg, path);
      this._documentParser = parser;
    }
  };
  var FootnotesPart = class extends BaseNotePart {
    constructor(pkg, path, parser) {
      super(pkg, path, parser);
    }
    parseXml(root) {
      this.notes = this._documentParser.parseNotes(root, "footnote", WmlFootnote);
    }
  };
  var EndnotesPart = class extends BaseNotePart {
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
      kinsoku: true,
      // OOXML defines omitted overflowPunct as enabled. Keep the default here
      // so every renderer inherits Word's normal East Asian punctuation behavior.
      overflowPunctuation: true,
      topLinePunctuation: false,
      suppressTopSpacingAtPageStart: false
    };
    for (let el of xml.elements(elem)) {
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
          result.autoHyphenation = xml.boolAttr(el, "val", true);
          break;
        case "hyphenationZone":
          result.hyphenationZone = xml.lengthAttr(el, "val");
          break;
        case "kinsoku":
          result.kinsoku = xml.boolAttr(el, "val", true);
          break;
        case "overflowPunct":
          result.overflowPunctuation = xml.boolAttr(el, "val", true);
          break;
        case "topLinePunct":
          result.topLinePunctuation = xml.boolAttr(el, "val", true);
          break;
        case "autoSpaceDE":
          result.autoSpaceDE = xml.boolAttr(el, "val", true);
          break;
        case "autoSpaceDN":
          result.autoSpaceDN = xml.boolAttr(el, "val", true);
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
          result.evenAndOddHeaders = xml.boolAttr(el, "val", true);
          break;
        case "splitPgBreakAndParaMark":
          result.splitPageBreakAndParagraphMark = xml.boolAttr(el, "val", true);
          break;
        case "mathPr":
          for (const c of xml.elements(el)) {
            if (c.localName == "mathFont")
              result.mathFont = xml.attr(c, "val");
            if (c.localName == "defJc")
              result.mathDefaultJustification = xml.attr(c, "val");
          }
          break;
        case "compat":
          for (const c of xml.elements(el)) {
            if (c.localName == "adjustLineHeightInTable")
              result.adjustLineHeightInTable = xml.boolAttr(c, "val", true);
            if (c.localName == "useFELayout")
              result.useFELayout = xml.boolAttr(c, "val", true);
            if (c.localName == "balanceSingleByteDoubleByteWidth")
              result.balanceSingleByteDoubleByteWidth = xml.boolAttr(c, "val", true);
            if (c.localName == "doNotUseEastAsianBreakRules")
              result.doNotUseEastAsianBreakRules = xml.boolAttr(c, "val", true);
            if (c.localName == "doNotWrapTextWithPunct")
              result.doNotWrapTextWithPunct = xml.boolAttr(c, "val", true);
            if (c.localName == "allowSpaceOfSameStyleInTable")
              result.allowSpaceOfSameStyleInTable = xml.boolAttr(c, "val", true);
            if (c.localName == "suppressTopSpacing" || c.localName == "suppressTopSpacingWP" || c.localName == "suppressSpacingAtTopOfPage")
              result.suppressTopSpacingAtPageStart = xml.boolAttr(c, "val", true);
          }
          break;
      }
    }
    return result;
  }
  function parseNoteProperties(elem, xml) {
    var result = {
      defaultNoteIds: []
    };
    for (let el of xml.elements(elem)) {
      switch (el.localName) {
        case "numFmt":
          result.nummeringFormat = xml.attr(el, "val");
          break;
        case "footnote":
        case "endnote":
          result.defaultNoteIds.push(xml.attr(el, "id"));
          break;
      }
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
      const firstChild = e.firstChild;
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
      super(pkg, path);
      this._documentParser = parser;
    }
    parseXml(root) {
      this.comments = this._documentParser.parseComments(root);
      this.commentMap = keyBy(this.comments, (x) => x.id);
    }
  };

  // src/comments/comments-extended-part.ts
  var CommentsExtendedPart = class extends Part {
    constructor(pkg, path) {
      super(pkg, path);
      this.comments = [];
    }
    parseXml(root) {
      const xml = this._package.xmlParser;
      for (let el of xml.elements(root, "commentEx")) {
        this.comments.push({
          paraId: xml.attr(el, "paraId"),
          paraIdParent: xml.attr(el, "paraIdParent"),
          done: xml.boolAttr(el, "done")
        });
      }
      this.commentMap = keyBy(this.comments, (x) => x.paraId);
    }
  };

  // src/metafile/emf-to-svg.ts
  var UPNG = __toESM(require_UPNG());
  var EMR = {
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
  };
  var EMFPLUS = {
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
  };
  var EMFPLUS_OBJECT_TYPE_BRUSH = 1;
  var EMFPLUS_OBJECT_TYPE_PEN = 2;
  var EMFPLUS_OBJECT_TYPE_PATH = 3;
  var EMFPLUS_COMMENT_IDENTIFIER = 726027589;
  var EMFPLUS_PATH_POINT_FLAG_R = 1;
  var EMFPLUS_PATH_POINT_FLAG_C = 2;
  var EMFPLUS_PATH_POINT_TYPE_MASK = 7;
  var EMFPLUS_PATH_POINT_TYPE_START = 0;
  var EMFPLUS_PATH_POINT_TYPE_LINE = 1;
  var EMFPLUS_PATH_POINT_TYPE_BEZIER = 3;
  var EMFPLUS_PATH_POINT_TYPE_CLOSE = 128;
  var EMFPLUS_FILL_USES_COLOR = 32768;
  var PEN_DATA_TRANSFORM = 1;
  var PEN_DATA_START_CAP = 2;
  var PEN_DATA_END_CAP = 4;
  var PEN_DATA_JOIN = 8;
  var PEN_DATA_MITER_LIMIT = 16;
  var PEN_DATA_LINE_STYLE = 32;
  var PEN_DATA_DASHED_LINE_CAP = 64;
  var PEN_DATA_DASHED_LINE_OFFSET = 128;
  var PEN_DATA_DASHED_LINE = 256;
  var PEN_DATA_NON_CENTER = 512;
  var PEN_DATA_COMPOUND_LINE = 1024;
  var STOCK_OBJECTS = {
    0: { type: "brush", color: "#ffffff" },
    1: { type: "brush", color: "#c0c0c0" },
    2: { type: "brush", color: "#808080" },
    3: { type: "brush", color: "#404040" },
    4: { type: "brush", color: "#000000" },
    5: { type: "brush", color: "none", nullBrush: true },
    6: { type: "pen", color: "#ffffff", width: 1 },
    7: { type: "pen", color: "#000000", width: 1 },
    8: { type: "pen", color: "none", width: 0, nullPen: true },
    18: { type: "brush", color: "#ffffff" },
    19: { type: "pen", color: "#000000", width: 1 }
  };
  var IDENTITY = { m11: 1, m12: 0, m21: 0, m22: 1, dx: 0, dy: 0 };
  var PS_ENDCAP_MASK = 3840;
  var PS_ENDCAP_SQUARE = 256;
  var PS_ENDCAP_FLAT = 512;
  var PS_JOIN_MASK = 61440;
  var PS_JOIN_BEVEL = 4096;
  var PS_JOIN_MITER = 8192;
  var EMF_FRAME_VIEWBOX_GUTTER_RATIO_LIMIT = 3e-3;
  var WMF_PLACEABLE_KEY = 2596720087;
  var WMF_META_ESCAPE = 1574;
  var WMF_ESCAPE_MFCOMMENT = 15;
  var WMFC_COMMENT_HEADER_BYTES = 34;
  var WMF = {
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
  };
  var ROP_SRCAND = 8913094;
  var ROP_SRCPAINT = 15597702;
  var DIB_TO_PNG_MAX_PIXELS = 24 * 1024 * 1024;
  function isEmfBinary(data) {
    if (!data || data.length < 48)
      return false;
    const view = toDataView(data);
    return view.getUint32(0, true) == EMR.HEADER && view.getUint32(40, true) == 1179469088;
  }
  function extractEmbeddedEmfBinary(data) {
    if (!data || data.length < 48)
      return null;
    const compressed = extractWmfCompressedEmfBinary(data);
    if (compressed)
      return compressed;
    for (let magicOffset = data.indexOf(32, 40); magicOffset >= 40 && magicOffset + 4 <= data.length; magicOffset = data.indexOf(32, magicOffset + 1)) {
      if (data[magicOffset + 1] !== 69 || data[magicOffset + 2] !== 77 || data[magicOffset + 3] !== 70)
        continue;
      const offset = magicOffset - 40;
      if (offset < 0 || offset + 88 > data.length)
        continue;
      if (readU32LE(data, offset) !== EMR.HEADER || readU32LE(data, offset + 40) !== 1179469088)
        continue;
      const recordSize = readU32LE(data, offset + 4);
      const totalBytes = offset + 52 <= data.length ? readU32LE(data, offset + 48) : 0;
      const available = data.length - offset;
      const size = totalBytes >= recordSize && totalBytes <= available ? totalBytes : available;
      if (size < 88)
        continue;
      const embedded = data.subarray(offset, offset + size);
      if (isEmfBinary(embedded))
        return embedded;
    }
    return null;
  }
  function extractWmfCompressedEmfBinary(data) {
    const wmfStart = readU32LE(data, 0) == WMF_PLACEABLE_KEY ? 22 : 0;
    if (wmfStart + 18 > data.length)
      return null;
    const fileType = readU16LE(data, wmfStart);
    const headerWords = readU16LE(data, wmfStart + 2);
    if (fileType != 1 && fileType != 2 || headerWords < 9)
      return null;
    let offset = wmfStart + headerWords * 2;
    const chunks = [];
    let total = 0;
    for (let records = 0; offset + 6 <= data.length && records < 1e6; records++) {
      const recordWords = readU32LE(data, offset);
      const recordBytes = recordWords * 2;
      const fn = readU16LE(data, offset + 4);
      if (!recordWords || recordBytes < 6 || offset + recordBytes > data.length)
        break;
      if (fn == WMF_META_ESCAPE && recordBytes >= 10) {
        const escapeFunction = readU16LE(data, offset + 6);
        const byteCount = readU16LE(data, offset + 8);
        const payloadStart = offset + 10;
        const payloadEnd = payloadStart + byteCount;
        if (escapeFunction == WMF_ESCAPE_MFCOMMENT && byteCount > WMFC_COMMENT_HEADER_BYTES && payloadEnd <= offset + recordBytes && data[payloadStart] == 87 && data[payloadStart + 1] == 77 && data[payloadStart + 2] == 70 && data[payloadStart + 3] == 67) {
          const chunk = data.subarray(payloadStart + WMFC_COMMENT_HEADER_BYTES, payloadEnd);
          chunks.push(chunk);
          total += chunk.length;
        }
      }
      offset += recordBytes;
    }
    if (!chunks.length || total <= 0 || total > data.length)
      return null;
    const out = new Uint8Array(total);
    let outOffset = 0;
    for (const chunk of chunks) {
      out.set(chunk, outOffset);
      outOffset += chunk.length;
    }
    return isEmfBinary(out) ? out : null;
  }
  function convertEmfToSvgDataUrl(data, options) {
    const svg = convertEmfToSvg(data, options);
    return svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : null;
  }
  function isWmfBinary(data) {
    return !!parseWmfHeader(data);
  }
  function convertWmfToSvgDataUrl(data, options) {
    const svg = convertWmfToSvg(data, options);
    return svg ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}` : null;
  }
  function convertWmfToSvg(data, options = {}) {
    const header = parseWmfHeader(data);
    if (!header)
      return null;
    const view = toDataView(data);
    const state = initialState();
    const objects = [];
    const elements = [];
    const observed = emptyBounds();
    let records = 0;
    let shapeCount = 0;
    let offset = header.recordsOffset;
    let pathData = "";
    let inPath = false;
    const maxRecords = options.maxRecords ?? 1e5;
    const maxShapes = options.maxShapes ?? 5e4;
    if (header.viewBox) {
      state.windowOrg = { x: header.viewBox.left, y: header.viewBox.top };
      state.windowExt = { x: header.viewBox.right - header.viewBox.left, y: header.viewBox.bottom - header.viewBox.top };
    }
    const emit = (markup) => {
      if (!markup || shapeCount >= maxShapes)
        return;
      elements.push(markup);
      shapeCount++;
    };
    const appendPath = (segment) => {
      if (!segment)
        return;
      pathData += (pathData ? " " : "") + segment;
    };
    while (offset + 6 <= view.byteLength && records++ <= maxRecords) {
      const recordWords = view.getUint32(offset, true);
      const recordBytes = recordWords * 2;
      const fn = view.getUint16(offset + 4, true);
      const paramsOffset = offset + 6;
      const paramsBytes = recordBytes - 6;
      if (!recordWords || recordBytes < 6 || offset + recordBytes > view.byteLength)
        break;
      switch (fn) {
        case WMF.EOF:
          offset += recordBytes;
          records = maxRecords + 1;
          break;
        case WMF.SETBKMODE:
          if (paramsBytes >= 2)
            state.bkMode = view.getUint16(paramsOffset, true);
          break;
        case WMF.SETBKCOLOR:
          if (paramsBytes >= 4)
            state.bkColor = colorRefToCss(view.getUint32(paramsOffset, true));
          break;
        case WMF.SETTEXTCOLOR:
          if (paramsBytes >= 4)
            state.textColor = colorRefToCss(view.getUint32(paramsOffset, true));
          break;
        case WMF.SETTEXTALIGN:
          if (paramsBytes >= 2)
            state.textAlign = view.getUint16(paramsOffset, true);
          break;
        case WMF.SETWINDOWORG:
          if (paramsBytes >= 4)
            state.windowOrg = readWmfYXPoint(view, paramsOffset);
          break;
        case WMF.SETWINDOWEXT:
          if (paramsBytes >= 4)
            state.windowExt = readWmfYXPoint(view, paramsOffset);
          break;
        case WMF.SETVIEWPORTORG:
          if (paramsBytes >= 4)
            state.viewportOrg = readWmfYXPoint(view, paramsOffset);
          break;
        case WMF.SETVIEWPORTEXT:
          if (paramsBytes >= 4)
            state.viewportExt = readWmfYXPoint(view, paramsOffset);
          break;
        case WMF.MOVETO: {
          if (paramsBytes < 4)
            break;
          const p = transformPoint(state, readWmfYXPoint(view, paramsOffset));
          state.currentPoint = p;
          observePoint(observed, p);
          if (inPath)
            appendPath(`M ${fmt(p.x)} ${fmt(p.y)}`);
          break;
        }
        case WMF.LINETO: {
          if (paramsBytes < 4)
            break;
          const p = transformPoint(state, readWmfYXPoint(view, paramsOffset));
          observePoint(observed, state.currentPoint);
          observePoint(observed, p);
          if (inPath)
            appendPath(`L ${fmt(p.x)} ${fmt(p.y)}`);
          else
            emit(`<path d="M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)} L ${fmt(p.x)} ${fmt(p.y)}" ${paintAttrs(state, false, true)}/>`);
          state.currentPoint = p;
          break;
        }
        case WMF.CREATEPENINDIRECT: {
          const pen = parseWmfPen(view, paramsOffset, paramsBytes);
          if (pen)
            storeWmfObject(objects, pen);
          break;
        }
        case WMF.CREATEBRUSHINDIRECT: {
          const brush = parseWmfBrush(view, paramsOffset, paramsBytes);
          if (brush)
            storeWmfObject(objects, brush);
          break;
        }
        case WMF.CREATEFONTINDIRECT: {
          const font = parseWmfFont(view, paramsOffset, paramsBytes);
          if (font)
            storeWmfObject(objects, font);
          break;
        }
        case WMF.SELECTOBJECT: {
          if (paramsBytes < 2)
            break;
          const handle = view.getUint16(paramsOffset, true);
          const obj = objects[handle] ?? STOCK_OBJECTS[handle];
          if (obj?.type == "pen") state.pen = clonePen(obj);
          else if (obj?.type == "brush") state.brush = cloneBrush(obj);
          else if (obj?.type == "font") state.font = { ...obj };
          break;
        }
        case WMF.DELETEOBJECT:
          if (paramsBytes >= 2)
            objects[view.getUint16(paramsOffset, true)] = null;
          break;
        case WMF.POLYGON:
        case WMF.POLYLINE:
          emitWmfPoly(view, paramsOffset, paramsBytes, fn == WMF.POLYGON, inPath, state, observed, appendPath, emit);
          break;
        case WMF.RECTANGLE:
          emitWmfRect(view, paramsOffset, paramsBytes, state, observed, emit, false);
          break;
        case WMF.ELLIPSE:
          emitWmfEllipse(view, paramsOffset, paramsBytes, state, observed, emit);
          break;
        case WMF.ROUNDRECT:
          emitWmfRect(view, paramsOffset + 4, Math.max(0, paramsBytes - 4), state, observed, emit, true);
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
    if (pathData)
      emitPath(pathData, state, emit, true, true);
    if (!elements.length) {
      const fallbackBounds = wmfOutputBounds(header, state, observed);
      const rasterFallback = emitEmbeddedRasterFallback(data, fallbackBounds);
      if (rasterFallback.length)
        elements.push(...rasterFallback);
    }
    const output = wmfOutputBounds(header, state, observed);
    const width = Math.max(1, output.right - output.left);
    const height = Math.max(1, output.bottom - output.top);
    const physicalWidth = header.physicalWidth || Math.max(1, width) * 25.4 / 96;
    const physicalHeight = header.physicalHeight || Math.max(1, height) * 25.4 / 96;
    if (!elements.length)
      return emptySvg(width, height, output.left, output.top, physicalWidth, physicalHeight, "Unsupported WMF image").replace('data-docx-metafile="emf"', 'data-docx-metafile="wmf"');
    const body = elements.join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(physicalWidth)}mm" height="${fmt(physicalHeight)}mm" viewBox="${fmt(output.left)} ${fmt(output.top)} ${fmt(width)} ${fmt(height)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="wmf"${svgMetafileMetadataAttrs(body)}>${body}</svg>`;
  }
  function convertEmfToSvg(data, options = {}) {
    if (!isEmfBinary(data))
      return null;
    const view = toDataView(data);
    const headerSize = view.getUint32(4, true);
    const bounds = readRectL(view, 8);
    const frame = readRectL(view, 24);
    const device = view.byteLength >= 80 ? readSizeL(view, 72) : null;
    const millimeters = view.byteLength >= 88 ? readSizeL(view, 80) : null;
    const declaredRecords = view.byteLength >= 52 ? view.getUint32(48, true) : 0;
    const rawWidth = Math.max(1, inclusiveRectWidth(bounds));
    const rawHeight = Math.max(1, inclusiveRectHeight(bounds));
    const viewGutterRatio = emfFrameViewBoxGutterRatio(rawWidth, rawHeight, frame, device, millimeters);
    const viewPadX = rawWidth * viewGutterRatio;
    const viewPadY = rawHeight * viewGutterRatio;
    const width = rawWidth + viewPadX * 2;
    const height = rawHeight + viewPadY * 2;
    const viewLeft = bounds.left - viewPadX;
    const viewTop = bounds.top - viewPadY;
    const physicalWidth = Math.max(1, inclusiveRectWidth(frame)) / 100;
    const physicalHeight = Math.max(1, inclusiveRectHeight(frame)) / 100;
    const state = initialState();
    const plusState = initialEmfPlusState();
    const stack = [];
    const objects = {};
    const elements = [];
    const skipGdiVectorFallback = hasEmfPlusVectorDrawing(data);
    let offset = Math.max(8, headerSize || 108);
    let records = 1;
    let pathData = "";
    let inPath = false;
    let shapeCount = 0;
    const maxRecords = options.maxRecords ?? Math.max(1e4, declaredRecords + 100);
    const maxShapes = options.maxShapes ?? 5e4;
    const emit = (markup) => {
      if (!markup || shapeCount >= maxShapes)
        return;
      elements.push(markup);
      shapeCount++;
    };
    const emitGdiShape = skipGdiVectorFallback ? () => void 0 : emit;
    const appendPath = (segment) => {
      if (!segment)
        return;
      pathData += (pathData ? " " : "") + segment;
    };
    while (offset + 8 <= view.byteLength && records++ <= maxRecords) {
      const type = view.getUint32(offset, true);
      const size = view.getUint32(offset + 4, true);
      if (size < 8 || offset + size > view.byteLength)
        break;
      switch (type) {
        case EMR.EOF:
          offset += size;
          records = maxRecords + 1;
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
          if (state.windowExt)
            state.windowExt = scaleExt(view, offset, state.windowExt);
          break;
        case EMR.SCALEVIEWPORTEXTEX:
          if (state.viewportExt)
            state.viewportExt = scaleExt(view, offset, state.viewportExt);
          break;
        case EMR.SETWORLDTRANSFORM:
          state.world = readXForm(view, offset + 8);
          break;
        case EMR.MODIFYWORLDTRANSFORM: {
          const xf = readXForm(view, offset + 8);
          const mode = view.getUint32(offset + 32, true);
          if (mode == 1)
            state.world = cloneMatrix(IDENTITY);
          else if (mode == 2)
            state.world = multiplyMatrix(xf, state.world);
          else if (mode == 3)
            state.world = multiplyMatrix(state.world, xf);
          else if (mode == 4)
            state.world = xf;
          break;
        }
        case EMR.SAVEDC:
          stack.push(cloneState(state));
          break;
        case EMR.RESTOREDC: {
          const relative = view.getInt32(offset + 8, true);
          if (relative < 0) {
            for (let i = 0; i < Math.min(-relative, stack.length); i++)
              Object.assign(state, stack.pop());
          } else if (relative > 0 && relative <= stack.length) {
            const restored = stack[relative - 1];
            stack.length = relative - 1;
            Object.assign(state, cloneState(restored));
          }
          break;
        }
        case EMR.SETBKMODE:
          state.bkMode = view.getUint32(offset + 8, true);
          break;
        case EMR.SETPOLYFILLMODE:
          state.polyFillMode = view.getUint32(offset + 8, true);
          break;
        case EMR.SETTEXTALIGN:
          state.textAlign = view.getUint32(offset + 8, true);
          break;
        case EMR.SETTEXTCOLOR:
          state.textColor = colorRefToCss(view.getUint32(offset + 8, true));
          break;
        case EMR.SETBKCOLOR:
          state.bkColor = colorRefToCss(view.getUint32(offset + 8, true));
          break;
        case EMR.CREATEPEN: {
          const handle = view.getUint32(offset + 8, true);
          const style = view.getUint32(offset + 12, true);
          const width2 = Math.abs(view.getInt32(offset + 16, true));
          const color = colorRefToCss(view.getUint32(offset + 24, true));
          objects[handle] = createPenObject(style, color, width2 || 1, (style & 15) == 5);
          break;
        }
        case EMR.EXTCREATEPEN: {
          const handle = view.getUint32(offset + 8, true);
          const style = view.getUint32(offset + 28, true);
          const width2 = Math.abs(view.getInt32(offset + 32, true));
          const brushStyle = view.getUint32(offset + 36, true);
          const color = colorRefToCss(view.getUint32(offset + 40, true));
          objects[handle] = createPenObject(style, color, width2 || 1, (style & 15) == 5 || brushStyle == 1);
          break;
        }
        case EMR.CREATEBRUSHINDIRECT: {
          const handle = view.getUint32(offset + 8, true);
          const style = view.getUint32(offset + 12, true);
          const color = colorRefToCss(view.getUint32(offset + 16, true));
          objects[handle] = { type: "brush", color, nullBrush: style == 1 };
          break;
        }
        case EMR.EXTCREATEFONTINDIRECTW: {
          const handle = view.getUint32(offset + 8, true);
          objects[handle] = parseFont2(view, offset + 12, size - 12);
          break;
        }
        case EMR.SELECTOBJECT: {
          const handle = view.getUint32(offset + 8, true);
          const obj = handle & 2147483648 ? STOCK_OBJECTS[handle & 2147483647] : objects[handle];
          if (obj?.type == "pen") state.pen = clonePen(obj);
          else if (obj?.type == "brush") state.brush = cloneBrush(obj);
          else if (obj?.type == "font") state.font = { ...obj };
          break;
        }
        case EMR.DELETEOBJECT:
          delete objects[view.getUint32(offset + 8, true)];
          break;
        case EMR.BEGINPATH:
          inPath = true;
          pathData = "";
          break;
        case EMR.ENDPATH:
          inPath = false;
          break;
        case EMR.CLOSEFIGURE:
          appendPath("Z");
          break;
        case EMR.MOVETOEX: {
          const p = transformPoint(state, readPointL(view, offset + 8));
          state.currentPoint = p;
          if (inPath)
            appendPath(`M ${fmt(p.x)} ${fmt(p.y)}`);
          break;
        }
        case EMR.LINETO: {
          const p = transformPoint(state, readPointL(view, offset + 8));
          if (inPath) {
            appendPath(`L ${fmt(p.x)} ${fmt(p.y)}`);
          } else {
            emitGdiShape(`<path d="M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)} L ${fmt(p.x)} ${fmt(p.y)}" ${paintAttrs(state, false, true)}/>`);
          }
          state.currentPoint = p;
          break;
        }
        case EMR.POLYLINE:
        case EMR.POLYGON:
          emitPoly32(view, offset, type == EMR.POLYGON, false, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYLINETO:
          emitPoly32(view, offset, false, true, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYLINE16:
        case EMR.POLYGON16:
          emitPoly16(view, offset, type == EMR.POLYGON16, false, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYLINETO16:
          emitPoly16(view, offset, false, true, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIER:
          emitBezier(view, offset, false, false, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIERTO:
          emitBezier(view, offset, false, true, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIER16:
          emitBezier(view, offset, true, false, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYBEZIERTO16:
          emitBezier(view, offset, true, true, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYPOLYLINE:
        case EMR.POLYPOLYGON:
          emitPolyPoly(view, offset, type == EMR.POLYPOLYGON, false, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYPOLYLINE16:
        case EMR.POLYPOLYGON16:
          emitPolyPoly(view, offset, type == EMR.POLYPOLYGON16, true, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYDRAW:
          emitPolyDraw(view, offset, false, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.POLYDRAW16:
          emitPolyDraw(view, offset, true, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.RECTANGLE:
          emitRect(view, offset, state, emitGdiShape, false);
          break;
        case EMR.ELLIPSE:
          emitEllipse(view, offset, state, emitGdiShape);
          break;
        case EMR.ROUNDRECT:
          emitRect(view, offset, state, emitGdiShape, true);
          break;
        case EMR.ARC:
        case EMR.ARCTO:
        case EMR.CHORD:
        case EMR.PIE:
          emitArcLike(view, offset, type, inPath, state, appendPath, emitGdiShape);
          break;
        case EMR.FILLPATH:
          emitPath(pathData, state, emitGdiShape, true, false);
          pathData = "";
          break;
        case EMR.STROKEPATH:
          emitPath(pathData, state, emitGdiShape, false, true);
          pathData = "";
          break;
        case EMR.STROKEANDFILLPATH:
          emitPath(pathData, state, emitGdiShape, true, true);
          pathData = "";
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
    if (pathData)
      emitPath(pathData, state, emitGdiShape, true, true);
    if (!elements.length) {
      const rasterFallback = emitEmbeddedRasterFallback(data, bounds);
      if (rasterFallback.length)
        elements.push(...rasterFallback);
    }
    if (!elements.length)
      return emptySvg(width, height, viewLeft, viewTop, physicalWidth, physicalHeight, "Unsupported EMF image");
    const body = elements.join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(physicalWidth)}mm" height="${fmt(physicalHeight)}mm" viewBox="${fmt(viewLeft)} ${fmt(viewTop)} ${fmt(width)} ${fmt(height)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="emf"${svgMetafileMetadataAttrs(body)}>${body}</svg>`;
  }
  function parseWmfHeader(data) {
    if (!data || data.length < 18)
      return null;
    const placeable = readU32LE(data, 0) == WMF_PLACEABLE_KEY && data.length >= 40;
    const start = placeable ? 22 : 0;
    if (start + 18 > data.length)
      return null;
    const fileType = readU16LE(data, start);
    const headerWords = readU16LE(data, start + 2);
    const version = readU16LE(data, start + 4);
    if (fileType != 1 && fileType != 2 || headerWords < 9 || version < 256)
      return null;
    const recordsOffset = start + headerWords * 2;
    if (recordsOffset + 6 > data.length)
      return null;
    let viewBox = null;
    let physicalWidth = 0;
    let physicalHeight = 0;
    if (placeable) {
      const left = readI16LE(data, 6);
      const top = readI16LE(data, 8);
      const right = readI16LE(data, 10);
      const bottom = readI16LE(data, 12);
      const inch = readU16LE(data, 14);
      const width = Math.abs(right - left);
      const height = Math.abs(bottom - top);
      if (width > 0 && height > 0) {
        viewBox = {
          left: Math.min(left, right),
          top: Math.min(top, bottom),
          right: Math.max(left, right),
          bottom: Math.max(top, bottom)
        };
        if (inch > 0) {
          physicalWidth = width * 25.4 / inch;
          physicalHeight = height * 25.4 / inch;
        }
      }
    }
    return { recordsOffset, viewBox, physicalWidth, physicalHeight };
  }
  function readWmfYXPoint(view, offset) {
    return { x: view.getInt16(offset + 2, true), y: view.getInt16(offset, true) };
  }
  function parseWmfPen(view, offset, available) {
    if (available < 10)
      return null;
    const style = view.getUint16(offset, true);
    const width = Math.abs(view.getInt16(offset + 2, true)) || 1;
    const color = colorRefToCss(view.getUint32(offset + 6, true));
    return createPenObject(style, color, width, (style & 15) == 5);
  }
  function parseWmfBrush(view, offset, available) {
    if (available < 8)
      return null;
    const style = view.getUint16(offset, true);
    const color = colorRefToCss(view.getUint32(offset + 2, true));
    return { type: "brush", color, nullBrush: style == 1 };
  }
  function parseWmfFont(view, offset, available) {
    if (available < 5)
      return null;
    const height = view.getInt16(offset, true);
    const weight = available >= 10 ? view.getUint16(offset + 8, true) : 400;
    const italic = available >= 11 ? view.getUint8(offset + 10) != 0 : false;
    const underline = available >= 12 ? view.getUint8(offset + 11) != 0 : false;
    let family = "";
    const faceOffset = offset + 18;
    const faceBytes = Math.max(0, Math.min(64, available - 18));
    for (let i = 0; i < faceBytes; i++) {
      const code = view.getUint8(faceOffset + i);
      if (!code)
        break;
      family += String.fromCharCode(code);
    }
    return { type: "font", family, size: Math.abs(height) || 12, weight, italic, underline };
  }
  function storeWmfObject(objects, object) {
    let index = objects.findIndex((item) => item == null);
    if (index < 0)
      index = objects.length;
    objects[index] = object;
    return index;
  }
  function emitWmfPoly(view, offset, size, closed, inPath, state, observed, appendPath, emit) {
    if (size < 2)
      return;
    const count = view.getUint16(offset, true);
    if (!count || 2 + count * 4 > size)
      return;
    const points = [];
    for (let i = 0; i < count; i++) {
      const p = transformPoint(state, readPointS(view, offset + 2 + i * 4));
      observePoint(observed, p);
      points.push(p);
    }
    emitPolyline(points, closed, false, inPath, state, appendPath, emit);
  }
  function emitWmfRect(view, offset, size, state, observed, emit, rounded) {
    if (size < 8)
      return;
    const r = readWmfLTRBRect(view, offset);
    const p1 = transformPoint(state, { x: r.left, y: r.top });
    const p2 = transformPoint(state, { x: r.right, y: r.bottom });
    observePoint(observed, p1);
    observePoint(observed, p2);
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p2.x - p1.x);
    const h = Math.abs(p2.y - p1.y);
    const radius = rounded ? ` rx="${fmt(Math.min(w, h) / 8)}" ry="${fmt(Math.min(w, h) / 8)}"` : "";
    emit(`<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}"${radius} ${paintAttrs(state, true, true)}/>`);
  }
  function emitWmfEllipse(view, offset, size, state, observed, emit) {
    if (size < 8)
      return;
    const r = readWmfLTRBRect(view, offset);
    const p1 = transformPoint(state, { x: r.left, y: r.top });
    const p2 = transformPoint(state, { x: r.right, y: r.bottom });
    observePoint(observed, p1);
    observePoint(observed, p2);
    const cx = (p1.x + p2.x) / 2;
    const cy = (p1.y + p2.y) / 2;
    const rx = Math.abs(p2.x - p1.x) / 2;
    const ry = Math.abs(p2.y - p1.y) / 2;
    emit(`<ellipse cx="${fmt(cx)}" cy="${fmt(cy)}" rx="${fmt(rx)}" ry="${fmt(ry)}" ${paintAttrs(state, true, true)}/>`);
  }
  function emitWmfArcLike(view, offset, size, type, inPath, state, observed, appendPath, emit) {
    if (size < 16)
      return;
    const endRef = readWmfYXPoint(view, offset);
    const startRef = readWmfYXPoint(view, offset + 4);
    const r = readWmfLTRBRect(view, offset + 8);
    const cx = (r.left + r.right) / 2;
    const cy = (r.top + r.bottom) / 2;
    const rxRaw = Math.abs(r.right - r.left) / 2;
    const ryRaw = Math.abs(r.bottom - r.top) / 2;
    if (!rxRaw || !ryRaw)
      return;
    const startAngle = Math.atan2(startRef.y - cy, startRef.x - cx);
    let endAngle = Math.atan2(endRef.y - cy, endRef.x - cx);
    let delta = endAngle - startAngle;
    if (delta <= 0)
      delta += Math.PI * 2;
    const largeArc = delta > Math.PI ? 1 : 0;
    const pStart = transformPoint(state, { x: cx + Math.cos(startAngle) * rxRaw, y: cy + Math.sin(startAngle) * ryRaw });
    const pEnd = transformPoint(state, { x: cx + Math.cos(endAngle) * rxRaw, y: cy + Math.sin(endAngle) * ryRaw });
    const pCenter = transformPoint(state, { x: cx, y: cy });
    const pRx = transformPoint(state, { x: cx + rxRaw, y: cy });
    const pRy = transformPoint(state, { x: cx, y: cy + ryRaw });
    observePoint(observed, pStart);
    observePoint(observed, pEnd);
    observePoint(observed, pCenter);
    const rx = Math.max(0.01, Math.abs(pRx.x - pCenter.x) || Math.abs(pRy.x - pCenter.x));
    const ry = Math.max(0.01, Math.abs(pRy.y - pCenter.y) || Math.abs(pRx.y - pCenter.y));
    let d = `M ${fmt(pStart.x)} ${fmt(pStart.y)} A ${fmt(rx)} ${fmt(ry)} 0 ${largeArc} 1 ${fmt(pEnd.x)} ${fmt(pEnd.y)}`;
    let fill = false;
    let stroke = true;
    if (type == WMF.CHORD) {
      d += " Z";
      fill = true;
    } else if (type == WMF.PIE) {
      d += ` L ${fmt(pCenter.x)} ${fmt(pCenter.y)} Z`;
      fill = true;
    }
    if (inPath)
      appendPath(d);
    else
      emit(`<path d="${d}" ${paintAttrs(state, fill, stroke)}/>`);
  }
  function emitWmfTextOut(view, offset, size, state, observed, emit) {
    if (size < 8)
      return;
    const chars = view.getUint16(offset, true);
    const textOffset = offset + 2;
    const paddedTextBytes = chars + (chars & 1);
    const pointOffset = textOffset + paddedTextBytes;
    if (!chars || pointOffset + 4 > offset + size)
      return;
    const text = decodeAnsi(new Uint8Array(view.buffer, view.byteOffset + textOffset, chars));
    const recordRawRef = readWmfYXPoint(view, pointOffset);
    const useCurrentPoint = !!(state.textAlign & 1);
    const rawRef = useCurrentPoint && canUseWmfCurrentPointAsRaw(state) ? { x: state.currentPoint.x, y: state.currentPoint.y } : recordRawRef;
    const ref = useCurrentPoint ? state.currentPoint : transformPoint(state, recordRawRef);
    observePoint(observed, ref);
    emitText(text, ref, state, emit, rawRef);
    if (useCurrentPoint)
      advanceWmfCurrentPointAfterText(state, rawRef, text, null);
  }
  function emitWmfExtTextOut(view, offset, size, state, observed, emit) {
    if (size < 8)
      return;
    const recordRawRef = readWmfYXPoint(view, offset);
    const chars = view.getUint16(offset + 4, true);
    const options = view.getUint16(offset + 6, true);
    let textOffset = offset + 8;
    if (options & 6)
      textOffset += 8;
    if (!chars || textOffset + chars > offset + size)
      return;
    const text = decodeAnsi(new Uint8Array(view.buffer, view.byteOffset + textOffset, chars));
    const dxOffset = textOffset + chars + (chars & 1);
    const dx = [];
    if (dxOffset + chars * 2 <= offset + size) {
      for (let i = 0; i < chars; i++)
        dx.push(view.getInt16(dxOffset + i * 2, true));
    }
    const useCurrentPoint = !!(state.textAlign & 1);
    const rawRef = useCurrentPoint && canUseWmfCurrentPointAsRaw(state) ? { x: state.currentPoint.x, y: state.currentPoint.y } : recordRawRef;
    const ref = useCurrentPoint ? state.currentPoint : transformPoint(state, recordRawRef);
    observePoint(observed, ref);
    emitText(text, ref, state, emit, rawRef, dx.length == chars ? dx : null);
    if (useCurrentPoint)
      advanceWmfCurrentPointAfterText(state, rawRef, text, dx.length == chars ? dx : null);
  }
  function readWmfLTRBRect(view, offset) {
    const bottom = view.getInt16(offset, true);
    const right = view.getInt16(offset + 2, true);
    const top = view.getInt16(offset + 4, true);
    const left = view.getInt16(offset + 6, true);
    return { left, top, right, bottom };
  }
  function emptyBounds() {
    return { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
  }
  function observePoint(bounds, p) {
    if (!Number.isFinite(p.x) || !Number.isFinite(p.y))
      return;
    bounds.left = Math.min(bounds.left, p.x);
    bounds.top = Math.min(bounds.top, p.y);
    bounds.right = Math.max(bounds.right, p.x);
    bounds.bottom = Math.max(bounds.bottom, p.y);
  }
  function boundsFinite(bounds) {
    return Number.isFinite(bounds.left) && Number.isFinite(bounds.top) && Number.isFinite(bounds.right) && Number.isFinite(bounds.bottom) && bounds.right > bounds.left && bounds.bottom > bounds.top;
  }
  function wmfOutputBounds(header, state, observed) {
    if (header.viewBox)
      return header.viewBox;
    if (state.windowExt && state.windowExt.x && state.windowExt.y) {
      const right = state.windowOrg.x + state.windowExt.x;
      const bottom = state.windowOrg.y + state.windowExt.y;
      return {
        left: Math.min(state.windowOrg.x, right),
        top: Math.min(state.windowOrg.y, bottom),
        right: Math.max(state.windowOrg.x, right),
        bottom: Math.max(state.windowOrg.y, bottom)
      };
    }
    if (boundsFinite(observed))
      return {
        left: observed.left,
        top: observed.top,
        right: observed.right,
        bottom: observed.bottom
      };
    return { left: 0, top: 0, right: 1, bottom: 1 };
  }
  function canUseWmfCurrentPointAsRaw(state) {
    const world = state.world;
    return world.m11 == 1 && world.m12 == 0 && world.m21 == 0 && world.m22 == 1 && world.dx == 0 && world.dy == 0 && !(state.windowExt && state.viewportExt && state.windowExt.x && state.windowExt.y);
  }
  function advanceWmfCurrentPointAfterText(state, rawRef, text, dx) {
    const advance = dx?.length ? dx.reduce((sum, value) => sum + (Number(value) || 0), 0) : Math.max(1, text.length) * Math.max(1, state.font?.size ?? 12) * 0.5;
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
      brush: { type: "brush", color: "#ffffff", nullBrush: true },
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
      antiAlias: true,
      smoothingMode: 4,
      objects: {},
      stack: []
    };
  }
  function hasEmfPlusVectorDrawing(data) {
    const view = toDataView(data);
    let offset = Math.max(8, view.getUint32(4, true) || 108);
    while (offset + 8 <= view.byteLength) {
      const type = view.getUint32(offset, true);
      const size = view.getUint32(offset + 4, true);
      if (size < 8 || offset + size > view.byteLength)
        break;
      if (type == EMR.GDICOMMENT && containsEmfPlusVectorRecord(view, offset, size))
        return true;
      if (type == EMR.EOF)
        break;
      offset += size;
    }
    return false;
  }
  function containsEmfPlusVectorRecord(view, recordOffset, recordSize) {
    if (recordSize < 16)
      return false;
    const dataSize = view.getUint32(recordOffset + 8, true);
    const dataOffset = recordOffset + 12;
    const end = Math.min(recordOffset + recordSize, dataOffset + dataSize);
    if (dataOffset + 4 > end || view.getUint32(dataOffset, true) != EMFPLUS_COMMENT_IDENTIFIER)
      return false;
    let p = dataOffset + 4;
    while (p + 12 <= end) {
      const type = view.getUint16(p, true);
      const size = view.getUint32(p + 4, true);
      if (type == EMFPLUS.DRAWPATH || type == EMFPLUS.FILLPATH || type == EMFPLUS.FILLRECTS)
        return true;
      if (size < 12 || p + size > end)
        break;
      p += size;
    }
    return false;
  }
  function emitEmfPlusComment(view, recordOffset, recordSize, state, emit) {
    if (recordSize < 16)
      return;
    const dataSize = view.getUint32(recordOffset + 8, true);
    const dataOffset = recordOffset + 12;
    const end = Math.min(recordOffset + recordSize, dataOffset + dataSize);
    if (dataOffset + 4 > end || view.getUint32(dataOffset, true) != EMFPLUS_COMMENT_IDENTIFIER)
      return;
    let p = dataOffset + 4;
    while (p + 12 <= end) {
      const type = view.getUint16(p, true);
      const flags = view.getUint16(p + 2, true);
      const size = view.getUint32(p + 4, true);
      const payloadSize = view.getUint32(p + 8, true);
      const payloadOffset = p + 12;
      if (size < 12 || p + size > end || payloadOffset + payloadSize > p + size)
        break;
      switch (type) {
        case EMFPLUS.SETPAGETRANSFORM:
          if (payloadSize >= 4) {
            const pageScale = view.getFloat32(payloadOffset, true);
            state.pageScale = Number.isFinite(pageScale) && pageScale > 0 ? pageScale : 1;
          }
          break;
        case EMFPLUS.SETWORLDTRANSFORM:
          if (payloadSize >= 24)
            state.world = readXForm(view, payloadOffset);
          break;
        case EMFPLUS.RESETWORLDTRANSFORM:
          state.world = cloneMatrix(IDENTITY);
          break;
        case EMFPLUS.SAVE:
          state.stack.push({
            id: payloadSize >= 4 ? view.getUint32(payloadOffset, true) : state.stack.length,
            world: cloneMatrix(state.world),
            pageScale: state.pageScale,
            antiAlias: state.antiAlias,
            smoothingMode: state.smoothingMode
          });
          break;
        case EMFPLUS.RESTORE: {
          const id = payloadSize >= 4 ? view.getUint32(payloadOffset, true) : null;
          let restored;
          if (id == null) {
            restored = state.stack.pop();
          } else {
            const index = state.stack.map((saved) => saved.id).lastIndexOf(id);
            if (index >= 0) {
              restored = state.stack[index];
              state.stack.length = index;
            }
          }
          if (restored) {
            state.world = cloneMatrix(restored.world);
            state.pageScale = restored.pageScale;
            state.antiAlias = restored.antiAlias;
            state.smoothingMode = restored.smoothingMode;
          }
          break;
        }
        case EMFPLUS.SETANTIALIASMODE:
          state.antiAlias = !!(flags & 1);
          state.smoothingMode = flags >>> 1 & 127;
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
    const objectId = flags & 255;
    const objectType = flags >>> 8 & 127;
    if (objectType == EMFPLUS_OBJECT_TYPE_PATH) {
      const path = readEmfPlusPathObject(view, offset, size);
      if (path)
        objects[objectId] = path;
    } else if (objectType == EMFPLUS_OBJECT_TYPE_PEN) {
      const pen = readEmfPlusPenObject(view, offset, size);
      if (pen)
        objects[objectId] = pen;
    } else if (objectType == EMFPLUS_OBJECT_TYPE_BRUSH) {
      const brush = readEmfPlusBrushObject(view, offset, size);
      if (brush)
        objects[objectId] = brush;
    }
  }
  function readEmfPlusPathObject(view, offset, size) {
    if (size < 12)
      return null;
    const count = view.getUint32(offset + 4, true);
    const flags = view.getUint32(offset + 8, true);
    if (!count || count > 1e5)
      return null;
    if (flags & EMFPLUS_PATH_POINT_FLAG_R)
      return null;
    const compressed = !!(flags & EMFPLUS_PATH_POINT_FLAG_C);
    const pointSize = compressed ? 4 : 8;
    const pointsOffset = offset + 12;
    const typesOffset = pointsOffset + count * pointSize;
    if (typesOffset + count > offset + size)
      return null;
    const points = [];
    for (let i = 0; i < count; i++) {
      const p = pointsOffset + i * pointSize;
      points.push(compressed ? readPointS(view, p) : { x: view.getFloat32(p, true), y: view.getFloat32(p + 4, true) });
    }
    const types = [];
    for (let i = 0; i < count; i++)
      types.push(view.getUint8(typesOffset + i));
    return { type: "plusPath", points, types };
  }
  function readEmfPlusPenObject(view, offset, size) {
    if (size < 24)
      return null;
    let p = offset + 4;
    p += 4;
    const penDataFlags = view.getUint32(p, true);
    p += 4;
    p += 4;
    const width = view.getFloat32(p, true);
    p += 4;
    if (penDataFlags & PEN_DATA_TRANSFORM)
      p += 24;
    let lineCap = "butt";
    let lineJoin = "miter";
    if (penDataFlags & PEN_DATA_START_CAP) {
      lineCap = emfPlusLineCap(view.getInt32(p, true));
      p += 4;
    }
    if (penDataFlags & PEN_DATA_END_CAP) {
      lineCap = emfPlusLineCap(view.getInt32(p, true));
      p += 4;
    }
    if (penDataFlags & PEN_DATA_JOIN) {
      lineJoin = emfPlusLineJoin(view.getInt32(p, true));
      p += 4;
    }
    if (penDataFlags & PEN_DATA_MITER_LIMIT)
      p += 4;
    if (penDataFlags & PEN_DATA_LINE_STYLE)
      p += 4;
    if (penDataFlags & PEN_DATA_DASHED_LINE_CAP)
      p += 4;
    let dashOffset;
    if (penDataFlags & PEN_DATA_DASHED_LINE_OFFSET) {
      dashOffset = view.getFloat32(p, true);
      p += 4;
    }
    let brushOffset = findEmfPlusGraphicsObjectVersion(view, p, offset + size);
    let dashArray;
    if (penDataFlags & PEN_DATA_DASHED_LINE && brushOffset > p) {
      dashArray = [];
      for (let q = p; q + 4 <= brushOffset; q += 4) {
        const dash = view.getFloat32(q, true);
        if (Number.isFinite(dash) && dash > 0)
          dashArray.push(dash);
      }
      if (!dashArray.length)
        dashArray = void 0;
    }
    if (penDataFlags & PEN_DATA_NON_CENTER)
      brushOffset = findEmfPlusGraphicsObjectVersion(view, brushOffset, offset + size);
    if (penDataFlags & PEN_DATA_COMPOUND_LINE)
      brushOffset = findEmfPlusGraphicsObjectVersion(view, brushOffset, offset + size);
    const brush = brushOffset >= offset && brushOffset < offset + size ? readEmfPlusBrushObject(view, brushOffset, offset + size - brushOffset) : null;
    return {
      type: "plusPen",
      color: brush?.color ?? "#000000",
      width: Number.isFinite(width) && width > 0 ? width : 1,
      lineCap,
      lineJoin,
      dashArray,
      dashOffset
    };
  }
  function readEmfPlusBrushObject(view, offset, size) {
    if (size < 12)
      return null;
    const brushType = view.getUint32(offset + 4, true);
    if (brushType != 0)
      return null;
    return { type: "plusBrush", color: argbToCss(view.getUint32(offset + 8, true)) };
  }
  function findEmfPlusGraphicsObjectVersion(view, offset, end) {
    for (let p = Math.max(0, offset); p + 4 <= end; p += 4) {
      if (view.getUint32(p, true) == 3686797314)
        return p;
    }
    return end;
  }
  function emitEmfPlusFillRects(view, offset, size, flags, state, emit) {
    if (size < 8)
      return;
    const color = flags & EMFPLUS_FILL_USES_COLOR ? argbToCss(view.getUint32(offset, true)) : emfPlusBrushColor(state.objects[flags & 255]);
    const countOffset = flags & EMFPLUS_FILL_USES_COLOR ? offset + 4 : offset;
    const count = view.getUint32(countOffset, true);
    const rectsOffset = countOffset + 4;
    if (!color || !count || count > 1e5 || rectsOffset + count * 16 > offset + size)
      return;
    for (let i = 0; i < count; i++) {
      const p = rectsOffset + i * 16;
      const x = view.getFloat32(p, true);
      const y = view.getFloat32(p + 4, true);
      const w = view.getFloat32(p + 8, true);
      const h = view.getFloat32(p + 12, true);
      const d = rectToPathData(x, y, w, h, state);
      if (d)
        emit(`<path d="${d}" fill="${color}" stroke="none"${emfPlusRenderingAttrs(state)}/>`);
    }
  }
  function emitEmfPlusFillPath(view, offset, size, flags, state, emit) {
    if (size < 4)
      return;
    const path = state.objects[flags & 255];
    if (path?.type != "plusPath")
      return;
    const color = flags & EMFPLUS_FILL_USES_COLOR ? argbToCss(view.getUint32(offset, true)) : emfPlusBrushColor(state.objects[view.getUint32(offset, true) & 255]);
    if (!color)
      return;
    const d = plusPathData(path, state);
    if (d)
      emit(`<path d="${d}" fill="${color}" fill-rule="evenodd" stroke="none"${emfPlusRenderingAttrs(state)}/>`);
  }
  function emitEmfPlusDrawPath(view, offset, size, flags, state, emit) {
    if (size < 4)
      return;
    const path = state.objects[flags & 255];
    const pen = state.objects[view.getUint32(offset, true) & 255];
    if (path?.type != "plusPath" || pen?.type != "plusPen")
      return;
    const d = plusPathData(path, state);
    if (d)
      emit(`<path d="${d}" fill="none" ${emfPlusPenAttrs(pen, state)}${emfPlusRenderingAttrs(state)}/>`);
  }
  function plusPathData(path, state) {
    let d = "";
    for (let i = 0; i < path.points.length; i++) {
      const type = path.types[i] ?? EMFPLUS_PATH_POINT_TYPE_LINE;
      const op = type & EMFPLUS_PATH_POINT_TYPE_MASK;
      let close = !!(type & EMFPLUS_PATH_POINT_TYPE_CLOSE);
      if (op == EMFPLUS_PATH_POINT_TYPE_START || !d) {
        const p = transformEmfPlusPoint(state, path.points[i]);
        d += `${d ? " " : ""}M ${fmt(p.x)} ${fmt(p.y)}`;
      } else if (op == EMFPLUS_PATH_POINT_TYPE_LINE) {
        const p = transformEmfPlusPoint(state, path.points[i]);
        d += ` L ${fmt(p.x)} ${fmt(p.y)}`;
      } else if (op == EMFPLUS_PATH_POINT_TYPE_BEZIER && i + 2 < path.points.length) {
        const p1 = transformEmfPlusPoint(state, path.points[i]);
        const p2 = transformEmfPlusPoint(state, path.points[i + 1]);
        const p3 = transformEmfPlusPoint(state, path.points[i + 2]);
        d += ` C ${fmt(p1.x)} ${fmt(p1.y)} ${fmt(p2.x)} ${fmt(p2.y)} ${fmt(p3.x)} ${fmt(p3.y)}`;
        close = close || !!(path.types[i + 2] & EMFPLUS_PATH_POINT_TYPE_CLOSE);
        i += 2;
      }
      if (close)
        d += " Z";
    }
    return d;
  }
  function rectToPathData(x, y, w, h, state) {
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w) || !Number.isFinite(h))
      return "";
    const p1 = transformEmfPlusPoint(state, { x, y });
    const p2 = transformEmfPlusPoint(state, { x: x + w, y });
    const p3 = transformEmfPlusPoint(state, { x: x + w, y: y + h });
    const p4 = transformEmfPlusPoint(state, { x, y: y + h });
    return `M ${fmt(p1.x)} ${fmt(p1.y)} L ${fmt(p2.x)} ${fmt(p2.y)} L ${fmt(p3.x)} ${fmt(p3.y)} L ${fmt(p4.x)} ${fmt(p4.y)} Z`;
  }
  function transformEmfPlusPoint(state, p) {
    const world = state.world;
    const scale = state.pageScale || 1;
    return {
      x: (p.x * world.m11 + p.y * world.m21 + world.dx) * scale,
      y: (p.x * world.m12 + p.y * world.m22 + world.dy) * scale
    };
  }
  function emfPlusPenAttrs(pen, state) {
    const strokeWidth = Math.max(0.35, pen.width * approximateMatrixScale(state.world) * (state.pageScale || 1));
    const attrs = [
      `stroke="${pen.color}"`,
      `stroke-width="${fmt(strokeWidth)}"`,
      `stroke-linecap="${pen.lineCap}"`,
      `stroke-linejoin="${pen.lineJoin}"`
    ];
    if (pen.dashArray?.length)
      attrs.push(`stroke-dasharray="${pen.dashArray.map((v) => fmt(v * strokeWidth)).join(" ")}"`);
    if (pen.dashOffset && Number.isFinite(pen.dashOffset))
      attrs.push(`stroke-dashoffset="${fmt(pen.dashOffset * strokeWidth)}"`);
    return attrs.join(" ");
  }
  function emfPlusRenderingAttrs(state) {
    return state.antiAlias ? "" : ` shape-rendering="crispEdges"`;
  }
  function emfPlusBrushColor(object) {
    if (object?.type == "plusBrush")
      return object.color;
    return null;
  }
  function emfPlusLineCap(value) {
    if (value == 1)
      return "square";
    if (value == 2)
      return "round";
    return "butt";
  }
  function emfPlusLineJoin(value) {
    if (value == 1)
      return "bevel";
    if (value == 2)
      return "round";
    return "miter";
  }
  function approximateMatrixScale(matrix) {
    const sx = Math.hypot(matrix.m11, matrix.m12);
    const sy = Math.hypot(matrix.m21, matrix.m22);
    const scale = (sx + sy) / 2;
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }
  function argbToCss(argb) {
    const a = argb >>> 24 & 255;
    const r = argb >>> 16 & 255;
    const g = argb >>> 8 & 255;
    const b = argb & 255;
    if (a >= 255)
      return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a / 255))})`;
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
    const cap = style & PS_ENDCAP_MASK;
    if (cap == PS_ENDCAP_SQUARE)
      return "square";
    if (cap == PS_ENDCAP_FLAT)
      return "butt";
    return "round";
  }
  function penLineJoin(style) {
    const join = style & PS_JOIN_MASK;
    if (join == PS_JOIN_BEVEL)
      return "bevel";
    if (join == PS_JOIN_MITER)
      return "miter";
    return "round";
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
      left: view.getInt32(offset, true),
      top: view.getInt32(offset + 4, true),
      right: view.getInt32(offset + 8, true),
      bottom: view.getInt32(offset + 12, true)
    };
  }
  function inclusiveRectWidth(rect) {
    return rect.right - rect.left + 1;
  }
  function inclusiveRectHeight(rect) {
    return rect.bottom - rect.top + 1;
  }
  function readPointL(view, offset) {
    return { x: view.getInt32(offset, true), y: view.getInt32(offset + 4, true) };
  }
  function readSizeL(view, offset) {
    return readPointL(view, offset);
  }
  function emfFrameViewBoxGutterRatio(rawWidth, rawHeight, frame, device, millimeters) {
    if (!device || !millimeters || rawWidth <= 0 || rawHeight <= 0 || device.x <= 0 || device.y <= 0 || millimeters.x <= 0 || millimeters.y <= 0)
      return 0;
    const frameWidthMm = Math.max(1, inclusiveRectWidth(frame)) / 100;
    const frameHeightMm = Math.max(1, inclusiveRectHeight(frame)) / 100;
    const frameDeviceWidth = frameWidthMm * device.x / millimeters.x;
    const frameDeviceHeight = frameHeightMm * device.y / millimeters.y;
    const xSlackRatio = Math.max(0, (frameDeviceWidth - rawWidth) / (2 * rawWidth));
    const ySlackRatio = Math.max(0, (frameDeviceHeight - rawHeight) / (2 * rawHeight));
    const frameSlackRatio = Math.min(xSlackRatio, ySlackRatio);
    return Math.min(EMF_FRAME_VIEWBOX_GUTTER_RATIO_LIMIT, frameSlackRatio);
  }
  function readPointS(view, offset) {
    return { x: view.getInt16(offset, true), y: view.getInt16(offset + 2, true) };
  }
  function readXForm(view, offset) {
    return {
      m11: view.getFloat32(offset, true),
      m12: view.getFloat32(offset + 4, true),
      m21: view.getFloat32(offset + 8, true),
      m22: view.getFloat32(offset + 12, true),
      dx: view.getFloat32(offset + 16, true),
      dy: view.getFloat32(offset + 20, true)
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
    const world = state.world;
    let x = p.x * world.m11 + p.y * world.m21 + world.dx;
    let y = p.x * world.m12 + p.y * world.m22 + world.dy;
    if (state.windowExt && state.viewportExt && state.windowExt.x && state.windowExt.y) {
      x = (x - state.windowOrg.x) * state.viewportExt.x / state.windowExt.x + state.viewportOrg.x;
      y = (y - state.windowOrg.y) * state.viewportExt.y / state.windowExt.y + state.viewportOrg.y;
    }
    return { x, y };
  }
  function approximateScale(state) {
    let sx = Math.hypot(state.world.m11, state.world.m12);
    let sy = Math.hypot(state.world.m21, state.world.m22);
    if (state.windowExt && state.viewportExt && state.windowExt.x && state.windowExt.y) {
      sx *= Math.abs(state.viewportExt.x / state.windowExt.x);
      sy *= Math.abs(state.viewportExt.y / state.windowExt.y);
    }
    const scale = (sx + sy) / 2;
    return Number.isFinite(scale) && scale > 0 ? scale : 1;
  }
  function scaleExt(view, offset, current) {
    const xNum = view.getInt32(offset + 8, true);
    const xDen = view.getInt32(offset + 12, true);
    const yNum = view.getInt32(offset + 16, true);
    const yDen = view.getInt32(offset + 20, true);
    return {
      x: xDen ? current.x * xNum / xDen : current.x,
      y: yDen ? current.y * yNum / yDen : current.y
    };
  }
  function colorRefToCss(color) {
    const r = color & 255;
    const g = color >> 8 & 255;
    const b = color >> 16 & 255;
    return `#${hex2(r)}${hex2(g)}${hex2(b)}`;
  }
  function hex2(value) {
    return Math.max(0, Math.min(255, value | 0)).toString(16).padStart(2, "0");
  }
  function fmt(value) {
    if (!Number.isFinite(value))
      return "0";
    const rounded = Math.round(value * 1e3) / 1e3;
    return `${rounded}`;
  }
  function esc(value) {
    return `${value ?? ""}`.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function unesc(value) {
    return `${value ?? ""}`.replace(/&quot;/g, '"').replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
  }
  function svgMetafileMetadataAttrs(body) {
    const fonts = /* @__PURE__ */ new Set();
    const re = /\bfont-family="([^"]+)"/g;
    let match;
    while (match = re.exec(body)) {
      const family = unesc(match[1]).trim();
      if (family)
        fonts.add(family);
    }
    return fonts.size ? ` data-docx-fonts="${esc([...fonts].join(","))}"` : "";
  }
  function paintAttrs(state, fill, stroke) {
    const attrs = [];
    if (fill && !state.brush.nullBrush) {
      attrs.push(`fill="${state.brush.color}"`);
      attrs.push(`fill-rule="${state.polyFillMode == 2 ? "nonzero" : "evenodd"}"`);
    } else {
      attrs.push(`fill="none"`);
    }
    if (stroke && !state.pen.nullPen) {
      const scale = approximateScale(state);
      const strokeWidth = state.pen.width == 0 ? 1 : Math.max(0.35, state.pen.width * scale);
      attrs.push(`stroke="${state.pen.color}"`);
      attrs.push(`stroke-width="${fmt(strokeWidth)}"`);
      attrs.push(`stroke-linecap="${state.pen.lineCap || "round"}"`);
      attrs.push(`stroke-linejoin="${state.pen.lineJoin || "round"}"`);
    } else {
      attrs.push(`stroke="none"`);
    }
    return attrs.join(" ");
  }
  function emitPath(pathData, state, emit, fill, stroke) {
    if (!pathData)
      return;
    emit(`<path d="${pathData}" ${paintAttrs(state, fill, stroke)}/>`);
  }
  function emitPoly16(view, offset, closed, toCurrent, inPath, state, appendPath, emit) {
    const count = view.getUint32(offset + 24, true);
    if (!count || offset + 28 + count * 4 > view.byteLength)
      return;
    const points = [];
    for (let i = 0; i < count; i++)
      points.push(transformPoint(state, readPointS(view, offset + 28 + i * 4)));
    emitPolyline(points, closed, toCurrent, inPath, state, appendPath, emit);
  }
  function emitPoly32(view, offset, closed, toCurrent, inPath, state, appendPath, emit) {
    const count = view.getUint32(offset + 24, true);
    if (!count || offset + 28 + count * 8 > view.byteLength)
      return;
    const points = [];
    for (let i = 0; i < count; i++)
      points.push(transformPoint(state, readPointL(view, offset + 28 + i * 8)));
    emitPolyline(points, closed, toCurrent, inPath, state, appendPath, emit);
  }
  function emitPolyline(points, closed, toCurrent, inPath, state, appendPath, emit) {
    if (!points.length)
      return;
    let d = inPath && toCurrent ? "" : toCurrent ? `M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)}` : `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;
    const start = toCurrent ? 0 : 1;
    for (let i = start; i < points.length; i++)
      d += ` L ${fmt(points[i].x)} ${fmt(points[i].y)}`;
    if (closed)
      d += " Z";
    state.currentPoint = points[points.length - 1];
    if (inPath)
      appendPath(d.trim());
    else
      emit(`<path d="${d.trim()}" ${paintAttrs(state, closed, true)}/>`);
  }
  function emitBezier(view, offset, shortPoints, toCurrent, inPath, state, appendPath, emit) {
    const count = view.getUint32(offset + 24, true);
    const pointSize = shortPoints ? 4 : 8;
    if (!count || offset + 28 + count * pointSize > view.byteLength)
      return;
    const points = [];
    for (let i = 0; i < count; i++) {
      const p = shortPoints ? readPointS(view, offset + 28 + i * pointSize) : readPointL(view, offset + 28 + i * pointSize);
      points.push(transformPoint(state, p));
    }
    let d = inPath && toCurrent ? "" : toCurrent ? `M ${fmt(state.currentPoint.x)} ${fmt(state.currentPoint.y)}` : `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;
    let last = toCurrent ? state.currentPoint : points[0];
    const start = toCurrent ? 0 : 1;
    for (let i = start; i + 2 < points.length; i += 3) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2];
      d += ` C ${fmt(p1.x)} ${fmt(p1.y)} ${fmt(p2.x)} ${fmt(p2.y)} ${fmt(p3.x)} ${fmt(p3.y)}`;
      last = p3;
    }
    state.currentPoint = last;
    if (inPath)
      appendPath(d.trim());
    else
      emit(`<path d="${d.trim()}" ${paintAttrs(state, false, true)}/>`);
  }
  function emitPolyPoly(view, offset, closed, shortPoints, inPath, state, appendPath, emit) {
    const polys = view.getUint32(offset + 24, true);
    const totalPoints = view.getUint32(offset + 28, true);
    const countsOffset = offset + 32;
    const pointsOffset = countsOffset + polys * 4;
    const pointSize = shortPoints ? 4 : 8;
    if (!polys || !totalPoints || pointsOffset + totalPoints * pointSize > view.byteLength)
      return;
    let pointIndex = 0;
    for (let i = 0; i < polys; i++) {
      const count = view.getUint32(countsOffset + i * 4, true);
      if (!count || pointIndex + count > totalPoints)
        break;
      const points = [];
      for (let j = 0; j < count; j++) {
        const pointOffset = pointsOffset + (pointIndex + j) * pointSize;
        const p = shortPoints ? readPointS(view, pointOffset) : readPointL(view, pointOffset);
        points.push(transformPoint(state, p));
      }
      emitPolyline(points, closed, false, inPath, state, appendPath, emit);
      pointIndex += count;
    }
  }
  function emitPolyDraw(view, offset, shortPoints, inPath, state, appendPath, emit) {
    const count = view.getUint32(offset + 24, true);
    const pointSize = shortPoints ? 4 : 8;
    const pointsOffset = offset + 28;
    const typesOffset = pointsOffset + count * pointSize;
    if (!count || typesOffset + count > view.byteLength)
      return;
    const points = [];
    for (let i2 = 0; i2 < count; i2++) {
      const pointOffset = pointsOffset + i2 * pointSize;
      const p = shortPoints ? readPointS(view, pointOffset) : readPointL(view, pointOffset);
      points.push(transformPoint(state, p));
    }
    let d = "";
    let i = 0;
    while (i < count) {
      const t = view.getUint8(typesOffset + i);
      const op = t & 6;
      if (op == 6) {
        d += ` M ${fmt(points[i].x)} ${fmt(points[i].y)}`;
        state.currentPoint = points[i];
        i++;
      } else if (op == 2) {
        d += ` L ${fmt(points[i].x)} ${fmt(points[i].y)}`;
        state.currentPoint = points[i];
        i++;
      } else if (op == 4 && i + 2 < count) {
        d += ` C ${fmt(points[i].x)} ${fmt(points[i].y)} ${fmt(points[i + 1].x)} ${fmt(points[i + 1].y)} ${fmt(points[i + 2].x)} ${fmt(points[i + 2].y)}`;
        state.currentPoint = points[i + 2];
        i += 3;
      } else {
        i++;
      }
      if (t & 1)
        d += " Z";
    }
    d = d.trim();
    if (!d)
      return;
    if (inPath)
      appendPath(d);
    else
      emit(`<path d="${d}" ${paintAttrs(state, false, true)}/>`);
  }
  function emitRect(view, offset, state, emit, rounded) {
    const r = readRectL(view, offset + 8);
    const p1 = transformPoint(state, { x: r.left, y: r.top });
    const p2 = transformPoint(state, { x: r.right, y: r.bottom });
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p2.x - p1.x);
    const h = Math.abs(p2.y - p1.y);
    const radius = rounded ? ` rx="${fmt(Math.min(w, h) / 8)}" ry="${fmt(Math.min(w, h) / 8)}"` : "";
    emit(`<rect x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}"${radius} ${paintAttrs(state, true, true)}/>`);
  }
  function emitEllipse(view, offset, state, emit) {
    const r = readRectL(view, offset + 8);
    const p1 = transformPoint(state, { x: r.left, y: r.top });
    const p2 = transformPoint(state, { x: r.right, y: r.bottom });
    const cx = (p1.x + p2.x) / 2;
    const cy = (p1.y + p2.y) / 2;
    const rx = Math.abs(p2.x - p1.x) / 2;
    const ry = Math.abs(p2.y - p1.y) / 2;
    emit(`<ellipse cx="${fmt(cx)}" cy="${fmt(cy)}" rx="${fmt(rx)}" ry="${fmt(ry)}" ${paintAttrs(state, true, true)}/>`);
  }
  function emitArcLike(view, offset, type, inPath, state, appendPath, emit) {
    const r = readRectL(view, offset + 8);
    const startRef = readPointL(view, offset + 24);
    const endRef = readPointL(view, offset + 32);
    const cx = (r.left + r.right) / 2;
    const cy = (r.top + r.bottom) / 2;
    const rxRaw = Math.abs(r.right - r.left) / 2;
    const ryRaw = Math.abs(r.bottom - r.top) / 2;
    if (!rxRaw || !ryRaw)
      return;
    const startAngle = Math.atan2(startRef.y - cy, startRef.x - cx);
    let endAngle = Math.atan2(endRef.y - cy, endRef.x - cx);
    let delta = endAngle - startAngle;
    if (delta <= 0)
      delta += Math.PI * 2;
    const largeArc = delta > Math.PI ? 1 : 0;
    const pStart = transformPoint(state, { x: cx + Math.cos(startAngle) * rxRaw, y: cy + Math.sin(startAngle) * ryRaw });
    const pEnd = transformPoint(state, { x: cx + Math.cos(endAngle) * rxRaw, y: cy + Math.sin(endAngle) * ryRaw });
    const pCenter = transformPoint(state, { x: cx, y: cy });
    const pRx = transformPoint(state, { x: cx + rxRaw, y: cy });
    const pRy = transformPoint(state, { x: cx, y: cy + ryRaw });
    const rx = Math.max(0.01, Math.abs(pRx.x - pCenter.x) || Math.abs(pRy.x - pCenter.x));
    const ry = Math.max(0.01, Math.abs(pRy.y - pCenter.y) || Math.abs(pRx.y - pCenter.y));
    const arc = `A ${fmt(rx)} ${fmt(ry)} 0 ${largeArc} 1 ${fmt(pEnd.x)} ${fmt(pEnd.y)}`;
    let d = `M ${fmt(pStart.x)} ${fmt(pStart.y)} ${arc}`;
    let fill = false;
    let stroke = true;
    if (type == EMR.CHORD) {
      d += " Z";
      fill = true;
    } else if (type == EMR.PIE) {
      d += ` L ${fmt(pCenter.x)} ${fmt(pCenter.y)} Z`;
      fill = true;
    }
    if (type == EMR.ARCTO)
      state.currentPoint = pEnd;
    if (inPath)
      appendPath(d);
    else
      emit(`<path d="${d}" ${paintAttrs(state, fill, stroke)}/>`);
  }
  function parseFont2(view, offset, available) {
    const height = available >= 4 ? view.getInt32(offset, true) : 12;
    const weight = available >= 20 ? view.getInt32(offset + 16, true) : 400;
    const italic = available >= 21 ? view.getUint8(offset + 20) != 0 : false;
    const underline = available >= 22 ? view.getUint8(offset + 21) != 0 : false;
    let family = "";
    const faceOffset = offset + 28;
    const faceBytes = Math.max(0, Math.min(64, available - 28));
    for (let i = 0; i + 1 < faceBytes; i += 2) {
      const code = view.getUint16(faceOffset + i, true);
      if (!code)
        break;
      family += String.fromCharCode(code);
    }
    return { type: "font", family, size: Math.abs(height) || 12, weight, italic, underline };
  }
  function emitExtTextOut(view, offset, size, state, emit, unicode) {
    if (size < 76)
      return;
    const rawRef = readPointL(view, offset + 36);
    const ref = transformPoint(state, rawRef);
    const chars = view.getUint32(offset + 44, true);
    const offString = view.getUint32(offset + 48, true);
    if (!chars || offString <= 0)
      return;
    const bytesPerChar = unicode ? 2 : 1;
    if (offString + chars * bytesPerChar > size)
      return;
    const text = unicode ? decodeUtf16(view, offset + offString, chars) : decodeAnsi(new Uint8Array(view.buffer, view.byteOffset + offset + offString, chars));
    const dx = readTextDx(view, offset, size, chars, 72);
    emitText(text, ref, state, emit, rawRef, dx);
  }
  function emitPolyTextOut(view, offset, size, state, emit, unicode) {
    if (size < 40)
      return;
    const count = view.getUint32(offset + 36, true);
    let textOffset = offset + 40;
    for (let i = 0; i < count && textOffset + 40 <= offset + size; i++, textOffset += 40) {
      const rawRef = readPointL(view, textOffset);
      const ref = transformPoint(state, rawRef);
      const chars = view.getUint32(textOffset + 8, true);
      const offString = view.getUint32(textOffset + 12, true);
      const bytesPerChar = unicode ? 2 : 1;
      if (!chars || !offString || offString + chars * bytesPerChar > size)
        continue;
      const text = unicode ? decodeUtf16(view, offset + offString, chars) : decodeAnsi(new Uint8Array(view.buffer, view.byteOffset + offset + offString, chars));
      const dx = readTextDx(view, offset, size, chars, textOffset + 36 - offset);
      emitText(text, ref, state, emit, rawRef, dx);
    }
  }
  function emitSmallTextOut(view, offset, size, state, emit) {
    if (size < 36)
      return;
    const ref = transformPoint(state, readPointL(view, offset + 8));
    const chars = view.getUint32(offset + 16, true);
    const flags = view.getUint32(offset + 20, true);
    const textOffset = flags & 512 ? 40 : 28;
    if (!chars || textOffset + chars > size)
      return;
    const text = decodeAnsi(new Uint8Array(view.buffer, view.byteOffset + offset + textOffset, chars));
    emitText(text, ref, state, emit);
  }
  function readTextDx(view, recordOffset, recordSize, chars, offDxFieldOffset) {
    if (!chars || offDxFieldOffset + 4 > recordSize)
      return null;
    const offDx = view.getUint32(recordOffset + offDxFieldOffset, true);
    if (!offDx || offDx + chars * 4 > recordSize)
      return null;
    const dx = [];
    for (let i = 0; i < chars; i++)
      dx.push(view.getUint32(recordOffset + offDx + i * 4, true));
    return dx;
  }
  function decodeUtf16(view, offset, chars) {
    let text = "";
    for (let i = 0; i < chars; i++) {
      const code = view.getUint16(offset + i * 2, true);
      if (code)
        text += String.fromCharCode(code);
    }
    return text;
  }
  function decodeAnsi(bytes) {
    if (!bytes.length)
      return "";
    const decoder = globalThis.TextDecoder;
    if (decoder) {
      try {
        return new decoder("gb18030").decode(bytes).replace(/\0+$/g, "");
      } catch {
        try {
          return new decoder("windows-1252").decode(bytes).replace(/\0+$/g, "");
        } catch {
        }
      }
    }
    let text = "";
    for (const b of bytes) {
      if (b)
        text += String.fromCharCode(b);
    }
    return text;
  }
  function textAttrs(state, ref) {
    const font = state.font;
    const fontSize = Math.max(1, (font?.size ?? 12) * approximateScale(state));
    const attrs = [
      `x="${fmt(ref.x)}"`,
      `y="${fmt(ref.y)}"`,
      `fill="${state.textColor}"`,
      `font-size="${fmt(fontSize)}"`,
      font?.family ? `font-family="${esc(font.family)}"` : "",
      font?.weight ? `font-weight="${font.weight >= 600 ? "bold" : "normal"}"` : "",
      font?.italic ? `font-style="italic"` : "",
      font?.underline ? `text-decoration="underline"` : "",
      textAnchorAttr(state),
      baselineAttr(state)
    ].filter(Boolean).join(" ");
    return attrs;
  }
  function textAnchorAttr(state) {
    const horizontal = state.textAlign & 6;
    if (horizontal == 6)
      return `text-anchor="middle"`;
    if (horizontal == 2)
      return `text-anchor="end"`;
    return "";
  }
  function baselineAttr(state) {
    const vertical = state.textAlign & 24;
    if (vertical == 0)
      return `dominant-baseline="text-before-edge"`;
    if (vertical == 8)
      return `dominant-baseline="text-after-edge"`;
    return "";
  }
  function canUseExplicitTextOrigins(state, text, dx) {
    if (!dx || dx.length < text.length)
      return false;
    const horizontal = state.textAlign & 6;
    return horizontal == 0;
  }
  function emitText(text, ref, state, emit, rawRef, dx) {
    if (!text)
      return;
    if (rawRef && canUseExplicitTextOrigins(state, text, dx)) {
      let advance = 0;
      let tspans = "";
      for (let i = 0; i < text.length; i++) {
        const p = transformPoint(state, { x: rawRef.x + advance, y: rawRef.y });
        tspans += `<tspan x="${fmt(p.x)}" y="${fmt(p.y)}">${esc(text[i])}</tspan>`;
        advance += dx[i] || 0;
      }
      emit(`<text ${textAttrs(state, ref)}>${tspans}</text>`);
      return;
    }
    emit(`<text ${textAttrs(state, ref)}>${esc(text)}</text>`);
  }
  function emitPixel(view, offset, state, emit) {
    if (offset + 20 > view.byteLength)
      return;
    const p = transformPoint(state, readPointL(view, offset + 8));
    const color = colorRefToCss(view.getUint32(offset + 16, true));
    emit(`<rect x="${fmt(p.x)}" y="${fmt(p.y)}" width="1" height="1" fill="${color}" stroke="none"/>`);
  }
  function emitBitmapRecord(view, offset, size, type, state, emit) {
    let xDest = 0;
    let yDest = 0;
    let cxDest = 0;
    let cyDest = 0;
    let offBmi = 0;
    let cbBmi = 0;
    let offBits = 0;
    let cbBits = 0;
    let rop = 0;
    if (type == EMR.STRETCHDIBITS) {
      if (size < 80)
        return;
      xDest = view.getInt32(offset + 24, true);
      yDest = view.getInt32(offset + 28, true);
      offBmi = view.getUint32(offset + 48, true);
      cbBmi = view.getUint32(offset + 52, true);
      offBits = view.getUint32(offset + 56, true);
      cbBits = view.getUint32(offset + 60, true);
      rop = view.getUint32(offset + 68, true);
      cxDest = view.getInt32(offset + 72, true);
      cyDest = view.getInt32(offset + 76, true);
    } else {
      if (size < 100)
        return;
      xDest = view.getInt32(offset + 24, true);
      yDest = view.getInt32(offset + 28, true);
      cxDest = view.getInt32(offset + 32, true);
      cyDest = view.getInt32(offset + 36, true);
      offBmi = view.getUint32(offset + 84, true);
      cbBmi = view.getUint32(offset + 88, true);
      offBits = view.getUint32(offset + 92, true);
      cbBits = view.getUint32(offset + 96, true);
      rop = size >= 84 ? view.getUint32(offset + 80, true) : 0;
    }
    if (!offBmi || !cbBmi || !offBits || !cbBits || offBmi + cbBmi > size || offBits + cbBits > size)
      return;
    if ((rop == ROP_SRCAND || rop == ROP_SRCPAINT) && isMonochromeDib(view, offset, offBmi, cbBmi))
      return;
    const imageUrl = dibToImageDataUrl(view, offset, offBmi, cbBmi, offBits, cbBits, rop);
    if (!imageUrl)
      return;
    const p1 = transformPoint(state, { x: xDest, y: yDest });
    const p2 = transformPoint(state, { x: xDest + cxDest, y: yDest + cyDest });
    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p2.x - p1.x);
    const h = Math.abs(p2.y - p1.y);
    emit(`<image x="${fmt(x)}" y="${fmt(y)}" width="${fmt(w)}" height="${fmt(h)}" href="${imageUrl}" preserveAspectRatio="none"/>`);
  }
  function dibToImageDataUrl(view, recordOffset, offBmi, cbBmi, offBits, cbBits, rop) {
    const bmiStart = recordOffset + offBmi;
    const bitsStart = recordOffset + offBits;
    if (cbBmi < 4 || bmiStart + cbBmi > view.byteLength || bitsStart + cbBits > view.byteLength)
      return null;
    const headerSize = view.getUint32(bmiStart, true);
    const compression = headerSize >= 40 && cbBmi >= 20 ? view.getUint32(bmiStart + 16, true) : 0;
    const bits = new Uint8Array(view.buffer, view.byteOffset + bitsStart, cbBits);
    if (compression == 4)
      return `data:image/jpeg;base64,${base64(bits)}`;
    if (compression == 5)
      return `data:image/png;base64,${base64(bits)}`;
    const png = dibToPngDataUrl(view, bmiStart, cbBmi, bitsStart, cbBits, rop);
    if (png)
      return png;
    const dib = new Uint8Array(cbBmi + cbBits);
    dib.set(new Uint8Array(view.buffer, view.byteOffset + bmiStart, cbBmi), 0);
    dib.set(bits, cbBmi);
    return dibToBmpDataUrl(dib, cbBmi);
  }
  function isMonochromeDib(view, recordOffset, offBmi, cbBmi) {
    const bmiStart = recordOffset + offBmi;
    if (cbBmi < 16 || bmiStart + cbBmi > view.byteLength)
      return false;
    const headerSize = view.getUint32(bmiStart, true);
    if (headerSize >= 40 && cbBmi >= 16)
      return view.getUint16(bmiStart + 14, true) == 1;
    if (headerSize == 12 && cbBmi >= 10)
      return view.getUint16(bmiStart + 10, true) == 1;
    return false;
  }
  function dibToPngDataUrl(view, bmiStart, cbBmi, bitsStart, cbBits, rop) {
    try {
      const info = readDibInfo(view, bmiStart, cbBmi);
      if (!info || !isReasonableRasterDimensions(info.width, info.height) || info.width * info.height > DIB_TO_PNG_MAX_PIXELS)
        return null;
      const stride = Math.floor((info.width * info.bitCount + 31) / 32) * 4;
      if (stride <= 0 || stride * info.height > cbBits)
        return null;
      const rgba = new Uint8Array(info.width * info.height * 4);
      for (let y = 0; y < info.height; y++) {
        const sourceY = info.bottomUp ? info.height - 1 - y : y;
        const row = bitsStart + sourceY * stride;
        for (let x = 0; x < info.width; x++) {
          const out = (y * info.width + x) * 4;
          writeDibPixel(view, row, x, info, rgba, out);
          if (rop == ROP_SRCAND && isRgbNearWhite(rgba[out], rgba[out + 1], rgba[out + 2]))
            rgba[out + 3] = 0;
        }
      }
      const encoded = UPNG.encode([rgba.buffer], info.width, info.height, 0);
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
    const headerSize = view.getUint32(bmiStart, true);
    if (headerSize == 12) {
      const width2 = view.getUint16(bmiStart + 4, true);
      const rawHeight2 = view.getUint16(bmiStart + 6, true);
      const bitCount2 = view.getUint16(bmiStart + 10, true);
      const palette2 = readDibPalette(view, bmiStart + headerSize, cbBmi - headerSize, bitCount2, 3, 0);
      return { width: width2, height: rawHeight2, bitCount: bitCount2, bottomUp: true, palette: palette2, redMask: 0, greenMask: 0, blueMask: 0, alphaMask: 0 };
    }
    if (headerSize < 40 || cbBmi < headerSize || bmiStart + headerSize > view.byteLength)
      return null;
    const width = view.getInt32(bmiStart + 4, true);
    const rawHeight = view.getInt32(bmiStart + 8, true);
    const bitCount = view.getUint16(bmiStart + 14, true);
    const compression = view.getUint32(bmiStart + 16, true);
    const clrUsed = view.getUint32(bmiStart + 32, true);
    let maskOffset = bmiStart + headerSize;
    let redMask = bitCount == 16 ? 31744 : 16711680;
    let greenMask = bitCount == 16 ? 992 : 65280;
    let blueMask = bitCount == 16 ? 31 : 255;
    let alphaMask = bitCount == 32 ? 4278190080 : 0;
    if (compression == 3 && headerSize == 40 && cbBmi >= 52) {
      redMask = view.getUint32(maskOffset, true);
      greenMask = view.getUint32(maskOffset + 4, true);
      blueMask = view.getUint32(maskOffset + 8, true);
      maskOffset += 12;
      if (cbBmi >= 56) {
        alphaMask = view.getUint32(maskOffset, true);
        maskOffset += 4;
      }
    }
    const paletteOffset = headerSize == 40 && compression == 3 ? maskOffset : bmiStart + headerSize;
    const palette = readDibPalette(view, paletteOffset, Math.max(0, bmiStart + cbBmi - paletteOffset), bitCount, 4, clrUsed);
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
    const maxColors = Math.min(clrUsed || 1 << bitCount, Math.floor(availableBytes / entryBytes));
    const palette = [];
    for (let i = 0; i < maxColors; i++) {
      const p = offset + i * entryBytes;
      if (entryBytes == 3)
        palette.push([view.getUint8(p + 2), view.getUint8(p + 1), view.getUint8(p), 255]);
      else
        palette.push([view.getUint8(p + 2), view.getUint8(p + 1), view.getUint8(p), 255]);
    }
    return palette;
  }
  function writeDibPixel(view, row, x, info, rgba, out) {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 255;
    if (info.bitCount == 1) {
      const index = view.getUint8(row + (x >> 3)) >> 7 - (x & 7) & 1;
      [r, g, b, a] = dibPaletteColor(info, index);
    } else if (info.bitCount == 4) {
      const value = view.getUint8(row + (x >> 1));
      const index = x & 1 ? value & 15 : value >> 4;
      [r, g, b, a] = dibPaletteColor(info, index);
    } else if (info.bitCount == 8) {
      [r, g, b, a] = dibPaletteColor(info, view.getUint8(row + x));
    } else if (info.bitCount == 16) {
      const value = view.getUint16(row + x * 2, true);
      r = scaleMaskedColor(value, info.redMask);
      g = scaleMaskedColor(value, info.greenMask);
      b = scaleMaskedColor(value, info.blueMask);
    } else if (info.bitCount == 24) {
      b = view.getUint8(row + x * 3);
      g = view.getUint8(row + x * 3 + 1);
      r = view.getUint8(row + x * 3 + 2);
    } else if (info.bitCount == 32) {
      const value = view.getUint32(row + x * 4, true);
      r = scaleMaskedColor(value, info.redMask);
      g = scaleMaskedColor(value, info.greenMask);
      b = scaleMaskedColor(value, info.blueMask);
      a = info.alphaMask ? scaleMaskedColor(value, info.alphaMask) : 255;
    }
    rgba[out] = r;
    rgba[out + 1] = g;
    rgba[out + 2] = b;
    rgba[out + 3] = a;
  }
  function dibPaletteColor(info, index) {
    return info.palette[index] ?? [index, index, index, 255];
  }
  function scaleMaskedColor(value, mask) {
    if (!mask)
      return 0;
    let shift = 0;
    let m = mask >>> 0;
    while (m && !(m & 1)) {
      m >>>= 1;
      shift++;
    }
    const max = m || 1;
    return Math.round(((value & mask) >>> shift) * 255 / max);
  }
  function dibToBmpDataUrl(dib, headerBytes) {
    if (!dib?.length || headerBytes <= 0 || headerBytes > dib.length)
      return null;
    const fileHeaderSize = 14;
    const fileSize = fileHeaderSize + dib.length;
    const pixelOffset = fileHeaderSize + headerBytes;
    const out = new Uint8Array(fileSize);
    out[0] = 66;
    out[1] = 77;
    writeU322(out, 2, fileSize);
    writeU322(out, 10, pixelOffset);
    out.set(dib, fileHeaderSize);
    return `data:image/bmp;base64,${base64(out)}`;
  }
  function emitEmbeddedRasterFallback(data, bounds) {
    const url = findEmbeddedRasterDataUrl(data);
    if (!url)
      return [];
    const width = Math.max(1, bounds.right - bounds.left);
    const height = Math.max(1, bounds.bottom - bounds.top);
    return [`<image x="${fmt(bounds.left)}" y="${fmt(bounds.top)}" width="${fmt(width)}" height="${fmt(height)}" href="${url}" preserveAspectRatio="xMidYMid meet"/>`];
  }
  function extractEmbeddedRasterDataUrl(data, options = {}) {
    const candidate = findBestEmbeddedRasterCandidate(data, options);
    return candidate ? `data:${candidate.mime};base64,${base64(candidate.data)}` : null;
  }
  function findEmbeddedRasterDataUrl(data) {
    return extractEmbeddedRasterDataUrl(data);
  }
  function findBestEmbeddedRasterCandidate(data, options = {}) {
    let best = null;
    const consider = (candidate) => {
      if (!candidate || !embeddedRasterCandidateAllowed(candidate, options))
        return;
      if (!best || compareEmbeddedRasterCandidates(candidate, best) > 0)
        best = candidate;
    };
    findPngCandidates(data, consider);
    findJpegCandidates(data, consider);
    findBmpCandidates(data, consider);
    return best;
  }
  function embeddedRasterCandidateAllowed(candidate, options) {
    if (!isReasonableRasterDimensions(candidate.width, candidate.height))
      return false;
    if (options.minWidth && candidate.width < options.minWidth)
      return false;
    if (options.minHeight && candidate.height < options.minHeight)
      return false;
    if (options.minArea && candidate.width * candidate.height < options.minArea)
      return false;
    return candidate.bytes > 0;
  }
  function compareEmbeddedRasterCandidates(a, b) {
    const area = a.width * a.height - b.width * b.height;
    if (area)
      return area;
    return a.bytes - b.bytes;
  }
  function isReasonableRasterDimensions(width, height) {
    return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0 && width <= 16384 && height <= 16384;
  }
  function findPngCandidates(data, emit) {
    const sig = [137, 80, 78, 71, 13, 10, 26, 10];
    for (let i = 0; i + sig.length + 12 <= data.length; i++) {
      if (!startsWith(data, sig, i))
        continue;
      let p = i + 8;
      let lastValidEnd = p;
      let hasIhdr = false;
      let hasIdat = false;
      let hasIend = false;
      let width = 0;
      let height = 0;
      while (p + 12 <= data.length) {
        const len = readU32BE(data, p);
        if (!isPngChunkType(data, p + 4) || p + 12 + len > data.length)
          break;
        const type = String.fromCharCode(data[p + 4], data[p + 5], data[p + 6], data[p + 7]);
        if (type == "IHDR" && len >= 8) {
          width = readU32BE(data, p + 8);
          height = readU32BE(data, p + 12);
        }
        p += 12 + len;
        lastValidEnd = p;
        if (type == "IHDR")
          hasIhdr = true;
        else if (type == "IDAT")
          hasIdat = true;
        if (type == "IEND") {
          hasIend = true;
          emit({ mime: "image/png", data: data.subarray(i, p), width, height, bytes: p - i });
          break;
        }
      }
      if (!hasIend && hasIhdr && hasIdat && lastValidEnd > i + 8)
        emit({ mime: "image/png", data: appendPngIend(data.subarray(i, lastValidEnd)), width, height, bytes: lastValidEnd - i });
    }
  }
  function isPngChunkType(data, offset) {
    if (offset + 4 > data.length)
      return false;
    for (let i = 0; i < 4; i++) {
      const c = data[offset + i];
      if (!(c >= 65 && c <= 90 || c >= 97 && c <= 122))
        return false;
    }
    return true;
  }
  function appendPngIend(data) {
    const iend = new Uint8Array([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);
    const out = new Uint8Array(data.length + iend.length);
    out.set(data, 0);
    out.set(iend, data.length);
    return out;
  }
  function findJpegCandidates(data, emit) {
    for (let i = 0; i + 4 < data.length; i++) {
      if (data[i] != 255 || data[i + 1] != 216 || data[i + 2] != 255)
        continue;
      let width = 0;
      let height = 0;
      for (let j = i + 4; j + 1 < data.length; j++) {
        if (data[j] == 255 && data[j + 1] == 217) {
          emit({ mime: "image/jpeg", data: data.subarray(i, j + 2), width, height, bytes: j + 2 - i });
          break;
        }
        if (data[j] != 255 || j + 4 >= data.length)
          continue;
        const marker = data[j + 1];
        if (marker == 218)
          continue;
        const len = data[j + 2] << 8 | data[j + 3];
        if (len < 2 || j + 2 + len > data.length)
          continue;
        if ((marker >= 192 && marker <= 195 || marker >= 197 && marker <= 199 || marker >= 201 && marker <= 203 || marker >= 205 && marker <= 207) && len >= 7) {
          height = data[j + 5] << 8 | data[j + 6];
          width = data[j + 7] << 8 | data[j + 8];
        }
      }
    }
  }
  function findBmpCandidates(data, emit) {
    for (let i = 0; i + 14 < data.length; i++) {
      if (data[i] != 66 || data[i + 1] != 77)
        continue;
      const fileSize = readU32LE(data, i + 2);
      if (fileSize <= 14 || i + fileSize > data.length)
        continue;
      const dibOffset = i + 14;
      const headerSize = dibOffset + 4 <= data.length ? readU32LE(data, dibOffset) : 0;
      if (headerSize < 12 || dibOffset + headerSize > data.length)
        continue;
      const width = headerSize >= 40 ? Math.abs(readS32LE(data, dibOffset + 4)) : readU16LE(data, dibOffset + 4);
      const height = headerSize >= 40 ? Math.abs(readS32LE(data, dibOffset + 8)) : readU16LE(data, dibOffset + 6);
      emit({ mime: "image/bmp", data: data.subarray(i, i + fileSize), width, height, bytes: fileSize });
    }
  }
  function startsWith(data, sig, offset) {
    for (let i = 0; i < sig.length; i++) {
      if (data[offset + i] != sig[i])
        return false;
    }
    return true;
  }
  function readU32BE(data, offset) {
    return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
  }
  function readU32LE(data, offset) {
    return (data[offset] | data[offset + 1] << 8 | data[offset + 2] << 16 | data[offset + 3] << 24) >>> 0;
  }
  function readS32LE(data, offset) {
    const value = readU32LE(data, offset);
    return value > 2147483647 ? value - 4294967296 : value;
  }
  function readU16LE(data, offset) {
    return (data[offset] | data[offset + 1] << 8) >>> 0;
  }
  function readI16LE(data, offset) {
    const value = readU16LE(data, offset);
    return value > 32767 ? value - 65536 : value;
  }
  function writeU322(out, offset, value) {
    out[offset] = value & 255;
    out[offset + 1] = value >> 8 & 255;
    out[offset + 2] = value >> 16 & 255;
    out[offset + 3] = value >> 24 & 255;
  }
  function base64(bytes) {
    let binary = "";
    const chunk = 32768;
    for (let i = 0; i < bytes.length; i += chunk)
      binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    if (typeof btoa == "function")
      return btoa(binary);
    const buffer = globalThis.Buffer;
    if (buffer)
      return buffer.from(bytes).toString("base64");
    return binary;
  }
  function emptySvg(width, height, viewLeft, viewTop, physicalWidth, physicalHeight, message) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${fmt(physicalWidth)}mm" height="${fmt(physicalHeight)}mm" viewBox="${fmt(viewLeft)} ${fmt(viewTop)} ${fmt(width)} ${fmt(height)}" preserveAspectRatio="xMidYMid meet" data-docx-metafile="emf"><rect x="${fmt(viewLeft)}" y="${fmt(viewTop)}" width="${fmt(width)}" height="${fmt(height)}" fill="none" stroke="#999" stroke-width="1"/><text x="${fmt(viewLeft + width / 2)}" y="${fmt(viewTop + height / 2)}" text-anchor="middle" font-size="12" fill="#666">${esc(message)}</text></svg>`;
  }

  // src/model/word-document.ts
  var UTIF = __toESM(require_UTIF());
  var UPNG2 = __toESM(require_UPNG());
  var EMF_FULL_VECTOR_INPUT_LIMIT = 32 * 1024 * 1024;
  var EMF_EMBEDDED_VECTOR_INPUT_LIMIT = 96 * 1024 * 1024;
  var EMF_FULL_VECTOR_DATA_URL_LIMIT = 16 * 1024 * 1024;
  var EMF_FULL_VECTOR_BLOB_URL_LIMIT = 128 * 1024 * 1024;
  var EMF_LARGE_RASTER_PREVIEW_MIN_AREA = 128 * 1024;
  var topLevelRels = [
    { type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */, target: "word/document.xml" },
    { type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" /* ExtendedProperties */, target: "docProps/app.xml" },
    { type: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" /* CoreProperties */, target: "docProps/core.xml" },
    { type: "http://schemas.openxmlformats.org/package/2006/relationships/metadata/custom-properties" /* CustomProperties */, target: "docProps/custom.xml" }
  ];
  var WordDocument = class _WordDocument {
    constructor() {
      this.parts = [];
      this.partsMap = {};
      this.contentTypes = [];
      this._snapshotAssetDataUrls = null;
      this._snapshotTextParts = null;
      this._partLoadPromises = {};
    }
    static fromSnapshot(snapshot, options) {
      const d = new _WordDocument();
      d._options = options;
      d.rels = snapshot.rels ?? [];
      d.contentTypes = snapshot.contentTypes ?? [];
      d.parts = [];
      d.partsMap = {};
      d._snapshotAssetDataUrls = snapshot.assetDataUrls ?? {};
      d._snapshotTextParts = snapshot.textParts ?? {};
      d._package = {
        load: (path) => Promise.resolve(d._snapshotTextParts?.[normalizeSnapshotPath(path)] ?? null),
        parseXmlDocument: (txt) => parseXmlString(txt, options?.trimXmlDeclaration ?? true),
        get: (path) => d._snapshotTextParts?.[normalizeSnapshotPath(path)] != null ? {} : null
      };
      for (const partSnapshot of snapshot.parts ?? []) {
        const part = d.restoreSnapshotPart(partSnapshot);
        if (!part)
          continue;
        d.parts.push(part);
        d.partsMap[part.path] = part;
      }
      return d;
    }
    static async load(blob, parser, options) {
      var d = new _WordDocument();
      d._options = options;
      d._parser = parser;
      d._package = await OpenXmlPackage.load(blob, options);
      d.rels = await d._package.loadRelationships();
      d.contentTypes = await d._package.loadContentTypes();
      const officeRel = d.rels.find((x) => x.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */) ?? topLevelRels.find((x) => x.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */);
      await Promise.all(topLevelRels.filter((rel) => rel.type !== "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" /* OfficeDocument */).map((rel) => {
        const r = d.rels.find((x) => x.type === rel.type) ?? rel;
        return d.loadRelationshipPart(r.target, r.type);
      }));
      if (officeRel) {
        await d.preloadThemeForDocumentPart(officeRel.target);
        await d.loadRelationshipPart(officeRel.target, officeRel.type);
      }
      return d;
    }
    restoreSnapshotPart(snapshot) {
      const part = {
        path: snapshot.path,
        rels: snapshot.rels ?? []
      };
      Object.assign(part, snapshot.data ?? {});
      switch (snapshot.kind) {
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
          part.commentMap = keyBy(part.comments ?? [], (x) => x.id);
          this.commentsPart = part;
          break;
        case "commentsExtended":
          part.commentMap = keyBy(part.comments ?? [], (x) => x.paraId);
          this.commentsExtendedPart = part;
          break;
      }
      return part;
    }
    async createSnapshot() {
      const snapshot = {
        rels: this.rels ?? [],
        contentTypes: this.contentTypes ?? [],
        parts: this.parts.map((p) => this.snapshotPart(p)).filter(Boolean),
        assetDataUrls: {},
        textParts: {}
      };
      await this.preloadSnapshotRelationshipTargets(snapshot);
      return snapshot;
    }
    snapshotPart(part) {
      const anyPart = part;
      let kind = "part";
      let data = {};
      if (part === this.documentPart) {
        kind = "document";
        data = { body: anyPart.body };
      } else if (part === this.fontTablePart) {
        kind = "fontTable";
        data = { fonts: anyPart.fonts };
      } else if (part === this.numberingPart) {
        kind = "numbering";
        data = { numberings: anyPart.numberings, abstractNumberings: anyPart.abstractNumberings, bulletPictures: anyPart.bulletPictures, domNumberings: anyPart.domNumberings };
      } else if (part === this.stylesPart) {
        kind = "styles";
        data = { styles: anyPart.styles };
      } else if (part === this.themePart) {
        kind = "theme";
        data = { theme: anyPart.theme };
      } else if (part === this.footnotesPart) {
        kind = "footnotes";
        data = { notes: anyPart.notes };
      } else if (part === this.endnotesPart) {
        kind = "endnotes";
        data = { notes: anyPart.notes };
      } else if (part === this.corePropsPart) {
        kind = "coreProps";
        data = { props: anyPart.props };
      } else if (part === this.extendedPropsPart) {
        kind = "extendedProps";
        data = { props: anyPart.props };
      } else if (part === this.settingsPart) {
        kind = "settings";
        data = { settings: anyPart.settings };
      } else if (part === this.commentsPart) {
        kind = "comments";
        data = { comments: anyPart.comments };
      } else if (part === this.commentsExtendedPart) {
        kind = "commentsExtended";
        data = { comments: anyPart.comments };
      } else if (anyPart.rootElement) {
        kind = anyPart.rootElement.type === "header" ? "header" : "footer";
        data = { rootElement: anyPart.rootElement };
      } else return null;
      return { kind, path: part.path, rels: part.rels ?? [], data };
    }
    async preloadSnapshotRelationshipTargets(snapshot) {
      const seen = /* @__PURE__ */ new Set();
      const collect = (part) => {
        for (const rel of part?.rels ?? []) {
          if (!rel || rel.targetMode === "External")
            continue;
          const path = normalizeSnapshotPath(this.resolveRelationshipTarget(part, rel));
          if (!path || seen.has(path))
            continue;
          seen.add(path);
        }
      };
      for (const part of this.parts)
        collect(part);
      const concurrency = Math.max(1, Number(this._options?.snapshotPreloadConcurrency) || 6);
      await eachLimit([...seen], concurrency, async (path) => {
        if (this.partsMap[path])
          return;
        const lower = path.toLowerCase();
        const isXmlLike = /\.(xml|rels|html?|txt)$/i.test(lower);
        try {
          if (isXmlLike) {
            const text = await this._package.load(path, "string");
            if (text != null)
              snapshot.textParts[path] = text;
          } else {
            const url = await this.loadPackageAssetDataUrl(path);
            if (url)
              snapshot.assetDataUrls[path] = url;
          }
        } catch (e) {
          if (this._options?.debug)
            console.warn(`docx-viewer: unable to preload relationship target ${path}`, e);
        }
      });
    }
    blobWithContentType(blob, path) {
      if (!blob)
        return null;
      if (path) {
        const ct = this.contentTypes.find((x) => x.partName === path || x.extension && path.endsWith(`.${x.extension}`));
        return ct ? new Blob([blob], { type: ct.contentType }) : blob;
      }
      return blob;
    }
    save(type = "blob") {
      return this._package.save(type);
    }
    async loadRelationshipPart(path, type) {
      const pending = this._partLoadPromises[path];
      if (pending)
        return pending;
      if (this.partsMap[path])
        return this.partsMap[path];
      const promise = this.loadRelationshipPartOnce(path, type);
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
      const rels = await this._package.loadRelationships(path) ?? [];
      const themeRel = rels.find((rel) => rel.type === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" /* Theme */ && rel.targetMode !== "External");
      if (!themeRel)
        return;
      const [folder] = splitPath(path);
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
      this.partsMap[path] = part;
      this.parts.push(part);
      await part.load();
      if (part === this.themePart)
        this._parser?.setTheme?.(part.theme);
      if (part.rels?.length > 0) {
        const [folder] = splitPath(part.path);
        await Promise.all(part.rels.filter((rel) => rel.targetMode !== "External").map((rel) => this.loadRelationshipPart(resolvePath(rel.target, folder), rel.type)));
      }
      return part;
    }
    async loadRelationshipXml(id, part) {
      const sourcePart = part ?? this.documentPart;
      const rel = this.getRelById(sourcePart, id);
      if (!rel || rel.targetMode === "External")
        return null;
      const path = this.resolveRelationshipTarget(sourcePart, rel);
      const normalizedPath = normalizeSnapshotPath(path);
      const xmlText = normalizedPath ? this._snapshotTextParts?.[normalizedPath] ?? await this._package.load(normalizedPath, "string") : null;
      return xmlText ? this._package.parseXmlDocument(xmlText) : null;
    }
    async loadRelationshipText(id, part) {
      const sourcePart = part ?? this.documentPart;
      const rel = this.getRelById(sourcePart, id);
      if (!rel || rel.targetMode === "External")
        return null;
      const path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? Promise.resolve(this._snapshotTextParts?.[path] ?? this._package.load(path, "string")) : Promise.resolve(null);
    }
    async loadRelationshipBlobUrl(id, part) {
      const sourcePart = part ?? this.documentPart;
      const rel = this.getRelById(sourcePart, id);
      if (!rel)
        return null;
      if (rel.targetMode === "External")
        return rel.target;
      const path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? this.loadPackageAssetUrl(path) : null;
    }
    async loadDocumentImage(id, part) {
      const sourcePart = part ?? this.documentPart;
      const rel = this.getRelById(sourcePart, id);
      if (!rel)
        return null;
      if (rel.targetMode === "External")
        return rel.target;
      const path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? this.loadPackageAssetUrl(path) : null;
    }
    async loadNumberingImage(id) {
      const path = normalizeSnapshotPath(this.getPathById(this.numberingPart, id));
      return path ? this.loadPackageAssetUrl(path) : null;
    }
    async loadFont(id, key) {
      const path = normalizeSnapshotPath(this.getPathById(this.fontTablePart, id));
      if (!path) return null;
      if (this._snapshotAssetDataUrls?.[path]) return this._snapshotAssetDataUrls[path];
      const x = await this._package.load(path, "uint8array");
      return x ? this.blobToURL(new Blob([deobfuscate(x, key)]), path) : x;
    }
    async loadAltChunk(id, part) {
      const sourcePart = part ?? this.documentPart;
      const rel = this.getRelById(sourcePart, id);
      if (!rel || rel.targetMode === "External")
        return Promise.resolve(null);
      const path = normalizeSnapshotPath(this.resolveRelationshipTarget(sourcePart, rel));
      return path ? Promise.resolve(this._snapshotTextParts?.[path] ?? this._package.load(path, "string")) : Promise.resolve(null);
    }
    blobToURL(blob, path) {
      if (!blob)
        return null;
      blob = this.blobWithContentType(blob, path);
      if (this._options.useBase64URL) {
        return blobToBase64(blob);
      }
      return URL.createObjectURL(blob);
    }
    async loadPackageAssetUrl(path) {
      const normalizedPath = normalizeSnapshotPath(path);
      if (!normalizedPath)
        return null;
      if (this._snapshotAssetDataUrls?.[normalizedPath])
        return this._snapshotAssetDataUrls[normalizedPath];
      if (this.isEmfAsset(normalizedPath)) {
        const data = await this._package.load(normalizedPath, "uint8array");
        if (!data)
          return null;
        const converted = this.convertEmfAsset(data, normalizedPath, "blobUrl");
        if (converted)
          return converted;
        return this.blobToURL(new Blob([data], { type: this.contentTypeForPath(normalizedPath) || "image/x-emf" }), normalizedPath);
      }
      if (this.isTiffAsset(normalizedPath)) {
        const data = await this._package.load(normalizedPath, "uint8array");
        if (!data)
          return null;
        const converted = await this.convertTiffAsset(data, normalizedPath);
        if (converted)
          return converted;
        return this.blobToURL(new Blob([data], { type: this.contentTypeForPath(normalizedPath) || "image/tiff" }), normalizedPath);
      }
      return this.blobToURL(await this._package.load(normalizedPath, "blob"), normalizedPath);
    }
    async loadPackageAssetDataUrl(path) {
      const normalizedPath = normalizeSnapshotPath(path);
      if (!normalizedPath)
        return null;
      if (this.isEmfAsset(normalizedPath)) {
        const data = await this._package.load(normalizedPath, "uint8array");
        if (!data)
          return null;
        const converted = this.convertEmfAsset(data, normalizedPath, "dataUrl");
        if (converted)
          return converted;
        const fallback = data ? new Blob([data], { type: this.contentTypeForPath(normalizedPath) || "image/x-emf" }) : null;
        return fallback ? blobToBase64(fallback) : null;
      }
      if (this.isTiffAsset(normalizedPath)) {
        const data = await this._package.load(normalizedPath, "uint8array");
        if (!data)
          return null;
        const converted = await this.convertTiffAsset(data, normalizedPath);
        if (converted)
          return converted;
        const fallback = data ? new Blob([data], { type: this.contentTypeForPath(normalizedPath) || "image/tiff" }) : null;
        return fallback ? blobToBase64(fallback) : null;
      }
      const blob = await this._package.load(normalizedPath, "blob");
      const typedBlob = this.blobWithContentType(blob, normalizedPath);
      return typedBlob ? blobToBase64(typedBlob) : null;
    }
    convertEmfAsset(data, path, mode = "dataUrl") {
      if (!data)
        return null;
      if (!isEmfBinary(data)) {
        const embeddedEmf = extractEmbeddedEmfBinary(data);
        if (embeddedEmf) {
          const converted = this.convertEmfBinaryAsset(embeddedEmf, path, EMF_EMBEDDED_VECTOR_INPUT_LIMIT, mode);
          if (converted)
            return converted;
        }
        if (isWmfBinary(data)) {
          const converted = this.convertWmfBinaryAsset(data, path, EMF_FULL_VECTOR_INPUT_LIMIT, mode);
          if (converted)
            return converted;
        }
        const largeRasterPreview = data.byteLength > EMF_FULL_VECTOR_INPUT_LIMIT ? extractEmbeddedRasterDataUrl(data, { minArea: EMF_LARGE_RASTER_PREVIEW_MIN_AREA }) : null;
        if (largeRasterPreview)
          return largeRasterPreview;
        return extractEmbeddedRasterDataUrl(data) ?? (data.byteLength > EMF_FULL_VECTOR_INPUT_LIMIT ? this.genericEmfPlaceholder() : null);
      }
      return this.convertEmfBinaryAsset(data, path, EMF_FULL_VECTOR_INPUT_LIMIT, mode);
    }
    convertWmfBinaryAsset(data, path, inputLimit, mode) {
      try {
        if (data.byteLength > inputLimit)
          return this.lightweightEmfPlaceholder(data);
        const svg = convertWmfToSvg(data);
        if (!svg)
          return null;
        if (mode == "blobUrl" && svg.length > EMF_FULL_VECTOR_DATA_URL_LIMIT) {
          if (svg.length <= EMF_FULL_VECTOR_BLOB_URL_LIMIT)
            return this.svgToBlobUrl(svg);
          return this.lightweightEmfPlaceholder(data);
        }
        const converted = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        if (converted.length > EMF_FULL_VECTOR_DATA_URL_LIMIT)
          return this.lightweightEmfPlaceholder(data);
        return converted;
      } catch (e) {
        if (this._options?.debug)
          console.warn(`docx-viewer: unable to convert WMF asset ${path}`, e);
        return null;
      }
    }
    convertEmfBinaryAsset(data, path, inputLimit, mode) {
      try {
        if (data.byteLength > inputLimit)
          return this.lightweightEmfPlaceholder(data);
        const svg = convertEmfToSvg(data);
        if (!svg)
          return null;
        if (mode == "blobUrl" && svg.length > EMF_FULL_VECTOR_DATA_URL_LIMIT) {
          if (svg.length <= EMF_FULL_VECTOR_BLOB_URL_LIMIT)
            return this.svgToBlobUrl(svg);
          return this.lightweightEmfPlaceholder(data);
        }
        const converted = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        if (converted.length > EMF_FULL_VECTOR_DATA_URL_LIMIT)
          return this.lightweightEmfPlaceholder(data);
        return converted;
      } catch (e) {
        if (this._options?.debug)
          console.warn(`docx-viewer: unable to convert EMF asset ${path}`, e);
        return null;
      }
    }
    lightweightEmfPlaceholder(data) {
      return (isWmfBinary(data) ? convertWmfToSvgDataUrl(data, { maxRecords: 1, maxShapes: 0 }) : null) ?? convertEmfToSvgDataUrl(data, { maxRecords: 1, maxShapes: 0 }) ?? this.genericEmfPlaceholder();
    }
    svgToBlobUrl(svg) {
      if (typeof Blob == "undefined" || typeof URL == "undefined" || typeof URL.createObjectURL != "function")
        return null;
      return URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    }
    genericEmfPlaceholder() {
      return "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%20viewBox%3D%220%200%201%201%22%20data-docx-metafile%3D%22emf%22%2F%3E";
    }
    isEmfAsset(path) {
      const contentType = this.contentTypeForPath(path).toLowerCase();
      return /\.(emf|wmf)$/i.test(path ?? "") || contentType == "image/x-emf" || contentType == "image/emf" || contentType == "image/x-wmf" || contentType == "image/wmf";
    }
    async convertTiffAsset(data, path) {
      try {
        const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
        const ifds = UTIF.decode(buffer);
        const ifd = ifds?.[0];
        if (!ifd)
          return null;
        UTIF.decodeImage(buffer, ifd, ifds);
        const width = Number(ifd.width);
        const height = Number(ifd.height);
        if (!(width > 0 && height > 0))
          return null;
        const rgba = UTIF.toRGBA8(ifd);
        const native = await this.encodeRgbaPngWithNativeCanvas(rgba, width, height);
        if (native)
          return native;
        return this.encodeRgbaPngWithUpng(rgba, width, height);
      } catch (e) {
        if (this._options?.debug)
          console.warn(`docx-viewer: unable to convert TIFF asset ${path}`, e);
        return null;
      }
    }
    async encodeRgbaPngWithNativeCanvas(rgba, width, height) {
      const g = globalThis;
      const imageDataCtor = g.ImageData;
      if (!imageDataCtor)
        return null;
      const pixels = new Uint8ClampedArray(rgba.buffer.slice(rgba.byteOffset, rgba.byteOffset + rgba.byteLength));
      const imageData = new imageDataCtor(pixels, width, height);
      if (g.OffscreenCanvas) {
        const canvas = new g.OffscreenCanvas(width, height);
        const ctx2 = canvas.getContext("2d");
        if (ctx2 && canvas.convertToBlob) {
          ctx2.putImageData(imageData, 0, 0);
          const blob = await canvas.convertToBlob({ type: "image/png" });
          return blob ? this.dataUrlFromBytes(new Uint8Array(await blob.arrayBuffer()), "image/png") : null;
        }
      }
      const documentRef = g.document;
      if (documentRef?.createElement) {
        const canvas = documentRef.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx2 = canvas.getContext("2d");
        if (ctx2 && canvas.toDataURL) {
          ctx2.putImageData(imageData, 0, 0);
          return canvas.toDataURL("image/png");
        }
      }
      return null;
    }
    encodeRgbaPngWithUpng(rgba, width, height) {
      const buffer = rgba.buffer.slice(rgba.byteOffset, rgba.byteOffset + rgba.byteLength);
      const png = new Uint8Array(UPNG2.encode([buffer], width, height, 0));
      return this.dataUrlFromBytes(png, "image/png");
    }
    dataUrlFromBytes(bytes, mime) {
      return `data:${mime};base64,${uint8ArrayToBase64(bytes)}`;
    }
    isTiffAsset(path) {
      const contentType = this.contentTypeForPath(path).toLowerCase();
      return /\.tiff?$/i.test(path ?? "") || contentType == "image/tiff" || contentType == "image/tif";
    }
    contentTypeForPath(path) {
      const normalizedPath = normalizeSnapshotPath(path ?? "");
      const lowerPath = normalizedPath.toLowerCase();
      for (const ct of this.contentTypes ?? []) {
        if (ct.partName && normalizeSnapshotPath(ct.partName).toLowerCase() == lowerPath)
          return ct.contentType ?? "";
      }
      const match = /\.([^.\/]+)$/.exec(lowerPath);
      const extension = match?.[1] ?? "";
      if (!extension)
        return "";
      const contentType = (this.contentTypes ?? []).find((ct) => ct.extension?.toLowerCase() == extension);
      return contentType?.contentType ?? "";
    }
    findPartByRelId(id, basePart = null) {
      var rel = this.getRelById(basePart, id);
      const path = rel && rel.targetMode !== "External" ? this.resolveRelationshipTarget(basePart, rel) : null;
      return path ? this.partsMap[path] : null;
    }
    getRelById(part, id) {
      return (part?.rels ?? this.rels ?? []).find((x) => x.id == id);
    }
    getPathById(part, id) {
      const rel = this.getRelById(part, id);
      return rel && rel.targetMode !== "External" ? this.resolveRelationshipTarget(part, rel) : null;
    }
    resolveRelationshipTarget(part, rel) {
      const [folder] = part ? splitPath(part.path) : [""];
      return normalizeSnapshotPath(resolvePath(rel.target, folder));
    }
  };
  function normalizeSnapshotPath(path) {
    if (!path)
      return path;
    return path.startsWith("/") ? path.substring(1) : path;
  }
  function uint8ArrayToBase64(bytes) {
    const g = globalThis;
    if (g.Buffer)
      return g.Buffer.from(bytes).toString("base64");
    let binary = "";
    const chunkSize = 32768;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    return g.btoa(binary);
  }
  async function eachLimit(items, limit, fn) {
    let index = 0;
    const workerCount = Math.max(1, Math.min(items.length, limit || 1));
    const workers = Array.from({ length: workerCount }, async () => {
      while (index < items.length) {
        const current = index++;
        await fn(items[current], current);
      }
    });
    await Promise.all(workers);
  }
  function deobfuscate(data, guidKey) {
    const len = 16;
    const trimmed = guidKey.replace(/{|}|-/g, "");
    const numbers = new Array(len);
    for (let i = 0; i < len; i++)
      numbers[len - i - 1] = parseInt(trimmed.substring(i * 2, i * 2 + 2), 16);
    for (let i = 0; i < 32; i++)
      data[i] = data[i] ^ numbers[i % len];
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
      case "rect":
        result.tagName = "rect";
        Object.assign(result.attrs, { width: "100%", height: "100%" });
        break;
      case "oval":
        result.tagName = "ellipse";
        Object.assign(result.attrs, { cx: "50%", cy: "50%", rx: "50%", ry: "50%" });
        break;
      case "line":
        result.tagName = "line";
        break;
      case "shape":
        result.tagName = "g";
        break;
      case "textbox":
        result.tagName = "foreignObject";
        Object.assign(result.attrs, { width: "100%", height: "100%" });
        break;
      default:
        return null;
    }
    for (const at of xml_parser_default.attrs(elem)) {
      switch (at.localName) {
        case "style":
          result.cssStyleText = at.value;
          break;
        case "fillcolor":
          result.attrs.fill = at.value;
          break;
        case "strokecolor":
          result.attrs.stroke = at.value;
          break;
        case "strokeweight":
          result.attrs["stroke-width"] = convertLength(at.value, LengthUsage.Point) ?? at.value;
          break;
        case "filled":
          if (at.value == "f" || at.value == "false")
            result.attrs.fill = "none";
          break;
        case "stroked":
          if (at.value == "f" || at.value == "false")
            result.attrs.stroke = "none";
          break;
        case "path":
          result.tagName = "path";
          result.attrs.d = convertPath(at.value);
          break;
        case "from":
          const [x1, y1] = parsePoint(at.value);
          Object.assign(result.attrs, { x1, y1 });
          break;
        case "to":
          const [x2, y2] = parsePoint(at.value);
          Object.assign(result.attrs, { x2, y2 });
          break;
      }
    }
    for (const el of xml_parser_default.elements(elem)) {
      switch (el.localName) {
        case "stroke":
          Object.assign(result.attrs, parseStroke(el));
          break;
        case "fill":
          Object.assign(result.attrs, parseFill(el));
          break;
        case "imagedata":
          result.tagName = "image";
          Object.assign(result.attrs, vmlImageAttrs(el));
          result.imageHref = {
            id: xml_parser_default.attr(el, "id") ?? xml_parser_default.attr(el, "relid") ?? xml_parser_default.attr(el, "pict"),
            title: xml_parser_default.attr(el, "title")
          };
          break;
        case "txbxContent":
          result.children.push(...parser.parseBodyElements(el));
          break;
        default:
          const child = parseVmlElement(el, parser);
          child && result.children.push(child);
          break;
      }
    }
    return result;
  }
  function vmlImageAttrs(el) {
    const cropLeft = parseVmlFraction(xml_parser_default.attr(el, "cropleft"));
    const cropTop = parseVmlFraction(xml_parser_default.attr(el, "croptop"));
    const cropRight = parseVmlFraction(xml_parser_default.attr(el, "cropright"));
    const cropBottom = parseVmlFraction(xml_parser_default.attr(el, "cropbottom"));
    const cropWidth = Math.max(1e-4, 1 - cropLeft - cropRight);
    const cropHeight = Math.max(1e-4, 1 - cropTop - cropBottom);
    const attrs = {
      x: percent(-cropLeft / cropWidth),
      y: percent(-cropTop / cropHeight),
      width: percent(1 / cropWidth),
      height: percent(1 / cropHeight)
    };
    if (cropLeft || cropTop || cropRight || cropBottom)
      attrs.preserveAspectRatio = "none";
    return attrs;
  }
  function parseVmlFraction(value) {
    if (!value)
      return 0;
    const raw = String(value).trim();
    if (!raw)
      return 0;
    let result;
    if (/^-?\d+(\.\d+)?f$/i.test(raw)) {
      result = parseFloat(raw.slice(0, -1)) / 65536;
    } else if (raw.endsWith("%")) {
      result = parseFloat(raw) / 100;
    } else {
      result = parseFloat(raw);
    }
    if (!Number.isFinite(result))
      return 0;
    return Math.max(0, Math.min(0.9999, result));
  }
  function percent(value) {
    return `${Math.round(value * 1e5) / 1e3}%`;
  }
  function parseStroke(el) {
    const result = {};
    const color = xml_parser_default.attr(el, "color");
    const weight = xml_parser_default.attr(el, "weight");
    const on = xml_parser_default.attr(el, "on");
    if (on == "f" || on == "false")
      result.stroke = "none";
    else if (color)
      result.stroke = color;
    if (weight)
      result["stroke-width"] = convertLength(weight, LengthUsage.Point) ?? weight;
    else
      result["stroke-width"] = "1px";
    return result;
  }
  function parseFill(el) {
    const result = {};
    const color = xml_parser_default.attr(el, "color") ?? xml_parser_default.attr(el, "color2");
    const on = xml_parser_default.attr(el, "on");
    const opacity = xml_parser_default.attr(el, "opacity");
    if (on == "f" || on == "false")
      result.fill = "none";
    else if (color)
      result.fill = color;
    if (opacity)
      result["fill-opacity"] = opacity.endsWith("%") ? `${parseFloat(opacity) / 100}` : opacity;
    return result;
  }
  function parsePoint(val) {
    return val.split(",");
  }
  function convertPath(path) {
    return path.replace(/([mlxe])|([-\d]+)|([,])/g, (m) => {
      if (/[-\d]/.test(m)) return convertLength(m, LengthUsage.VmlEmu);
      if (/[ml,]/.test(m)) return m;
      return "";
    });
  }

  // src/comments/elements.ts
  var WmlComment = class extends OpenXmlElementBase {
    constructor() {
      super(...arguments);
      this.type = "comment" /* Comment */;
    }
  };
  var WmlCommentReference = class extends OpenXmlElementBase {
    constructor(id) {
      super();
      this.id = id;
      this.type = "commentReference" /* CommentReference */;
    }
  };
  var WmlCommentRangeStart = class extends OpenXmlElementBase {
    constructor(id) {
      super();
      this.id = id;
      this.type = "commentRangeStart" /* CommentRangeStart */;
    }
  };
  var WmlCommentRangeEnd = class extends OpenXmlElementBase {
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
  };
  var supportedNamespaceURIs = [
    ns.wordprocessingShape,
    ns.wordprocessingCanvas,
    ns.wordprocessingGroup,
    ns.drawingml,
    ns.picture
  ];
  var mmlTagMap = {
    "oMath": "mmlMath" /* MmlMath */,
    "oMathPara": "mmlMathParagraph" /* MmlMathParagraph */,
    "f": "mmlFraction" /* MmlFraction */,
    "func": "mmlFunction" /* MmlFunction */,
    "fName": "mmlFunctionName" /* MmlFunctionName */,
    "num": "mmlNumerator" /* MmlNumerator */,
    "den": "mmlDenominator" /* MmlDenominator */,
    "rad": "mmlRadical" /* MmlRadical */,
    "deg": "mmlDegree" /* MmlDegree */,
    "e": "mmlBase" /* MmlBase */,
    "sSup": "mmlSuperscript" /* MmlSuperscript */,
    "sSub": "mmlSubscript" /* MmlSubscript */,
    "sPre": "mmlPreSubSuper" /* MmlPreSubSuper */,
    "sup": "mmlSuperArgument" /* MmlSuperArgument */,
    "sub": "mmlSubArgument" /* MmlSubArgument */,
    "d": "mmlDelimiter" /* MmlDelimiter */,
    "nary": "mmlNary" /* MmlNary */,
    "eqArr": "mmlEquationArray" /* MmlEquationArray */,
    "lim": "mmlLimit" /* MmlLimit */,
    "limLow": "mmlLimitLower" /* MmlLimitLower */,
    "limUpp": "mmlLimitUpper" /* MmlLimitUpper */,
    "sSubSup": "mmlSubSuperscript" /* MmlSubSuperscript */,
    "phant": "mmlPhantom" /* MmlPhantom */,
    "borderBox": "mmlBorderBox" /* MmlBorderBox */,
    "acc": "mmlAccent" /* MmlAccent */,
    "m": "mmlMatrix" /* MmlMatrix */,
    "mr": "mmlMatrixRow" /* MmlMatrixRow */,
    "box": "mmlBox" /* MmlBox */,
    "bar": "mmlBar" /* MmlBar */,
    "groupChr": "mmlGroupChar" /* MmlGroupChar */
  };
  var knownColors = ["black", "blue", "cyan", "darkBlue", "darkCyan", "darkGray", "darkGreen", "darkMagenta", "darkRed", "darkYellow", "green", "lightGray", "magenta", "none", "red", "white", "yellow"];
  var xmlUtil = class {
    static colorAttr(node, attrName, defValue = null, autoColor = "black") {
      var v = xml_parser_default.attr(node, attrName);
      if (v) {
        if (v == "auto") {
          return autoColor;
        } else if (knownColors.includes(v)) {
          return v;
        }
        return `#${v}`;
      }
      var themeColor = xml_parser_default.attr(node, "themeColor");
      return themeColor ? `var(--docx-${themeColor}-color)` : defValue;
    }
  };
  var values = class _values {
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
      var color = xmlUtil.colorAttr(c, "color", autos.borderColor, autos.borderColor);
      var size = xml_parser_default.lengthAttr(c, "sz", LengthUsage.Border) ?? "1pt";
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
      const val = xml_parser_default.attr(c, "val") ?? "";
      const attrFlag = (names, fallback) => {
        const name = names.find((n) => xml_parser_default.attr(c, n) != null);
        return name ? xml_parser_default.boolAttr(c, name, false) : fallback;
      };
      const flags = [
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
      ];
      const result = {};
      flags.forEach(([key, , names], i) => {
        if (attrFlag(names, val[i] == "1"))
          result[key] = true;
      });
      return result;
    }
    static classNameOfCnfStyle(c) {
      const format = _values.tableConditionalFormatOfCnfStyle(c);
      const classes = [
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
      ];
      return classes.filter(([key]) => format[key]).map(([, className]) => className).join(" ");
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
    static valueOfVertAlign(c, asTagName = false) {
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
          return '"\uFE50"';
        case "circle":
          return "circle";
        case "dot":
        case "underDot":
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
      if (a == null) return b;
      if (b == null) return a;
      return `calc(${a} + ${b})`;
    }
    static classNameOftblLook(c) {
      const look = _values.tableLookOfTblLook(c);
      let className = "";
      if (look.firstRow) className += " first-row";
      if (look.lastRow) className += " last-row";
      if (look.firstColumn) className += " first-col";
      if (look.lastColumn) className += " last-col";
      if (!look.horizontalBanding) className += " no-hband";
      if (!look.verticalBanding) className += " no-vband";
      return className.trim();
    }
    static tableLookOfTblLook(c) {
      const hasVal = xml_parser_default.attr(c, "val") != null;
      const val = xml_parser_default.hexAttr(c, "val", 0);
      const enabled = (attr, mask, defaultValue) => {
        const explicit = xml_parser_default.attr(c, attr);
        if (explicit != null)
          return xml_parser_default.boolAttr(c, attr, defaultValue);
        return hasVal ? !!(val & mask) : defaultValue;
      };
      return {
        firstRow: enabled("firstRow", 32, false),
        lastRow: enabled("lastRow", 64, false),
        firstColumn: enabled("firstColumn", 128, false),
        lastColumn: enabled("lastColumn", 256, false),
        horizontalBanding: !enabled("noHBand", 512, false),
        verticalBanding: !enabled("noVBand", 1024, false)
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
  };
  var defaultDmlThemeLineStyles = [
    { width: 9525, cap: "flat", dash: "solid" },
    { width: 25400, cap: "flat", dash: "solid" },
    { width: 38100, cap: "flat", dash: "solid" }
  ];
  function normalizeShadingHexColor(value) {
    if (!value)
      return null;
    const named = namedShadingColors[value];
    if (named)
      return named;
    const hex = String(value).replace(/^#/, "");
    return /^[0-9a-f]{6}$/i.test(hex) ? `#${hex.toLowerCase()}` : null;
  }
  function mixShadingChannel(background, foreground, opacity) {
    return Math.max(0, Math.min(255, Math.floor(background * (1 - opacity) + foreground * opacity)));
  }
  function mixShadingColors(background, foreground, opacity) {
    const bg = normalizeShadingHexColor(background);
    const fg = normalizeShadingHexColor(foreground);
    if (!bg || !fg)
      return null;
    const rb = parseInt(bg.slice(1, 3), 16);
    const gb = parseInt(bg.slice(3, 5), 16);
    const bb = parseInt(bg.slice(5, 7), 16);
    const rf = parseInt(fg.slice(1, 3), 16);
    const gf = parseInt(fg.slice(3, 5), 16);
    const bf = parseInt(fg.slice(5, 7), 16);
    const r = mixShadingChannel(rb, rf, opacity).toString(16).padStart(2, "0");
    const g = mixShadingChannel(gb, gf, opacity).toString(16).padStart(2, "0");
    const b = mixShadingChannel(bb, bf, opacity).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
  }
  function resolveShadingBackground(c) {
    const val = xml_parser_default.attr(c, "val") || "clear";
    if (val === "nil")
      return null;
    const fillAttr = xml_parser_default.attr(c, "fill");
    const colorAttr = xml_parser_default.attr(c, "color");
    const background = fillAttr && fillAttr !== "auto" ? xmlUtil.colorAttr(c, "fill", null, autos.shd) : "white";
    const foreground = colorAttr && colorAttr !== "auto" ? xmlUtil.colorAttr(c, "color", null, autos.color) : autos.color;
    if (/^pct/i.test(val)) {
      const pct = Math.max(0, Math.min(100, parseFloat(val.replace(/[^0-9.]/g, "")) || 0)) / 100;
      return mixShadingColors(background, foreground, pct) || xmlUtil.colorAttr(c, "fill", null, autos.shd);
    }
    if (val === "solid")
      return foreground || xmlUtil.colorAttr(c, "fill", null, autos.shd);
    return xmlUtil.colorAttr(c, "fill", null, autos.shd);
  }
  var DocumentParser = class {
    constructor(options) {
      this.options = {
        ignoreWidth: false,
        debug: false,
        hideWebHiddenContent: false,
        ...options
      };
    }
    setTheme(theme) {
      this.theme = theme;
    }
    parseNotes(xmlDoc, elemName, elemClass) {
      var result = [];
      for (let el of xml_parser_default.elements(xmlDoc, elemName)) {
        const node = new elemClass();
        node.id = xml_parser_default.attr(el, "id");
        node.noteType = xml_parser_default.attr(el, "type");
        node.children = this.parseBodyElements(el);
        result.push(node);
      }
      return result;
    }
    parseComments(xmlDoc) {
      var result = [];
      for (let el of xml_parser_default.elements(xmlDoc, "comment")) {
        const item = new WmlComment();
        item.id = xml_parser_default.attr(el, "id");
        item.author = xml_parser_default.attr(el, "author");
        item.initials = xml_parser_default.attr(el, "initials");
        item.date = xml_parser_default.attr(el, "date");
        item.children = this.parseBodyElements(el);
        result.push(item);
      }
      return result;
    }
    parseDocumentFile(xmlDoc) {
      var xbody = xml_parser_default.element(xmlDoc, "body");
      var background = xml_parser_default.element(xmlDoc, "background");
      var sectPr = xml_parser_default.element(xbody, "sectPr");
      return {
        type: "document" /* Document */,
        children: this.parseBodyElements(xbody, { trackBodySource: true }),
        props: sectPr ? parseSectionProperties(sectPr, xml_parser_default) : {},
        cssStyle: background ? this.parseBackground(background) : {}
      };
    }
    parseBackground(elem) {
      var result = {};
      var color = xmlUtil.colorAttr(elem, "color");
      if (color) {
        result["background-color"] = color;
      }
      return result;
    }
    parseBodyElements(element, context = {}) {
      var children = [];
      let bodyIndex = 0;
      let paragraphIndex = 0;
      let tableIndex = 0;
      const sourceBase = () => context.trackBodySource ? { bodyIndex } : void 0;
      for (const elem of xml_parser_default.elements(element)) {
        switch (elem.localName) {
          case "p": {
            const source = sourceBase();
            children.push(this.parseParagraph(elem, source ? { ...source, paragraphIndex: paragraphIndex++ } : void 0));
            if (context.trackBodySource)
              bodyIndex++;
            break;
          }
          case "altChunk":
            children.push(this.parseAltChunk(elem));
            if (context.trackBodySource)
              bodyIndex++;
            break;
          case "tbl": {
            const source = sourceBase();
            children.push(this.parseTable(elem, source ? { ...source, tableIndex: tableIndex++ } : void 0));
            if (context.trackBodySource)
              bodyIndex++;
            break;
          }
          case "sdt":
            children.push(...this.parseSdt(elem, (e) => this.parseBodyElements(e)));
            if (context.trackBodySource)
              bodyIndex++;
            break;
        }
      }
      return children;
    }
    parseStylesFile(xstyles) {
      var result = [];
      for (const n of xml_parser_default.elements(xstyles)) {
        switch (n.localName) {
          case "style":
            result.push(this.parseStyle(n));
            break;
          case "docDefaults":
            result.push(this.parseDefaultStyles(n));
            break;
        }
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
        hasParagraphDefaults: false
      };
      for (const c of xml_parser_default.elements(node)) {
        switch (c.localName) {
          case "rPrDefault":
            var rPr = xml_parser_default.element(c, "rPr");
            if (rPr) {
              result.styles.push({
                target: "span",
                values: this.parseDefaultProperties(rPr, {})
              });
              result.runProps = parseRunProperties(rPr, xml_parser_default);
            }
            break;
          case "pPrDefault":
            result.hasParagraphDefaults = true;
            var pPr = xml_parser_default.element(c, "pPr");
            if (pPr) {
              result.styles.push({
                target: "p",
                values: this.parseDefaultProperties(pPr, {})
              });
              result.paragraphProps = parseParagraphProperties(pPr, xml_parser_default);
            }
            break;
        }
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
        hasParagraphProperties: false
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
      for (const n of xml_parser_default.elements(node)) {
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
            result.hasParagraphProperties = true;
            result.styles.push({
              target: "p",
              values: this.parseDefaultProperties(n, {})
            });
            result.paragraphProps = parseParagraphProperties(n, xml_parser_default);
            break;
          case "rPr":
            result.styles.push({
              target: "span",
              values: this.parseDefaultProperties(n, {})
            });
            result.runProps = parseRunProperties(n, xml_parser_default);
            break;
          case "tblPr":
            result.tableProps = {
              ...result.tableProps ?? {},
              ...this.parseTableStyleProperties(n)
            };
            this.appendTableStyleDefaultProperties(result, n);
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
      }
      return result;
    }
    parseTableStyleProperties(node) {
      const result = {};
      for (const c of xml_parser_default.elements(node)) {
        switch (c.localName) {
          case "tblStyleColBandSize": {
            const value = xml_parser_default.intAttr(c, "val");
            if (value != null)
              result.colBandSize = value;
            break;
          }
          case "tblStyleRowBandSize": {
            const value = xml_parser_default.intAttr(c, "val");
            if (value != null)
              result.rowBandSize = value;
            break;
          }
        }
      }
      return result;
    }
    appendTableStyleDefaultProperties(style, node) {
      const tableValues = {};
      const cellValues = {};
      this.parseDefaultProperties(node, tableValues, cellValues);
      if (Object.keys(tableValues).length) {
        style.styles.push({
          target: "table",
          values: tableValues
        });
      }
      if (Object.keys(cellValues).length) {
        style.styles.push({
          target: "td",
          values: cellValues
        });
      }
    }
    parseTableStyle(node) {
      var result = [];
      var type = xml_parser_default.attr(node, "type");
      var selector = "";
      var modificator = "";
      switch (type) {
        case "firstRow":
          modificator = ".first-row";
          selector = "tr.first-row td";
          break;
        case "lastRow":
          modificator = ".last-row";
          selector = "tr.last-row td";
          break;
        case "firstCol":
          modificator = ".first-col";
          selector = "td.first-col";
          break;
        case "lastCol":
          modificator = ".last-col";
          selector = "td.last-col";
          break;
        case "band1Vert":
          modificator = ":not(.no-vband)";
          selector = "td.odd-col";
          break;
        case "band2Vert":
          modificator = ":not(.no-vband)";
          selector = "td.even-col";
          break;
        case "band1Horz":
          modificator = ":not(.no-hband)";
          selector = "tr.odd-row";
          break;
        case "band2Horz":
          modificator = ":not(.no-hband)";
          selector = "tr.even-row";
          break;
        case "neCell":
          modificator = ".ne-cell";
          selector = "td.ne-cell";
          break;
        case "nwCell":
          modificator = ".nw-cell";
          selector = "td.nw-cell";
          break;
        case "seCell":
          modificator = ".se-cell";
          selector = "td.se-cell";
          break;
        case "swCell":
          modificator = ".sw-cell";
          selector = "td.sw-cell";
          break;
        default:
          return [];
      }
      for (const n of xml_parser_default.elements(node)) {
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
      }
      return result;
    }
    parseNumberingFile(node) {
      const result = [];
      const bullets = [];
      const abstractLevels = {};
      const abstractNodes = [];
      const numberNodes = [];
      for (const n of xml_parser_default.elements(node)) {
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
      }
      for (const n of abstractNodes) {
        abstractLevels[xml_parser_default.attr(n, "abstractNumId")] = this.parseAbstractNumbering(n, bullets);
      }
      for (const n of numberNodes) {
        const numId = xml_parser_default.attr(n, "numId");
        const abstractNumId = xml_parser_default.elementAttr(n, "abstractNumId", "val");
        const levels = (abstractLevels[abstractNumId] ?? []).map((x) => this.cloneNumberingLevel(x, numId));
        for (const override of xml_parser_default.elements(n, "lvlOverride")) {
          const level = xml_parser_default.intAttr(override, "ilvl");
          const levelNode = xml_parser_default.element(override, "lvl");
          const startOverride = xml_parser_default.element(override, "startOverride");
          let target = levels.find((x) => x.level == level);
          if (levelNode) {
            target = this.parseNumberingLevel(numId, levelNode, bullets);
            const index = levels.findIndex((x) => x.level == level);
            if (index >= 0)
              levels[index] = target;
            else
              levels.push(target);
          }
          if (startOverride && target)
            target.start = xml_parser_default.intAttr(startOverride, "val", target.start);
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
      const id = xml_parser_default.intAttr(elem, "numPicBulletId");
      const pict = xml_parser_default.element(elem, "pict");
      const shape = pict && xml_parser_default.element(pict, "shape");
      const imagedata = shape && xml_parser_default.element(shape, "imagedata");
      if (imagedata) {
        return {
          id,
          src: xml_parser_default.attr(imagedata, "id"),
          style: xml_parser_default.attr(shape, "style")
        };
      }
      const drawing = xml_parser_default.element(elem, "drawing");
      const blip = drawing ? this.findDescendant(drawing, "blip") : null;
      if (blip) {
        const extent = drawing ? this.findDescendant(drawing, "extent") : null;
        const style = [];
        if (extent) {
          const width = xml_parser_default.lengthAttr(extent, "cx", LengthUsage.Emu);
          const height = xml_parser_default.lengthAttr(extent, "cy", LengthUsage.Emu);
          if (width)
            style.push(`width:${width};`);
          if (height)
            style.push(`height:${height};`);
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
      var result = [];
      var id = xml_parser_default.attr(node, "abstractNumId");
      for (const n of xml_parser_default.elements(node)) {
        switch (n.localName) {
          case "lvl":
            result.push(this.parseNumberingLevel(id, n, bullets));
            break;
        }
      }
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
      for (const n of xml_parser_default.elements(node)) {
        switch (n.localName) {
          case "start":
            result.start = xml_parser_default.intAttr(n, "val");
            break;
          case "pPr":
            this.parseDefaultProperties(n, result.pStyle);
            result.tabs = parseParagraphProperties(n, xml_parser_default).tabs ?? result.tabs;
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
      }
      return result;
    }
    parseSdt(node, parser) {
      const sdtContent = xml_parser_default.element(node, "sdtContent");
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
      for (let el of xml_parser_default.elements(node)) {
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
            const math = this.parseMathElement(el);
            if (math)
              result.children.push(math);
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
      }
      return result;
    }
    parseParagraphProperties(elem, paragraph) {
      this.parseDefaultProperties(elem, paragraph.cssStyle = {}, null, (c) => {
        if (c.localName == "rPr") {
          if (xml_parser_default.element(c, "del"))
            paragraph.props = { ...paragraph.props ?? {}, deletedParagraphMark: true };
          const markStyle = {};
          this.parseDefaultProperties(c, markStyle);
          paragraph.props = { ...paragraph.props ?? {}, paragraphMarkCssStyle: markStyle };
          parseParagraphProperty(c, paragraph, xml_parser_default);
          return true;
        }
        if (parseParagraphProperty(c, paragraph, xml_parser_default))
          return true;
        switch (c.localName) {
          case "pStyle":
            paragraph.styleName = xml_parser_default.attr(c, "val");
            break;
          case "cnfStyle":
            paragraph.conditionalStyle = values.tableConditionalFormatOfCnfStyle(c);
            paragraph.className = values.classNameOfCnfStyle(c);
            break;
          case "framePr":
            this.parseFrame(c, paragraph);
            break;
          default:
            return false;
        }
        return true;
      });
    }
    parseFrame(node, paragraph) {
      var dropCap = xml_parser_default.attr(node, "dropCap");
      if (dropCap == "drop")
        paragraph.cssStyle["float"] = "left";
    }
    parseHyperlink(node, parent) {
      var result = { type: "hyperlink" /* Hyperlink */, parent, children: [] };
      result.anchor = xml_parser_default.attr(node, "anchor");
      result.id = xml_parser_default.attr(node, "id");
      for (const c of xml_parser_default.elements(node)) {
        switch (c.localName) {
          case "r":
            result.children.push(this.parseRun(c, result));
            break;
        }
      }
      return result;
    }
    parseSmartTag(node, parent) {
      var result = { type: "smartTag" /* SmartTag */, parent, children: [] };
      var uri = xml_parser_default.attr(node, "uri");
      var element = xml_parser_default.attr(node, "element");
      if (uri)
        result.uri = uri;
      if (element)
        result.element = element;
      for (const c of xml_parser_default.elements(node)) {
        switch (c.localName) {
          case "r":
            result.children.push(this.parseRun(c, result));
            break;
          case "smartTag":
            result.children.push(this.parseSmartTag(c, result));
            break;
        }
      }
      return result;
    }
    parseSimpleField(node, parent) {
      const result = {
        type: "simpleField" /* SimpleField */,
        parent,
        children: [],
        instruction: xml_parser_default.attr(node, "instr"),
        lock: xml_parser_default.boolAttr(node, "lock", false),
        dirty: xml_parser_default.boolAttr(node, "dirty", false)
      };
      for (const c of xml_parser_default.elements(node)) {
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
      }
      return result;
    }
    parseRun(node, parent) {
      var result = { type: "run" /* Run */, parent, children: [] };
      for (let c of xml_parser_default.elements(node)) {
        c = this.checkAlternateContent(c);
        if (!c)
          continue;
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
            result.fieldRun = true;
            result.children.push({
              type: "instruction" /* Instruction */,
              text: c.textContent
            });
            break;
          case "fldChar":
            result.fieldRun = true;
            result.children.push({
              type: "complexField" /* ComplexField */,
              charType: xml_parser_default.attr(c, "fldCharType"),
              lock: xml_parser_default.boolAttr(c, "lock", false),
              dirty: xml_parser_default.boolAttr(c, "dirty", false)
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
            result.children.push({ type: "positionalTab" /* PositionalTab */ });
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
            if (d)
              result.children.push(d);
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
      }
      return result;
    }
    parseRuby(elem) {
      const result = { type: "ruby" /* Ruby */, children: [] };
      for (const child of xml_parser_default.elements(elem)) {
        switch (child.localName) {
          case "rubyPr":
            for (const prop of xml_parser_default.elements(child)) {
              switch (prop.localName) {
                case "rubyAlign":
                  result.align = xml_parser_default.attr(prop, "val");
                  break;
              }
            }
            break;
          case "rt":
            result.children.push(this.parseRubyContent(child, "rubyText" /* RubyText */));
            break;
          case "rubyBase":
            result.children.push(this.parseRubyContent(child, "rubyBase" /* RubyBase */));
            break;
        }
      }
      return result;
    }
    parseRubyContent(elem, type) {
      const result = { type, children: [] };
      for (const child of xml_parser_default.elements(elem)) {
        if (child.localName == "r")
          result.children.push(this.parseRun(child, result));
        else if (type == "rubyText" /* RubyText */ && child.localName == "rPr") {
          const hps = xml_parser_default.element(child, "hps");
          const hpsVal = hps ? xml_parser_default.intAttr(hps, "val", null) : null;
          if (hpsVal != null)
            result.cssStyle = { ...result.cssStyle ?? {}, fontSize: `${hpsVal / 2}pt` };
        }
      }
      return result;
    }
    parseMathElement(elem) {
      const propsTag = `${elem.localName}Pr`;
      const result = { type: mmlTagMap[elem.localName], children: [] };
      let hiddenRevision = false;
      const appendChild = (el) => {
        const childType = mmlTagMap[el.localName];
        if (childType) {
          const child = this.parseMathElement(el);
          if (child) {
            child.parent = result;
            result.children.push(child);
          } else {
            hiddenRevision = true;
          }
        } else if (el.localName == "r") {
          var run = this.parseRun(el, result);
          run.type = "mmlRun" /* MmlRun */;
          result.children.push(run);
        } else if (el.localName == propsTag) {
          result.props = this.parseMathProperies(el);
        } else if (el.localName == "ins") {
          for (const child of xml_parser_default.elements(el))
            appendChild(child);
        } else if (el.localName == "del") {
          if (this.options.renderChanges) {
            for (const child of xml_parser_default.elements(el))
              appendChild(child);
          } else {
            hiddenRevision = true;
          }
        }
      };
      for (const el of xml_parser_default.elements(elem))
        appendChild(el);
      if (hiddenRevision && !this.hasVisibleMathContent(result))
        return null;
      return result;
    }
    hasVisibleMathContent(elem) {
      for (const child of elem.children ?? []) {
        switch (child.type) {
          case "text" /* Text */:
            if (child.text?.length)
              return true;
            break;
          case "deletedText" /* DeletedText */:
            if (this.options.renderChanges && child.text?.length)
              return true;
            break;
          case "symbol" /* Symbol */:
          case "tab" /* Tab */:
          case "positionalTab" /* PositionalTab */:
          case "noBreakHyphen" /* NoBreakHyphen */:
          case "break" /* Break */:
            return true;
        }
        if (this.hasVisibleMathContent(child))
          return true;
      }
      return false;
    }
    parseMathProperies(elem) {
      const result = {};
      for (const el of xml_parser_default.elements(elem)) {
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
            run.verticalAlign = values.valueOfVertAlign(c, true);
            break;
          default:
            return false;
        }
        return true;
      });
    }
    parseVmlPicture(elem) {
      const result = { type: "vmlPicture" /* VmlPicture */, children: [] };
      for (const el of xml_parser_default.elements(elem)) {
        const child = parseVmlElement(el, this);
        child && result.children.push(child);
      }
      return result;
    }
    checkAlternateContent(elem) {
      if (elem.localName != "AlternateContent")
        return elem;
      for (const choice of xml_parser_default.elements(elem).filter((x) => x.localName == "Choice")) {
        const requires = (xml_parser_default.attr(choice, "Requires") ?? "").split(/\s+/).filter(Boolean);
        const supported = requires.length > 0 && requires.every((prefix) => supportedNamespaceURIs.includes(elem.lookupNamespaceURI(prefix)));
        if (supported) {
          const selected = xml_parser_default.elements(choice)[0];
          if (selected)
            return selected;
        }
      }
      const fallback = xml_parser_default.element(elem, "Fallback");
      return fallback ? xml_parser_default.elements(fallback)[0] : null;
    }
    findAncestorParagraph(elem) {
      let current = elem;
      while (current) {
        if (current.type === "paragraph" /* Paragraph */)
          return current;
        current = current.parent;
      }
      return null;
    }
    parseDrawing(node, inheritedParagraph) {
      for (var n of xml_parser_default.elements(node)) {
        switch (n.localName) {
          case "inline":
          case "anchor":
            return this.parseDrawingWrapper(n, inheritedParagraph);
        }
      }
    }
    parseDrawingWrapper(node, inheritedParagraph) {
      var _a;
      var result = { type: "drawing" /* Drawing */, children: [], cssStyle: {}, props: {} };
      var isAnchor = node.localName == "anchor";
      const drawingMeta = {
        wrapper: isAnchor ? "wp-anchor" : "wp-inline",
        hasPositiveEffectExtent: false,
        effectExtentEmu: { l: 0, t: 0, r: 0, b: 0 },
        extentEmu: { cx: 0, cy: 0 },
        relativeHeight: null
      };
      result.props.drawingMeta = drawingMeta;
      const addMargin = (prop, value) => {
        if (value)
          result.cssStyle[prop] = values.addSize(result.cssStyle[prop], value);
      };
      addMargin("margin-left", xml_parser_default.lengthAttr(node, "distL", LengthUsage.Emu));
      addMargin("margin-top", xml_parser_default.lengthAttr(node, "distT", LengthUsage.Emu));
      addMargin("margin-right", xml_parser_default.lengthAttr(node, "distR", LengthUsage.Emu));
      addMargin("margin-bottom", xml_parser_default.lengthAttr(node, "distB", LengthUsage.Emu));
      let wrapType = null;
      let wrapText = null;
      let wrapPolygon = null;
      let simplePos = xml_parser_default.boolAttr(node, "simplePos", false);
      let behindDoc = xml_parser_default.boolAttr(node, "behindDoc", false);
      let relativeHeight = xml_parser_default.intAttr(node, "relativeHeight", null);
      if (relativeHeight != null)
        result.cssStyle["z-index"] = `${Math.max(1, Math.round(relativeHeight / 1e3))}`;
      drawingMeta.relativeHeight = relativeHeight;
      if (behindDoc)
        result.cssStyle["z-index"] = "0";
      let posX = { relative: "page", align: "left", offset: null };
      let posY = { relative: "page", align: "top", offset: null };
      for (var n of xml_parser_default.elements(node)) {
        switch (n.localName) {
          case "simplePos":
            if (simplePos) {
              posX.offset = xml_parser_default.lengthAttr(n, "x", LengthUsage.Emu);
              posY.offset = xml_parser_default.lengthAttr(n, "y", LengthUsage.Emu);
            }
            break;
          case "extent":
            drawingMeta.extentEmu = {
              cx: xml_parser_default.intAttr(n, "cx", 0) ?? 0,
              cy: xml_parser_default.intAttr(n, "cy", 0) ?? 0
            };
            result.cssStyle["width"] = xml_parser_default.lengthAttr(n, "cx", LengthUsage.Emu);
            result.cssStyle["height"] = xml_parser_default.lengthAttr(n, "cy", LengthUsage.Emu);
            break;
          case "effectExtent":
            drawingMeta.effectExtentEmu = {
              l: xml_parser_default.intAttr(n, "l", 0) ?? 0,
              t: xml_parser_default.intAttr(n, "t", 0) ?? 0,
              r: xml_parser_default.intAttr(n, "r", 0) ?? 0,
              b: xml_parser_default.intAttr(n, "b", 0) ?? 0
            };
            drawingMeta.hasPositiveEffectExtent = Object.values(drawingMeta.effectExtentEmu).some((v) => v > 0);
            addMargin("margin-left", xml_parser_default.lengthAttr(n, "l", LengthUsage.Emu));
            addMargin("margin-top", xml_parser_default.lengthAttr(n, "t", LengthUsage.Emu));
            addMargin("margin-right", xml_parser_default.lengthAttr(n, "r", LengthUsage.Emu));
            addMargin("margin-bottom", xml_parser_default.lengthAttr(n, "b", LengthUsage.Emu));
            break;
          case "docPr":
            result.props.title = xml_parser_default.attr(n, "title") ?? xml_parser_default.attr(n, "name");
            result.props.alt = xml_parser_default.attr(n, "descr") ?? result.props.title;
            break;
          case "positionH":
          case "positionV":
            if (!simplePos) {
              let pos = n.localName == "positionH" ? posX : posY;
              var alignNode = xml_parser_default.element(n, "align");
              var offsetNode = xml_parser_default.element(n, "posOffset");
              pos.relative = xml_parser_default.attr(n, "relativeFrom") ?? pos.relative;
              if (alignNode) {
                pos.align = alignNode.textContent;
                if (!offsetNode)
                  pos.offset = null;
              }
              if (offsetNode)
                pos.offset = convertLength(offsetNode.textContent, LengthUsage.Emu);
            }
            break;
          case "wrapTopAndBottom":
            wrapType = "wrapTopAndBottom";
            break;
          case "wrapNone":
            wrapType = "wrapNone";
            break;
          case "wrapSquare":
            wrapType = "wrapSquare";
            wrapText = xml_parser_default.attr(n, "wrapText");
            break;
          case "wrapTight":
            wrapType = "wrapTight";
            wrapText = xml_parser_default.attr(n, "wrapText");
            wrapPolygon = this.parseWrapPolygon(n);
            break;
          case "wrapThrough":
            wrapType = "wrapThrough";
            wrapText = xml_parser_default.attr(n, "wrapText");
            wrapPolygon = this.parseWrapPolygon(n);
            break;
          case "graphic":
            var g = this.parseGraphic(n);
            if (g) {
              this.applyDrawingTextContext(g, inheritedParagraph);
              if (g.type == "image" /* Image */) {
                g.alt ?? (g.alt = result.props.alt);
                g.title ?? (g.title = result.props.title);
              } else if (g.type == "shape" /* Shape */) {
                g.alt ?? (g.alt = result.props.alt);
                g.title ?? (g.title = result.props.title);
              } else if (g.type == "chart" /* Chart */) {
                g.alt ?? (g.alt = result.props.alt);
                g.title ?? (g.title = result.props.title);
              } else if (g.type == "smartArt" /* SmartArt */) {
                g.alt ?? (g.alt = result.props.alt);
                g.title ?? (g.title = result.props.title);
              } else if (g.type == "ink" /* Ink */) {
                g.alt ?? (g.alt = result.props.alt);
                g.title ?? (g.title = result.props.title);
              }
              result.children.push(g);
            }
            break;
        }
      }
      result.props.anchorPosition = {
        horizontal: { ...posX },
        vertical: { ...posY },
        wrapType,
        behindDoc,
        layoutInCell: xml_parser_default.boolAttr(node, "layoutInCell", true),
        simplePos
      };
      const applyHorizontalAlignment = () => {
        switch (posX.align) {
          case "center":
            result.cssStyle["margin-left"] = "auto";
            result.cssStyle["margin-right"] = "auto";
            break;
          case "right":
            result.cssStyle["margin-left"] = "auto";
            break;
        }
      };
      if (wrapType == "wrapTopAndBottom") {
        result.cssStyle["display"] = "block";
        result.cssStyle["clear"] = "both";
        applyHorizontalAlignment();
      } else if (wrapType == "wrapNone") {
        result.cssStyle["display"] = "block";
        result.cssStyle["position"] = isAnchor ? "absolute" : "relative";
        if (posX.offset)
          result.cssStyle["left"] = posX.offset;
        if (posY.offset)
          result.cssStyle["top"] = posY.offset;
      } else if (wrapType == "wrapSquare" || wrapType == "wrapTight" || wrapType == "wrapThrough") {
        if (wrapPolygon) {
          result.cssStyle["shape-outside"] = wrapPolygon;
          (_a = result.cssStyle)["clip-path"] ?? (_a["clip-path"] = wrapPolygon);
        }
        if (wrapText == "left") {
          result.cssStyle["float"] = "right";
        } else if (wrapText == "right") {
          result.cssStyle["float"] = "left";
        } else if (posX.align == "left" || posX.align == "right") {
          result.cssStyle["float"] = posX.align;
        } else {
          result.cssStyle["display"] = "block";
          applyHorizontalAlignment();
        }
      } else if (isAnchor && (posX.align == "left" || posX.align == "right")) {
        result.cssStyle["float"] = posX.align;
      } else {
        result.cssStyle["vertical-align"] = "text-bottom";
      }
      return result;
    }
    parseWrapPolygon(elem) {
      const polygon = xml_parser_default.element(elem, "wrapPolygon");
      if (!polygon)
        return null;
      const points = [];
      const addPoint = (pt) => {
        const x = xml_parser_default.lengthAttr(pt, "x", LengthUsage.Emu);
        const y = xml_parser_default.lengthAttr(pt, "y", LengthUsage.Emu);
        if (x && y)
          points.push(`${x} ${y}`);
      };
      for (const n of xml_parser_default.elements(polygon)) {
        if (n.localName == "start" || n.localName == "lineTo")
          addPoint(n);
      }
      return points.length >= 3 ? `polygon(${points.join(", ")})` : null;
    }
    parseGraphic(elem) {
      var graphicData = xml_parser_default.element(elem, "graphicData");
      if (!graphicData)
        return null;
      for (let n of xml_parser_default.elements(graphicData)) {
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
      }
      const contentPart = this.findDescendant(graphicData, "contentPart");
      if (contentPart)
        return this.parseInkReference(contentPart);
      return null;
    }
    parseDrawingContainer(elem, parentTransform) {
      const result = {
        type: "shape" /* Shape */,
        children: [],
        cssStyle: {
          "display": "inline-block",
          "position": "relative",
          "width": "100%",
          "height": "100%",
          "overflow": "visible",
          "box-sizing": "border-box"
        },
        props: { dmlContainer: true }
      };
      const transform = this.parseDmlGroupTransform(elem, parentTransform);
      for (const child of xml_parser_default.elements(elem)) {
        switch (child.localName) {
          case "pic":
            const image = this.parseDmlPositionedPicture(child, transform);
            if (image)
              result.children.push(image);
            break;
          case "wsp":
          case "sp":
          case "cxnSp":
            const shape = this.parseDmlPositionedShape(child, transform);
            if (shape)
              result.children.push(shape);
            break;
          case "grpSp":
          case "wgp":
            const group = this.parseDrawingContainer(child, transform);
            if (group)
              result.children.push(group);
            break;
        }
      }
      return result;
    }
    applyDrawingTextContext(elem, inheritedParagraph) {
      if (!elem || !inheritedParagraph?.cssStyle)
        return;
      const inheritedAlign = inheritedParagraph.cssStyle["text-align"];
      if (!inheritedAlign)
        return;
      const visit = (node) => {
        if (!node)
          return;
        const props = node?.props ?? {};
        if (props.dmlShape || props.dmlSvg) {
          for (const child of node.children ?? []) {
            if (child.type === "paragraph" /* Paragraph */) {
              const css = child.cssStyle ?? {};
              if (!css["text-align"] && !css.textAlign)
                child.cssStyle = { ...css, "text-align": inheritedAlign };
            }
          }
        }
        for (const child of node.children ?? [])
          visit(child);
      };
      visit(elem);
    }
    parseDmlPositionedPicture(elem, transform) {
      const image = this.parsePicture(elem);
      const spPr = xml_parser_default.element(elem, "spPr");
      if (!spPr)
        return image;
      const bounds = this.parseDmlShapeBounds(spPr, transform);
      image.cssStyle["position"] = "absolute";
      image.cssStyle["left"] = this.pt(bounds.left);
      image.cssStyle["top"] = this.pt(bounds.top);
      image.cssStyle["width"] = this.pt(bounds.width);
      image.cssStyle["height"] = this.pt(bounds.height);
      image.props = {
        ...image.props ?? {},
        dmlPicture: true,
        ...this.parseDmlShapeTransform(spPr)
      };
      return image;
    }
    parseDmlGroupTransform(elem, parentTransform) {
      const groupProps = xml_parser_default.element(elem, "grpSpPr");
      const xfrm = groupProps ? xml_parser_default.element(groupProps, "xfrm") : xml_parser_default.element(elem, "xfrm");
      const off = xfrm ? xml_parser_default.element(xfrm, "off") : null;
      const ext = xfrm ? xml_parser_default.element(xfrm, "ext") : null;
      const chOff = xfrm ? xml_parser_default.element(xfrm, "chOff") : null;
      const chExt = xfrm ? xml_parser_default.element(xfrm, "chExt") : null;
      const extCx = ext ? xml_parser_default.floatAttr(ext, "cx", null) : null;
      const extCy = ext ? xml_parser_default.floatAttr(ext, "cy", null) : null;
      const chExtCx = chExt ? xml_parser_default.floatAttr(chExt, "cx", null) : null;
      const chExtCy = chExt ? xml_parser_default.floatAttr(chExt, "cy", null) : null;
      const local = {
        offsetX: chOff ? xml_parser_default.floatAttr(chOff, "x", 0) : 0,
        offsetY: chOff ? xml_parser_default.floatAttr(chOff, "y", 0) : 0,
        left: off ? xml_parser_default.floatAttr(off, "x", 0) : 0,
        top: off ? xml_parser_default.floatAttr(off, "y", 0) : 0,
        scaleX: extCx && chExtCx ? extCx / chExtCx : 1,
        scaleY: extCy && chExtCy ? extCy / chExtCy : 1
      };
      if (!parentTransform)
        return local;
      return {
        offsetX: local.offsetX,
        offsetY: local.offsetY,
        left: parentTransform.left + (local.left - parentTransform.offsetX) * parentTransform.scaleX,
        top: parentTransform.top + (local.top - parentTransform.offsetY) * parentTransform.scaleY,
        scaleX: parentTransform.scaleX * local.scaleX,
        scaleY: parentTransform.scaleY * local.scaleY
      };
    }
    parseDmlPositionedShape(elem, transform) {
      const spPr = xml_parser_default.element(elem, "spPr");
      if (!spPr)
        return null;
      const bounds = this.parseDmlShapeBounds(spPr, transform);
      const textChildren = [];
      let bodyPr = null;
      for (const n of xml_parser_default.elements(elem)) {
        switch (n.localName) {
          case "txbx":
          case "textBox":
            for (const txbxContent of xml_parser_default.elements(n, "txbxContent"))
              textChildren.push(...this.parseBodyElements(txbxContent));
            break;
          case "bodyPr":
            bodyPr = n;
            break;
        }
      }
      bodyPr ?? (bodyPr = xml_parser_default.element(elem, "bodyPr"));
      const cssStyle = {
        "position": "absolute",
        "left": this.pt(bounds.left),
        "top": this.pt(bounds.top),
        "width": this.pt(bounds.width),
        "height": this.pt(bounds.height),
        "box-sizing": "border-box",
        "overflow": "hidden"
      };
      const cNvPr = xml_parser_default.element(elem, "cNvPr");
      const geom = xml_parser_default.element(spPr, "custGeom");
      const prstGeom = xml_parser_default.element(spPr, "prstGeom");
      const geometryAdjustments = this.parseDmlPresetGeometryAdjustments(prstGeom);
      const transformProps = this.parseDmlShapeTransform(spPr);
      const explicitFillStyle = this.parseDmlFillStyle(spPr);
      const styleFill = !explicitFillStyle.explicit ? this.parseDmlShapeStyleFill(elem) : null;
      const fillStyle = styleFill ?? explicitFillStyle;
      const explicitLine = xml_parser_default.element(spPr, "ln");
      const lineStyle = explicitLine ? this.parseDmlLineStyle(explicitLine) : this.parseDmlShapeStyleLine(elem) ?? this.parseDmlLineStyle(null);
      if (textChildren.length) {
        cssStyle["display"] = "flex";
        cssStyle["flex-direction"] = "column";
        cssStyle["justify-content"] = this.dmlVerticalAlign(bodyPr);
        cssStyle["align-items"] = "stretch";
      }
      this.applyDmlTextInsets(bodyPr, cssStyle);
      const textAutoFitProps = this.parseDmlTextAutoFit(bodyPr);
      if (geom) {
        const path = this.parseDmlCustomGeometry(geom);
        return {
          type: "shape" /* Shape */,
          children: textChildren,
          cssStyle: { ...cssStyle, "overflow": "visible" },
          props: {
            dmlSvg: true,
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
      if (fillStyle.backgroundColor)
        cssStyle["background-color"] = fillStyle.backgroundColor;
      if (fillStyle.backgroundImage)
        cssStyle["background-image"] = fillStyle.backgroundImage;
      if (lineStyle.stroke && lineStyle.stroke != "none")
        cssStyle["border"] = `${lineStyle.strokeWidth || "0.75pt"} ${lineStyle.borderType || "solid"} ${lineStyle.stroke}`;
      else
        cssStyle["border"] = "none";
      return {
        type: "shape" /* Shape */,
        children: textChildren,
        cssStyle,
        props: {
          dmlShape: true,
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
      const xfrm = xml_parser_default.element(spPr, "xfrm");
      const off = xfrm ? xml_parser_default.element(xfrm, "off") : null;
      const ext = xfrm ? xml_parser_default.element(xfrm, "ext") : null;
      const scaleX = transform?.scaleX ?? 1;
      const scaleY = transform?.scaleY ?? 1;
      const baseX = transform?.offsetX ?? 0;
      const baseY = transform?.offsetY ?? 0;
      const parentLeft = transform?.left ?? 0;
      const parentTop = transform?.top ?? 0;
      const x = off ? xml_parser_default.floatAttr(off, "x", 0) : 0;
      const y = off ? xml_parser_default.floatAttr(off, "y", 0) : 0;
      const cx = ext ? xml_parser_default.floatAttr(ext, "cx", 0) : 0;
      const cy = ext ? xml_parser_default.floatAttr(ext, "cy", 0) : 0;
      return {
        left: this.emuToPt(parentLeft + (x - baseX) * scaleX),
        top: this.emuToPt(parentTop + (y - baseY) * scaleY),
        width: Math.max(0, this.emuToPt(cx * scaleX)),
        height: Math.max(0, this.emuToPt(cy * scaleY))
      };
    }
    parseDmlPresetGeometryAdjustments(prstGeom) {
      const result = {};
      if (!prstGeom)
        return result;
      const avLst = xml_parser_default.element(prstGeom, "avLst");
      if (!avLst)
        return result;
      for (const gd of xml_parser_default.elements(avLst, "gd")) {
        const name = xml_parser_default.attr(gd, "name");
        const formula = String(xml_parser_default.attr(gd, "fmla") ?? "").trim();
        const match = formula.match(/^val\s+(-?\d+(?:\.\d+)?)$/i);
        if (name && match)
          result[name] = parseFloat(match[1]);
      }
      return result;
    }
    parseDmlShapeTransform(spPr) {
      const xfrm = xml_parser_default.element(spPr, "xfrm");
      if (!xfrm)
        return {};
      const rot = xml_parser_default.floatAttr(xfrm, "rot", 0);
      const props = {};
      if (rot)
        props.rotation = rot / 6e4;
      if (xml_parser_default.boolAttr(xfrm, "flipH", false))
        props.flipH = true;
      if (xml_parser_default.boolAttr(xfrm, "flipV", false))
        props.flipV = true;
      return props;
    }
    parseDmlFillStyle(spPr) {
      if (xml_parser_default.element(spPr, "noFill"))
        return { fill: "none", backgroundColor: "transparent", explicit: true };
      const solidFill = xml_parser_default.element(spPr, "solidFill");
      if (solidFill) {
        const color = this.parseDmlColor(solidFill) ?? "transparent";
        return { fill: color, backgroundColor: color, explicit: true };
      }
      const pattFill = xml_parser_default.element(spPr, "pattFill");
      if (pattFill) {
        const fg = this.parseDmlColor(xml_parser_default.element(pattFill, "fgClr")) ?? "currentColor";
        const bg = this.parseDmlColor(xml_parser_default.element(pattFill, "bgClr")) ?? "transparent";
        const prst = xml_parser_default.attr(pattFill, "prst");
        const angle = prst && prst.toLowerCase().includes("horz") ? "0deg" : "90deg";
        return {
          fill: bg,
          backgroundColor: bg,
          backgroundImage: `repeating-linear-gradient(${angle}, ${fg} 0, ${fg} 0.75pt, ${bg} 0.75pt, ${bg} 3pt)`,
          explicit: true
        };
      }
      return { fill: "none", backgroundColor: "transparent", explicit: false };
    }
    parseDmlShapeStyleFill(shape) {
      const style = xml_parser_default.element(shape, "style");
      const fillRef = style ? xml_parser_default.element(style, "fillRef") : null;
      const color = this.parseDmlColor(fillRef);
      if (!color)
        return null;
      return {
        fill: color,
        backgroundColor: color,
        explicit: false
      };
    }
    parseDmlShapeStyleLine(shape) {
      const style = xml_parser_default.element(shape, "style");
      const lineRef = style ? xml_parser_default.element(style, "lnRef") : null;
      if (!lineRef)
        return null;
      const themeLine = this.resolveDmlThemeLineStyle(xml_parser_default.intAttr(lineRef, "idx", null));
      const dash = themeLine?.dash;
      const strokeDasharray = dash && dash != "solid" ? dash == "dot" ? "1 2" : "4 3" : null;
      return {
        stroke: this.parseDmlColor(lineRef) ?? "black",
        strokeWidth: themeLine?.width ? this.pt(this.emuToPt(themeLine.width)) : "0.75pt",
        borderType: strokeDasharray ? "dashed" : "solid",
        strokeDasharray,
        strokeLinecap: this.parseDmlLineCap(themeLine?.cap)
      };
    }
    resolveDmlThemeLineStyle(idx) {
      if (idx == null || idx <= 0)
        return null;
      const themeLines = this.theme?.formatScheme?.lineStyles;
      return themeLines?.[idx - 1] ?? defaultDmlThemeLineStyles[idx - 1] ?? null;
    }
    parseDmlLineStyle(line) {
      if (!line || xml_parser_default.element(line, "noFill"))
        return { stroke: "none", strokeWidth: "0", borderType: "none" };
      const stroke = this.parseDmlColor(xml_parser_default.element(line, "solidFill")) ?? "black";
      const width = xml_parser_default.attr(line, "w") ? this.pt(this.emuToPt(xml_parser_default.floatAttr(line, "w", 0))) : "0.75pt";
      const dash = xml_parser_default.elementAttr(line, "prstDash", "val");
      const strokeLinecap = this.parseDmlLineCap(xml_parser_default.attr(line, "cap"));
      let strokeDasharray = null;
      let borderType = "solid";
      if (dash && dash != "solid") {
        borderType = "dashed";
        strokeDasharray = dash == "dot" ? "1 2" : "4 3";
      }
      const markerStart = this.parseDmlLineEndMarker(xml_parser_default.element(line, "tailEnd"));
      const markerEnd = this.parseDmlLineEndMarker(xml_parser_default.element(line, "headEnd"));
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
      const type = elem ? xml_parser_default.attr(elem, "type") : null;
      return type && type != "none" ? type : null;
    }
    parseDmlCustomGeometry(geom) {
      const pathList = xml_parser_default.element(geom, "pathLst");
      const paths = pathList ? xml_parser_default.elements(pathList, "path") : [];
      let d = "";
      let viewWidth = 1;
      let viewHeight = 1;
      for (const path of paths) {
        const width = xml_parser_default.floatAttr(path, "w", viewWidth);
        const height = xml_parser_default.floatAttr(path, "h", viewHeight);
        viewWidth = Math.max(viewWidth, width || 1);
        viewHeight = Math.max(viewHeight, height || 1);
        d += this.parseDmlPathData(path, width || 1, height || 1);
      }
      return { d: d.trim(), viewBox: `0 0 ${viewWidth} ${viewHeight}` };
    }
    parseDmlPathData(path, width, height) {
      const parts = [];
      const point = (el) => {
        const pt = xml_parser_default.element(el, "pt");
        return pt ? `${this.dmlCoord(xml_parser_default.attr(pt, "x"), width, height)} ${this.dmlCoord(xml_parser_default.attr(pt, "y"), width, height)}` : "0 0";
      };
      for (const child of xml_parser_default.elements(path)) {
        switch (child.localName) {
          case "moveTo":
            parts.push(`M ${point(child)}`);
            break;
          case "lnTo":
            parts.push(`L ${point(child)}`);
            break;
          case "cubicBezTo":
            const cubic = xml_parser_default.elements(child, "pt").map((pt) => `${this.dmlCoord(xml_parser_default.attr(pt, "x"), width, height)} ${this.dmlCoord(xml_parser_default.attr(pt, "y"), width, height)}`);
            if (cubic.length == 3)
              parts.push(`C ${cubic.join(" ")}`);
            break;
          case "quadBezTo":
            const quad = xml_parser_default.elements(child, "pt").map((pt) => `${this.dmlCoord(xml_parser_default.attr(pt, "x"), width, height)} ${this.dmlCoord(xml_parser_default.attr(pt, "y"), width, height)}`);
            if (quad.length == 2)
              parts.push(`Q ${quad.join(" ")}`);
            break;
          case "close":
            parts.push("Z");
            break;
        }
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
      const parsed = parseFloat(value);
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
      const norm = xml_parser_default.element(bodyPr, "normAutofit");
      if (norm) {
        const fontScale = this.parseDmlPercentage(xml_parser_default.attr(norm, "fontScale"), 1);
        const lineSpaceReduction = this.parseDmlPercentage(xml_parser_default.attr(norm, "lnSpcReduction"), 0);
        return {
          textAutoFit: "normal",
          textAutoFitFontScale: fontScale,
          textAutoFitLineSpaceReduction: lineSpaceReduction
        };
      }
      if (xml_parser_default.element(bodyPr, "spAutoFit"))
        return { textAutoFit: "shape" };
      return {};
    }
    parseDmlPercentage(value, fallback) {
      if (value == null || value === "")
        return fallback;
      const raw = String(value).trim();
      if (!raw)
        return fallback;
      const parsed = parseFloat(raw);
      if (!Number.isFinite(parsed))
        return fallback;
      const result = raw.endsWith("%") ? parsed / 100 : parsed / 1e5;
      return Number.isFinite(result) ? result : fallback;
    }
    applyDmlTextInsets(bodyPr, cssStyle) {
      if (!bodyPr)
        return;
      const map = { lIns: "padding-left", tIns: "padding-top", rIns: "padding-right", bIns: "padding-bottom" };
      for (const [attr, prop] of Object.entries(map)) {
        const value = xml_parser_default.attr(bodyPr, attr);
        if (value != null)
          cssStyle[prop] = this.pt(this.emuToPt(parseFloat(value)));
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
          "width": "100%",
          "height": "100%"
        }
      };
    }
    parseSmartArtReference(elem) {
      const relIds = elem.localName == "relIds" ? elem : this.findDescendant(elem, "relIds");
      return {
        type: "smartArt" /* SmartArt */,
        dataId: relIds ? xml_parser_default.attr(relIds, "dm") : xml_parser_default.attr(elem, "dm"),
        layoutId: relIds ? xml_parser_default.attr(relIds, "lo") : xml_parser_default.attr(elem, "lo"),
        styleId: relIds ? xml_parser_default.attr(relIds, "qs") : xml_parser_default.attr(elem, "qs"),
        colorId: relIds ? xml_parser_default.attr(relIds, "cs") : xml_parser_default.attr(elem, "cs"),
        cssStyle: {
          "width": "100%",
          "height": "100%"
        }
      };
    }
    parseInkReference(elem) {
      return {
        type: "ink" /* Ink */,
        id: xml_parser_default.attr(elem, "id"),
        cssStyle: {
          "width": "100%",
          "height": "100%"
        }
      };
    }
    parseGraphicPlaceholder(label) {
      return {
        type: "shape" /* Shape */,
        children: [{ type: "text" /* Text */, text: `[${label}]` }],
        cssStyle: {
          "display": "inline-flex",
          "align-items": "center",
          "justify-content": "center",
          "border": "1px solid #999",
          "background-color": "#f8f8f8",
          "color": "#555",
          "min-width": "2in",
          "min-height": "1in"
        }
      };
    }
    parseWordprocessingShape(elem) {
      const result = {
        type: "shape" /* Shape */,
        children: [],
        cssStyle: {
          "display": "inline-block",
          "position": "relative",
          "box-sizing": "border-box",
          "overflow": "hidden"
        }
      };
      const cNvPr = this.findDescendant(elem, "cNvPr");
      if (cNvPr) {
        result.title = xml_parser_default.attr(cNvPr, "title") ?? xml_parser_default.attr(cNvPr, "name");
        result.alt = xml_parser_default.attr(cNvPr, "descr") ?? result.title;
      }
      for (const n of xml_parser_default.elements(elem)) {
        switch (n.localName) {
          case "spPr":
            this.parseDmlShapeProperties(n, result.cssStyle, elem);
            break;
          case "txbx":
          case "textBox":
            for (const txbxContent of xml_parser_default.elements(n, "txbxContent"))
              result.children.push(...this.parseBodyElements(txbxContent));
            break;
        }
      }
      return result;
    }
    parseDmlShapeProperties(elem, style, owner) {
      const xfrm = xml_parser_default.element(elem, "xfrm");
      if (xfrm) {
        for (const n of xml_parser_default.elements(xfrm)) {
          switch (n.localName) {
            case "ext":
              style["width"] = xml_parser_default.lengthAttr(n, "cx", LengthUsage.Emu);
              style["height"] = xml_parser_default.lengthAttr(n, "cy", LengthUsage.Emu);
              break;
            case "off":
              style["left"] = xml_parser_default.lengthAttr(n, "x", LengthUsage.Emu);
              style["top"] = xml_parser_default.lengthAttr(n, "y", LengthUsage.Emu);
              break;
          }
        }
      }
      const explicitFillStyle = this.parseDmlFillStyle(elem);
      const styleFill = !explicitFillStyle.explicit && owner ? this.parseDmlShapeStyleFill(owner) : null;
      const fillStyle = styleFill ?? explicitFillStyle;
      const line = xml_parser_default.element(elem, "ln");
      const lineStyle = line ? this.parseDmlLineStyle(line) : owner ? this.parseDmlShapeStyleLine(owner) : null;
      if (fillStyle.backgroundColor)
        style["background-color"] = fillStyle.backgroundColor;
      if (fillStyle.backgroundImage)
        style["background-image"] = fillStyle.backgroundImage;
      if (lineStyle?.stroke && lineStyle.stroke != "none")
        style["border"] = `${lineStyle.strokeWidth || "0.75pt"} ${lineStyle.borderType || "solid"} ${lineStyle.stroke}`;
    }
    parseDmlColor(elem) {
      if (!elem)
        return null;
      const srgbClr = xml_parser_default.element(elem, "srgbClr");
      const schemeClr = xml_parser_default.element(elem, "schemeClr");
      const prstClr = xml_parser_default.element(elem, "prstClr");
      const sysClr = xml_parser_default.element(elem, "sysClr");
      if (srgbClr)
        return this.applyDmlColorTransforms(srgbClr, `#${xml_parser_default.attr(srgbClr, "val")}`);
      if (schemeClr) {
        const scheme = this.resolveDmlSchemeColor(xml_parser_default.attr(schemeClr, "val"));
        const fallback = this.dmlSchemeColorFallback(scheme);
        return this.applyDmlColorTransforms(schemeClr, `var(--docx-${scheme}-color${fallback ? `, ${fallback}` : ""})`);
      }
      if (sysClr)
        return this.applyDmlColorTransforms(sysClr, `#${xml_parser_default.attr(sysClr, "lastClr") ?? xml_parser_default.attr(sysClr, "val")}`);
      return prstClr ? this.applyDmlColorTransforms(prstClr, xml_parser_default.attr(prstClr, "val")) : null;
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
      const shade = xml_parser_default.elementAttr(elem, "shade", "val");
      const tint = xml_parser_default.elementAttr(elem, "tint", "val");
      const lumMod = xml_parser_default.elementAttr(elem, "lumMod", "val");
      const lumOff = xml_parser_default.elementAttr(elem, "lumOff", "val");
      if (shade != null) {
        const percent2 = Math.max(0, Math.min(100, parseFloat(shade) / 1e3));
        if (Number.isFinite(percent2) && percent2 < 100)
          color = `color-mix(in srgb, ${color} ${percent2}%, black)`;
      }
      if (tint != null) {
        const percent2 = Math.max(0, Math.min(100, parseFloat(tint) / 1e3));
        if (Number.isFinite(percent2) && percent2 < 100)
          color = `color-mix(in srgb, ${color} ${percent2}%, white)`;
      }
      if (lumMod != null) {
        const percent2 = Math.max(0, Math.min(100, parseFloat(lumMod) / 1e3));
        if (Number.isFinite(percent2) && percent2 < 100)
          color = `color-mix(in srgb, ${color} ${percent2}%, black)`;
      }
      if (lumOff != null) {
        const percent2 = Math.max(0, Math.min(100, parseFloat(lumOff) / 1e3));
        if (Number.isFinite(percent2) && percent2 > 0)
          color = `color-mix(in srgb, ${color} ${100 - percent2}%, white)`;
      }
      return color;
    }
    findDescendant(elem, localName) {
      for (const child of xml_parser_default.elements(elem)) {
        if (child.localName == localName)
          return child;
        const nested = this.findDescendant(child, localName);
        if (nested)
          return nested;
      }
      return null;
    }
    parsePicture(elem) {
      var result = { type: "image" /* Image */, src: "", cssStyle: {} };
      var blipFill = xml_parser_default.element(elem, "blipFill");
      var blip = blipFill ? xml_parser_default.element(blipFill, "blip") : null;
      var srcRect = blipFill ? xml_parser_default.element(blipFill, "srcRect") : null;
      var spPr = xml_parser_default.element(elem, "spPr");
      var prstGeom = spPr ? xml_parser_default.element(spPr, "prstGeom") : null;
      result.src = blip ? xml_parser_default.attr(blip, "embed") ?? xml_parser_default.attr(blip, "link") : "";
      result.props = {
        ...result.props ?? {},
        presetGeometry: prstGeom ? xml_parser_default.attr(prstGeom, "prst") : null,
        geometryAdjustments: this.parseDmlPresetGeometryAdjustments(prstGeom)
      };
      const cNvPr = this.findDescendant(elem, "cNvPr");
      if (cNvPr) {
        result.title = xml_parser_default.attr(cNvPr, "title") ?? xml_parser_default.attr(cNvPr, "name");
        result.alt = xml_parser_default.attr(cNvPr, "descr") ?? result.title;
      }
      if (srcRect) {
        result.srcRect = [
          xml_parser_default.intAttr(srcRect, "l", 0) / 1e5,
          xml_parser_default.intAttr(srcRect, "t", 0) / 1e5,
          xml_parser_default.intAttr(srcRect, "r", 0) / 1e5,
          xml_parser_default.intAttr(srcRect, "b", 0) / 1e5
        ];
      }
      var xfrm = spPr ? xml_parser_default.element(spPr, "xfrm") : null;
      var transforms = [];
      result.cssStyle["display"] = "block";
      result.cssStyle["position"] = "relative";
      result.cssStyle["object-fit"] = "contain";
      if (xfrm) {
        result.rotation = xml_parser_default.intAttr(xfrm, "rot", 0) / 6e4;
        if (xml_parser_default.boolAttr(xfrm, "flipH", false))
          transforms.push("scaleX(-1)");
        if (xml_parser_default.boolAttr(xfrm, "flipV", false))
          transforms.push("scaleY(-1)");
        for (var n of xml_parser_default.elements(xfrm)) {
          switch (n.localName) {
            case "ext":
              result.cssStyle["width"] = xml_parser_default.lengthAttr(n, "cx", LengthUsage.Emu);
              result.cssStyle["height"] = xml_parser_default.lengthAttr(n, "cy", LengthUsage.Emu);
              break;
            case "off":
              result.cssStyle["left"] = xml_parser_default.lengthAttr(n, "x", LengthUsage.Emu);
              result.cssStyle["top"] = xml_parser_default.lengthAttr(n, "y", LengthUsage.Emu);
              break;
          }
        }
      }
      if (transforms.length > 0)
        result.cssStyle["transform"] = transforms.join(" ");
      if (!result.cssStyle["width"])
        result.cssStyle["width"] = "100%";
      if (!result.cssStyle["height"])
        result.cssStyle["height"] = "100%";
      return result;
    }
    parseTable(node, source) {
      var result = { type: "table" /* Table */, children: [], ...source ? { source } : {} };
      let rowIndex = 0;
      for (const c of xml_parser_default.elements(node)) {
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
      }
      return result;
    }
    parseTableColumns(node) {
      var result = [];
      for (const n of xml_parser_default.elements(node)) {
        switch (n.localName) {
          case "gridCol":
            result.push({ width: xml_parser_default.lengthAttr(n, "w") });
            break;
        }
      }
      return result;
    }
    parseTableProperties(elem, table) {
      table.cssStyle = {};
      table.cellStyle = {};
      this.parseDefaultProperties(elem, table.cssStyle, table.cellStyle, (c) => {
        switch (c.localName) {
          case "tblStyle":
            table.styleName = xml_parser_default.attr(c, "val");
            break;
          case "tblLook":
            table.look = values.tableLookOfTblLook(c);
            table.className = values.classNameOftblLook(c);
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
            table.cssStyle["display"] = "none";
            break;
          default:
            return false;
        }
        return true;
      });
      switch (table.cssStyle["text-align"]) {
        case "center":
          delete table.cssStyle["text-align"];
          table.cssStyle["margin-left"] = "auto";
          table.cssStyle["margin-right"] = "auto";
          break;
        case "right":
          delete table.cssStyle["text-align"];
          table.cssStyle["margin-left"] = "auto";
          break;
      }
    }
    parseTablePosition(node, table) {
      var topFromText = xml_parser_default.lengthAttr(node, "topFromText");
      var bottomFromText = xml_parser_default.lengthAttr(node, "bottomFromText");
      var rightFromText = xml_parser_default.lengthAttr(node, "rightFromText");
      var leftFromText = xml_parser_default.lengthAttr(node, "leftFromText");
      var tblpX = xml_parser_default.lengthAttr(node, "tblpX");
      var tblpY = xml_parser_default.lengthAttr(node, "tblpY");
      var tblpXSpec = xml_parser_default.attr(node, "tblpXSpec");
      var tblpYSpec = xml_parser_default.attr(node, "tblpYSpec");
      var horzAnchor = xml_parser_default.attr(node, "horzAnchor");
      var vertAnchor = xml_parser_default.attr(node, "vertAnchor");
      table.cssStyle["float"] = "left";
      table.cssStyle["--docx-table-positioned"] = "1";
      if (topFromText != null)
        table.cssStyle["--docx-tblp-top-from-text"] = topFromText;
      if (bottomFromText != null)
        table.cssStyle["--docx-tblp-bottom-from-text"] = bottomFromText;
      if (leftFromText != null)
        table.cssStyle["--docx-tblp-left-from-text"] = leftFromText;
      if (rightFromText != null)
        table.cssStyle["--docx-tblp-right-from-text"] = rightFromText;
      if (tblpX != null)
        table.cssStyle["--docx-tblp-x"] = tblpX;
      if (tblpY != null)
        table.cssStyle["--docx-tblp-y"] = tblpY;
      if (tblpXSpec)
        table.cssStyle["--docx-tblp-x-spec"] = tblpXSpec;
      if (tblpYSpec)
        table.cssStyle["--docx-tblp-y-spec"] = tblpYSpec;
      if (horzAnchor)
        table.cssStyle["--docx-tblp-horz-anchor"] = horzAnchor;
      if (vertAnchor)
        table.cssStyle["--docx-tblp-vert-anchor"] = vertAnchor;
      table.cssStyle["margin-bottom"] = values.addSize(table.cssStyle["margin-bottom"], bottomFromText);
      table.cssStyle["margin-left"] = values.addSize(table.cssStyle["margin-left"], leftFromText);
      table.cssStyle["margin-right"] = values.addSize(table.cssStyle["margin-right"], rightFromText);
      table.cssStyle["margin-top"] = values.addSize(table.cssStyle["margin-top"], topFromText);
    }
    parseTableRow(node, source) {
      var result = { type: "row" /* Row */, children: [], ...source ? { source } : {} };
      let cellIndex = 0;
      for (const c of xml_parser_default.elements(node)) {
        switch (c.localName) {
          case "tc":
            result.children.push(this.parseTableCell(c, source ? { ...source, cellIndex: cellIndex++ } : void 0));
            break;
          case "trPr":
          case "tblPrEx":
            this.parseTableRowProperties(c, result);
            break;
        }
      }
      return result;
    }
    parseTableRowProperties(elem, row) {
      const rowStyle = {};
      row.cssStyle = this.parseDefaultProperties(elem, rowStyle, null, (c) => {
        switch (c.localName) {
          case "cnfStyle":
            row.conditionalStyle = values.tableConditionalFormatOfCnfStyle(c);
            row.className = values.classNameOfCnfStyle(c);
            break;
          case "tblHeader":
            row.isHeader = xml_parser_default.boolAttr(c, "val", true);
            break;
          case "gridBefore":
            row.gridBefore = xml_parser_default.intAttr(c, "val");
            break;
          case "gridAfter":
            row.gridAfter = xml_parser_default.intAttr(c, "val");
            break;
          case "cantSplit":
            if (xml_parser_default.boolAttr(c, "val", true))
              rowStyle["break-inside"] = "avoid";
            break;
          default:
            return false;
        }
        return true;
      });
    }
    parseTableCell(node, source) {
      var result = { type: "cell" /* Cell */, children: [], ...source ? { source } : {} };
      let nestedTableIndex = 0;
      let cellParagraphIndex = 0;
      for (const c of xml_parser_default.elements(node)) {
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
            cell.hideMark = xml_parser_default.boolAttr(c, "val", true);
            break;
          case "cnfStyle":
            cell.conditionalStyle = values.tableConditionalFormatOfCnfStyle(c);
            cell.className = values.classNameOfCnfStyle(c);
            break;
          default:
            return false;
        }
        return true;
      });
      this.parseTableCellVerticalText(elem, cell);
    }
    parseTableCellVerticalText(elem, cell) {
      const directionMap = {
        "btLr": {
          writingMode: "vertical-rl",
          transform: "rotate(180deg)"
        },
        "lrTb": {
          writingMode: "vertical-lr",
          transform: "none"
        },
        "tbRl": {
          writingMode: "vertical-rl",
          transform: "none"
        }
      };
      for (const c of xml_parser_default.elements(elem)) {
        if (c.localName === "textDirection") {
          const direction = xml_parser_default.attr(c, "val");
          const style = directionMap[direction] || { writingMode: "horizontal-tb" };
          cell.cssStyle["writing-mode"] = style.writingMode;
          cell.cssStyle["transform"] = style.transform;
        }
      }
    }
    parseDefaultProperties(elem, style = null, childStyle = null, handler = null) {
      style = style || {};
      for (const c of xml_parser_default.elements(elem)) {
        if (handler?.(c))
          continue;
        switch (c.localName) {
          case "jc":
            style["--docx-jc"] = xml_parser_default.attr(c, "val");
            style["text-align"] = values.valueOfJc(c);
            break;
          case "textAlignment":
            style["vertical-align"] = values.valueOfTextAlignment(c);
            break;
          case "color":
            style["color"] = xmlUtil.colorAttr(c, "val", null, autos.color);
            break;
          case "sz":
            style["font-size"] = style["min-height"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.FontSize);
            break;
          case "szCs":
            style["--docx-cs-font-size"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.FontSize);
            break;
          case "shd": {
            const shading = resolveShadingBackground(c);
            if (shading)
              style["background-color"] = shading;
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
            style["width"] = values.valueOfSize(c, "w");
            break;
          case "trHeight":
            this.parseTrHeight(c, style);
            break;
          case "strike":
            style["text-decoration"] = xml_parser_default.boolAttr(c, "val", true) ? "line-through" : "none";
            break;
          case "dstrike":
            if (xml_parser_default.boolAttr(c, "val", true)) {
              style["text-decoration-line"] = "line-through";
              style["text-decoration-style"] = "double";
            } else {
              style["text-decoration"] = "none";
            }
            break;
          case "b":
            style["font-weight"] = xml_parser_default.boolAttr(c, "val", true) ? "bold" : "normal";
            break;
          case "i":
            style["font-style"] = xml_parser_default.boolAttr(c, "val", true) ? "italic" : "normal";
            break;
          case "bCs":
            style["--docx-bidi-font-weight"] = xml_parser_default.boolAttr(c, "val", true) ? "bold" : "normal";
            if (style["direction"] == "rtl")
              style["font-weight"] = style["--docx-bidi-font-weight"];
            break;
          case "iCs":
            style["--docx-bidi-font-style"] = xml_parser_default.boolAttr(c, "val", true) ? "italic" : "normal";
            if (style["direction"] == "rtl")
              style["font-style"] = style["--docx-bidi-font-style"];
            break;
          case "caps":
            style["text-transform"] = xml_parser_default.boolAttr(c, "val", true) ? "uppercase" : "none";
            break;
          case "smallCaps":
            style["font-variant"] = xml_parser_default.boolAttr(c, "val", true) ? "small-caps" : "none";
            break;
          case "rtl":
            if (xml_parser_default.boolAttr(c, "val", true)) {
              style["direction"] = "rtl";
              style["unicode-bidi"] = "embed";
              if (style["--docx-bidi-font-weight"])
                style["font-weight"] = style["--docx-bidi-font-weight"];
              if (style["--docx-bidi-font-style"])
                style["font-style"] = style["--docx-bidi-font-style"];
            }
            break;
          case "outline":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["-webkit-text-stroke"] = "0.5px currentColor";
            break;
          case "shadow":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["text-shadow"] = "1px 1px 0 currentColor";
            break;
          case "emboss":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["text-shadow"] = "-1px -1px 0 rgba(255,255,255,.75), 1px 1px 0 rgba(0,0,0,.35)";
            break;
          case "imprint":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["text-shadow"] = "1px 1px 0 rgba(255,255,255,.75), -1px -1px 0 rgba(0,0,0,.35)";
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
            if (childStyle)
              this.parseTableBorderProperties(c, style);
            else
              this.parseBorderProperties(c, style);
            break;
          case "tblCellSpacing":
            style["border-spacing"] = values.valueOfMargin(c);
            style["border-collapse"] = "separate";
            break;
          case "pBdr":
            this.parseBorderProperties(c, style);
            break;
          case "bdr":
            style["border"] = values.valueOfBorder(c);
            break;
          case "tcBorders":
            this.parseBorderProperties(c, style);
            break;
          case "vanish":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["display"] = "none";
            break;
          case "kern":
            style["font-kerning"] = xml_parser_default.intAttr(c, "val", 0) > 0 ? "normal" : "none";
            break;
          case "noWrap":
            style["white-space"] = xml_parser_default.boolAttr(c, "val", true) ? "nowrap" : "normal";
            break;
          case "snapToGrid":
            style["--docx-snap-to-grid"] = xml_parser_default.boolAttr(c, "val", true) ? "1" : "0";
            break;
          case "autoSpaceDE":
            style["--docx-auto-space-de"] = xml_parser_default.boolAttr(c, "val", true) ? "1" : "0";
            break;
          case "autoSpaceDN":
            style["--docx-auto-space-dn"] = xml_parser_default.boolAttr(c, "val", true) ? "1" : "0";
            break;
          case "contextualSpacing":
            style["--docx-contextual-spacing"] = xml_parser_default.boolAttr(c, "val", true) ? "1" : "0";
            break;
          case "fitText":
            this.parseFitText(c, style);
            break;
          case "eastAsianLayout":
            this.parseEastAsianLayout(c, style);
            break;
          case "tblCellMar": {
            const target = childStyle || style;
            this.parseMarginProperties(c, target);
            this.markMarginProperties(c, target, "--docx-table-cell-margin");
            break;
          }
          case "tcMar": {
            const target = childStyle || style;
            this.parseMarginProperties(c, target);
            this.markMarginProperties(c, target, "--docx-tc-margin");
            break;
          }
          case "tblLayout":
            style["table-layout"] = values.valueOfTblLayout(c);
            break;
          case "vAlign":
            style["vertical-align"] = values.valueOfTextAlignment(c);
            break;
          case "spacing":
            if (elem.localName == "pPr")
              this.parseSpacing(c, style);
            else if (elem.localName == "rPr")
              style["letter-spacing"] = xml_parser_default.lengthAttr(c, "val", LengthUsage.SignedDxa);
            break;
          case "wordWrap":
            if (!xml_parser_default.boolAttr(c, "val", true))
              style["overflow-wrap"] = "break-word";
            break;
          case "suppressAutoHyphens":
            style["hyphens"] = xml_parser_default.boolAttr(c, "val", true) ? "none" : "auto";
            break;
          case "lang":
            style["$lang"] = xml_parser_default.attr(c, "val");
            style["$eastAsiaLang"] = xml_parser_default.attr(c, "eastAsia");
            break;
          case "bidi":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["direction"] = "rtl";
            break;
          case "pageBreakBefore":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["break-before"] = "page";
            break;
          case "keepLines":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["break-inside"] = "avoid";
            break;
          case "keepNext":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["break-after"] = "avoid";
            break;
          case "widowControl":
            if (xml_parser_default.boolAttr(c, "val", true)) {
              style["orphans"] = "2";
              style["widows"] = "2";
            }
            break;
          case "webHidden":
            if (this.options.hideWebHiddenContent && xml_parser_default.boolAttr(c, "val", true))
              style["display"] = "none";
            break;
          case "specVanish":
            if (xml_parser_default.boolAttr(c, "val", true))
              style["display"] = "none";
            break;
          case "tabs":
          //ignore - tabs is parsed by other parser
          case "outlineLvl": {
            const outlineLevel = xml_parser_default.intAttr(c, "val");
            if (outlineLevel != null)
              style["--docx-outline-level"] = `${outlineLevel}`;
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
            if (this.options.debug)
              console.warn(`DOCX: Unknown document element: ${elem.localName}.${c.localName}`);
            break;
        }
      }
      return style;
    }
    parseFitText(node, style) {
      const width = xml_parser_default.lengthAttr(node, "val");
      if (width) {
        style["display"] = "inline-block";
        style["width"] = width;
        style["text-align"] = "justify";
        style["text-align-last"] = "justify";
      }
    }
    parseEastAsianLayout(node, style) {
      if (xml_parser_default.boolAttr(node, "combine", false))
        style["text-combine-upright"] = "all";
      if (xml_parser_default.boolAttr(node, "vert", false))
        style["writing-mode"] = "vertical-rl";
      if (xml_parser_default.boolAttr(node, "vertCompress", false))
        style["font-stretch"] = "condensed";
    }
    parseUnderline(node, style) {
      var val = xml_parser_default.attr(node, "val");
      if (val == null)
        return;
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
      if (col)
        style["text-decoration-color"] = col;
    }
    parseFont(node, style) {
      var ascii = xml_parser_default.attr(node, "ascii");
      var hAnsi = xml_parser_default.attr(node, "hAnsi");
      var eastAsia = xml_parser_default.attr(node, "eastAsia");
      var cs = xml_parser_default.attr(node, "cs");
      var hint = xml_parser_default.attr(node, "hint");
      var asciiTheme = values.themeValue(node, "asciiTheme");
      var hAnsiTheme = values.themeValue(node, "hAnsiTheme");
      var eastAsiaTheme = values.themeValue(node, "eastAsiaTheme");
      const csThemeAttr = xml_parser_default.attr(node, "cstheme") ?? xml_parser_default.attr(node, "csTheme");
      var csTheme = csThemeAttr ? `var(--docx-${csThemeAttr}-font)` : null;
      if (csTheme && /HAnsi$/i.test(csThemeAttr)) {
        asciiTheme ?? (asciiTheme = csTheme);
        hAnsiTheme ?? (hAnsiTheme = csTheme);
      } else if (csTheme && /EastAsia$/i.test(csThemeAttr)) {
        eastAsiaTheme ?? (eastAsiaTheme = csTheme);
      }
      const explicitSlots = [
        ascii || asciiTheme ? "ascii" : "",
        hAnsi || hAnsiTheme ? "hAnsi" : "",
        eastAsia || eastAsiaTheme ? "eastAsia" : "",
        cs || csTheme ? "cs" : ""
      ].filter((x) => x);
      if (explicitSlots.length)
        style["--docx-rfonts-explicit-slots"] = explicitSlots.join(",");
      if (hint)
        style["--docx-font-hint"] = hint;
      var fonts = [ascii, hAnsi, asciiTheme, hAnsiTheme, eastAsia, eastAsiaTheme, cs, csTheme].filter((x) => x).flatMap((x) => this.wordCompatibleFontStack(x));
      const setFontSlot = (name, value) => {
        if (!value)
          return;
        const stack = this.wordCompatibleFontStack(value);
        if (stack.length)
          style[name] = stack.join(", ");
      };
      setFontSlot("--docx-ascii-font-family", ascii || asciiTheme);
      setFontSlot("--docx-hansi-font-family", hAnsi || hAnsiTheme || ascii || asciiTheme);
      setFontSlot("--docx-eastasia-font-family", eastAsia || eastAsiaTheme);
      setFontSlot("--docx-cs-font-family", cs || csTheme);
      const hasEastAsiaSlot = !!(eastAsia || eastAsiaTheme);
      if (fonts.length > 0 && hasEastAsiaSlot) {
        const currentFonts = (style["font-family"] ?? "").split(",").map((x) => x.trim()).filter((x) => x);
        style["font-family"] = [.../* @__PURE__ */ new Set([...currentFonts, ...fonts])].join(", ");
      }
    }
    wordCompatibleFontStack(fontFamily) {
      const raw = `${fontFamily ?? ""}`.trim();
      if (!raw)
        return [];
      if (/^var\(/i.test(raw))
        return [raw];
      const normalized = raw.replace(/^['"]|['"]$/g, "").toLowerCase();
      const compact = normalized.replace(/[－—–]/g, "-").replace(/\s+/g, "");
      const baseCompact = compact.replace(/(?:[_-]?(?:gb2312|gbk|gb18030|gb0))$/i, "");
      const emit = (items) => items.map((x) => /^(serif|sans-serif|monospace)$/i.test(x) ? x : encloseFontFamily(x));
      const emitUnique = (items) => emit([...new Set(items.filter(Boolean))]);
      const founderSong = /^fz(?:xiao|da)?biaosong|^fzshusong|^fzsongyi|^fzcusong|^fangzheng(?:xiao|da)?biaosong|^fangzhengshusong|方正(?:小标宋|大标宋|书宋|宋一|粗宋)/.test(baseCompact);
      const cesiFangSong = /^cesi.*仿宋|^cesifangsong/.test(baseCompact);
      if (normalized == "microsoft yahei" || normalized == "\u5FAE\u8F6F\u96C5\u9ED1" || normalized == "ms yahei")
        return emit(["Microsoft YaHei", "\u5FAE\u8F6F\u96C5\u9ED1", "Microsoft YaHei UI", "Noto Sans CJK SC", "Noto Sans SC", "SimHei", "sans-serif"]);
      if (normalized == "times new roman" || normalized == "timesnewroman")
        return emit(["Times New Roman", "Tinos", "Liberation Serif", "Nimbus Roman", "Noto Serif", "serif"]);
      if (normalized == "nsimsun" || normalized == "\u65B0\u5B8B\u4F53")
        return emit(["NSimSun", "\u65B0\u5B8B\u4F53", "SimSun", "\u5B8B\u4F53", "Songti SC", "serif"]);
      if (normalized == "simsun" || normalized == "\u5B8B\u4F53")
        return emit(["SimSun", "\u5B8B\u4F53", "Songti SC", "Noto Serif CJK SC", "AR PL SungtiL GB", "serif"]);
      if (/^(songti sc|songtisc|stsongti-sc|stsongtisc|宋体-简|宋體-簡)$/i.test(normalized))
        return emit(["Songti SC", "STSong", "SimSun", "\u5B8B\u4F53", "serif"]);
      if (/^fzhei|^fangzhenghei|方正黑体/.test(baseCompact))
        return emitUnique([raw, "FZHei-B01S", "FZHei-B01", "SimHei", "\u9ED1\u4F53", "Noto Sans CJK SC", "Noto Sans SC", "Microsoft YaHei", "sans-serif"]);
      if (normalized == "simhei" || normalized == "\u9ED1\u4F53")
        return emit(["SimHei", "\u9ED1\u4F53", "Noto Sans CJK SC", "Noto Sans SC", "Microsoft YaHei", "sans-serif"]);
      if (/^fzkai|^fangzhengkai|方正楷体/.test(baseCompact))
        return emitUnique([raw, "FZKai-Z03S", "FZKai-Z03", "STKaiti", "\u534E\u6587\u6977\u4F53", "Kaiti SC", "KaiTi", "\u6977\u4F53", "serif"]);
      if (/^(stkaiti|kaiti|kaiti[-_]?sc|kaiti[-_]?tc|楷[体體]|楷[体體][-－]?简|楷[体體][-－]?繁|华文楷体|華文楷體)/.test(baseCompact))
        return emitUnique([raw, "STKaiti", "\u534E\u6587\u6977\u4F53", "Kaiti SC", "KaiTi", "\u6977\u4F53", "serif"]);
      if (/^fzfangsong|^fangzhengfangsong|方正仿宋/.test(baseCompact))
        return emitUnique([raw, "FZFangSong-Z02S", "FZFangSong-Z02", "FangSong", "\u4EFF\u5B8B", "STFangsong", "\u534E\u6587\u4EFF\u5B8B", "Songti SC", "serif"]);
      if (cesiFangSong)
        return emitUnique([raw, "CESI\u4EFF\u5B8B-GB2312", "CESI\u4EFF\u5B8B", "FangSong", "\u4EFF\u5B8B", "FangSong_GB2312", "\u4EFF\u5B8B_GB2312", "STFangsong", "\u534E\u6587\u4EFF\u5B8B", "Songti SC", "serif"]);
      if (baseCompact == "fangsong" || baseCompact == "\u4EFF\u5B8B" || baseCompact == "stfangsong" || baseCompact == "\u534E\u6587\u4EFF\u5B8B" || baseCompact == "\u83EF\u6587\u4EFF\u5B8B")
        return emitUnique([raw, "FangSong", "\u4EFF\u5B8B", "FangSong_GB2312", "\u4EFF\u5B8B_GB2312", "STFangsong", "\u534E\u6587\u4EFF\u5B8B", "Songti SC", "serif"]);
      if (/^fzxiaobiaosong|^fangzhengxiaobiaosong|方正小标宋/.test(baseCompact))
        return emitUnique([raw, "FZXiaoBiaoSong-B05S", "\u65B9\u6B63\u5C0F\u6807\u5B8B\u7B80\u4F53", "FZXiaoBiaoSong-B05", "\u65B9\u6B63\u5C0F\u6807\u5B8B_GBK", "SimSun", "\u5B8B\u4F53", "Songti SC", "STSong", "Noto Serif CJK SC", "serif"]);
      if (/^fzdabiaosong|^fangzhengdabiaosong|方正大标宋/.test(baseCompact))
        return emitUnique([raw, "FZDaBiaoSong-B06S", "\u65B9\u6B63\u5927\u6807\u5B8B\u7B80\u4F53", "FZDaBiaoSong-B06", "\u65B9\u6B63\u5927\u6807\u5B8B_GBK", "SimSun", "\u5B8B\u4F53", "Songti SC", "STSong", "Noto Serif CJK SC", "serif"]);
      if (founderSong)
        return emitUnique([raw, "FZShuSong-Z01S", "FZShuSong-Z01", "\u65B9\u6B63\u4E66\u5B8B\u7B80\u4F53", "\u65B9\u6B63\u4E66\u5B8B_GBK", "SimSun", "\u5B8B\u4F53", "Songti SC", "STSong", "Noto Serif CJK SC", "serif"]);
      if (normalized == "arial")
        return emit(["Arial", "Arimo", "Liberation Sans", "Noto Sans", "sans-serif"]);
      return [encloseFontFamily(raw)];
    }
    parseIndentation(node, style) {
      var firstLine = xml_parser_default.lengthAttr(node, "firstLine");
      var hanging = xml_parser_default.lengthAttr(node, "hanging");
      var left = xml_parser_default.lengthAttr(node, "left");
      var start = xml_parser_default.lengthAttr(node, "start");
      var tableIndent = node.localName == "tblInd" ? values.valueOfMargin(node) : null;
      var right = xml_parser_default.lengthAttr(node, "right");
      var end = xml_parser_default.lengthAttr(node, "end");
      if (firstLine) {
        style["text-indent"] = firstLine;
        style["--docx-text-indent"] = firstLine;
      }
      if (hanging) {
        style["text-indent"] = `-${hanging}`;
        style["--docx-text-indent"] = `-${hanging}`;
        style["--docx-hanging-indent"] = hanging;
      }
      if (left || start || tableIndent) {
        style["margin-inline-start"] = left || start || tableIndent;
        style["--docx-margin-inline-start"] = left || start || tableIndent;
      }
      if (right || end) {
        style["margin-inline-end"] = right || end;
        style["--docx-margin-inline-end"] = right || end;
      }
    }
    parseSpacing(node, style) {
      var before = xml_parser_default.lengthAttr(node, "before");
      var after = xml_parser_default.lengthAttr(node, "after");
      var beforeLines = xml_parser_default.intAttr(node, "beforeLines", null);
      var afterLines = xml_parser_default.intAttr(node, "afterLines", null);
      var beforeAuto = xml_parser_default.boolAttr(node, "beforeAutospacing", false);
      var afterAuto = xml_parser_default.boolAttr(node, "afterAutospacing", false);
      var line = xml_parser_default.intAttr(node, "line", null);
      var lineRule = xml_parser_default.attr(node, "lineRule");
      if (beforeAuto) style["margin-top"] = "auto";
      else if (beforeLines != null) style["margin-top"] = `${(beforeLines / 100).toFixed(2)}em`;
      else if (before) style["margin-top"] = before;
      if (afterAuto) style["margin-bottom"] = "auto";
      else if (afterLines != null) style["margin-bottom"] = `${(afterLines / 100).toFixed(2)}em`;
      else if (after) style["margin-bottom"] = after;
      if (line !== null) {
        switch (lineRule ?? "auto") {
          case "auto":
            style["line-height"] = `${(line / 240).toFixed(2)}`;
            break;
          case "atLeast":
            style["line-height"] = `max(1em, ${(line / 20).toFixed(2)}pt)`;
            style["min-height"] = `${(line / 20).toFixed(2)}pt`;
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
    }
    parseMarginProperties(node, output) {
      for (const c of xml_parser_default.elements(node)) {
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
    }
    markMarginProperties(node, output, prefix) {
      output[prefix] = "1";
      for (const c of xml_parser_default.elements(node)) {
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
    }
    parseTrHeight(node, output) {
      const rule = xml_parser_default.attr(node, "hRule") ?? "atLeast";
      output["--docx-tr-height-rule"] = rule == "exact" ? "exact" : rule == "auto" ? "auto" : "atLeast";
      switch (rule) {
        case "exact":
          output["height"] = xml_parser_default.lengthAttr(node, "val");
          break;
        case "auto":
          break;
        case "atLeast":
        default:
          output["height"] = xml_parser_default.lengthAttr(node, "val");
          break;
      }
    }
    parseBorderProperties(node, output) {
      for (const c of xml_parser_default.elements(node)) {
        const border = values.valueOfBorder(c);
        const space = xml_parser_default.lengthAttr(c, "space", LengthUsage.Point);
        const setBorder = (side) => {
          output[`border-${side}`] = border;
          if (space)
            output[`--docx-border-${side}-space`] = space;
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
            output["border-top"] ?? (output["border-top"] = border);
            output["border-bottom"] ?? (output["border-bottom"] = border);
            if (space) {
              output["--docx-border-top-space"] ?? (output["--docx-border-top-space"] = space);
              output["--docx-border-bottom-space"] ?? (output["--docx-border-bottom-space"] = space);
            }
            break;
          case "insideV":
            output["border-left"] ?? (output["border-left"] = border);
            output["border-right"] ?? (output["border-right"] = border);
            if (space) {
              output["--docx-border-left-space"] ?? (output["--docx-border-left-space"] = space);
              output["--docx-border-right-space"] ?? (output["--docx-border-right-space"] = space);
            }
            break;
        }
      }
    }
    parseTableBorderProperties(node, output) {
      for (const c of xml_parser_default.elements(node)) {
        const border = values.valueOfBorder(c);
        const space = xml_parser_default.lengthAttr(c, "space", LengthUsage.Point);
        const setBorder = (name) => {
          output[`--docx-table-border-${name}`] = border;
          if (space)
            output[`--docx-table-border-${name}-space`] = space;
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
  var import_xmldom = __toESM(require_lib());
  var ctx = self;
  if (typeof globalThis.DOMParser === "undefined")
    globalThis.DOMParser = import_xmldom.DOMParser;
  if (typeof globalThis.XMLSerializer === "undefined")
    globalThis.XMLSerializer = import_xmldom.XMLSerializer;
  function post(id, type, payload = {}) {
    ctx.postMessage({ id, type, ...payload });
  }
  ctx.onmessage = async (ev) => {
    const msg = ev.data;
    if (!msg || msg.type !== "parse")
      return;
    const id = msg.id;
    try {
      const options = { ...msg.options, useWorker: false, h: void 0, progress: void 0 };
      post(id, "progress", { current: 0, total: 3, message: "Loading package relationships" });
      const document2 = await WordDocument.load(msg.data, new DocumentParser(options), options);
      post(id, "progress", { current: 2, total: 3, message: "Serializing parsed document model" });
      const snapshot = await document2.createSnapshot();
      post(id, "progress", { current: 3, total: 3, message: "Document model ready" });
      post(id, "parsed", { snapshot });
    } catch (error) {
      post(id, "error", {
        error: {
          message: error?.message ?? `${error}`,
          stack: error?.stack
        }
      });
    }
  };
})();
